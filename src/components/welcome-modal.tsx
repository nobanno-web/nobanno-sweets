// src/components/welcome-modal.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { welcomeModal } from "@/lib/dummy-data";

let hasShownThisLoad = false;

export function WelcomeModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/" && welcomeModal.enabled && !hasShownThisLoad) {
      setOpen(true);
      hasShownThisLoad = true;
    }
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-2 border-foreground rounded-2xl [&>button]:bg-card [&>button]:rounded-full [&>button]:border-2 [&>button]:border-foreground [&>button]:opacity-100">
        <div className="relative w-full max-h-[75vh]">
          <Image
            src={welcomeModal.imageUrl}
            alt={welcomeModal.altText}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[75vh] object-contain"
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
