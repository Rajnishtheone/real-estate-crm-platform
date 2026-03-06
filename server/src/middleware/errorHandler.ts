import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { failure } from '../utils/response';
import { ZodError } from 'zod';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return failure(res, err.message, err.statusCode, err.details);
  }
  if (err instanceof ZodError) {
    return failure(res, 'Validation error', 400, err.flatten());
  }
  console.error(err);
  return failure(res, 'Internal server error', 500);
};
