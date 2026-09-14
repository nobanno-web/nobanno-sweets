// src/app/(admin)/admin/gallery/page.tsx
import { getAllGalleryImages } from "@/features/gallery/services/gallery.service";
import { GalleryGrid } from "@/features/gallery/components/gallery-grid";
import { CreateGalleryImageDialog } from "@/features/gallery/components/create-gallery-image-dialog";
import { GALLERY_MAX_PHOTOS } from "@/features/gallery/constants";

export default async function AdminGalleryPage() {
  const images = await getAllGalleryImages();
  const atLimit = images.length >= GALLERY_MAX_PHOTOS;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl mb-1">Gallery</h1>
          <p className="text-muted-foreground text-sm">
            {images.length} / {GALLERY_MAX_PHOTOS} photos
            {atLimit && " — remove one to add another"}
          </p>
        </div>
        <CreateGalleryImageDialog disabled={atLimit} />
      </div>

      <GalleryGrid images={images} />
    </div>
  );
}
