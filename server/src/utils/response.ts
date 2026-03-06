import { Response } from 'express';

export type Pagination = { page: number; total: number; pages: number; limit?: number } | undefined;

export const success = (res: Response, data: any, pagination?: Pagination, status = 200) => {
  return res.status(status).json({ success: true, data, pagination });
};

export const created = (res: Response, data: any) => success(res, data, undefined, 201);

export const failure = (res: Response, message: string, status = 400, details?: any) => {
  return res.status(status).json({ success: false, message, details });
};
