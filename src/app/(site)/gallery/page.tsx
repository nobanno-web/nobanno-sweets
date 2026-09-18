// src/app/(site)/gallery/page.tsx
import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { getAllGalleryImages } from "@/features/gallery/services/gallery.service";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look inside Nobanno Sweets — our shop, our sweets, and the moments we're proud of, Gazipur.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Nobanno Sweets",
    description: "A look inside Nobanno Sweets — our shop, our sweets, and the moments we're proud of.",
    url: "https://nobannosweets.com/gallery",
    siteName: "Nobanno Sweets",
    type: "website",
    locale: "en_BD",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Nobanno Sweets" }],
  },
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3">
          Gallery
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          A look inside our shop, our kitchen, and the sweets we make fresh
          every day.
        </p>
      </div>

      <GalleryGrid images={images} />
    </section>
  );
} 
