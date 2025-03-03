import { z } from 'zod';

export const CreatePropertySchema = z.object({
  name: z.string().min(2).max(10),
  description: z.string().min(5).max(20),
  area: z.number().positive().min(100),
});

// Infer ile birlikte schema üzerinden typescript tipi oluşturuyoruz
export type CreatePropertyZodDTO = z.infer<typeof CreatePropertySchema>;
