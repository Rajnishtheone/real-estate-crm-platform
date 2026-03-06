import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signAccessToken = (payload: any) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.accessTtl });

export const signRefreshToken = (payload: any) =>
  jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.refreshTtl });

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.jwtRefreshSecret) as any;
