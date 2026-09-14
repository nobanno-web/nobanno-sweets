// src/components/best-sellers.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "@/generated/prisma/client";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section id="best-sellers" className="bg-card/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
            Best Sellers
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            The favourites our customers come back for, again and again.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.12 }}
            >
              <Link
                href="/menu"
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-foreground block"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute top-3 right-3 bg-accent text-accent-foreground font-heading font-bold text-[10px] px-2 py-1 rounded-full border-2 border-foreground -rotate-6">
                  Bestseller
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-heading font-bold text-base md:text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground font-heading font-medium text-xs px-3 py-1.5 rounded-full">
                    View
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}