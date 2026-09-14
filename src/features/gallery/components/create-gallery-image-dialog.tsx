// src/features/gallery/components/create-gallery-image-dialog.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateGalleryImageForm } from "./create-gallery-image-form";

export function CreateGalleryImageDialog({ disabled }: { disabled: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} disabled={disabled} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Photo
      </Button>
      <DialogContent className="max-w-sm">
        <h2 className="font-heading font-bold text-lg mb-4">Add Photo</h2>
        <CreateGalleryImageForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}