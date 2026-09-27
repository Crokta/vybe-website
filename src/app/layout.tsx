import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

// The app's wordmark is set in Avenir Next; Manrope is the closest open grotesque for the web.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.headline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "lifestyle",
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.headline}`,
    description: site.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    creator: site.twitter,
    title: `${site.name} — ${site.headline}`,
    description: site.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  appleWebApp: { title: site.name, statusBarStyle: "black-translucent" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.colors.cream },
    { media: "(prefers-color-scheme: dark)", color: site.colors.ink },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${manrope.variable} ${instrument.variable} antialiased`}>
      {/* Browser extensions add attributes to <body> before hydration; that is not a bug in the page. */}
      <body className="flex min-h-dvh flex-col overflow-x-clip" suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
