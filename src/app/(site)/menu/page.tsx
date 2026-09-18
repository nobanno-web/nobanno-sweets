// src/app/(site)/menu/page.tsx
import type { Metadata } from "next";
import { MenuList } from "@/components/menu-list";
import { getAllProducts } from "@/features/products/services/product.service";

export const metadata: Metadata = {
  title: "Menu & Prices",
  description: "See prices for all our Bengali sweets and snacks at Nobanno Sweets, Gazipur — updated daily.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu & Prices | Nobanno Sweets",
    description: "See prices for all our Bengali sweets and snacks at Nobanno Sweets, Gazipur.",
    url: "https://nobannosweets.com/menu",
    siteName: "Nobanno Sweets",
    type: "website",
    locale: "en_BD",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Nobanno Sweets" }],
  },
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const products = await getAllProducts();

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

      <MenuList products={products} />
    </section>
  );
} 