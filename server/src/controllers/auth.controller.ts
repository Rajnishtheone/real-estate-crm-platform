import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema, refreshSchema } from '../validators/auth.validators';
import { ApiError } from '../utils/ApiError';
import { success, created } from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await AuthService.register(data);
    created(res, { user });
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { accessToken, refreshToken, user } = await AuthService.login(email, password);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7*24*3600*1000 });
    success(res, { accessToken, refreshToken, user });
  } catch (err) { next(err); }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    if (!refreshToken) throw new ApiError(400, 'Refresh token required');
    const tokens = await AuthService.refresh(refreshToken);
    success(res, tokens);
  } catch (err) { next(err); }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    if (!refreshToken) throw new ApiError(400, 'Refresh token required');
    await AuthService.logout(refreshToken);
    res.clearCookie('refreshToken');
    success(res, { loggedOut: true });
  } catch (err) { next(err); }
};
