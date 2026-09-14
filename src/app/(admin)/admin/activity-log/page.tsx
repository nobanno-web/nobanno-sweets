import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guards";
import { getActivityLogs } from "@/features/activity-log/services/activity-log.service";
import { formatAction } from "@/features/activity-log/action-labels";

export default async function ActivityLogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await requireAdmin();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { logs, totalPages } = await getActivityLogs(
    session.user.role as "ADMIN" | "EDITOR" | "CONTRIBUTOR",
    page,
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl mb-1">Activity Log</h1>
        <p className="text-muted-foreground text-sm">
          A record of content changes and member management across the admin panel.
        </p>
      </div>

      <div className="border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">When</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="font-medium">{log.user.name}</div>
                  <div className="text-muted-foreground text-xs">{log.user.email}</div>
                </td>
                <td className="px-4 py-3">{formatAction(log.action)}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(log.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 text-sm">
          {page > 1 && (
            <Link href={`?page=${page - 1}`} className="px-3 py-1.5 rounded-full border border-border">
              Previous
            </Link>
          )}
          <span className="text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={`?page=${page + 1}`} className="px-3 py-1.5 rounded-full border border-border">
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
