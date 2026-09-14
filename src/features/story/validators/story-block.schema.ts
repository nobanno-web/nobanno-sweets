import { z } from "zod";

export const createStoryBlockSchema = z.object({
  eyebrow: z.string().min(1, "Eyebrow label is required"),
  heading: z.string().min(2, "Heading is required"),
  paragraph: z.string().min(2, "Paragraph is required"),
  imageUrl: z.string().url("Image is required"),
});

export const updateStoryBlockSchema = createStoryBlockSchema.extend({
  id: z.string(),
});

export const deleteStoryBlockSchema = z.object({ id: z.string() });

export const reorderStoryBlocksSchema = z.object({
  orderedIds: z.array(z.string()),
});
