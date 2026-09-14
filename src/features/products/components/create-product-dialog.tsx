// src/features/products/components/create-product-dialog.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateProductForm } from "./create-product-form";

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Product
      </Button>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading font-bold text-lg mb-4">Add Product</h2>
        <CreateProductForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}