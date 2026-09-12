import { Prisma } from "@/generated/prisma/client";
import { AppError } from "@/errors/app.error";

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = error.meta?.target;
        const field = Array.isArray(target)
          ? target.join(", ")
          : typeof target === "string"
            ? target
            : "unknown field";
        throw new AppError("CONFLICT", `${field} already exists`, 409);
      }
      case "P2025": {
        throw new AppError("NOT_FOUND", "Record not found", 404);
      }
      case "P2003": {
        throw new AppError(
          "INVALID_REFERENCE",
          "Related record does not exist",
          400,
        );
      }
      case "P2014": {
        throw new AppError(
          "INVALID_REFERENCE",
          "Relation violation: required relation missing",
          400,
        );
      }
      case "P2016": {
        throw new AppError("DB_ERROR", "Query interpretation error", 400);
      }
      case "P2021": {
        throw new AppError(
          "DB_ERROR",
          "Table does not exist in the database",
          500,
        );
      }
      case "P2022": {
        throw new AppError(
          "DB_ERROR",
          "Column does not exist in the database",
          500,
        );
      }
      default: {
        console.error("[Prisma Error]", error);
        throw new AppError(
          "DB_ERROR",
          `Unexpected database error (code: ${error.code})`,
          500,
        );
      }
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new AppError("VALIDATION_ERROR", "Invalid data provided to DB", 400);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new AppError(
      "DB_CONNECTION_ERROR",
      "Failed to connect to the database",
      503,
    );
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new AppError(
      "DB_ERROR",
      "A critical database engine error occurred",
      500,
    );
  }

  console.error("[Unexpected Prisma Error]", error);
  throw new AppError("INTERNAL_ERROR", "Something went wrong", 500);
}
