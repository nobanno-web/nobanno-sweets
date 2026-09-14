"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Product } from "@/generated/prisma/client";

export function OurCollection({ products }: { products: Product[] }) {
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  return (
    <section className="bg-brand-cream dark:bg-brand-bg-dark py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-4"
      >
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
            Our Collection
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Explore our handcrafted Bengali sweets, made fresh in-store
            every day.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <div className="border border-foreground">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 bg-card">
                    <h3 className="font-heading font-medium text-sm md:text-base">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center mt-10">
          <Link href="/menu">
            <Button variant="default">
              All Products
            </Button>
          </Link>
        </div>
      </div>
      </motion.div>
    </section>
  );
}