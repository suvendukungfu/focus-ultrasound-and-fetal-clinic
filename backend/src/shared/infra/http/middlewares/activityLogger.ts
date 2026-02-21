import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../../core/Logger';
import { Prisma } from '@prisma/client';
import { activityService } from './ActivityService';

// Import to ensure Express Request augmentation (req.user) is available
import './ensureAuthenticated';

/**
 * Express middleware that captures and persists admin activity to the AuditLog table.
 * 
 * Intercepts state-changing requests (POST, PUT, PATCH, DELETE) and records:
 * - The authenticated user (if present)
 * - The HTTP method and route
 * - The request body (as newData)
 * - The client IP address
 * 
 * Operates non-blocking: errors in logging never affect the API response.
 */
export function activityLogger(req: Request, res: Response, next: NextFunction) {
  // Only log state-changing operations
  const mutatingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if (!mutatingMethods.includes(req.method)) {
    return next();
  }

  // Capture the original response end to log after response is sent
  const originalEnd = res.end;
  const startTime = Date.now();

  res.end = function (this: Response, ...args: any[]) {
    // Fire-and-forget: never block the response
    setImmediate(async () => {
      try {
        const action = deriveAction(req.method, req.path);
        const entityInfo = deriveEntity(req.path, req.body);

        await activityService.log({
          userId: req.user?.id || null,
          action,
          entityId: entityInfo.entityId,
          entityType: entityInfo.entityType,
          oldData: null, // Could be enriched by specific use-cases
          newData: sanitizeBody(req.body),
          ipAddress: (req.ip || req.headers['x-forwarded-for'] as string || 'unknown'),
          statusCode: res.statusCode,
          method: req.method,
          path: req.originalUrl,
          durationMs: Date.now() - startTime,
        });
      } catch (err) {
        Logger.error(`[ActivityLogger] Failed to record activity: ${err}`);
      }
    });

    return originalEnd.apply(this, args as any);
  } as any;

  next();
}

/**
 * Derive a human-readable action name from HTTP method + path.
 */
function deriveAction(method: string, path: string): string {
  const segments = path.split('/').filter(Boolean);
  const resource = segments[segments.length - 1] || segments[segments.length - 2] || 'UNKNOWN';

  const methodMap: Record<string, string> = {
    POST: 'CREATED',
    PUT: 'UPDATED',
    PATCH: 'UPDATED',
    DELETE: 'DELETED',
  };

  return `${resource.toUpperCase()}_${methodMap[method] || 'MODIFIED'}`;
}

/**
 * Extract entity type and ID from the URL path.
 */
function deriveEntity(path: string, body: any): { entityType: string | null; entityId: string | null } {
  const segments = path.split('/').filter(Boolean);
  
  // Pattern: /api/v1/leads/:id → entityType=Lead, entityId=:id
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  let entityType: string | null = null;
  let entityId: string | null = null;

  for (let i = 0; i < segments.length; i++) {
    if (uuidPattern.test(segments[i])) {
      entityId = segments[i];
      entityType = segments[i - 1] ? capitalise(segments[i - 1]) : null;
      break;
    }
  }

  // If no UUID in path, try the body
  if (!entityId && body?.id) {
    entityId = body.id;
  }

  // If still no entityType, derive from the last semantic segment
  if (!entityType) {
    const semanticSegment = segments.find(s => !['api', 'v1', 'v2'].includes(s) && !uuidPattern.test(s));
    entityType = semanticSegment ? capitalise(semanticSegment) : null;
  }

  return { entityType, entityId };
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/s$/, ''); // "leads" → "Lead"
}

/**
 * Sanitise request body to remove sensitive fields before persisting.
 */
function sanitizeBody(body: Record<string, unknown>): Prisma.InputJsonValue | null {
  if (!body || typeof body !== 'object') return null;
  
  const sensitiveFields = ['password', 'token', 'secret', 'apiKey', 'creditCard'];
  const sanitized = { ...body } as Record<string, unknown>;
  
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }
  
  return sanitized as Prisma.InputJsonValue;
}
