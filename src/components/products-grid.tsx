// src/components/products-grid.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CallToOrder } from "@/components/call-to-order";
import { products } from "@/lib/dummy-data";

const PER_PAGE = 6;

export function ProductsGrid() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div>
      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
        <Input
          type="text"
          placeholder="Search sweets, snacks..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-11 pr-10 h-12 rounded-full border-2 border-foreground bg-card shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary text-sm md:text-base"
        />
        {query && (
          <button
            onClick={() => handleSearchChange("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {paginated.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No products found for &quot;{query}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {paginated.map((product) => (
            <Link
              key={product.id}
              href="/menu"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-foreground"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {(product.isBestseller || product.isSeasonal) && (
                <span className="absolute top-3 right-3 bg-accent text-accent-foreground font-heading font-bold text-[10px] px-2 py-1 rounded-full border-2 border-foreground -rotate-6">
                  {product.isBestseller ? "Bestseller" : "Seasonal"}
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="font-heading font-bold text-base md:text-lg mb-1">
                  {product.name}
                </h3>
                <p className="text-white/80 text-xs md:text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground font-heading font-medium text-xs px-3 py-1.5 rounded-full">
                  See Price
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
                className={
                  currentPage === totalPages ? "pointer-events-none opacity-40" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <CallToOrder />
    </div>
  );
}