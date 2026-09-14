// src/features/story/components/story-blocks-list.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { can } from "@/lib/permissions";
import { SortableStoryBlockCard } from "./sortable-story-block-card";
import { deleteStoryBlockAction, reorderStoryBlocksAction } from "../actions/story-block.action";
import type { StoryBlock } from "@/generated/prisma/client";

export function StoryBlocksList({ blocks }: { blocks: StoryBlock[] }) {
  const { data: session } = useSession();
  const role = session?.user?.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR" | undefined;
  const canUpdate = role ? can(role, "content:update") : false;
  const canDelete = role ? can(role, "content:delete") : false;

  const [items, setItems] = useState(blocks);
  const sensors = useSensors(useSensor(PointerSensor));

  const deleteAction = useAction(deleteStoryBlockAction, {
    onSuccess: () => toast.success("Block deleted"),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to delete"),
  });

  const reorderAction = useAction(reorderStoryBlocksAction, {
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to save order"),
  });

  function handleDelete(id: string) {
    if (confirm("Delete this story block? This can't be undone.")) {
      setItems((prev) => prev.filter((b) => b.id !== id));
      deleteAction.execute({ id });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);

    setItems(reordered);
    reorderAction.execute({ orderedIds: reordered.map((i) => i.id) });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={canUpdate ? handleDragEnd : undefined}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {items.map((block) => (
            <SortableStoryBlockCard
              key={block.id}
              block={block}
              canUpdate={canUpdate}
              canDelete={canDelete}
              onDelete={() => handleDelete(block.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}