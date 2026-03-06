import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export interface AuthUser {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request { user?: AuthUser }
  }
}

export const authGuard = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) throw new ApiError(401, 'Unauthorized');
  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, env.jwtSecret) as any;
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch (err) {
    throw new ApiError(401, 'Invalid token');
  }
};
