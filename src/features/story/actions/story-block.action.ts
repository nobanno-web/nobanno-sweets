"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/errors/app.error";
import {
  createStoryBlockSchema,
  updateStoryBlockSchema,
  deleteStoryBlockSchema,
  reorderStoryBlocksSchema,
} from "@/features/story/validators/story-block.schema";
import {
  addStoryBlock,
  editStoryBlock,
  removeStoryBlock,
  reorderStoryBlocks,
} from "@/features/story/services/story-block.service";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }
  return session;
}

export const createStoryBlockAction = actionClient
  .schema(createStoryBlockSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const block = await addStoryBlock(session.user.id, session.user.role as Role, parsedInput);
    revalidatePath("/admin/story");
    revalidatePath("/story");
    return { id: block.id };
  });

export const updateStoryBlockAction = actionClient
  .schema(updateStoryBlockSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const { id, ...data } = parsedInput;
    await editStoryBlock(session.user.id, session.user.role as Role, id, data);
    revalidatePath("/admin/story");
    revalidatePath("/story");
    return { success: true };
  });

export const deleteStoryBlockAction = actionClient
  .schema(deleteStoryBlockSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await removeStoryBlock(session.user.id, session.user.role as Role, parsedInput.id);
    revalidatePath("/admin/story");
    revalidatePath("/story");
    return { success: true };
  });

export const reorderStoryBlocksAction = actionClient
  .schema(reorderStoryBlocksSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    await reorderStoryBlocks(session.user.id, session.user.role as Role, parsedInput.orderedIds);
    revalidatePath("/admin/story");
    revalidatePath("/story");
    return { success: true };
  });
