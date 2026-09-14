// src/features/gallery/components/sortable-gallery-tile.tsx
"use client";

import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

export function SortableGalleryTile({
  id,
  imageUrl,
  altText,
  canDelete,
  onDelete,
}: {
  id: string;
  imageUrl: string;
  altText: string;
  canDelete: boolean;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="relative aspect-square rounded-xl overflow-hidden border-2 border-foreground group"
    >
      <Image src={imageUrl} alt={altText} fill className="object-cover" />

      <button
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="absolute top-2 left-2 p-1.5 rounded-full bg-card/90 border border-foreground cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      {canDelete && (
        <button
          onClick={onDelete}
          aria-label="Delete photo"
          className="absolute top-2 right-2 p-1.5 rounded-full bg-card/90 border border-foreground text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}