export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { bio, contact, hero } from "@/content/celia";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      // Sitemap images : aide Google Images à indexer les portraits
      images: [bio.photo.src, contact.photo.src, hero.poster, "/og-image.jpg"].map((src) => `${siteUrl}${src}`),
    },
  ];
}
