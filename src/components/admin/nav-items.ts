// src/components/admin/nav-items.ts
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
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  adminOnly: boolean;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, adminOnly: false },
  { label: "Products", href: "/admin/products", icon: Package, adminOnly: false },
  { label: "Hero Slides", href: "/admin/hero-slides", icon: ImageIcon, adminOnly: false },
  { label: "Gallery", href: "/admin/gallery", icon: GalleryHorizontal, adminOnly: false },
  { label: "Locations", href: "/admin/locations", icon: MapPin, adminOnly: false },
  { label: "Story", href: "/admin/story", icon: BookOpen, adminOnly: false },
  { label: "Site Settings", href: "/admin/settings", icon: Settings, adminOnly: false },
  { label: "Members", href: "/admin/members", icon: Users, adminOnly: true },
  { label: "Activity Log", href: "/admin/activity-log", icon: ScrollText, adminOnly: true },
];

export function getVisibleNavItems(isAdmin: boolean): NavItem[] {
  return navItems.filter((item) => !item.adminOnly || isAdmin);
}