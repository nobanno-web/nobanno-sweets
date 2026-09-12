// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [], // intentionally empty — Credentials/Prisma lives only in auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const publicRoutes = ["/", "/login"];
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isChangePasswordRoute = nextUrl.pathname === "/change-password";

      if (nextUrl.pathname === "/login" && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isPublicRoute) {
        return true;
      }

      if (!isLoggedIn) {
        return false;
      }

      if (auth.user.mustChangePassword && !isChangePasswordRoute) {
        return Response.redirect(new URL("/change-password", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;