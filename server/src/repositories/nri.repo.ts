import { prisma } from './prisma';

export const nriRepo = {
  findAccountByUser: (userId: string) => prisma.nriAccount.findFirst({ where: { userId }, include: { properties: true, rentPayments: true, documents: true } }),
  createAccount: (data: any) => prisma.nriAccount.create({ data }),
  createRentPayment: (data: any) => prisma.rentPayment.create({ data }),
  listRentPayments: (nriAccountId: string) => prisma.rentPayment.findMany({ where: { nriAccountId } }),
};
