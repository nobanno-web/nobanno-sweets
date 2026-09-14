import { z } from "zod";

const optionalUrl = z.string().url().optional().or(z.literal(""));

export const updateSiteSettingsSchema = z.object({
  facebookUrl: optionalUrl,
  instagramUrl: optionalUrl,
  youtubeUrl: optionalUrl,
  welcomeModalEnabled: z.boolean(),
  welcomeModalImageUrl: z.string().url().optional().or(z.literal("")),
  welcomeModalAltText: z.string().optional().or(z.literal("")),
  ownerName: z.string().optional().or(z.literal("")),
  ownerRole: z.string().optional().or(z.literal("")),
  ownerPhotoUrl: z.string().url().optional().or(z.literal("")),
  ownerBio: z.string().optional().or(z.literal("")),
});

export const createShopStatSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const updateShopStatSchema = createShopStatSchema.extend({
  id: z.string(),
});

export const deleteShopStatSchema = z.object({ id: z.string() });

export const reorderShopStatsSchema = z.object({
  orderedIds: z.array(z.string()),
});
