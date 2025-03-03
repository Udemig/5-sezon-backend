import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(3, 'Ürün adı en az 3 karakter olmalı'),
  price: z.number().positive('Fiyat pozitif olmalıdır'),
  stock: z.number().int().min(0, 'Stok negatif olamaz'),
  description: z.string().optional(),
});

export const HeaderSchema = z.object({
  authorization: z.string().min(32),
  'user-agent': z.string(),
  deneme: z.string().min(10),
  'content-type': z.literal('application/json'),
});

export type HeaderType = z.infer<typeof HeaderSchema>;
export type CreateProductType = z.infer<typeof CreateProductSchema>;
