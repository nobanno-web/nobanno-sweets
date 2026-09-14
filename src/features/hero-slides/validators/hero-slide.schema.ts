// src/features/hero-slides/validators/hero-slide.schema.ts
import { z } from "zod";

const ctaHrefSchema = z
  .string()
  .min(1, "Button link is required")
  .refine(
    (value) => value.startsWith("/") || /^https?:\/\//.test(value),
    "Link must start with / (internal page) or https:// (external link)",
  );

export const createHeroSlideSchema = z.object({
  imageUrl: z.string().url("Image is required"),
  headline: z.string().min(2, "Headline is required"),
  subtext: z.string().min(2, "Subtext is required"),
  ctaLabel: z.string().min(1, "Button label is required"),
  ctaHref: ctaHrefSchema,
});

export const updateHeroSlideSchema = createHeroSlideSchema.extend({
  id: z.string(),
});

export const deleteHeroSlideSchema = z.object({ id: z.string() });

export const reorderHeroSlidesSchema = z.object({
  orderedIds: z.array(z.string()),
});