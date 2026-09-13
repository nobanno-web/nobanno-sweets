// src/lib/activity-log.ts
import { prisma } from "@/lib/prisma";

type LogParams = {
  userId: string;
  action: string;
  targetType: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
};

export async function logActivity({
  userId,
  action,
  targetType,
  targetId,
  metadata,
}: LogParams) {
  await prisma.activityLog.create({
    data: { userId, action, targetType, targetId, metadata },
  });
}