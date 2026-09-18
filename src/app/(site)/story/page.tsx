// src/app/(site)/story/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { getAllStoryBlocks } from "@/features/story/services/story-block.service";
import { getSettings } from "@/features/site-settings/services/site-settings.service";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Nobanno Sweets, Gazipur — from a family kitchen to a shop Kolkata-style Bengali sweets are made fresh, every day.",
};

export const dynamic = "force-dynamic";

export default async function StoryPage() {
  const [blocks, settings] = await Promise.all([getAllStoryBlocks(), getSettings()]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24 space-y-16 md:space-y-24">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3">
          Our Story
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Handcrafted sweets, made the same way, every single day.
        </p>
      </div>

      {blocks.map((block, i) => (
        <div
          key={block.id}
          className={`flex flex-col items-center gap-8 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
        >
          <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-foreground shrink-0">
            <Image src={block.imageUrl} alt={block.heading} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="font-heading font-medium text-xs tracking-[0.15em] uppercase text-primary">
              {block.eyebrow}
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl mt-2 mb-4">
              {block.heading}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {block.paragraph}
            </p>
          </div>
        </div>
      ))}

      {settings?.ownerName && settings?.ownerPhotoUrl && (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-foreground shrink-0">
            <Image src={settings.ownerPhotoUrl} alt={settings.ownerName} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="font-heading font-medium text-xs tracking-[0.15em] uppercase text-primary">
              Meet the Owner
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl mt-2 mb-1">
              {settings.ownerName}
            </h2>
            <p className="text-primary font-heading font-medium text-sm mb-4">
              {settings.ownerRole}
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {settings.ownerBio}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}