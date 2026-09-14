// src/components/admin/image-upload-field.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/upload-image";
import { toast } from "sonner";

type Folder = "products" | "gallery" | "hero-slides" | "story" | "owner" | "welcome-modal";

export function ImageUploadField({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: Folder;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch {
      toast.error("Upload failed — try again");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-foreground">
          <Image src={value} alt="" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-card border-2 border-foreground"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Click to upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}
    </div>
  );
}