import { prisma } from "@/lib/prisma";

export async function listLocations() {
  return prisma.location.findMany({ orderBy: { order: "asc" } });
}

export async function countLocations() {
  return prisma.location.count();
}

export async function getLocationById(id: string) {
  return prisma.location.findUnique({ where: { id } });
}

export async function createLocation(data: {
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbedUrl?: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
  order: number;
}) {
  return prisma.location.create({ data });
}

export async function updateLocation(
  id: string,
  data: Partial<{
    name: string;
    address: string;
    phone: string;
    hours: string;
    mapEmbedUrl: string;
    latitude: number;
    longitude: number;
  }>,
) {
  return prisma.location.update({ where: { id }, data });
}

export async function deleteLocation(id: string) {
  return prisma.location.delete({ where: { id } });
}

export async function clearAllPrimaryFlags() {
  await prisma.location.updateMany({ data: { isPrimary: false } });
}

export async function setLocationPrimary(id: string) {
  return prisma.location.update({ where: { id }, data: { isPrimary: true } });
}
