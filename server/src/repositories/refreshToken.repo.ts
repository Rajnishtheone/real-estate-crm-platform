import { prisma } from './prisma';

export const refreshTokenRepo = {
  create: (data: { jti: string; userId: string; expiresAt: Date }) => prisma.refreshToken.create({ data }),
  findByJti: (jti: string) => prisma.refreshToken.findUnique({ where: { jti } }),
  revoke: (jti: string) => prisma.refreshToken.update({ where: { jti }, data: { revokedAt: new Date() } }),
  deleteByUser: (userId: string) => prisma.refreshToken.deleteMany({ where: { userId } }),
};
