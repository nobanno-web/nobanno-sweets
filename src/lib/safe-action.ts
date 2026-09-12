import { createSafeActionClient } from "next-safe-action";
import { AppError } from "@/errors/app.error";
import { AuthError } from "next-auth";

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof AppError) return error.message;
    if (error instanceof AuthError) return "Invalid email or password";
    console.error("[Action Error]", error);
    return "Something went wrong";
  },
});
