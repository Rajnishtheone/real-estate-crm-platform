import { prisma } from './prisma';
import { LeadStatus } from '@prisma/client';

export const leadRepo = {
  create: (data: any) => prisma.lead.create({ data }),
  findById: (id: string) => prisma.lead.findUnique({ where: { id }, include: { property: true } }),
  updateStatus: (id: string, status: LeadStatus) => prisma.lead.update({ where: { id }, data: { status } }),
  analytics: () => prisma.lead.groupBy({ by: ['status'], _count: { _all: true } }),
  listByAgent: (agentId: string) =>
    prisma.lead.findMany({ where: { assignedAgentId: agentId }, include: { property: true }, orderBy: { createdAt: 'desc' } }),
  listAll: () => prisma.lead.findMany({ include: { property: true }, orderBy: { createdAt: 'desc' } }),
};
