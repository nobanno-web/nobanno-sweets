import type { MetadataRoute } from "next";

const BASE_URL = "https://nobannosweets.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/menu", "/story", "/gallery"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
