// src/features/gallery/services/gallery.service.ts
import { can } from "@/lib/permissions";
import { deleteR2Object } from "@/lib/delete-r2-object";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import { GALLERY_MAX_PHOTOS } from "@/features/gallery/constants";
import {
  listGalleryImages,
  countGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  deleteGalleryImage,
  updateGalleryImagesOrder,
} from "@/features/gallery/repositories/gallery.repo";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

export async function getAllGalleryImages() {
  return listGalleryImages();
}

export async function addGalleryImage(
  actingUserId: string,
  role: Role,
  input: { imageUrl: string; altText: string },
) {
  if (!can(role, "content:create")) {
    throw new AppError("FORBIDDEN", "You don't have permission to add photos", 403);
  }

  const count = await countGalleryImages();
  if (count >= GALLERY_MAX_PHOTOS) {
    throw new AppError(
      "LIMIT_REACHED",
      `Gallery is limited to ${GALLERY_MAX_PHOTOS} photos. Remove one before adding another.`,
      400,
    );
  }

  const image = await createGalleryImage({ ...input, order: count });

  await logActivity({
    userId: actingUserId,
    action: "gallery:create",
    targetType: "GalleryImage",
    targetId: image.id,
  });

  return image;
}

export async function removeGalleryImage(actingUserId: string, role: Role, id: string) {
  if (!can(role, "content:delete")) {
    throw new AppError("FORBIDDEN", "You don't have permission to delete photos", 403);
  }

  const existing = await getGalleryImageById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Photo not found", 404);
  }

  await deleteGalleryImage(id);
  await deleteR2Object(existing.imageUrl);

  await logActivity({
    userId: actingUserId,
    action: "gallery:delete",
    targetType: "GalleryImage",
    targetId: id,
  });

  return existing;
}

export async function reorderGallery(actingUserId: string, role: Role, orderedIds: string[]) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to reorder photos", 403);
  }

  await updateGalleryImagesOrder(orderedIds);

  await logActivity({
    userId: actingUserId,
    action: "gallery:reorder",
    targetType: "GalleryImage",
  });
}