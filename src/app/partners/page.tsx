import { PartnerForm } from "@/components/forms/partner-form";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { PageIntro } from "@/components/sections/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "For venues & partners",
  description:
    "Partner with VYBE: reach verified Lagos couples and daters at the moment they decide where to go. Confirmed bookings, paid deposits, clear settlement and attributable reporting for restaurants, lounges and experiences.",
  path: "/partners",
});

const benefits = [
  [
    "Demand at the moment of intent",
    "Your venue appears inside the conversation where two people are deciding where to go — not in a feed they scroll past.",
  ],
  [
    "Bookings that turn up",
    "Deposits are paid in-app, terms are agreed up front, and both guests are verified people.",
  ],
  [
    "A portal built for busy floors",
    "Manage listings, hours, capacity, price bands and policies. Accept and action bookings fast, from any connection.",
  ],
  ["Clear settlement", "Know what you're owed and when. Every booking, refund and payout reconciled and visible."],
  [
    "Reporting you can attribute",
    "Monthly reports on bookings, spend and repeat guests — traceable to VYBE, not guesswork.",
  ],
  [
    "Honest promotion",
    "Promote your venue with clearly labelled placements. We never let paid placement bury a better option — that's why guests trust it.",
  ],
];

const steps = [
  ["Tell us about your venue", "A short form. Our partnerships team gets back to you within two working days."],
  [
    "We visit and agree terms",
    "We only list places we'd send a friend to. We agree commission, policies and capacity together.",
  ],
  [
    "Go live in the portal",
    "Set up your listing, availability and team access. We check everything before it's shown.",
  ],
  ["Welcome guests", "Bookings arrive in the portal and by message. Settlement arrives on schedule."],
];

const faqs: FaqItem[] = [
  {
    q: "What kinds of businesses can partner with VYBE?",
    a: "Restaurants, bars and lounges, cafés and dessert spots, activities and experiences, live events, staycations and gift providers. Our marketplace is curated — we contract every partner rather than listing anyone who signs up.",
  },
  {
    q: "Which areas are you starting with?",
    a: "We're building density in a few Lagos clusters first — including Victoria Island, Ikoyi, Lekki and Yaba — before widening coverage. If you're outside those, still get in touch.",
  },
  {
    q: "How do payments and settlement work?",
    a: "Guests pay deposits or bookings in the VYBE app. You receive settlement on an agreed schedule with a full reconciliation of bookings, cancellations and refunds in your partner portal.",
  },
  {
    q: "How much does it cost?",
    a: "Partnership is commission-based on bookings VYBE sends you, with optional promotion. We'll walk you through terms during onboarding — there's nothing to pay to start the conversation.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "For venues & partners", path: "/partners" },
        ])}
      />

      <PageIntro
        eyebrow="For venues & partners"
        title={
          <>
            Be the place they <span className="font-serif font-normal text-rose italic">agreed on.</span>
          </>
        }
        lead="Every Saturday, thousands of Lagos couples and first dates decide where to spend the evening — in group chats, with no one to help them. VYBE puts your venue in that decision, with a booking and a deposit attached."
      >
        <ButtonLink href="#enquire">Become a partner</ButtonLink>
        <ButtonLink href={`mailto:${site.email.partners}`} variant="ghost">
          {site.email.partners}
        </ButtonLink>
      </PageIntro>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([title, body], index) => (
            <Reveal
              key={title}
              delay={(index % 3) * 90}
              className="group rounded-4xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-rose/40"
            >
              <span className="font-serif text-4xl text-rose/70 italic transition-colors group-hover:text-rose">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how" className="bg-ink px-5 py-24 text-cream sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="light">How it works</Eyebrow>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
              From enquiry to first table in four steps.
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-4">
            {steps.map(([title, body], index) => (
              <Reveal as="li" key={title} delay={index * 100} className="relative border-t border-white/15 pt-8">
                <span className="absolute -top-3 left-0 grid size-6 place-items-center rounded-full bg-amber text-xs font-bold text-ink">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="enquire"
        aria-labelledby="enquire-title"
        className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
      >
        <div
          className="pointer-events-none absolute top-20 -right-40 size-[520px] rounded-full bg-amber/20 blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Partner enquiry</Eyebrow>
            <h2 id="enquire-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
              Let&rsquo;s talk about your venue.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We&rsquo;re selecting our founding partners across Lagos now. Tell us a little about you and we&rsquo;ll
              be in touch within two working days.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <PartnerForm />
          </Reveal>
        </div>
      </section>

      <Faq items={faqs} title="Partner questions." />
    </>
  );
}
