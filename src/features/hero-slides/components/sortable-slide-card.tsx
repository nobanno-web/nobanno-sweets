// src/features/hero-slides/components/sortable-slide-card.tsx
"use client";

import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { EditHeroSlideDialog } from "./edit-hero-slide-dialog";
import type { HeroSlide } from "@/generated/prisma/client";

export function SortableSlideCard({
  slide,
  canUpdate,
  canDelete,
  onDelete,
}: {
  slide: HeroSlide;
  canUpdate: boolean;
  canDelete: boolean;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: slide.id });

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
        <Image src={slide.imageUrl} alt={slide.headline} fill sizes="80px" className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-sm truncate">{slide.headline}</h3>
        <p className="text-muted-foreground text-xs truncate">{slide.subtext}</p>
        <p className="text-xs text-primary mt-0.5">{slide.ctaLabel} → {slide.ctaHref}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {canUpdate && <EditHeroSlideDialog slide={slide} />}
        {canDelete && (
          <button onClick={onDelete} aria-label="Delete slide" className="p-1.5 rounded-full bg-card border border-foreground text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}