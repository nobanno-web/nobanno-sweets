// src/app/(admin)/admin/products/page.tsx
import { getAllProducts } from "@/features/products/services/product.service";
import { ProductsTable } from "@/features/products/components/products-table";
import { CreateProductDialog } from "@/features/products/components/create-product-dialog";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl mb-1">Products</h1>
          <p className="text-muted-foreground text-sm">
            Manage everything shown in Our Collection, Best Sellers, and the Menu.
          </p>
        </div>
        <CreateProductDialog />
      </div>

      <ProductsTable products={products} />
    </div>
  );
}