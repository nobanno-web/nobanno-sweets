// src/features/auth/components/change-password-form.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { changePasswordSchema } from "../validators/auth.schema";
import { changePasswordAction } from "../actions/auth.action";

export default function ChangePasswordForm() {
  const router = useRouter();
  const { update } = useSession();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    changePasswordAction,
    zodResolver(changePasswordSchema),
    {
      formProps: {
        defaultValues: { newPassword: "" },
      },
      actionProps: {
        onSuccess: async () => {
          toast.success("Password updated");
          await update({ mustChangePassword: false });
          router.refresh();
          router.push("/dashboard");
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
  } = form;

  return (
    <>
      <h1 className="text-center text-xl font-bold text-foreground mb-1">
        Set a New Password
      </h1>
      <p className="text-center text-sm text-muted-foreground mb-6">
        You&apos;re using a temporary password. Please set your own before
        continuing.
      </p>
      <form onSubmit={handleSubmitWithAction} className="space-y-5">
        <div>
          <Label htmlFor="newPassword" className="text-sm font-semibold text-foreground">
            New Password <span className="text-primary">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="newPassword"
              type="password"
              placeholder="At least 8 characters"
              className="pl-10"
              {...register("newPassword")}
            />
          </div>
          {errors.newPassword && (
            <p className="text-sm text-destructive mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={action.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-xl"
        >
          {action.isPending ? "Saving..." : "Save Password"}
        </Button>
      </form>
    </>
  );
}