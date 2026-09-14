"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { updateSiteSettingsSchema } from "../validators/site-settings.schema";
import { updateSiteSettingsAction } from "../actions/site-settings.action";
import type { SiteSettings } from "@/generated/prisma/client";

export function SiteSettingsForm({ settings }: { settings: SiteSettings | null }) {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateSiteSettingsAction,
    zodResolver(updateSiteSettingsSchema),
    {
      formProps: {
        defaultValues: {
          facebookUrl: settings?.facebookUrl ?? "",
          instagramUrl: settings?.instagramUrl ?? "",
          youtubeUrl: settings?.youtubeUrl ?? "",
          welcomeModalEnabled: settings?.welcomeModalEnabled ?? false,
          welcomeModalImageUrl: settings?.welcomeModalImageUrl ?? "",
          welcomeModalAltText: settings?.welcomeModalAltText ?? "",
          ownerName: settings?.ownerName ?? "",
          ownerRole: settings?.ownerRole ?? "",
          ownerPhotoUrl: settings?.ownerPhotoUrl ?? "",
          ownerBio: settings?.ownerBio ?? "",
        },
      },
      actionProps: {
        onSuccess: () => toast.success("Settings saved"),
        onError: ({ error }) => toast.error(error.serverError ?? "Something went wrong"),
      },
    },
  );

  const { register, formState: { errors }, watch, setValue } = form;

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-8">
      {/* Social Links */}
      <section>
        <h2 className="font-heading font-bold text-base mb-4">Social Links</h2>
        <div className="space-y-3">
          <div>
            <Label htmlFor="facebookUrl">Facebook URL</Label>
            <Input id="facebookUrl" placeholder="https://facebook.com/..." {...register("facebookUrl")} className="mt-1.5" />
            {errors.facebookUrl && <p className="text-sm text-destructive mt-1">{errors.facebookUrl.message}</p>}
          </div>
          <div>
            <Label htmlFor="instagramUrl">Instagram URL</Label>
            <Input id="instagramUrl" placeholder="https://instagram.com/..." {...register("instagramUrl")} className="mt-1.5" />
            {errors.instagramUrl && <p className="text-sm text-destructive mt-1">{errors.instagramUrl.message}</p>}
          </div>
          <div>
            <Label htmlFor="youtubeUrl">YouTube URL</Label>
            <Input id="youtubeUrl" placeholder="https://youtube.com/@..." {...register("youtubeUrl")} className="mt-1.5" />
            {errors.youtubeUrl && <p className="text-sm text-destructive mt-1">{errors.youtubeUrl.message}</p>}
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* Welcome Modal */}
      <section>
        <h2 className="font-heading font-bold text-base mb-4">Welcome Modal</h2>
        <label className="flex items-center gap-2 text-sm mb-4">
          <Checkbox
            checked={watch("welcomeModalEnabled")}
            onCheckedChange={(v) => setValue("welcomeModalEnabled", !!v)}
          />
          Show welcome modal on homepage
        </label>

        <div>
          <Label>Modal Image</Label>
          <div className="mt-1.5">
            <ImageUploadField
              value={watch("welcomeModalImageUrl") ?? ""}
              onChange={(url) => setValue("welcomeModalImageUrl", url, { shouldValidate: true })}
              folder="welcome-modal"
            />
          </div>
        </div>

        <div className="mt-3">
          <Label htmlFor="welcomeModalAltText">Image Description</Label>
          <Input id="welcomeModalAltText" {...register("welcomeModalAltText")} className="mt-1.5" />
        </div>
      </section>

      <hr className="border-border" />

      {/* Owner */}
      <section>
        <h2 className="font-heading font-bold text-base mb-4">Owner</h2>
        <div>
          <Label>Owner Photo</Label>
          <div className="mt-1.5">
            <ImageUploadField
              value={watch("ownerPhotoUrl") ?? ""}
              onChange={(url) => setValue("ownerPhotoUrl", url, { shouldValidate: true })}
              folder="owner"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <Label htmlFor="ownerName">Name</Label>
            <Input id="ownerName" {...register("ownerName")} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="ownerRole">Role</Label>
            <Input id="ownerRole" placeholder="Founder, Nabanno Sweets" {...register("ownerRole")} className="mt-1.5" />
          </div>
        </div>

        <div className="mt-3">
          <Label htmlFor="ownerBio">Bio (3-4 lines)</Label>
          <textarea
            id="ownerBio"
            rows={4}
            {...register("ownerBio")}
            className="mt-1.5 w-full border-2 border-foreground rounded-xl px-3 py-2 bg-background text-sm"
          />
        </div>
      </section>

      <Button type="submit" disabled={action.isPending} className="w-full">
        {action.isPending ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
