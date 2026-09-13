// src/app/(admin)/error.tsx
"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function AdminError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <ShieldAlert className="h-10 w-10 text-destructive mb-3" />
      <h1 className="font-heading font-bold text-xl mb-1">Access Denied</h1>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm">
        {error.message || "You don't have permission to view this page."}
      </p>
      <Link
        href="/dashboard"
        className="bg-primary text-primary-foreground font-heading font-medium text-sm px-6 py-2.5 rounded-full"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}