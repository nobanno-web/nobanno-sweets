// src/features/gallery/components/gallery-grid.tsx
"use client";

import { useEffect, useState } from "react";
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
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { can } from "@/lib/permissions";
import { SortableGalleryTile } from "./sortable-gallery-tile";
import { deleteGalleryImageAction, reorderGalleryImagesAction } from "../actions/gallery.action";
import type { GalleryImage } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const { data: session } = useSession();
  const role = session?.user?.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR" | undefined;
  const canDelete = role ? can(role, "content:delete") : false;
  const canReorder = role ? can(role, "content:update") : false;

  const [items, setItems] = useState(images);

  useEffect(() => {
    setItems(images);
  }, [images]);

  const sensors = useSensors(useSensor(PointerSensor));
  const router = useRouter();

  const deleteAction = useAction(deleteGalleryImageAction, {
     onSuccess: () => {
    toast.success("Photo deleted");
    router.refresh();
  },
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to delete"),
  });

  const reorderAction = useAction(reorderGalleryImagesAction, {
     onSuccess: () => router.refresh(),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to save order"),
  });

  function handleDelete(id: string) {
    if (confirm("Delete this photo? This can't be undone.")) {
      setItems((prev) => prev.filter((img) => img.id !== id));
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={canReorder ? handleDragEnd : undefined}
    >
      <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {items.map((image) => (
            <SortableGalleryTile
              key={image.id}
              id={image.id}
              imageUrl={image.imageUrl}
              altText={image.altText}
              canDelete={canDelete}
              onDelete={() => handleDelete(image.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}