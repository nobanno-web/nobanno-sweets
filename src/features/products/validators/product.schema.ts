// src/features/products/validators/product.schema.ts 
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Image is required"),
  price: z.number().int().positive("Price must be a positive number"),
  isBestseller: z.boolean().default(false),
  isSeasonal: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.extend({
  id: z.string(),
});

export const deleteProductSchema = z.object({
  id: z.string(),
});

export type ProductFormValues = z.input<typeof createProductSchema>;