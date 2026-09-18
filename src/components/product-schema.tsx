import type { Product } from "@/generated/prisma/client";

export function ProductSchema({ products }: { products: Product[] }) {
  const jsonLd = products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    url: `https://nobannosweets.com/menu`,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
      url: "https://nobannosweets.com/menu",
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
