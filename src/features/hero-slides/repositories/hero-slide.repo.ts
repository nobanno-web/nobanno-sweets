// src/features/hero-slides/repositories/hero-slide.repo.ts
import { prisma } from "@/lib/prisma";

export async function listHeroSlides() {
  return prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
}

export async function countHeroSlides() {
  return prisma.heroSlide.count();
}

export async function getHeroSlideById(id: string) {
  return prisma.heroSlide.findUnique({ where: { id } });
}

export async function createHeroSlide(data: {
  imageUrl: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  order: number;
}) {
  return prisma.heroSlide.create({ data });
}

export async function updateHeroSlide(
  id: string,
  data: Partial<{
    imageUrl: string;
    headline: string;
    subtext: string;
    ctaLabel: string;
    ctaHref: string;
  }>,
) {
  return prisma.heroSlide.update({ where: { id }, data });
}

export async function deleteHeroSlide(id: string) {
  return prisma.heroSlide.delete({ where: { id } });
}

export async function updateHeroSlidesOrder(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.heroSlide.update({ where: { id }, data: { order: index } }),
    ),
  );
}