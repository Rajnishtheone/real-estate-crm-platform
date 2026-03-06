import { z } from 'zod';

export const documentUploadSchema = z.object({
  type: z.enum(['OWNERSHIP','LEASE','LEGAL','ID_PROOF','RECEIPT']),
  propertyId: z.string().optional(),
  nriAccountId: z.string().optional(),
});
