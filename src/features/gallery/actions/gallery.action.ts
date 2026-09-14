// src/features/gallery/actions/gallery.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/errors/app.error";
import {
  createGalleryImageSchema,
  deleteGalleryImageSchema,
  reorderGalleryImagesSchema,
} from "@/features/gallery/validators/gallery.schema";
import {
  addGalleryImage,
  removeGalleryImage,
  reorderGallery,
} from "@/features/gallery/services/gallery.service";

async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }
  return session;
}

export const createGalleryImageAction = actionClient
  .schema(createGalleryImageSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const image = await addGalleryImage(
      session.user.id,
      session.user.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR",
      parsedInput,
    );
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { id: image.id };
  });

export const deleteGalleryImageAction = actionClient
  .schema(deleteGalleryImageSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await removeGalleryImage(
      session.user.id,
      session.user.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR",
      parsedInput.id,
    );
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  });

export const reorderGalleryImagesAction = actionClient
  .schema(reorderGalleryImagesSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await reorderGallery(
      session.user.id,
      session.user.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR",
      parsedInput.orderedIds,
    );
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  });