// src/components/nav.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { storeLocation, socialLinks } from "@/lib/dummy-data";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Menu", href: "/menu" },
  { label: "Our Favorite", href: "/#best-sellers" },
  { label: "Our Story", href: "/story" },
  { label: "Location", href: "/#visit-us" },
  { label: "Gallery", href: "/gallery" },
];

function subscribeNoop() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

export function Nav() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Top utility bar */}
      <div className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2 text-xs md:text-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/#visit-us"
              className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>
                Main Branch:{" "}
                {storeLocation.address.split(",").at(-2)?.trim() ?? "Gazipur"}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={socialLinks.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
            >
              <Globe className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="hidden sm:inline">
                facebook.com/nobannosweets
              </span>
            </a>
            <a
              href={`tel:${storeLocation.phone}`}
              className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="hidden sm:inline">{storeLocation.phone}</span>
            </a>
            <a
              href="mailto:hello@nabannosweets.com"
              className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="hidden sm:inline">nabannosweets@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-horizontal.png"
              alt="Nabanno Sweets"
              width={210}
              height={34}              
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-5 font-heading text-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 shrink-0">
            <button
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-full hover:bg-accent/20 transition-colors"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-1.5 rounded-full hover:bg-accent/20 transition-colors"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav className="md:hidden border-b border-border bg-background">
          <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1 font-heading text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
