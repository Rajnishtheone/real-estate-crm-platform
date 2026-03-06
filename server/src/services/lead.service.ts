import { leadRepo } from '../repositories/lead.repo';
import { propertyRepo } from '../repositories/property.repo';
import { ApiError } from '../utils/ApiError';
import { LeadStatus } from '@prisma/client';
import { NotificationService } from './notification.service';

export const LeadService = {
  async create(data: any, userId?: string) {
    const property = await propertyRepo.findById(data.propertyId);
    if (!property) throw new ApiError(404, 'Property not found');
    const lead = await leadRepo.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      propertyId: data.propertyId,
      buyerId: userId,
      assignedAgentId: property.agentId,
    });
    NotificationService.leadCreated(lead, property);
    return lead;
  },
  async updateStatus(id: string, status: LeadStatus, actorId: string, role?: string) {
    const lead = await leadRepo.findById(id);
    if (!lead) throw new ApiError(404, 'Lead not found');
    if (role !== 'ADMIN' && lead.assignedAgentId !== actorId) throw new ApiError(403, 'Forbidden');
    return leadRepo.updateStatus(id, status);
  },
  async analytics() {
    return leadRepo.analytics();
  },
  async listForUser(userId: string, role?: string) {
    if (role === 'ADMIN') return leadRepo.listAll();
    return leadRepo.listByAgent(userId);
  },
};
