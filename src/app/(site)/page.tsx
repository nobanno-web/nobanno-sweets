// src/app/page.tsx
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { OurCollection } from "@/components/our-collection";
import { BestSellers } from "@/components/best-sellers";
import { StoryTeaser } from "@/components/story-teaser";
import { VisitUs } from "@/components/visit-us";
import { HeroCarousel } from "@/components/hero-carousel";

export default function HomePage() {
  return (
    <>
      {/* <Hero /> */}
      <HeroCarousel />
      <OurCollection />
      <BestSellers />
      <VisitUs />
      <StoryTeaser />
    </>
  );
}