// src/features/auth/services/auth.service.ts
import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  updateUserPassword,
} from "@/features/auth/repositories/user.repo";

export async function verifyCredentials(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user || !user.isActive) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return null;
  }

  return user;
}

export async function changePassword(userId: string, newPassword: string) {
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(userId, passwordHash);
}
