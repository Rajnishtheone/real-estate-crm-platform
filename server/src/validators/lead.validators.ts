import { z } from 'zod';

export const leadCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  propertyId: z.string(),
});

export const leadStatusSchema = z.object({ status: z.enum(['NEW','CONTACTED','NEGOTIATION','CLOSED']) });
