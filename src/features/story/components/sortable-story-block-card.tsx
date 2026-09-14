// src/features/story/components/sortable-story-block-card.tsx
"use client";

import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { EditStoryBlockDialog } from "./edit-story-block-dialog";
import type { StoryBlock } from "@/generated/prisma/client";

export function SortableStoryBlockCard({
  block,
  canUpdate,
  canDelete,
  onDelete,
}: {
  block: StoryBlock;
  canUpdate: boolean;
  canDelete: boolean;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-4 p-3 bg-card border-2 border-foreground rounded-2xl"
    >
      {canUpdate && (
        <button {...attributes} {...listeners} aria-label="Drag to reorder" className="cursor-grab active:cursor-grabbing text-muted-foreground shrink-0">
          <GripVertical className="h-5 w-5" />
        </button>
      )}

      <div className="relative w-20 h-14 shrink-0 rounded-lg overflow-hidden">
        <Image src={block.imageUrl} alt={block.heading} fill sizes="80px" className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase tracking-wide text-primary font-medium">{block.eyebrow}</span>
        <h3 className="font-heading font-semibold text-sm truncate">{block.heading}</h3>
        <p className="text-muted-foreground text-xs truncate">{block.paragraph}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {canUpdate && <EditStoryBlockDialog block={block} />}
        {canDelete && (
          <button onClick={onDelete} aria-label="Delete block" className="p-1.5 rounded-full bg-card border border-foreground text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}