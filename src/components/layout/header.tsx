"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Lockup } from "@/components/brand/mark";
import { ButtonLink } from "@/components/ui/button";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu belongs to the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full pr-2 pl-5 transition-all duration-500 ${
          scrolled || open
            ? "border border-ink/5 bg-cream/80 shadow-[0_8px_40px_-12px_rgba(26,10,18,0.25)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Link href="/" aria-label="VYBE home" className="text-ink">
          <Lockup height={30} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-ink/5 text-ink" : "text-ink/70 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/#waitlist" className="min-h-11! px-5! text-sm! max-sm:hidden">
            Join the waitlist
          </ButtonLink>
          <button
            type="button"
            className="grid size-12 place-items-center rounded-full text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl rounded-4xl border border-ink/5 bg-cream/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpenOn(null)}
              className="rounded-2xl px-4 py-4 text-lg font-semibold text-ink hover:bg-ink/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/#waitlist" onClick={() => setOpenOn(null)} className="mt-3 w-full">
          Join the waitlist
        </ButtonLink>
      </div>
    </header>
  );
}
