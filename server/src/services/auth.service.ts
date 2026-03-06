import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { userRepo } from '../repositories/user.repo';
import { refreshTokenRepo } from '../repositories/refreshToken.repo';
import { ApiError } from '../utils/ApiError';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { Role } from '@prisma/client';
import { env } from '../config/env';

export const AuthService = {
  async register(data: { name: string; email: string; phone?: string; password: string; role?: Role }) {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new ApiError(409, 'Email already registered');
    const passwordHash = await bcrypt.hash(data.password, 12);
    const role = data.role || 'BUYER';
    const user = await userRepo.create({ name: data.name, email: data.email, phone: data.phone, passwordHash, role });
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  },
  async login(email: string, password: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new ApiError(401, 'Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new ApiError(401, 'Invalid credentials');
    const jti = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    await refreshTokenRepo.create({ jti, userId: user.id, expiresAt });
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, ver: user.tokenVersion, jti });
    return { user, accessToken, refreshToken };
  },
  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken) as any;
    const user = await userRepo.findById(payload.sub);
    if (!user || user.tokenVersion !== payload.ver) throw new ApiError(401, 'Invalid refresh token');
    const stored = payload.jti ? await refreshTokenRepo.findByJti(payload.jti) : null;
    if (!stored || stored.userId !== user.id || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new ApiError(401, 'Invalid refresh token');
    }
    // rotate
    await refreshTokenRepo.revoke(payload.jti);
    const newJti = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    await refreshTokenRepo.create({ jti: newJti, userId: user.id, expiresAt });
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const newRefresh = signRefreshToken({ sub: user.id, ver: user.tokenVersion, jti: newJti });
    return { accessToken, refreshToken: newRefresh };
  },
  async logout(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken) as any;
    if (payload?.jti) {
      await refreshTokenRepo.revoke(payload.jti).catch(() => null);
    }
    return true;
  },
};
