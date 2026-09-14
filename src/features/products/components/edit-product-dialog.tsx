// src/features/products/components/edit-product-dialog.tsx
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditProductForm } from "./edit-product-form";
import type { Product } from "@/generated/prisma/client";

export function EditProductDialog({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        aria-label="Edit product"
        className="p-1.5 rounded-lg hover:bg-accent/10"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading font-bold text-lg mb-4">Edit Product</h2>
        <EditProductForm product={product} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}