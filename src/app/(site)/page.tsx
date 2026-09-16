// src/app/(site)/page.tsx
import { HeroCarousel } from "@/components/hero-carousel";
import { OurCollection } from "@/components/our-collection";
import { BestSellers } from "@/components/best-sellers";
import { VisitUs } from "@/components/visit-us";
import { StoryTeaser } from "@/components/story-teaser";
import { getAllHeroSlides } from "@/features/hero-slides/services/hero-slide.service";
import { getAllProducts } from "@/features/products/services/product.service";
import { getPrimaryLocationInfo } from "@/features/locations/services/location.service";
import { getAllShopStats } from "@/features/site-settings/services/shop-stat.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [heroSlides, products, primaryLocation, shopStats] = await Promise.all([
    getAllHeroSlides(),
    getAllProducts(),
    getPrimaryLocationInfo(),
    getAllShopStats(),
  ]);

  const bestSellers = products.filter((p) => p.isBestseller);
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <OurCollection products={featuredProducts} />
      <BestSellers products={bestSellers} />
      {primaryLocation && <VisitUs location={primaryLocation} />}
      <StoryTeaser stats={shopStats} />
    </>
  );
}