// src/features/locations/components/edit-location-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLocationSchema } from "../validators/location.schema";
import { updateLocationAction } from "../actions/location.action";
import { useRouter } from "next/navigation";
import type { Location } from "@/generated/prisma/client";

export function EditLocationForm({
  location,
  onSuccess,
}: {
  location: Location;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateLocationAction,
    zodResolver(updateLocationSchema),
    {
      formProps: {
        defaultValues: {
          id: location.id,
          name: location.name,
          address: location.address,
          phone: location.phone,
          hours: location.hours,
          mapEmbedUrl: location.mapEmbedUrl ?? "",
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Location updated");
          router.refresh();
          onSuccess();
        },
        onError: ({ error }) => toast.error(error.serverError ?? "Something went wrong"),
      },
    },
  );

  const { register, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Branch Name</Label>
        <Input id="name" {...register("name")} className="mt-1.5" />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} className="mt-1.5" />
        {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} className="mt-1.5" />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="hours">Hours</Label>
          <Input id="hours" {...register("hours")} className="mt-1.5" />
          {errors.hours && <p className="text-sm text-destructive mt-1">{errors.hours.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input id="latitude" type="number" step="any" {...register("latitude", { valueAsNumber: true })} className="mt-1.5" />
          {errors.latitude && <p className="text-sm text-destructive mt-1">{errors.latitude.message}</p>}
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input id="longitude" type="number" step="any" {...register("longitude", { valueAsNumber: true })} className="mt-1.5" />
          {errors.longitude && <p className="text-sm text-destructive mt-1">{errors.longitude.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="mapEmbedUrl">Google Maps Embed URL (optional)</Label>
        <Input id="mapEmbedUrl" {...register("mapEmbedUrl")} className="mt-1.5" />
        {errors.mapEmbedUrl && <p className="text-sm text-destructive mt-1">{errors.mapEmbedUrl.message}</p>}
      </div>

      <Button type="submit" disabled={action.isPending} className="w-full">
        {action.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}