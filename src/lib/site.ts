/**
 * One description of the site, read by the layout, the metadata helpers, the sitemap, the
 * manifest and the structured data — so a rename or a new page is a change in one place.
 */

const fallbackUrl = "https://vybe.crokta.com";

export const site = {
  name: "VYBE",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, ""),
  tagline: "Meet someone. Find somewhere. Do something. Stay connected.",
  headline: "Meet someone. Then actually go out.",
  description:
    "VYBE is a verified dating app for people who would rather have one good evening than a hundred conversations. Meet intentional people, agree on a real plan, book the table — with safety built in. Launching invite-only in Lagos.",
  shortDescription: "Verified dating that ends in a real evening out. Meet, plan, book and stay safe — in one app.",
  locale: "en_NG",
  market: "Lagos, Nigeria",
  twitter: "@vybeapp",
  email: {
    hello: "hello@vybe.ng",
    partners: "partners@vybe.ng",
    safety: "safety@vybe.ng",
    privacy: "privacy@vybe.ng",
  },
  keywords: [
    "VYBE",
    "dating app Lagos",
    "dating app Nigeria",
    "verified dating app",
    "safe dating",
    "date planning app",
    "book a date",
    "date ideas Lagos",
    "couples app",
    "couples app Nigeria",
    "date night ideas Lagos",
    "relationship counselling Lagos",
    "Lagos restaurants for dates",
  ],
  colors: {
    plum: "#7A2348",
    rose: "#D6455F",
    amber: "#F5A65B",
    ink: "#1A0A12",
    cream: "#FFF7F2",
  },
} as const;

export const nav = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/safety", label: "Safety" },
  { href: "/couples", label: "Couple Mode" },
  { href: "/partners", label: "For venues" },
] as const;

/** Every indexable route, for the sitemap. */
export const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/safety", priority: 0.9, changeFrequency: "monthly" },
  { path: "/couples", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
] as const;

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;
