// src/features/members/actions/member.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { requireAdmin } from "@/lib/auth-guards";
import {
  createMemberSchema,
  updateMemberRoleSchema,
  setMemberActiveSchema,
} from "@/features/members/validators/member.schema";
import {
  createNewMember,
  changeMemberRole,
  toggleMemberActive,
} from "@/features/members/services/member.service";

export const createMemberAction = actionClient
  .schema(createMemberSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireAdmin();

    const { user, tempPassword } = await createNewMember(
      session.user.id,
      parsedInput,
    );

    revalidatePath("/admin/members");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      tempPassword,
    };
  });

export const updateMemberRoleAction = actionClient
  .schema(updateMemberRoleSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireAdmin();

    await changeMemberRole(session.user.id, parsedInput.userId, parsedInput.role);

    revalidatePath("/admin/members");
    return { success: true };
  });

export const setMemberActiveAction = actionClient
  .schema(setMemberActiveSchema)
  .action(async ({ parsedInput }) => {
    const session = await requireAdmin();

    await toggleMemberActive(
      session.user.id,
      parsedInput.userId,
      parsedInput.isActive,
    );

    revalidatePath("/admin/members");
    return { success: true };
  });
