import { z } from "zod";

export const createGalleryImageSchema = z.object({
  imageUrl: z.string().url("Image is required"),
  altText: z.string().min(2, "Alt text is required for accessibility"),
});

export const deleteGalleryImageSchema = z.object({
  id: z.string(),
});

export const reorderGalleryImagesSchema = z.object({
  orderedIds: z.array(z.string()),
});
