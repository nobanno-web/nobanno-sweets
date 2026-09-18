// src/components/footer.tsx
import Image from "next/image";
import Link from "next/link";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import type { SiteSettings, Location } from "@/generated/prisma/client";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
];

export function Footer({
  settings,
  location,
}: {
  settings: SiteSettings | null;
  location: Location | null;
}) {
  return (
    <footer className="bg-foreground text-background pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 pb-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Image
            src="/logo-stacked.png"
            alt="Nobanno Sweets"
            width={140}
            height={95}
            unoptimized
            className="mb-4 w-[140px] h-[95px] object-contain"
          />
          <p className="text-background/70 text-sm max-w-xs leading-relaxed">
            Traditional Bengali mishti and snacks, handcrafted fresh every
            day.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-medium text-sm mb-3 text-background/90">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-background/70 text-sm hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-medium text-sm mb-3 text-background/90">
            Visit Us
          </h3>
          {location ? (
            <>
              <p className="text-background/70 text-sm mb-2 leading-relaxed">
                {location.address}
              </p>
              <a
                href={`tel:${location.phone}`}
                className="text-background/70 text-sm hover:text-background transition-colors block mb-1"
              >
                {location.phone}
              </a>
              <p className="text-background/50 text-xs">{location.hours}</p>
            </>
          ) : (
            <p className="text-background/50 text-sm">Details coming soon.</p>
          )}
        </div>

        <div>
          <h3 className="font-heading font-medium text-sm mb-3 text-background/90">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full border border-background/30 hover:bg-background/10 hover:border-background/60 transition-colors"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
            )}
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full border border-background/30 hover:bg-background/10 hover:border-background/60 transition-colors"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
            )}
            {settings?.youtubeUrl && (
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full border border-background/30 hover:bg-background/10 hover:border-background/60 transition-colors"
              >
                <SiYoutube className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-background/20">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-background/50 text-xs">
          <span>© {new Date().getFullYear()} Nobanno Sweets. All rights reserved.</span>
          <a
            href="mailto:tonoy.tech@gmail.com"
            className="hover:text-background/80 transition-colors"
          >
            Developed by Shafiul Anam
          </a>
        </div>
      </div>
    </footer>
  );
}
