// src/lib/auth-guards.ts
import { auth } from "@/auth";
import { AppError } from "@/errors/app.error";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }
  if (session.user.role !== "ADMIN") {
    throw new AppError("FORBIDDEN", "Admin access required", 403);
  }
  return session;
}