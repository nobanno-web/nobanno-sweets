// src/features/auth/components/login-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginSchema } from "../validators/auth.schema";
import { loginAction } from "../actions/auth.action";

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    loginAction,
    zodResolver(loginSchema),
    {
      formProps: {
        defaultValues: { email: "", password: "" },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Logged in successfully");
          window.location.href = "/dashboard";
        },
        onError: ({ error }) => {
          toast.error(error.serverError ?? "Invalid email or password");
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
        Welcome back
      </h1>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Sign in with your email and password to continue.
      </p>
      <form onSubmit={handleSubmitWithAction} className="space-y-5">
        <div>
          <Label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email Address <span className="text-primary">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="pl-10"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-semibold text-foreground">
            Password <span className="text-primary">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={action.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-xl"
        >
          {action.isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <p className="text-center text-xs text-muted-foreground mt-6">
        Lost access to your account? Contact an administrator to reset it.
      </p>
    </>
  );
}