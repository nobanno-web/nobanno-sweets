export const PERMISSIONS = {
  ADMIN: ["content:create", "content:read", "content:update", "content:delete", "members:manage"],
  EDITOR: ["content:create", "content:read", "content:update", "content:delete"],
  CONTRIBUTOR: ["content:create", "content:read"],
} as const;

type Role = keyof typeof PERMISSIONS;
type Permission = (typeof PERMISSIONS)[Role][number];

export function can(role: Role, action: Permission): boolean {
  return (PERMISSIONS[role] as readonly string[]).includes(action);
}
