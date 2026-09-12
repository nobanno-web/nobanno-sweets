// src/app/story/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { owner } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Nabanno Sweets, Gazipur — from a family kitchen to a shop Kolkata-style Bengali sweets are made fresh, every day.",
};

export default function StoryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24 space-y-16 md:space-y-24">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-3">
          Our Story
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Two decades of handcrafted sweets, made the same way since day one.
        </p>
      </div>

      {/* Block 1: image left, text right */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-foreground shrink-0">
          <Image
            src="https://picsum.photos/seed/story-kitchen/800/600"
            alt="Nabanno Sweets family kitchen"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <span className="font-heading font-medium text-xs tracking-[0.15em] uppercase text-primary">
            How We Began
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl mt-2 mb-4">
            A family kitchen, one recipe at a time
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            What started as a small family kitchen making sweets for
            neighbours and relatives slowly grew into something more. Every
            recipe was passed down, tested, and perfected over years — long
            before Nabanno Sweets ever had a storefront. That same care is
            still what goes into every batch we make today.
          </p>
        </div>
      </div>

      {/* Block 2: text left, image right */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
        <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-foreground shrink-0">
          <Image
            src="https://picsum.photos/seed/story-shop/800/600"
            alt="Nabanno Sweets shop today"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <span className="font-heading font-medium text-xs tracking-[0.15em] uppercase text-primary">
            Our Craft Today
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl mt-2 mb-4">
            Fresh every morning, no shortcuts
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Nothing sits on our shelves for more than a day. Our sandesh,
            rosogolla, and seasonal specialties are all made fresh in-store,
            every morning — the same recipes, the same care, just at a scale
            that lets more people enjoy them. Come by and taste the
            difference for yourself.
          </p>
        </div>
      </div>
      {/* owner block  */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-foreground shrink-0">
          <Image
            src={owner.photoUrl}
            alt={owner.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <span className="font-heading font-medium text-xs tracking-[0.15em] uppercase text-primary">
            Meet the Owner
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl mt-2 mb-1">
            {owner.name}
          </h2>
          <p className="text-primary font-heading font-medium text-sm mb-4">
            {owner.role}
          </p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {owner.bio}
          </p>
        </div>
      </div>
    </section>
  );
}