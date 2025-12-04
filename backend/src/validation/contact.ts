import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(3).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  company: z.string().max(120).optional(),
  message: z.string().min(10).max(1000),
});
