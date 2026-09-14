"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/errors/app.error";
import {
  createLocationSchema,
  updateLocationSchema,
  deleteLocationSchema,
  setPrimaryLocationSchema,
} from "@/features/locations/validators/location.schema";
import {
  addLocation,
  editLocation,
  removeLocation,
  makeLocationPrimary,
} from "@/features/locations/services/location.service";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }
  return session;
}

export const createLocationAction = actionClient
  .schema(createLocationSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const location = await addLocation(session.user.id, session.user.role as Role, parsedInput);
    revalidatePath("/admin/locations");
    revalidatePath("/");
    return { id: location.id };
  });

export const updateLocationAction = actionClient
  .schema(updateLocationSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const { id, ...data } = parsedInput;
    await editLocation(session.user.id, session.user.role as Role, id, data);
    revalidatePath("/admin/locations");
    revalidatePath("/");
    return { success: true };
  });

export const deleteLocationAction = actionClient
  .schema(deleteLocationSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await removeLocation(session.user.id, session.user.role as Role, parsedInput.id);
    revalidatePath("/admin/locations");
    revalidatePath("/");
    return { success: true };
  });

export const setPrimaryLocationAction = actionClient
  .schema(setPrimaryLocationSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await makeLocationPrimary(session.user.id, session.user.role as Role, parsedInput.id);
    revalidatePath("/admin/locations");
    revalidatePath("/");
    return { success: true };
  });
