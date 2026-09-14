// src/features/products/components/edit-product-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { updateProductSchema } from "../validators/product.schema";
import { updateProductAction } from "../actions/product.action";
import type { Product } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export function EditProductForm({
  product,
  onSuccess,
}: {
  product: Product;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    updateProductAction,
    zodResolver(updateProductSchema),
    {
      formProps: {
        defaultValues: {
          id: product.id,
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          price: product.price,
          isBestseller: product.isBestseller,
          isSeasonal: product.isSeasonal,
          isFeatured: product.isFeatured,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Product updated");
          onSuccess();
          router.refresh();
        },
        onError: ({ error }) => {
          toast.error(error.serverError ?? "Something went wrong");
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
        <Label>Image</Label>
        <div className="mt-1.5">
          <ImageUploadField
            value={watch("imageUrl")}
            onChange={(url) => setValue("imageUrl", url, { shouldValidate: true })}
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

      <Button type="submit" disabled={action.isPending} className="w-full">
        {action.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}