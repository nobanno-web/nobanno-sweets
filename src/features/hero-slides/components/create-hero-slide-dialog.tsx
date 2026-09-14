// src/features/hero-slides/components/create-hero-slide-dialog.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateHeroSlideForm } from "./create-hero-slide-form";

export function CreateHeroSlideDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Slide
      </Button>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading font-bold text-lg mb-4">Add Slide</h2>
        <CreateHeroSlideForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}