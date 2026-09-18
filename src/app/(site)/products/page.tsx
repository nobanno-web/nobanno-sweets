// src/app/(site)/products/page.tsx
import type { Metadata } from "next";
import { ProductsGrid } from "@/components/products-grid";
import { getAllProducts } from "@/features/products/services/product.service";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Browse our full range of handcrafted Bengali sweets and snacks — sandesh, rosogolla, and seasonal specialties made fresh in Gazipur.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Our Products | Nobanno Sweets",
    description: "Browse our full range of handcrafted Bengali sweets and snacks, made fresh in Gazipur.",
    url: "https://nobannosweets.com/products",
    siteName: "Nobanno Sweets",
    type: "website",
    locale: "en_BD",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Nobanno Sweets" }],
  },
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3">
          Our Products
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Every sweet, handcrafted fresh in-store — browse the full range.
        </p>
      </div>

      <ProductsGrid products={products} />
    </section>
  );
}