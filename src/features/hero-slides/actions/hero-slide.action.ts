// src/features/hero-slides/actions/hero-slide.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/errors/app.error";
import {
  createHeroSlideSchema,
  updateHeroSlideSchema,
  deleteHeroSlideSchema,
  reorderHeroSlidesSchema,
} from "@/features/hero-slides/validators/hero-slide.schema";
import {
  addHeroSlide,
  editHeroSlide,
  removeHeroSlide,
  reorderHeroSlides,
} from "@/features/hero-slides/services/hero-slide.service";



async function requireSession() {
 
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }
  return session;
}

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

export const createHeroSlideAction = actionClient
  .schema(createHeroSlideSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const slide = await addHeroSlide(session.user.id, session.user.role as Role, parsedInput);
    revalidatePath("/admin/hero-slides");
    revalidatePath("/");
    return { id: slide.id };
  });

export const updateHeroSlideAction = actionClient
  .schema(updateHeroSlideSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const { id, ...data } = parsedInput;
    await editHeroSlide(session.user.id, session.user.role as Role, id, data);
    revalidatePath("/admin/hero-slides");
    revalidatePath("/");
    return { success: true };
  });

export const deleteHeroSlideAction = actionClient
  .schema(deleteHeroSlideSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await removeHeroSlide(session.user.id, session.user.role as Role, parsedInput.id);
    revalidatePath("/admin/hero-slides");
    revalidatePath("/");
    return { success: true };
  });

export const reorderHeroSlidesAction = actionClient
  .schema(reorderHeroSlidesSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await reorderHeroSlides(session.user.id, session.user.role as Role, parsedInput.orderedIds);
    revalidatePath("/admin/hero-slides");
    revalidatePath("/");
    return { success: true };
  });