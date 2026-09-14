// src/components/welcome-modal.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { SiteSettings } from "@/generated/prisma/client";

export function WelcomeModal({ settings }: { settings: SiteSettings | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/" && settings?.welcomeModalEnabled && settings.welcomeModalImageUrl) {
      setOpen(true);
    }
  }, [pathname, settings]);

  if (!settings?.welcomeModalImageUrl) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:w-auto max-w-3xl p-0 overflow-hidden border-2 border-foreground rounded-2xl [&>button]:bg-card [&>button]:rounded-full [&>button]:border-2 [&>button]:border-foreground [&>button]:opacity-100">
        <div className="relative w-full max-h-[80vh] sm:max-h-[85vh]">
          <Image
            src={settings.welcomeModalImageUrl}
            alt={settings.welcomeModalAltText || "Announcement"}
            width={1600}
            height={1200}
            className="w-full h-auto max-h-[80vh] sm:max-h-[85vh] object-contain"
            priority
          />
        </div>
        <div className="p-4 flex justify-center">
          <button
            onClick={() => setOpen(false)}
            className="bg-primary text-primary-foreground font-heading font-medium text-sm px-6 py-2.5 rounded-full border-2 border-foreground hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}