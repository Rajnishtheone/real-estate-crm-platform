import { prisma } from './prisma';

export const documentRepo = {
  create: (data: any) => prisma.document.create({ data }),
  findById: (id: string) => prisma.document.findUnique({ where: { id } }),
  listByUser: (userId: string) => prisma.document.findMany({ where: { ownerUserId: userId } }),
};
