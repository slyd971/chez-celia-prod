export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { brand, seo } from "@/content/celia";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.title,
    short_name: brand.name,
    description: seo.description,
    lang: "fr",
    start_url: "/",
    display: "browser",
    background_color: "#171310",
    theme_color: "#171310",
    icons: [
      { src: "/favicon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
