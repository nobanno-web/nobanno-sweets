// src/components/admin/topbar.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MobileSidebar } from "./mobile-sidebar";

import { KeyRound, LogOut, Moon, Sun, User } from "lucide-react";
import Link from "next/link";

export function AdminTopbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <span className="font-heading font-semibold text-sm md:text-base">
          Admin Panel
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Toggle dark mode"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-accent/10 transition-colors"
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-border hover:bg-accent/10 transition-colors" />
            }
          >
            <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              {session?.user?.name ?? session?.user?.email}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="text-sm font-medium">
                  {session?.user?.email}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {session?.user?.role?.toLowerCase()}
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link href="/change-password" />}>
                <KeyRound className="h-4 w-4 mr-2" />
                Change Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}