import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export async function listProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function createProduct(data: Omit<Prisma.ProductCreateInput, "slug"> & { slug: string }) {
  return prisma.product.create({ data });
}

export async function updateProduct(id: string, data: Partial<Prisma.ProductUpdateInput>) {
  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
