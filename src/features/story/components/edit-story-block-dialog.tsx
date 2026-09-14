// src/features/story/components/edit-story-block-dialog.tsx
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditStoryBlockForm } from "./edit-story-block-form";
import type { StoryBlock } from "@/generated/prisma/client";

export function EditStoryBlockDialog({ block }: { block: StoryBlock }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button onClick={() => setOpen(true)} aria-label="Edit block" className="p-1.5 rounded-full bg-card/90 border border-foreground">
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading font-bold text-lg mb-4">Edit Story Block</h2>
        <EditStoryBlockForm block={block} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}