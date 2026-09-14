"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/errors/app.error";
import { updateSiteSettingsSchema } from "@/features/site-settings/validators/site-settings.schema";
import { editSiteSettings } from "@/features/site-settings/services/site-settings.service";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

export const updateSiteSettingsAction = actionClient
  .schema(updateSiteSettingsSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session?.user) {
      throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
    }

    await editSiteSettings(session.user.id, session.user.role as Role, parsedInput);

    revalidatePath("/admin/settings");
    revalidatePath("/");
    revalidatePath("/story");

    return { success: true };
  });
