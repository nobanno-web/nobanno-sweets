// src/features/gallery/components/create-gallery-image-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { createGalleryImageSchema } from "../validators/gallery.schema";
import { createGalleryImageAction } from "../actions/gallery.action";

export function CreateGalleryImageForm({ onSuccess }: { onSuccess: () => void }) {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createGalleryImageAction,
    zodResolver(createGalleryImageSchema),
    {
      formProps: {
        defaultValues: { imageUrl: "", altText: "" },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Photo added");
          onSuccess();
        },
        onError: ({ error }) => {
          toast.error(error.serverError ?? "Could not add photo");
        },
      },
    },
  );

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-4">
      <div>
        <Label>Photo</Label>
        <div className="mt-1.5">
          <ImageUploadField
            value={watch("imageUrl")}
            onChange={(url) => setValue("imageUrl", url, { shouldValidate: true })}
            folder="gallery"
          />
        </div>
        {errors.imageUrl && (
          <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="altText">Description (for accessibility)</Label>
        <Input
          id="altText"
          placeholder="e.g. Fresh sandesh being shaped by hand"
          {...register("altText")}
          className="mt-1.5"
        />
        {errors.altText && (
          <p className="text-sm text-destructive mt-1">{errors.altText.message}</p>
        )}
      </div>

      <Button type="submit" disabled={action.isPending} className="w-full">
        {action.isPending ? "Uploading..." : "Add Photo"}
      </Button>
    </form>
  );
}