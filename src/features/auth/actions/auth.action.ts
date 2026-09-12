// src/features/auth/actions/auth.action.ts
"use server";

import { actionClient } from "@/lib/safe-action";
import { signIn, auth } from "@/auth";
import { AppError } from "@/errors/app.error";
import {
  loginSchema,
  changePasswordSchema,
} from "@/features/auth/validators/auth.schema";
import { changePassword } from "@/features/auth/services/auth.service";

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    await signIn("credentials", {
      email: parsedInput.email,
      password: parsedInput.password,
      redirect: false,
    });

    return { success: true };
  });

export const changePasswordAction = actionClient
  .schema(changePasswordSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    if (!session?.user) {
      throw new AppError("UNAUTHORIZED", "Not authenticated", 401);
    }

    await changePassword(session.user.id, parsedInput.newPassword);

    return { success: true };
  });
