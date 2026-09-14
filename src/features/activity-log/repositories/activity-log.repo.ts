import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 15;

export async function listActivityLogs(page: number = 1) {
  const [logs, total] = await Promise.all([
    prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        user: { select: { name: true, email: true } },
      },
    }),
    prisma.activityLog.count(),
  ]);

  return { logs, total, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}
