// src/components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  GalleryHorizontal,
  MapPin,
  BookOpen,
  Settings,
  Users,
  ScrollText,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Hero Slides", href: "/admin/hero-slides", icon: ImageIcon },
  { label: "Gallery", href: "/admin/gallery", icon: GalleryHorizontal },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Story", href: "/admin/story", icon: BookOpen },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Activity Log", href: "/admin/activity-log", icon: ScrollText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-r border-border bg-card h-screen sticky top-0">
      <div className="h-16 flex items-center px-5 border-b border-border">
        <span className="font-heading font-bold text-lg text-primary">
          Nabanno Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}