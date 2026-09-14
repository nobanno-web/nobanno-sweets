// src/features/members/components/create-member-dialog.tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { UserPlus, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createMemberSchema } from "../validators/member.schema";
import { createMemberAction } from "../actions/member.action";
import { useRouter } from "next/navigation";

export function CreateMemberDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState<{ email: string; tempPassword: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createMemberAction,
    zodResolver(createMemberSchema),
    {
      formProps: {
        defaultValues: { name: "", email: "", role: "CONTRIBUTOR" as const },
      },
      actionProps: {
        onSuccess: ({ data }) => {
          if (data) {
            router.refresh();
            setCreated({ email: data.email, tempPassword: data.tempPassword });
            form.reset();
          }
        },
        onError: ({ error }) => {
          toast.error(error.serverError ?? "Could not create member");
        },
      },
    },
  );

  const { register, formState: { errors }, watch, setValue } = form;
  const role = watch("role");

  function handleCopy() {
    if (!created) return;
    navigator.clipboard.writeText(created.tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClose() {
    setOpen(false);
    setCreated(null);
    setCopied(false);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : handleClose())}>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <UserPlus className="h-4 w-4" />
        Add Member
      </Button>

      <DialogContent className="max-w-sm">
        {created ? (
          <div>
            <h2 className="font-heading font-bold text-lg mb-1">Member Created</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Share this temporary password with {created.email} yourself —
              it won&apos;t be shown again.
            </p>

            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5 mb-4">
              <code className="flex-1 text-sm font-mono">{created.tempPassword}</code>
              <button
                onClick={handleCopy}
                aria-label="Copy password"
                className="p-1.5 rounded-lg hover:bg-accent/20 transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Add Member</h2>
            <form onSubmit={handleSubmitWithAction} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} className="mt-1.5" />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} className="mt-1.5" />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label>Role</Label>
                <Select value={role} onValueChange={(v) => setValue("role", v as typeof role)}>
                  <SelectTrigger className="mt-1.5 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="EDITOR">Editor</SelectItem>
                    <SelectItem value="CONTRIBUTOR">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={action.isPending} className="w-full">
                {action.isPending ? "Creating..." : "Create Member"}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}