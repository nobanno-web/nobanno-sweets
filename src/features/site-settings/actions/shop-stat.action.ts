"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/errors/app.error";
import {
  createShopStatSchema,
  updateShopStatSchema,
  deleteShopStatSchema,
  reorderShopStatsSchema,
} from "@/features/site-settings/validators/site-settings.schema";
import {
  addShopStat,
  editShopStat,
  removeShopStat,
  reorderShopStats,
} from "@/features/site-settings/services/shop-stat.service";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }
  return session;
}

export const createShopStatAction = actionClient
  .schema(createShopStatSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const stat = await addShopStat(session.user.id, session.user.role as Role, parsedInput);
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { id: stat.id };
  });

export const updateShopStatAction = actionClient
  .schema(updateShopStatSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const { id, ...data } = parsedInput;
    await editShopStat(session.user.id, session.user.role as Role, id, data);
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  });

export const deleteShopStatAction = actionClient
  .schema(deleteShopStatSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await removeShopStat(session.user.id, session.user.role as Role, parsedInput.id);
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  });

export const reorderShopStatsAction = actionClient
  .schema(reorderShopStatsSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await reorderShopStats(session.user.id, session.user.role as Role, parsedInput.orderedIds);
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  });
