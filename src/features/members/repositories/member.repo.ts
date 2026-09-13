// src/features/members/repositories/member.repo.ts
import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/client";

export async function listMembers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      createdAt: true,
    },
  });
}

export async function createMember(data: {
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
}) {
  return prisma.user.create({ data });
}

export async function updateMemberRole(userId: string, role: Role) {
  return prisma.user.update({ where: { id: userId }, data: { role } });
}

export async function setMemberActive(userId: string, isActive: boolean) {
  return prisma.user.update({ where: { id: userId }, data: { isActive } });
}

export async function getMemberByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}