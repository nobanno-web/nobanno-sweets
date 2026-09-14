import { getAllLocations } from "@/features/locations/services/location.service";
import { LocationsTable } from "@/features/locations/components/locations-table";
import { CreateLocationDialog } from "@/features/locations/components/create-location-dialog";

export default async function AdminLocationsPage() {
  const locations = await getAllLocations();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl mb-1">Locations</h1>
          <p className="text-muted-foreground text-sm">
            Manage your branches. The Main Branch shows in the nav and homepage.
          </p>
        </div>
        <CreateLocationDialog />
      </div>

      <LocationsTable locations={locations} />
    </div>
  );
}
