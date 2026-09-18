// src/components/menu-list.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CallToOrder } from "@/components/call-to-order";
import type { Product } from "@/generated/prisma/client";

type SortOption = "default" | "price-asc" | "price-desc";

export function MenuList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? products.filter((p) => p.name.toLowerCase().includes(q))
      : [...products];

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, query, sort]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            type="text"
            placeholder="Search menu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11 pr-10 h-12 rounded-full border-2 border-foreground bg-card shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="h-12 rounded-full border-2 border-foreground bg-card sm:w-52 shadow-sm">
            <ArrowUpDown className="h-4 w-4 text-primary mr-1" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          {products.length === 0
            ? "Menu items coming soon."
            : `No items found for "${query}".`}
        </p>
      ) : (
        <div className="border-t border-border">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 py-4 border-b border-border"
            >
              <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-foreground">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-base md:text-lg">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm line-clamp-1">
                  {product.description}
                </p>
                {(product.isBestseller || product.isSeasonal) && (
                  <span className="inline-block mt-1 text-[10px] font-heading font-bold text-primary uppercase tracking-wide">
                    {product.isBestseller ? "Bestseller" : "Seasonal"}
                  </span>
                )}
              </div>

              <div className="shrink-0 text-right">
                <span className="font-heading font-extrabold text-2xl md:text-3xl text-primary">
                  ৳{product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <CallToOrder />
    </div>
  );
}