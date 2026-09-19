// src/app/(admin)/dashboard/page.tsx
import Link from "next/link";
import { auth } from "@/auth";
import {
  Image as ImageIcon,
  UtensilsCrossed,
  Images,
  BookOpen,
  MapPin,
  Settings,
  Users,
  ScrollText,
} from "lucide-react";

const adminSections = [
  {
    label: "Products",
    href: "/admin/products",
    description: "Manage your sweets and snacks",
    icon: UtensilsCrossed,
  },
  {
    label: "Hero Slides",
    href: "/admin/hero-slides",
    description: "Homepage banner images",
    icon: ImageIcon,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    description: "Shop photo gallery",
    icon: Images,
  },
  {
    label: "Our Story",
    href: "/admin/story",
    description: "Story page content blocks",
    icon: BookOpen,
  },
  {
    label: "Locations",
    href: "/admin/locations",
    description: "Shop address, hours, phone",
    icon: MapPin,
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    description: "Social links, contact info",
    icon: Settings,
  },
  {
    label: "Members",
    href: "/admin/members",
    description: "Staff accounts & roles",
    icon: Users,
  },
  {
    label: "Activity Log",
    href: "/admin/activity-log",
    description: "Recent admin actions",
    icon: ScrollText,
  },
];

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="max-w-5xl">
      <h1 className="font-heading font-bold text-2xl mb-1">
        Welcome back, {session?.user?.name}
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        {session?.user?.email} ·{" "}
        <span className="capitalize">
          {session?.user?.role?.toLowerCase()}
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary hover:shadow-sm transition-all"
          >
            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
              <section.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-sm">{section.label}</h2>
              <p className="text-muted-foreground text-xs mt-0.5">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}