// src/features/locations/components/edit-location-dialog.tsx
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditLocationForm } from "./edit-location-form";
import type { Location } from "@/generated/prisma/client";

export function EditLocationDialog({ location }: { location: Location }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button onClick={() => setOpen(true)} aria-label="Edit location" className="p-1.5 rounded-lg hover:bg-accent/10">
        <Pencil className="h-4 w-4" />
      </button>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading font-bold text-lg mb-4">Edit Location</h2>
        <EditLocationForm location={location} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}