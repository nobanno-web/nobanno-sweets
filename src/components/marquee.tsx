// src/components/marquee.tsx
import { sweetNames } from "@/lib/dummy-data";

export function Marquee() {
  const items = [...sweetNames, ...sweetNames]; // duplicated for seamless loop

  return (
    <div className="bg-secondary text-secondary-foreground overflow-hidden py-3 border-y-2 border-foreground">
      <div className="flex whitespace-nowrap animate-marquee motion-reduce:animate-none">
        {items.map((name, i) => (
          <span
            key={i}
            className="font-heading text-sm md:text-base px-6 flex items-center gap-6"
          >
            {name}
            <span aria-hidden="true">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}