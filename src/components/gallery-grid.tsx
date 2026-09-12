// src/components/gallery-grid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { galleryImages } from "@/lib/dummy-data";

export function GalleryGrid() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedImage = galleryImages.find((img) => img.id === selected);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {galleryImages.map((img) => (
          <button
            key={img.id}
            onClick={() => setSelected(img.id)}
            className="block w-full break-inside-avoid rounded-2xl overflow-hidden border-2 border-foreground group relative"
          >
            <Image
              src={img.imageUrl}
              alt={img.altText}
              width={500}
              height={650}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-2 border-foreground rounded-2xl [&>button]:bg-card [&>button]:rounded-full [&>button]:border-2 [&>button]:border-foreground [&>button]:opacity-100">
          {selectedImage && (
            <div className="relative w-full max-h-[85vh]">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.altText}
                width={1200}
                height={1200}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}