// src/features/hero-slides/components/hero-slides-list.tsx
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
import { SortableSlideCard } from "./sortable-slide-card";
import { deleteHeroSlideAction, reorderHeroSlidesAction } from "../actions/hero-slide.action";
import type { HeroSlide } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export function HeroSlidesList({ slides }: { slides: HeroSlide[] }) {
  const { data: session } = useSession();
  const role = session?.user?.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR" | undefined;
  const canUpdate = role ? can(role, "content:update") : false;
  const canDelete = role ? can(role, "content:delete") : false;

  const router = useRouter();

  const [items, setItems] = useState(slides);
  const sensors = useSensors(useSensor(PointerSensor));

  const deleteAction = useAction(deleteHeroSlideAction, {
    onSuccess: () => {
      toast.success("Slide deleted");
      router.refresh();
    },
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to delete"),
  });

  const reorderAction = useAction(reorderHeroSlidesAction, {
    onSuccess: () => router.refresh(),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to save order"),
  });

  function handleDelete(id: string) {
    if (confirm("Delete this slide? This can't be undone.")) {
      setItems((prev) => prev.filter((s) => s.id !== id));
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
          {items.map((slide) => (
            <SortableSlideCard
              key={slide.id}
              slide={slide}
              canUpdate={canUpdate}
              canDelete={canDelete}
              onDelete={() => handleDelete(slide.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}