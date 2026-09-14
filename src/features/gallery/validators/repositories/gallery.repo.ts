// src/features/gallery/repositories/gallery.repo.ts
import { prisma } from "@/lib/prisma";

export async function listGalleryImages() {
  return prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
}

export async function countGalleryImages() {
  return prisma.galleryImage.count();
}

export async function getGalleryImageById(id: string) {
  return prisma.galleryImage.findUnique({ where: { id } });
}

export async function createGalleryImage(data: { imageUrl: string; altText: string; order: number }) {
  return prisma.galleryImage.create({ data });
}

export async function deleteGalleryImage(id: string) {
  return prisma.galleryImage.delete({ where: { id } });
}

export async function updateGalleryImagesOrder(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.galleryImage.update({ where: { id }, data: { order: index } }),
    ),
  );
}