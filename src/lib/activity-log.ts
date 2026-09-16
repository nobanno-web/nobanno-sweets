// src/lib/activity-log.ts
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

type LogParams = {
  userId: string;
  action: string;
  targetType: string;
  targetId?: string;
  metadata?: Prisma.InputJsonValue;
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