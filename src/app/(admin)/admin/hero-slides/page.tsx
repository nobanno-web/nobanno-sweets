// src/app/(admin)/admin/hero-slides/page.tsx
import { getAllHeroSlides } from "@/features/hero-slides/services/hero-slide.service";
import { HeroSlidesList } from "@/features/hero-slides/components/hero-slides-list";
import { CreateHeroSlideDialog } from "@/features/hero-slides/components/create-hero-slide-dialog";

export default async function AdminHeroSlidesPage() {
  const slides = await getAllHeroSlides();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl mb-1">Hero Slides</h1>
          <p className="text-muted-foreground text-sm">
            Manage the rotating slides on your homepage.
          </p>
        </div>
        <CreateHeroSlideDialog />
      </div>

      <HeroSlidesList slides={slides} />
    </div>
  );
}