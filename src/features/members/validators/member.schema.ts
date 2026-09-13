// src/features/members/validators/member.schema.ts
import { z } from "zod";

export const createMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  role: z.enum(["ADMIN", "EDITOR", "CONTRIBUTOR"]),
});

export const updateMemberRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["ADMIN", "EDITOR", "CONTRIBUTOR"]),
});

export const setMemberActiveSchema = z.object({
  userId: z.string(),
  isActive: z.boolean(),
});
