import { JsonLd } from "@/components/seo/json-ld";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { faqJsonLd } from "@/lib/seo";

export type FaqItem = { q: string; a: string };

/** Native <details>, so it works without JavaScript and is fully indexable. Emits FAQPage structured data. */
export function Faq({ items, title = "Questions, answered straight." }: { items: readonly FaqItem[]; title?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-5 py-24 sm:px-8 sm:py-32">
      <JsonLd data={faqJsonLd(items)} />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-sm text-lg text-muted">
            Anything else? Write to us at{" "}
            <a href="mailto:hello@vybe.ng" className="font-semibold text-rose underline-offset-4 hover:underline">
              hello@vybe.ng
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={100} className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-open:rotate-45 group-open:border-rose group-open:bg-rose group-open:text-white"
                  aria-hidden
                >
                  <svg viewBox="0 0 16 16" className="size-3.5">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pr-12 pb-5 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
