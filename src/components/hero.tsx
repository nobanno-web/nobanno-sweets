// src/components/hero.tsx
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream dark:bg-brand-bg-dark">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-secondary text-secondary-foreground font-heading text-xs font-medium px-3 py-1 rounded-full border-2 border-foreground mb-4">
            Since 1998
          </span>

          <h1 className="font-heading font-bold text-3xl md:text-5xl leading-tight mb-4">
            Kolkata&apos;s sweetness, made fresh every day
          </h1>

          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
            Traditional Bengali mishti and snacks, handcrafted at our shop.
            Come taste what&apos;s fresh today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              href="/menu"
              className="bg-primary text-primary-foreground font-heading font-medium text-sm px-6 py-3 rounded-xl border-2 border-foreground text-center hover:opacity-90 transition-opacity"
            >
              View Menu
            </Link>
            <Link
              href="/contact"
              className="bg-card text-foreground font-heading font-medium text-sm px-6 py-3 rounded-xl border-2 border-foreground text-center hover:bg-accent/10 transition-colors"
            >
              Find Our Shop
            </Link>
          </div>
        </div>

        <div className="relative w-56 h-56 md:w-72 md:h-72 shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-card shadow-[0_0_0_3px_theme(colors.foreground)]">
            <Image
              src="https://picsum.photos/seed/hero-sweets/600/600"
              alt="Freshly made Bengali sweets at Nabanno Sweets"
              fill
              priority
              className="object-cover"
            />
          </div>
          <span className="absolute top-0 -right-2 bg-accent text-accent-foreground font-heading font-bold text-xs px-3 py-1.5 rounded-full border-2 border-foreground -rotate-6">
            Bestseller
          </span>
        </div>
      </div>
    </section>
  );
}