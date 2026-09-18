import type { SiteSettings, Location } from "@/generated/prisma/client";

export function LocalBusinessSchema({
  settings,
  location,
}: {
  settings: SiteSettings | null;
  location: Location | null;
}) {
  if (!location) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Nobanno Sweets",
    image: "https://nobannosweets.com/logo-horizontal.png",
    url: "https://nobannosweets.com",
    telephone: location.phone,
    email: settings?.contactEmail ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: "Gazipur",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHours: location.hours,
    sameAs: [settings?.facebookUrl, settings?.instagramUrl, settings?.youtubeUrl].filter(
      Boolean
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
