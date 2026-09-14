// src/features/hero-slides/services/hero-slide.service.ts
import { can } from "@/lib/permissions";
import { deleteR2Object } from "@/lib/delete-r2-object";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import {
  listHeroSlides,
  countHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  updateHeroSlidesOrder,
} from "@/features/hero-slides/repositories/hero-slide.repo";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";
type SlideInput = { imageUrl: string; headline: string; subtext: string; ctaLabel: string; ctaHref: string };

export async function getAllHeroSlides() {
  return listHeroSlides();
}

export async function addHeroSlide(actingUserId: string, role: Role, input: SlideInput) {
  if (!can(role, "content:create")) {
    throw new AppError("FORBIDDEN", "You don't have permission to add slides", 403);
  }

  const count = await countHeroSlides();
  const slide = await createHeroSlide({ ...input, order: count });

  await logActivity({
    userId: actingUserId,
    action: "hero-slide:create",
    targetType: "HeroSlide",
    targetId: slide.id,
    metadata: { headline: slide.headline },
  });

  return slide;
}

export async function editHeroSlide(actingUserId: string, role: Role, id: string, input: SlideInput) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to edit slides", 403);
  }

  const existing = await getHeroSlideById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Slide not found", 404);
  }

  const updated = await updateHeroSlide(id, input);

  if (existing.imageUrl !== input.imageUrl) {
    await deleteR2Object(existing.imageUrl);
  }

  await logActivity({
    userId: actingUserId,
    action: "hero-slide:update",
    targetType: "HeroSlide",
    targetId: id,
    metadata: { headline: updated.headline },
  });

  return updated;
}

export async function removeHeroSlide(actingUserId: string, role: Role, id: string) {
  if (!can(role, "content:delete")) {
    throw new AppError("FORBIDDEN", "You don't have permission to delete slides", 403);
  }

  const existing = await getHeroSlideById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Slide not found", 404);
  }

  await deleteHeroSlide(id);
  await deleteR2Object(existing.imageUrl);

  await logActivity({
    userId: actingUserId,
    action: "hero-slide:delete",
    targetType: "HeroSlide",
    targetId: id,
    metadata: { headline: existing.headline },
  });

  return existing;
}

export async function reorderHeroSlides(actingUserId: string, role: Role, orderedIds: string[]) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to reorder slides", 403);
  }

  await updateHeroSlidesOrder(orderedIds);

  await logActivity({
    userId: actingUserId,
    action: "hero-slide:reorder",
    targetType: "HeroSlide",
  });
}