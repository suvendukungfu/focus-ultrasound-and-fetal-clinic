import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { Logger } from '../../../../core/Logger';

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
    }
  }
}

interface ITokenPayload extends JwtPayload {
  sub: string;
  role: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    Logger.warn('Unauthorized access attempt: No token provided');
    return response.status(401).json({ message: 'Token missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub, role } = verify(
      token,
      process.env.JWT_SECRET || 'default_secret'
    ) as ITokenPayload;

    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch (err) {
    Logger.warn('Unauthorized access attempt: Invalid token');
    return response.status(401).json({ message: 'Invalid token' });
  }
}

export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { role } = request.user;

  if (role !== 'ADMIN') {
    Logger.warn(`Forbidden access attempt: User ${request.user.id} is not ADMIN`);
    return response.status(403).json({ message: 'Forbidden' });
  }

  return next();
}
