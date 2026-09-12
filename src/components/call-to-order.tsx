// src/components/call-to-order.tsx
import { Phone } from "lucide-react";
import { storeLocation } from "@/lib/dummy-data";

export function CallToOrder() {
  return (
    <div className="bg-secondary text-secondary-foreground rounded-3xl px-6 py-8 md:py-10 text-center mt-14">
      <p className="text-sm md:text-base text-secondary-foreground/90 mb-4">
        Interested in any of these Product ?
      </p>
      <a
        href={`tel:${storeLocation.phone}`}
        className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-heading font-bold text-sm md:text-base px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        <Phone className="h-4 w-4" />
        Call us now to pre-Order · {storeLocation.phone}
      </a>
    </div>
  );
}