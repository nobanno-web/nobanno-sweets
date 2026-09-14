// src/features/products/components/products-table.tsx
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { can } from "@/lib/permissions";
import { EditProductDialog } from "./edit-product-dialog";
import { deleteProductAction } from "../actions/product.action";
import type { Product } from "@/generated/prisma/client";

export function ProductsTable({ products }: { products: Product[] }) {
  const { data: session } = useSession();
  const role = session?.user?.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR" | undefined;

  const canUpdate = role ? can(role, "content:update") : false;
  const canDelete = role ? can(role, "content:delete") : false;

  const deleteAction = useAction(deleteProductAction, {
    onSuccess: () => toast.success("Product deleted"),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to delete"),
  });

  function handleDelete(id: string, name: string) {
    if (confirm(`Delete "${name}"? This can't be undone.`)) {
      deleteAction.execute({ id });
    }
  }

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Photo</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Tags</th>
            {(canUpdate || canDelete) && (
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-border">
              <td className="px-4 py-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                </div>
              </td>
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3 text-primary font-semibold">৳{product.price}</td>
              <td className="px-4 py-3">
                <div className="flex gap-1 flex-wrap">
                  {product.isBestseller && (
                    <span className="text-[10px] bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">
                      Bestseller
                    </span>
                  )}
                  {product.isSeasonal && (
                    <span className="text-[10px] bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">
                      Seasonal
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </td>
              {(canUpdate || canDelete) && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {canUpdate && <EditProductDialog product={product} />}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        aria-label="Delete product"
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
