import { can } from "@/lib/permissions";
import { deleteR2Object } from "@/lib/delete-r2-object";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import { getSiteSettings, updateSiteSettings } from "@/features/site-settings/repositories/site-settings.repo";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";
type SettingsInput = {
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  contactEmail?: string;
  welcomeModalEnabled: boolean;
  welcomeModalImageUrl?: string;
  welcomeModalAltText?: string;
  ownerName?: string;
  ownerRole?: string;
  ownerPhotoUrl?: string;
  ownerBio?: string;
};

export async function getSettings() {
  return getSiteSettings();
}

export async function editSiteSettings(actingUserId: string, role: Role, input: SettingsInput) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to edit site settings", 403);
  }

  const existing = await getSiteSettings();
  const updated = await updateSiteSettings(input);

  // Clean up replaced images in R2
  if (existing?.welcomeModalImageUrl && existing.welcomeModalImageUrl !== input.welcomeModalImageUrl) {
    await deleteR2Object(existing.welcomeModalImageUrl);
  }
  if (existing?.ownerPhotoUrl && existing.ownerPhotoUrl !== input.ownerPhotoUrl) {
    await deleteR2Object(existing.ownerPhotoUrl);
  }

  await logActivity({
    userId: actingUserId,
    action: "site-settings:update",
    targetType: "SiteSettings",
    targetId: updated.id,
  });

  return updated;
}
