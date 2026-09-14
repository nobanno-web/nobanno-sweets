import { z } from "zod";

export const createLocationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(2, "Address is required"),
  phone: z.string().min(2, "Phone is required"),
  hours: z.string().min(2, "Hours are required"),
  mapEmbedUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  latitude: z.number(),
  longitude: z.number(),
});

export const updateLocationSchema = createLocationSchema.extend({
  id: z.string(),
});

export const deleteLocationSchema = z.object({ id: z.string() });

export const setPrimaryLocationSchema = z.object({ id: z.string() });
