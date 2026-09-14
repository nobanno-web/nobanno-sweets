import { can } from "@/lib/permissions";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import {
  listShopStats,
  countShopStats,
  getShopStatById,
  createShopStat,
  updateShopStat,
  deleteShopStat,
  updateShopStatsOrder,
} from "@/features/site-settings/repositories/shop-stat.repo";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

export async function getAllShopStats() {
  return listShopStats();
}

export async function addShopStat(actingUserId: string, role: Role, input: { label: string; value: string }) {
  if (!can(role, "content:create")) {
    throw new AppError("FORBIDDEN", "You don't have permission to add stats", 403);
  }

  const count = await countShopStats();
  const stat = await createShopStat({ ...input, order: count });

  await logActivity({
    userId: actingUserId,
    action: "shop-stat:create",
    targetType: "ShopStat",
    targetId: stat.id,
  });

  return stat;
}

export async function editShopStat(
  actingUserId: string,
  role: Role,
  id: string,
  input: { label: string; value: string },
) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to edit stats", 403);
  }

  const existing = await getShopStatById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Stat not found", 404);
  }

  const updated = await updateShopStat(id, input);

  await logActivity({
    userId: actingUserId,
    action: "shop-stat:update",
    targetType: "ShopStat",
    targetId: id,
  });

  return updated;
}

export async function removeShopStat(actingUserId: string, role: Role, id: string) {
  if (!can(role, "content:delete")) {
    throw new AppError("FORBIDDEN", "You don't have permission to delete stats", 403);
  }

  const existing = await getShopStatById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Stat not found", 404);
  }

  await deleteShopStat(id);

  await logActivity({
    userId: actingUserId,
    action: "shop-stat:delete",
    targetType: "ShopStat",
    targetId: id,
  });

  return existing;
}

export async function reorderShopStats(actingUserId: string, role: Role, orderedIds: string[]) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to reorder stats", 403);
  }

  await updateShopStatsOrder(orderedIds);

  await logActivity({
    userId: actingUserId,
    action: "shop-stat:reorder",
    targetType: "ShopStat",
  });
}
