import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [
    "",
    "/collections",
    "/contact",
    "/terms",
    "/privacy",
    "/refund",
  ].map((path) => ({
    url: `${siteOrigin}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
