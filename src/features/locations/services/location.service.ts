import { can } from "@/lib/permissions";
import { logActivity } from "@/lib/activity-log";
import { AppError } from "@/errors/app.error";
import {
  listLocations,
  countLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  clearAllPrimaryFlags,
  setLocationPrimary,
} from "@/features/locations/repositories/location.repo";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";
type LocationInput = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbedUrl?: string;
  latitude: number;
  longitude: number;
};

export async function getAllLocations() {
  return listLocations();
}

export async function addLocation(actingUserId: string, role: Role, input: LocationInput) {
  if (!can(role, "content:create")) {
    throw new AppError("FORBIDDEN", "You don't have permission to add locations", 403);
  }

  const count = await countLocations();
  // First location created is automatically primary — there's always exactly one
  const location = await createLocation({ ...input, isPrimary: count === 0, order: count });

  await logActivity({
    userId: actingUserId,
    action: "location:create",
    targetType: "Location",
    targetId: location.id,
    metadata: { name: location.name },
  });

  return location;
}

export async function editLocation(actingUserId: string, role: Role, id: string, input: LocationInput) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to edit locations", 403);
  }

  const existing = await getLocationById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Location not found", 404);
  }

  const updated = await updateLocation(id, input);

  await logActivity({
    userId: actingUserId,
    action: "location:update",
    targetType: "Location",
    targetId: id,
    metadata: { name: updated.name },
  });

  return updated;
}

export async function removeLocation(actingUserId: string, role: Role, id: string) {
  if (!can(role, "content:delete")) {
    throw new AppError("FORBIDDEN", "You don't have permission to delete locations", 403);
  }

  const existing = await getLocationById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Location not found", 404);
  }

  const total = await countLocations();
  if (total <= 1) {
    throw new AppError("FORBIDDEN", "At least one location must remain", 400);
  }

  await deleteLocation(id);

  // If we just deleted the primary branch, promote the oldest remaining one
  if (existing.isPrimary) {
    const remaining = await listLocations();
    if (remaining[0]) {
      await setLocationPrimary(remaining[0].id);
    }
  }

  await logActivity({
    userId: actingUserId,
    action: "location:delete",
    targetType: "Location",
    targetId: id,
    metadata: { name: existing.name },
  });

  return existing;
}

export async function makeLocationPrimary(actingUserId: string, role: Role, id: string) {
  if (!can(role, "content:update")) {
    throw new AppError("FORBIDDEN", "You don't have permission to change the main branch", 403);
  }

  const existing = await getLocationById(id);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Location not found", 404);
  }

  await clearAllPrimaryFlags();
  await setLocationPrimary(id);

  await logActivity({
    userId: actingUserId,
    action: "location:set_primary",
    targetType: "Location",
    targetId: id,
    metadata: { name: existing.name },
  });

  return existing;
}
