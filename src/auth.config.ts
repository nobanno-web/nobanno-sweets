// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute =
        nextUrl.pathname === "/dashboard" ||
        nextUrl.pathname.startsWith("/dashboard/") ||
        nextUrl.pathname.startsWith("/admin") ||
        nextUrl.pathname === "/change-password";

      if (nextUrl.pathname === "/login" && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (!isProtectedRoute) {
        return true; 
      }

      if (!isLoggedIn) {
        return false;
      }

      if (auth.user.mustChangePassword && nextUrl.pathname !== "/change-password") {
        return Response.redirect(new URL("/change-password", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;