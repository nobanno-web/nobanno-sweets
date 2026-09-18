import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/change-password", "/api"],
    },
    sitemap: "https://nobannosweets.com/sitemap.xml",
  };
}
