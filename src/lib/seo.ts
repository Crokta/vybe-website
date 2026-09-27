import type { Metadata } from "next";

import { absoluteUrl, site } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

/**
 * Per-page metadata. The root layout supplies the defaults (metadataBase, icons, twitter
 * card); a page states only what makes it itself, and gets a canonical URL and matching
 * Open Graph fields for free. The OG image comes from the route's `opengraph-image`.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

/** Serialises structured data for a `<script type="application/ld+json">`, safe against `</script>` injection. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/brand/vybe-mark-512.png"),
  slogan: site.tagline,
  description: site.description,
  email: site.email.hello,
  areaServed: { "@type": "City", name: "Lagos" },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer support", email: site.email.hello },
    { "@type": "ContactPoint", contactType: "partnerships", email: site.email.partners },
    { "@type": "ContactPoint", contactType: "safety", email: site.email.safety },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: "en-NG",
  publisher: { "@id": `${site.url}/#organization` },
};

export const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: site.name,
  operatingSystem: "iOS, Android",
  applicationCategory: "LifestyleApplication",
  description: site.shortDescription,
  offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
  publisher: { "@id": `${site.url}/#organization` },
};

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
