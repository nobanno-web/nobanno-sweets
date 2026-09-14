"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/errors/app.error";
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "@/features/products/validators/product.schema";
import {
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
} from "@/features/products/services/product.service";

async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
  }
  return session;
}

export const createProductAction = actionClient
  .schema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();

    const product = await createNewProduct(
      session.user.id,
      session.user.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR",
      parsedInput,
    );

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/menu");

    return { id: product.id };
  });

export const updateProductAction = actionClient
  .schema(updateProductSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();
    const { id, ...data } = parsedInput;

    await updateExistingProduct(
      session.user.id,
      session.user.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR",
      id,
      data,
    );

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/menu");

    return { success: true };
  });

export const deleteProductAction = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireSession();

    await deleteExistingProduct(
      session.user.id,
      session.user.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR",
      parsedInput.id,
    );

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/menu");

    return { success: true };
  });
