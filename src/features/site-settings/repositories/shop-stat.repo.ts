import { prisma } from "@/lib/prisma";

export async function listShopStats() {
  return prisma.shopStat.findMany({ orderBy: { order: "asc" } });
}

export async function countShopStats() {
  return prisma.shopStat.count();
}

export async function getShopStatById(id: string) {
  return prisma.shopStat.findUnique({ where: { id } });
}

export async function createShopStat(data: { label: string; value: string; order: number }) {
  return prisma.shopStat.create({ data });
}

export async function updateShopStat(id: string, data: Partial<{ label: string; value: string }>) {
  return prisma.shopStat.update({ where: { id }, data });
}

export async function deleteShopStat(id: string) {
  return prisma.shopStat.delete({ where: { id } });
}

export async function updateShopStatsOrder(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.shopStat.update({ where: { id }, data: { order: index } }),
    ),
  );
}
