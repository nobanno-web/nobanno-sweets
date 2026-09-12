// src/components/theme-provider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";
import { useEffect } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: Parameters<typeof console.error>) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Encountered a script tag while rendering")
      ) {
        return;
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}