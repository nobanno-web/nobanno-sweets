"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Plus, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { can } from "@/lib/permissions";
import {
  createShopStatAction,
  updateShopStatAction,
  deleteShopStatAction,
} from "../actions/shop-stat.action";
import type { ShopStat } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export function ShopStatsManager({ stats }: { stats: ShopStat[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR" | undefined;
  const canWrite = role ? can(role, "content:update") : false;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ label: "", value: "" });
  const [adding, setAdding] = useState(false);

  const createAction = useAction(createShopStatAction, {
    onSuccess: () => {
      toast.success("Stat added");
      router.refresh();
      setAdding(false);
      setDraft({ label: "", value: "" });
    },
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to add"),
  });

  const updateAction = useAction(updateShopStatAction, {
    onSuccess: () => {
      toast.success("Stat updated");
      router.refresh();
      setEditingId(null);
    },
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to update"),
  });

  const deleteAction = useAction(deleteShopStatAction, {
    onSuccess: () => {
      toast.success("Stat deleted");
      router.refresh();
    },
    onError: ({ error }) => toast.error(error.serverError ?? "Failed to delete"),
  });

  return (
    <div>
      <h2 className="font-heading font-bold text-base mb-4">Shop Stats</h2>
      <div className="space-y-2">
        {stats.map((stat) =>
          editingId === stat.id ? (
            <div key={stat.id} className="flex items-center gap-2">
              <Input
                value={draft.value}
                onChange={(e) => setDraft({ ...draft, value: e.target.value })}
                placeholder="100+"
                className="w-24"
              />
              <Input
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                placeholder="Varieties"
                className="flex-1"
              />
              <button
                onClick={() => updateAction.execute({ id: stat.id, ...draft })}
                className="p-1.5 rounded-lg hover:bg-accent/10 text-primary"
              >
                <Check className="h-4 w-4" />
              </button>
              <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg hover:bg-accent/10">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div key={stat.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-xl">
              <div>
                <span className="font-heading font-bold text-primary mr-2">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              {canWrite && (
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingId(stat.id);
                      setDraft({ label: stat.label, value: stat.value });
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground px-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirm("Delete this stat?") && deleteAction.execute({ id: stat.id })}
                    className="p-1 text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ),
        )}

        {adding ? (
          <div className="flex items-center gap-2">
            <Input
              value={draft.value}
              onChange={(e) => setDraft({ ...draft, value: e.target.value })}
              placeholder="100+"
              className="w-24"
            />
            <Input
              value={draft.label}
              onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              placeholder="Varieties"
              className="flex-1"
            />
            <button
              onClick={() => createAction.execute(draft)}
              className="p-1.5 rounded-lg hover:bg-accent/10 text-primary"
            >
              <Check className="h-4 w-4" />
            </button>
            <button onClick={() => setAdding(false)} className="p-1.5 rounded-lg hover:bg-accent/10">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          canWrite && (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-1.5 text-sm text-primary font-medium mt-2"
            >
              <Plus className="h-4 w-4" />
              Add Stat
            </button>
          )
        )}
      </div>
    </div>
  );
}
