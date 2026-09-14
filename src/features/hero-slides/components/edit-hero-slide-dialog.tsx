// src/features/hero-slides/components/edit-hero-slide-dialog.tsx
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditHeroSlideForm } from "./edit-hero-slide-form";
import type { HeroSlide } from "@/generated/prisma/client";

export function EditHeroSlideDialog({ slide }: { slide: HeroSlide }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button onClick={() => setOpen(true)} aria-label="Edit slide" className="p-1.5 rounded-full bg-card/90 border border-foreground">
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading font-bold text-lg mb-4">Edit Slide</h2>
        <EditHeroSlideForm slide={slide} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}