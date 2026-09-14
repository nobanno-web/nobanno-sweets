import { slugify } from "@/lib/slugify";
import { can } from "@/lib/permissions";
import { deleteR2Object } from "@/lib/delete-r2-object";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import {
  listProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/features/products/repositories/product.repo";

type ProductInput = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isBestseller: boolean;
  isSeasonal: boolean;
  isFeatured: boolean;
};

async function generateUniqueSlug(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await getProductBySlug(slug);
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}

export async function getAllProducts() {
  return listProducts();
}

export async function createNewProduct(
  actingUserId: string,
  role: "ADMIN" | "EDITOR" | "CONTRIBUTOR",
  input: ProductInput,
) {
  if (!can(role, "content:create")) {
    throw new AppError("FORBIDDEN", "You don't have permission to create products", 403);
  }

  const slug = await generateUniqueSlug(input.name);
  const product = await createProduct({ ...input, slug });

  await logActivity({
    userId: actingUserId,
    action: "product:create",
    targetType: "Product",
    targetId: product.id,
    metadata: { name: product.name },
  });

  return product;
}

export async function updateExistingProduct(
  actingUserId: string,
  role: "ADMIN" | "EDITOR" | "CONTRIBUTOR",
  id: string,
  input: ProductInput,
) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to edit products", 403);
  }

  const existing = await getProductById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Product not found", 404);
  }

  const slug = existing.name === input.name ? existing.slug : await generateUniqueSlug(input.name, id);
  const updated = await updateProduct(id, { ...input, slug });

  if (existing.imageUrl !== input.imageUrl) {
    await deleteR2Object(existing.imageUrl);
  }

  await logActivity({
    userId: actingUserId,
    action: "product:update",
    targetType: "Product",
    targetId: id,
    metadata: { name: updated.name },
  });

  return updated;
}

export async function deleteExistingProduct(
  actingUserId: string,
  role: "ADMIN" | "EDITOR" | "CONTRIBUTOR",
  id: string,
) {
  if (!can(role, "content:delete")) {
    throw new AppError("FORBIDDEN", "You don't have permission to delete products", 403);
  }

  const existing = await getProductById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Product not found", 404);
  }

  await deleteProduct(id);
  await deleteR2Object(existing.imageUrl);

  await logActivity({
    userId: actingUserId,
    action: "product:delete",
    targetType: "Product",
    targetId: id,
    metadata: { name: existing.name },
  });

  return existing;
}
