import { Request, Response, NextFunction } from 'express';
import { userRepo } from '../repositories/user.repo';
import { success } from '../utils/response';

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userRepo.findById(req.user!.id);
    success(res, user);
  } catch (err) { next(err); }
};
