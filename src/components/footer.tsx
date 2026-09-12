// src/components/footer.tsx
import Image from "next/image";
import Link from "next/link";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { storeLocation } from "@/lib/dummy-data";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image
            src="/logo-stacked.png"
            alt="Nabanno Sweets"
            width={120}
            height={120}
            className="mb-3"
          />
          <p className="text-background/70 text-sm max-w-xs">
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
            Contact
          </h3>
          <p className="text-background/70 text-sm mb-2">
            {storeLocation.address}
          </p>
          <a
            href={`tel:${storeLocation.phone}`}
            className="text-background/70 text-sm hover:text-background transition-colors block mb-4"
          >
            {storeLocation.phone}
          </a>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full border border-background/30 hover:bg-background/10 transition-colors"
            >
              <SiFacebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full border border-background/30 hover:bg-background/10 transition-colors"
            >
              <SiInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="p-2 rounded-full border border-background/30 hover:bg-background/10 transition-colors"
            >
              <SiYoutube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/20">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-background/50 text-xs">
          © {new Date().getFullYear()} Nabanno Sweets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}