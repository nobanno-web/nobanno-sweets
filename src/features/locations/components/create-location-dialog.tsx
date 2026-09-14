// src/features/locations/components/create-location-dialog.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateLocationForm } from "./create-location-form";

export function CreateLocationDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Location
      </Button>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading font-bold text-lg mb-4">Add Location</h2>
        <CreateLocationForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}