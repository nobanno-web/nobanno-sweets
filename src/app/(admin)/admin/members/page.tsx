// src/app/(admin)/admin/members/page.tsx
import { requireAdmin } from "@/lib/auth-guards";
import { listMembers } from "@/features/members/repositories/member.repo";
import { MembersTable } from "@/features/members/components/members-table";
import { CreateMemberDialog } from "@/features/members/components/create-member-dialog";

export default async function MembersPage() {
  await requireAdmin(); // redundant with middleware role-checks we'll add, but safe defense-in-depth

  const members = await listMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl mb-1">Members</h1>
          <p className="text-muted-foreground text-sm">
            Manage who has access to the admin panel.
          </p>
        </div>
        <CreateMemberDialog />
      </div>

      <MembersTable members={members} />
    </div>
  );
}