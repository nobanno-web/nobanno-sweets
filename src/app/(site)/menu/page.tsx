// src/app/menu/page.tsx
import type { Metadata } from "next";
import { MenuList } from "@/components/menu-list";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Full menu of handcrafted Bengali sweets and snacks at Nabanno Sweets, Gazipur — prices and descriptions for every item.",
};

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3">
          Our Menu
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Every item handcrafted fresh in-store. Prices may vary by season.
        </p>
      </div>

      <MenuList />
    </section>
  );
}