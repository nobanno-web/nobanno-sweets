// src/features/products/components/product-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { createProductSchema } from "../validators/product.schema";
import { createProductAction, updateProductAction } from "../actions/product.action";
import type { Product } from "@/generated/prisma/client";

export function ProductForm({
  product,
  onSuccess,
}: {
  product?: Product;
  onSuccess: () => void;
}) {
  const isEdit = !!product;
  const action = isEdit ? updateProductAction : createProductAction;
  const schema = isEdit ? createProductSchema.extend({ id: undefined }) : createProductSchema;

  const { form, action: formAction, handleSubmitWithAction } = useHookFormAction(
    action as typeof createProductAction,
    zodResolver(createProductSchema),
    {
      formProps: {
        defaultValues: product
          ? {
              name: product.name,
              description: product.description,
              imageUrl: product.imageUrl,
              price: product.price,
              isBestseller: product.isBestseller,
              isSeasonal: product.isSeasonal,
              isFeatured: product.isFeatured,
            }
          : {
              name: "",
              description: "",
              imageUrl: "",
              price: 0,
              isBestseller: false,
              isSeasonal: false,
              isFeatured: false,
            },
      },
      actionProps: {
        onSuccess: () => {
          toast.success(isEdit ? "Product updated" : "Product created");
          onSuccess();
        },
        onError: ({ error }) => {
          toast.error(error.serverError ?? "Something went wrong");
        },
      },
    },
  );

  const { register, formState: { errors }, watch, setValue } = form;
  const imageUrl = watch("imageUrl");

  function onSubmit(data: Parameters<typeof handleSubmitWithAction>) {
    if (isEdit) {
      (formAction.execute as (i: unknown) => void)({ ...data, id: product!.id });
    }
  }

  return (
    <form
      onSubmit={
        isEdit
          ? form.handleSubmit((data) =>
              (updateProductAction as unknown as { execute: (i: unknown) => void }).execute({
                ...data,
                id: product!.id,
              }),
            )
          : handleSubmitWithAction
      }
      className="space-y-4"
    >
      <div>
        <Label>Image</Label>
        <div className="mt-1.5">
          <ImageUploadField
            value={imageUrl}
            onChange={(url) => setValue("imageUrl", url)}
            folder="products"
          />
        </div>
        {errors.imageUrl && (
          <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} className="mt-1.5" />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...register("description")} className="mt-1.5" />
        {errors.description && (
          <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price (৳)</Label>
        <Input
          id="price"
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="mt-1.5"
        />
        {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={watch("isBestseller")}
            onCheckedChange={(v) => setValue("isBestseller", !!v)}
          />
          Bestseller
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={watch("isSeasonal")}
            onCheckedChange={(v) => setValue("isSeasonal", !!v)}
          />
          Seasonal
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={watch("isFeatured")}
            onCheckedChange={(v) => setValue("isFeatured", !!v)}
          />
          Featured (shows in Our Collection)
        </label>
      </div>

      <Button type="submit" disabled={formAction.isPending} className="w-full">
        {formAction.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
      </Button>
    </form>
  );
}