// src/features/locations/components/locations-table.tsx
"use client";

import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Trash2, Star } from "lucide-react";
import { can } from "@/lib/permissions";
import { EditLocationDialog } from "./edit-location-dialog";
import { deleteLocationAction, setPrimaryLocationAction } from "../actions/location.action";
import type { Location } from "@/generated/prisma/client";

export function LocationsTable({ locations }: { locations: Location[] }) {
  const { data: session } = useSession();
  const role = session?.user?.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR" | undefined;
  const canUpdate = role ? can(role, "content:update") : false;
  const canDelete = role ? can(role, "content:delete") : false;

  const deleteAction = useAction(deleteLocationAction, {
    onSuccess: () => toast.success("Location deleted"),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to delete"),
  });

  const primaryAction = useAction(setPrimaryLocationAction, {
    onSuccess: () => toast.success("Main branch updated"),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to update"),
  });

  function handleDelete(id: string, name: string) {
    if (confirm(`Delete "${name}"? This can't be undone.`)) {
      deleteAction.execute({ id });
    }
  }

  return (
    <div className="space-y-3">
      {locations.map((location) => (
        <div key={location.id} className="flex items-center gap-4 p-4 bg-card border-2 border-foreground rounded-2xl">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-sm">{location.name}</h3>
              {location.isPrimary && (
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  Main Branch
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-xs mt-0.5">{location.address}</p>
            <p className="text-muted-foreground text-xs">{location.phone} · {location.hours}</p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {canUpdate && !location.isPrimary && (
              <button
                onClick={() => primaryAction.execute({ id: location.id })}
                aria-label="Set as main branch"
                className="p-1.5 rounded-lg hover:bg-accent/10 text-muted-foreground"
                title="Set as Main Branch"
              >
                <Star className="h-4 w-4" />
              </button>
            )}
            {canUpdate && <EditLocationDialog location={location} />}
            {canDelete && (
              <button
                onClick={() => handleDelete(location.id, location.name)}
                aria-label="Delete location"
                className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}