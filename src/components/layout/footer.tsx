import Link from "next/link";

import { Lockup, Mark } from "@/components/brand/mark";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/safety", label: "Safety centre" },
      { href: "/couples", label: "Couple Mode" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/partners", label: "For venues & partners" },
      { href: `mailto:${site.email.hello}`, label: "Contact us" },
      { href: `mailto:${site.email.safety}`, label: "Report a safety concern" },
    ],
  },
  {
    title: "Your data",
    links: [
      { href: "/privacy", label: "Privacy commitments" },
      { href: `mailto:${site.email.privacy}`, label: "Data requests" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06]" aria-hidden />
      <Mark
        size={560}
        monochrome="rgba(255,255,255,0.03)"
        className="pointer-events-none absolute -right-24 -bottom-40 hidden md:block"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" aria-label="VYBE home" className="text-cream">
              <Lockup height={34} />
            </Link>
            <p className="mt-6 max-w-xs font-serif text-2xl leading-snug text-cream/85 italic">
              Meet someone. Find somewhere. Do something. Stay connected.
            </p>
            <p className="mt-6 text-sm text-cream/50">Launching invite-only in Lagos.</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-bold tracking-[0.18em] text-cream/40 uppercase">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[15px] text-cream/75 transition-colors hover:text-amber">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VYBE. Made in Lagos.</p>
          <p className="max-w-md sm:text-right">
            VYBE is not an emergency service. If you are in danger, call <strong className="text-cream/70">112</strong>{" "}
            or <strong className="text-cream/70">767</strong> in Lagos.
          </p>
        </div>
      </div>
    </footer>
  );
}
