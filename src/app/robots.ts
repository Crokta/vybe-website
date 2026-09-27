import type { MetadataRoute } from "next";

import { absoluteUrl, site } from "@/lib/site";

// Anything that isn't production (previews, staging) asks not to be indexed, so a preview URL
// never competes with the real site in search results.
const isProduction = process.env.VYBE_ENV === "production" || process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
