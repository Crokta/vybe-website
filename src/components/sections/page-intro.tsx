import type { ReactNode } from "react";

import { Mark } from "@/components/brand/mark";
import { Eyebrow } from "@/components/ui/button";

/** The opening of every page that isn't the home page. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-28">
      <div
        className="pointer-events-none absolute -top-40 -right-40 size-[640px] rounded-full bg-rose/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-40 -left-40 size-[420px] rounded-full bg-amber/20 blur-[120px]"
        aria-hidden
      />
      <Mark
        size={720}
        monochrome="rgba(122,35,72,0.04)"
        className="pointer-events-none absolute top-16 -right-48 hidden lg:block"
      />

      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-14 ${aside ? "lg:grid-cols-[1.15fr_0.85fr]" : ""}`}
      >
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-5xl leading-[1.02] font-bold tracking-tight sm:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>
          {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="flex justify-center lg:justify-end">{aside}</div>}
      </div>
    </section>
  );
}
