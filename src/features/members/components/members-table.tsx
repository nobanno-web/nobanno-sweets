// src/features/members/components/members-table.tsx
"use client";

import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateMemberRoleAction, setMemberActiveAction } from "../actions/member.action";
import type { Role } from "@/generated/prisma/client";

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
};

export function MembersTable({ members }: { members: Member[] }) {
  const { data: session } = useSession();

  const roleAction = useAction(updateMemberRoleAction, {
    onSuccess: () => toast.success("Role updated"),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to update role"),
  });

  const activeAction = useAction(setMemberActiveAction, {
    onSuccess: () => toast.success("Member updated"),
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to update member"),
  });

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Active</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const isSelf = member.id === session?.user?.id;

            return (
              <tr key={member.id} className="border-t border-border">
                <td className="px-4 py-3">
                  {member.name}
                  {isSelf && (
                    <span className="text-xs text-muted-foreground ml-1.5">(you)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{member.email}</td>
                <td className="px-4 py-3">
                  <Select
                    defaultValue={member.role}
                    disabled={isSelf}
                    onValueChange={(v) =>
                      roleAction.execute({ userId: member.id, role: v as Role })
                    }
                  >
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="EDITOR">Editor</SelectItem>
                      <SelectItem value="CONTRIBUTOR">Contributor</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  {member.mustChangePassword ? (
                    <span className="text-xs text-muted-foreground">Pending first login</span>
                  ) : (
                    <span className="text-xs text-primary">Active</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    disabled={isSelf}
                    onClick={() =>
                      activeAction.execute({ userId: member.id, isActive: !member.isActive })
                    }
                    className={`text-xs font-medium px-3 py-1 rounded-full border disabled:opacity-40 disabled:cursor-not-allowed ${
                      member.isActive
                        ? "border-border text-foreground"
                        : "border-destructive text-destructive"
                    }`}
                  >
                    {member.isActive ? "Deactivate" : "Reactivate"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}