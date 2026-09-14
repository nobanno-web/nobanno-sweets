import { prisma } from "@/lib/prisma";

export async function listStoryBlocks() {
  return prisma.storyBlock.findMany({ orderBy: { order: "asc" } });
}

export async function countStoryBlocks() {
  return prisma.storyBlock.count();
}

export async function getStoryBlockById(id: string) {
  return prisma.storyBlock.findUnique({ where: { id } });
}

export async function createStoryBlock(data: {
  eyebrow: string;
  heading: string;
  paragraph: string;
  imageUrl: string;
  order: number;
}) {
  return prisma.storyBlock.create({ data });
}

export async function updateStoryBlock(
  id: string,
  data: Partial<{ eyebrow: string; heading: string; paragraph: string; imageUrl: string }>,
) {
  return prisma.storyBlock.update({ where: { id }, data });
}

export async function deleteStoryBlock(id: string) {
  return prisma.storyBlock.delete({ where: { id } });
}

export async function updateStoryBlocksOrder(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.storyBlock.update({ where: { id }, data: { order: index } }),
    ),
  );
}
