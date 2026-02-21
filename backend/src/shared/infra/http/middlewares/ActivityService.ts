import { Logger } from '../../../../core/Logger';
import { prisma } from '../../database/prismaClient';
import { Prisma } from '@prisma/client';
import { EventBus } from '../../../../events/EventBus';

interface ActivityLogInput {
  userId: string | null;
  action: string;
  entityId: string | null;
  entityType: string | null;
  oldData: Prisma.InputJsonValue | null;
  newData: Prisma.InputJsonValue | null;
  ipAddress: string;
  statusCode: number;
  method: string;
  path: string;
  durationMs: number;
}

/**
 * ActivityService — Centralized audit trail persistence layer.
 * 
 * Persists admin actions to the AuditLog table and emits events
 * for real-time dashboard consumption via the EventBus.
 */
class ActivityService {
  /**
   * Log an admin activity to the database.
   */
  async log(input: ActivityLogInput): Promise<void> {
    try {
      const record = await prisma.auditLog.create({
        data: {
          userId: input.userId,
          action: input.action,
          entityId: input.entityId,
          entityType: input.entityType,
          oldData: input.oldData || undefined,
          newData: input.newData || undefined,
          ipAddress: input.ipAddress,
        },
      });

      Logger.debug(`[ActivityService] Recorded: ${input.action} by ${input.userId || 'SYSTEM'} on ${input.entityType || 'N/A'} (${input.durationMs}ms)`);

      // Emit for real-time dashboard feeds
      EventBus.emit('activity.logged', {
        id: record.id,
        action: input.action,
        userId: input.userId,
        entityType: input.entityType,
        entityId: input.entityId,
        method: input.method,
        path: input.path,
        statusCode: input.statusCode,
        durationMs: input.durationMs,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      // Never throw — activity logging must not break the application
      Logger.error(`[ActivityService] Failed to persist audit log: ${err}`);
    }
  }

  /**
   * Fetch paginated activity history for the admin dashboard.
   */
  async getRecentActivity(options: { page?: number; limit?: number; entityType?: string; userId?: string }) {
    const page = options.page || 1;
    const limit = Math.min(options.limit || 25, 100);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (options.entityType) where.entityType = options.entityType;
    if (options.userId) where.userId = options.userId;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a summary of activity counts grouped by action type for the last N days.
   */
  async getActivitySummary(days: number = 7) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const logs = await prisma.auditLog.findMany({
      where: { createdAt: { gte: since } },
      select: { action: true, createdAt: true },
    });

    // Group by action
    const actionCounts: Record<string, number> = {};
    const dailyCounts: Record<string, number> = {};

    for (const log of logs) {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
      const day = log.createdAt.toISOString().split('T')[0];
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    }

    return {
      totalActions: logs.length,
      byAction: actionCounts,
      byDay: dailyCounts,
      period: `${days} days`,
    };
  }
}

export const activityService = new ActivityService();
