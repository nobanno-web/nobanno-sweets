// src/features/story/components/edit-story-block-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { updateStoryBlockSchema } from "../validators/story-block.schema";
import { updateStoryBlockAction } from "../actions/story-block.action";
import type { StoryBlock } from "@/generated/prisma/client";

export function EditStoryBlockForm({
  block,
  onSuccess,
}: {
  block: StoryBlock;
  onSuccess: () => void;
}) {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateStoryBlockAction,
    zodResolver(updateStoryBlockSchema),
    {
      formProps: {
        defaultValues: {
          id: block.id,
          eyebrow: block.eyebrow,
          heading: block.heading,
          paragraph: block.paragraph,
          imageUrl: block.imageUrl,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Story block updated");
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
            folder="story"
          />
        </div>
        {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
      </div>

      <div>
        <Label htmlFor="eyebrow">Eyebrow Label</Label>
        <Input id="eyebrow" {...register("eyebrow")} className="mt-1.5" />
        {errors.eyebrow && <p className="text-sm text-destructive mt-1">{errors.eyebrow.message}</p>}
      </div>

      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input id="heading" {...register("heading")} className="mt-1.5" />
        {errors.heading && <p className="text-sm text-destructive mt-1">{errors.heading.message}</p>}
      </div>

      <div>
        <Label htmlFor="paragraph">Paragraph</Label>
        <textarea
          id="paragraph"
          rows={4}
          {...register("paragraph")}
          className="mt-1.5 w-full border-2 border-foreground rounded-xl px-3 py-2 bg-background text-sm"
        />
        {errors.paragraph && <p className="text-sm text-destructive mt-1">{errors.paragraph.message}</p>}
      </div>

      <Button type="submit" disabled={action.isPending} className="w-full">
        {action.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}