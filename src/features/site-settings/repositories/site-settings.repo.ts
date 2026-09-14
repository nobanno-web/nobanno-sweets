import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "singleton";

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
}

export async function updateSiteSettings(data: Partial<{
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  welcomeModalEnabled: boolean;
  welcomeModalImageUrl: string;
  welcomeModalAltText: string;
  ownerName: string;
  ownerRole: string;
  ownerPhotoUrl: string;
  ownerBio: string;
}>) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    update: data,
    create: { id: SETTINGS_ID, ...data },
  });
}
