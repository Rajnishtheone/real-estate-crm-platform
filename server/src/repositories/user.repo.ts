import { prisma } from './prisma';
import { Role } from '@prisma/client';

type CreateUser = {
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: Role;
};

export const userRepo = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  create: (data: CreateUser) => prisma.user.create({ data }),
  incrementTokenVersion: (id: string) => prisma.user.update({ where: { id }, data: { tokenVersion: { increment: 1 } } }),
  list: () => prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, status: true } }),
};
