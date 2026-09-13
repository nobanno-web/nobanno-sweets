// src/app/(admin)/dashboard/page.tsx
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl mb-1">
        Welcome back, {session?.user?.name}
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        {session?.user?.email} ·{" "}
        <span className="capitalize">
          {session?.user?.role?.toLowerCase()}
        </span>
      </p>

      <p className="text-muted-foreground">
        Pick a section from the sidebar to get started.
      </p>
    </div>
  );
}