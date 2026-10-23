import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { siteOrigin } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [
    "",
    "/collections",
    "/why-us",
    "/faqs",
    "/contact",
    "/terms",
    "/privacy",
    "/refund",
    ...categories.map((c) => `/collections/${c.slug}`),
  ].map((path) => ({
    url: `${siteOrigin}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
