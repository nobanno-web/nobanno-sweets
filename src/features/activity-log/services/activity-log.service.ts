import { AppError } from "@/errors/app.error";
import { listActivityLogs } from "@/features/activity-log/repositories/activity-log.repo";

type Role = "ADMIN" | "EDITOR" | "CONTRIBUTOR";

export async function getActivityLogs(role: Role, page: number = 1) {
  if (role !== "ADMIN") {
    throw new AppError("FORBIDDEN", "Only admins can view the activity log", 403);
  }
  return listActivityLogs(page);
}
