import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountUpStat } from "@/components/count-up-stat";
import type { ShopStat } from "@/generated/prisma/client";

export function StoryTeaser({ stats }: { stats: ShopStat[] }) {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="w-full md:w-1/2 flex items-center justify-center gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              {i > 0 && <div className="h-10 w-px bg-secondary-foreground/30" />}
              <div className="bg-background text-foreground rounded-2xl border-2 border-foreground px-6 py-5 text-center">
                
                <div className="font-heading font-bold text-3xl md:text-4xl text-primary">
                  <CountUpStat value={stat.value} />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wide text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            Our Story
          </h2>
          <p className="text-secondary-foreground/90 text-sm md:text-base mb-6 max-w-xl mx-auto md:mx-0">
            What started as a small family kitchen has grown into a shop
            Kolkata comes to for festival sweets and everyday treats — made
            the same way, every single day.
          </p>
          <Link href="/story">
            <Button variant="default">
              Read Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}