"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { createHeroSlideSchema } from "../validators/hero-slide.schema";
import { createHeroSlideAction } from "../actions/hero-slide.action";
import { useRouter } from "next/navigation";

export function CreateHeroSlideForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createHeroSlideAction,
    zodResolver(createHeroSlideSchema),
    {
      formProps: {
        defaultValues: { imageUrl: "", headline: "", subtext: "", ctaLabel: "", ctaHref: "" },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Slide created");
          router.refresh();
          onSuccess();
        },
        onError: ({ error }) => toast.error(error.serverError ?? "Something went wrong"),
      },
    },
  );

  const { register, formState: { errors }, watch, setValue } = form;

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-4">
      <div>
        <Label>Image</Label>
        <div className="mt-1.5">
          <ImageUploadField
            value={watch("imageUrl")}
            onChange={(url) => setValue("imageUrl", url, { shouldValidate: true })}
            folder="hero-slides"
          />
        </div>
        {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
      </div>

      <div>
        <Label htmlFor="headline">Headline</Label>
        <Input id="headline" {...register("headline")} className="mt-1.5" />
        {errors.headline && <p className="text-sm text-destructive mt-1">{errors.headline.message}</p>}
      </div>

      <div>
        <Label htmlFor="subtext">Subtext</Label>
        <Input id="subtext" {...register("subtext")} className="mt-1.5" />
        {errors.subtext && <p className="text-sm text-destructive mt-1">{errors.subtext.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="ctaLabel">Button Text</Label>
          <Input id="ctaLabel" placeholder="View Menu" {...register("ctaLabel")} className="mt-1.5" />
          {errors.ctaLabel && <p className="text-sm text-destructive mt-1">{errors.ctaLabel.message}</p>}
        </div>
        <div>
          <Label htmlFor="ctaHref">Button Link</Label>
          <Input id="ctaHref" placeholder="/menu" {...register("ctaHref")} className="mt-1.5" />
          {errors.ctaHref && <p className="text-sm text-destructive mt-1">{errors.ctaHref.message}</p>}
        </div>
      </div>

      <Button type="submit" disabled={action.isPending} className="w-full">
        {action.isPending ? "Creating..." : "Create Slide"}
      </Button>
    </form>
  );
}
