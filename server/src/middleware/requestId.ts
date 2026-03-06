import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const requestId = (req: Request, _res: Response, next: NextFunction) => {
  const id = (req.headers['x-request-id'] as string) || randomUUID();
  req.headers['x-request-id'] = id;
  (req as any).id = id;
  next();
};
