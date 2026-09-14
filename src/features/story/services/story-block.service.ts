import { can } from "@/lib/permissions";
import { deleteR2Object } from "@/lib/delete-r2-object";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import {
  listStoryBlocks,
  countStoryBlocks,
  getStoryBlockById,
  createStoryBlock,
  updateStoryBlock,
  deleteStoryBlock,
  updateStoryBlocksOrder,
} from "@/features/story/repositories/story-block.repo";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";
type BlockInput = { eyebrow: string; heading: string; paragraph: string; imageUrl: string };

export async function getAllStoryBlocks() {
  return listStoryBlocks();
}

export async function addStoryBlock(actingUserId: string, role: Role, input: BlockInput) {
  if (!can(role, "content:create")) {
    throw new AppError("FORBIDDEN", "You don't have permission to add story blocks", 403);
  }

  const count = await countStoryBlocks();
  const block = await createStoryBlock({ ...input, order: count });

  await logActivity({
    userId: actingUserId,
    action: "story-block:create",
    targetType: "StoryBlock",
    targetId: block.id,
    metadata: { heading: block.heading },
  });

  return block;
}

export async function editStoryBlock(actingUserId: string, role: Role, id: string, input: BlockInput) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to edit story blocks", 403);
  }

  const existing = await getStoryBlockById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Story block not found", 404);
  }

  const updated = await updateStoryBlock(id, input);

  if (existing.imageUrl !== input.imageUrl) {
    await deleteR2Object(existing.imageUrl);
  }

  await logActivity({
    userId: actingUserId,
    action: "story-block:update",
    targetType: "StoryBlock",
    targetId: id,
    metadata: { heading: updated.heading },
  });

  return updated;
}

export async function removeStoryBlock(actingUserId: string, role: Role, id: string) {
  if (!can(role, "content:delete")) {
    throw new AppError("FORBIDDEN", "You don't have permission to delete story blocks", 403);
  }

  const existing = await getStoryBlockById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Story block not found", 404);
  }

  await deleteStoryBlock(id);
  await deleteR2Object(existing.imageUrl);

  await logActivity({
    userId: actingUserId,
    action: "story-block:delete",
    targetType: "StoryBlock",
    targetId: id,
    metadata: { heading: existing.heading },
  });

  return existing;
}

export async function reorderStoryBlocks(actingUserId: string, role: Role, orderedIds: string[]) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to reorder story blocks", 403);
  }

  await updateStoryBlocksOrder(orderedIds);

  await logActivity({
    userId: actingUserId,
    action: "story-block:reorder",
    targetType: "StoryBlock",
  });
}
