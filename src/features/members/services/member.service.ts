// src/features/members/services/member.service.ts
import bcrypt from "bcryptjs";
import type { Role } from "@/generated/prisma/client";
import { generateTempPassword } from "@/lib/generate-password";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import {
  createMember,
  updateMemberRole,
  setMemberActive,
  getMemberByEmail,
} from "@/features/members/repositories/member.repo";

export async function createNewMember(
  actingUserId: string,
  input: { name: string; email: string; role: Role },
) {
  const existing = await getMemberByEmail(input.email);
  if (existing) {
    throw new AppError("CONFLICT", "A user with this email already exists", 409);
  }

  const tempPassword = generateTempPassword();
  const passwordHash = await bcrypt.hash(tempPassword, 10);

  const user = await createMember({
    name: input.name,
    email: input.email,
    role: input.role,
    passwordHash,
  });

  await logActivity({
    userId: actingUserId,
    action: "member:create",
    targetType: "User",
    targetId: user.id,
    metadata: { email: user.email, role: user.role },
  });

  // Returned once, to be shown once in the UI — never stored in plaintext
  return { user, tempPassword };
}

export async function changeMemberRole(
  actingUserId: string,
  userId: string,
  role: Role,
) {
  if (actingUserId === userId) {
    throw new AppError(
      "FORBIDDEN",
      "You can't change your own role",
      403,
    );
  }

  const user = await updateMemberRole(userId, role);

  await logActivity({
    userId: actingUserId,
    action: "member:role_change",
    targetType: "User",
    targetId: userId,
    metadata: { newRole: role },
  });

  return user;
}

export async function toggleMemberActive(
  actingUserId: string,
  userId: string,
  isActive: boolean,
) {
  if (actingUserId === userId) {
    throw new AppError(
      "FORBIDDEN",
      "You can't deactivate your own account",
      403,
    );
  }

  const user = await setMemberActive(userId, isActive);

  await logActivity({
    userId: actingUserId,
    action: isActive ? "member:activate" : "member:deactivate",
    targetType: "User",
    targetId: userId,
  });

  return user;
}
