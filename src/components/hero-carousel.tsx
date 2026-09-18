// src/components/hero-carousel.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Archivo } from "next/font/google";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/generated/prisma/client";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
});

const AUTOPLAY_MS = 5000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[index];

  return (
    <section
      className="relative w-full h-[calc(100svh-140px)] md:h-[calc(100svh-96px)] min-h-[420px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.imageUrl}
            alt={slide.headline}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex items-end md:items-center">
            <div className="mx-auto max-w-6xl w-full px-4 pb-16 md:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="max-w-lg"
              >
                <h1
                  className={`${archivo.className} font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 text-white`}
                >
                  {slide.headline}
                </h1>
                <p
                  className={`${archivo.className} font-normal text-base md:text-xl mb-8 text-white/60`}
                >
                  {slide.subtext}
                </p>
                <Link
                  href={slide.ctaHref}
                  className={`${archivo.className} inline-block font-extrabold text-base md:text-lg whitespace-nowrap cursor-pointer no-underline rounded-none border border-transparent bg-[#7A2E8E] text-white hover:bg-[#621574] active:bg-[#4a0d5a] transition-colors`}
                  style={{ padding: "14px 32px" }}
                >
                  {slide.ctaLabel}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full border border-white/70 transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
}