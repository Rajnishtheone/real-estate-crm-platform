import { z } from 'zod';

export const propertyCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  locationCity: z.string(),
  locationCountry: z.string(),
  price: z.coerce.number().positive(),
  type: z.enum(['APARTMENT','VILLA','PLOT','COMMERCIAL']),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  amenities: z.array(z.string()).optional(),
  ownerId: z.string().optional(),
});

export const propertyUpdateSchema = propertyCreateSchema.partial().extend({
  status: z.enum(['DRAFT','PENDING','ACTIVE','REJECTED','SOLD']).optional(),
});

export const propertyListQuerySchema = z.object({
  city: z.string().optional(),
  type: z.enum(['APARTMENT','VILLA','PLOT','COMMERCIAL']).optional(),
  status: z.enum(['DRAFT','PENDING','ACTIVE','REJECTED','SOLD']).optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  bedrooms: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  sort: z.enum(['price','-price','createdAt','-createdAt']).optional(),
});
