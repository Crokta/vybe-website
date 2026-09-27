import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.headline}`,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: site.colors.cream,
    theme_color: site.colors.ink,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/vybe-mark-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/app-icon-1024.png", sizes: "1024x1024", type: "image/png", purpose: "maskable" },
    ],
  };
}
