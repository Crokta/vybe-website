import type { Metadata } from "next";
import Link from "next/link";

import { Mark } from "@/components/brand/mark";
import {
  BookingScreen,
  CheckInScreen,
  CoupleScreen,
  DiscoverScreen,
  Phone,
  PlanScreen,
} from "@/components/phone/phone";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { appJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.headline}` },
  description: site.description,
  alternates: { canonical: "/" },
};

const faqs: FaqItem[] = [
  {
    q: "Where is VYBE available?",
    a: "VYBE launches invite-only in Lagos, opening a few neighbourhood clusters at a time — places like Victoria Island, Ikoyi, Lekki and Yaba first. If you're elsewhere, join the waitlist and we'll tell you when VYBE reaches you.",
  },
  {
    q: "Why is it invite-only?",
    a: "Because an app full of strangers you'll never meet, recommending venues that aren't really there, is worse than no app. We invite people in cohorts so every area has real people and real places before anyone arrives.",
  },
  {
    q: "How does verification work?",
    a: "Before anyone can be shown to you, they complete a liveness check — not a photo upload, a live person in front of the camera. Badges on VYBE only claim what was actually checked.",
  },
  {
    q: "Is VYBE free?",
    a: "VYBE is free to join. Some extras will be optional paid features, and venues set their own prices, which you see in full before you pay. Verification, reporting, blocking and date check-ins are free for everyone, always — safety is never behind a paywall.",
  },
  {
    q: "Does the AI talk to people for me?",
    a: "No. VYBE's planner suggests options with reasons and can help you find words, but it never sends a message, books, pays or changes your settings without you. Everything it drafts is yours to edit or ignore — and you can switch it off.",
  },
  {
    q: "Do you track my location?",
    a: "No. There is no background tracking. Other members see a distance band, never your position. Location is only used for discovery and, if you choose to turn it on, for a time-limited date check-in.",
  },
  {
    q: "What happens if we become a couple?",
    a: "You can switch on Couple Mode together — both of you have to agree, and if you met somewhere else you can invite your partner with a code. Your profiles leave discovery and you get a shared space for date nights, milestones, gifts and guided programmes. Either of you can leave at any time, and your own data always stays yours.",
  },
];

const promise = [
  { word: "Meet someone.", body: "Verified people who want what you want, a few at a time." },
  { word: "Find somewhere.", body: "Curated Lagos venues with real tables and real prices." },
  { word: "Do something.", body: "Agree, book and split — inside the conversation." },
  { word: "Stay connected.", body: "Couple Mode for everything after the first date." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={appJsonLd} />
      <Hero />
      <PromiseMarquee />
      <Propositions />
      <Journey />
      <SafetyBand />
      <CoupleTeaser />
      <Principles />
      <PartnersTeaser />
      <Faq items={faqs} />
      <WaitlistSection />
    </>
  );
}

/* ------------------------------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-24 sm:px-8 sm:pt-40 lg:pb-32">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] size-[720px] rounded-full bg-rose/20 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[30%] left-[-15%] size-[520px] rounded-full bg-amber/25 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[20%] bottom-0 size-[420px] rounded-full bg-plum/15 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-rose/20 bg-white/70 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-plum shadow-sm backdrop-blur">
            <span className="rounded-full bg-rose px-2.5 py-0.5 text-xs font-bold text-white">New</span>
            Invite-only pilot · Lagos
          </p>

          <h1 className="text-[3.25rem] leading-[0.98] font-bold tracking-[-0.035em] sm:text-7xl lg:text-[5.5rem]">
            Meet someone.
            <br />
            <span className="text-gradient font-serif font-normal tracking-[-0.01em] italic">
              Then actually go&nbsp;out.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            VYBE is for people who would rather have one good evening than a hundred conversations. Verified matches, a
            plan you both agree on, a real table held — and safety running quietly in the background.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="#waitlist" className="px-8">
              Join the waitlist
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonLink>
            <ButtonLink href="/safety" variant="ghost">
              How VYBE keeps you safe
            </ButtonLink>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            {[
              ["100%", "of members liveness-verified"],
              ["3", "good options, not 300"],
              ["₦0", "for safety tools. Ever."],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{value}</dd>
                <dd className="mt-1 text-sm leading-snug text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto h-[600px] w-full max-w-[440px]">
          <Phone
            label="The VYBE app showing today's curated set"
            className="absolute top-0 left-1/2 z-10 -translate-x-1/2 animate-float"
          >
            <DiscoverScreen />
          </Phone>

          <FloatingChip className="top-10 left-0 [--tilt:-4deg] sm:top-24 sm:-left-6" delay="0s">
            <span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path
                  d="M3.5 8.5l3 3 6-7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <strong className="block text-sm">Verified</strong>
              <span className="text-xs text-muted">A live person, not a photo</span>
            </span>
          </FloatingChip>

          <FloatingChip className="top-[46%] right-0 [--tilt:3deg] max-sm:hidden sm:-right-8" delay="1.2s">
            <span className="grid size-9 place-items-center rounded-full bg-amber-200 text-plum">
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <rect
                  x="2.5"
                  y="3.5"
                  width="11"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <strong className="block text-sm">Table held</strong>
              <span className="text-xs text-muted">Saffron Room · Sat 7:30</span>
            </span>
          </FloatingChip>

          <FloatingChip className="bottom-10 left-2 [--tilt:-2deg] sm:-left-2" delay="2.4s">
            <span className="grid size-9 place-items-center rounded-full bg-rose-100 text-rose">
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path
                  d="M8 1.5l5 2v4c0 3.2-2.2 5.6-5 7-2.8-1.4-5-3.8-5-7v-4z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <strong className="block text-sm">Check-in at 9:30</strong>
              <span className="text-xs text-muted">Kemi will know if you don&rsquo;t</span>
            </span>
          </FloatingChip>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ children, className, delay }: { children: React.ReactNode; className: string; delay: string }) {
  return (
    <div
      aria-hidden
      className={`absolute z-20 flex animate-float-slow items-center gap-3 rounded-2xl border border-white/70 bg-white/85 py-2.5 pr-4 pl-2.5 shadow-[0_20px_50px_-20px_rgba(58,15,34,0.45)] backdrop-blur-md ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

function PromiseMarquee() {
  const row = [...promise, ...promise];
  return (
    <section aria-label="The VYBE promise" className="overflow-hidden border-y border-ink/10 bg-ink py-6 text-cream">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-12 font-serif text-3xl italic sm:text-4xl"
            aria-hidden={index >= promise.length}
          >
            {item.word}
            <Mark size={26} />
          </span>
        ))}
      </div>
    </section>
  );
}

const propositions = [
  {
    title: "Everyone is verified",
    body: "A liveness check before anyone can be shown to you. Not a photo — a live person. Badges only claim what was actually checked.",
    icon: <path d="M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6zm-3.5 9l2.5 2.5 5-5" />,
  },
  {
    title: "Plans, not pen pals",
    body: "Agree on something real. VYBE turns “you pick” into three good options — and holds the table, the price and the terms.",
    icon: <path d="M4 7h16v13H4zM4 11h16M8 3v4M16 3v4M9 15.5l2 2 4-4" />,
  },
  {
    title: "Safety you set up in advance",
    body: "Trusted contacts and timed check-ins, decided while you're calm. Report and block from anywhere in the app. Never paywalled.",
    icon: <path d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10zM12 9v4M12 16h.01" />,
  },
];

function Propositions() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <Eyebrow>Why VYBE</Eyebrow>
          <h2 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            Dating apps end at the match.{" "}
            <span className="font-serif font-normal text-rose italic">We start there.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            The hard part was never finding a match. It&rsquo;s deciding where to go, feeling safe getting there,
            sorting out who pays — and what happens if it works. VYBE does all of it, in one place you can trust.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {propositions.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 110}
              className="group relative overflow-hidden rounded-4xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(122,35,72,0.35)]"
            >
              <div
                className="absolute -top-10 -right-10 size-40 rounded-full bg-linear-to-br from-rose/10 to-amber/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-plum to-rose text-white shadow-lg shadow-rose/25">
                <svg
                  viewBox="0 0 24 24"
                  className="size-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {item.icon}
                </svg>
              </span>
              <h3 className="mt-8 text-2xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    kicker: "Meet someone",
    title: "Curated, not endless.",
    body: "A daily set of verified people who want the same thing you do — with honest reasons you're seeing each one. Say what you're here for, and we only show you people looking for the same.",
    points: ["Intent on every profile", "A few people a day, chosen well", "Distance in bands, never a pin"],
    screen: <DiscoverScreen />,
    label: "Discovery: today's curated set",
  },
  {
    n: "02",
    kicker: "Find somewhere",
    title: "Decided, not debated.",
    body: "Tell the planner what you're in the mood for — in your own words. It comes back with three bookable options, with reasons, from venues we've actually vetted. Propose one, counter, agree. Minutes, not a week of “you pick”.",
    points: ["Real availability, real prices", "Sponsored options are always labelled", "Nothing is sent without you"],
    screen: <PlanScreen />,
    label: "The date planner suggesting three venues",
  },
  {
    n: "03",
    kicker: "Do something",
    title: "Booked, split, sorted.",
    body: "Hold the table and pay inside VYBE, with the cancellation terms spelled out before you pay. Split it if you like — no awkward bank transfers at the end of the night.",
    points: ["Clear terms before you pay", "Split payment requests", "Refunds handled by us, not a phone call"],
    screen: <BookingScreen />,
    label: "Booking review with a split payment",
  },
  {
    n: "04",
    kicker: "Stay safe",
    title: "Covered, not watched.",
    body: "Set a check-in before you leave home. If you don't answer, the trusted contact you chose gets the venue and the time — nothing more. Complete, extend or cancel in one tap.",
    points: ["You choose who and what is shared", "Grace period before anyone is alerted", "No background tracking"],
    screen: <CheckInScreen />,
    label: "A timed date check-in",
  },
];

function Journey() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative bg-sand/60 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="how-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            From &ldquo;hey&rdquo; to a table for two.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Every step makes the next one easier. Every step is yours to take or skip.
          </p>
        </Reveal>

        <div className="mt-20 space-y-28 sm:space-y-36">
          {steps.map((step, index) => (
            <div key={step.n} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={index % 2 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-6xl text-rose/80 italic">{step.n}</span>
                  <span className="text-xs font-bold tracking-[0.2em] text-plum uppercase">{step.kicker}</span>
                </div>
                <h3 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{step.title}</h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{step.body}</p>
                <ul className="mt-8 space-y-3">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 font-semibold">
                      <span className="grid size-6 place-items-center rounded-full bg-rose/10 text-rose">
                        <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
                          <path
                            d="M3.5 8.5l3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className={`relative flex justify-center ${index % 2 ? "lg:order-1" : ""}`}>
                <div
                  className={`absolute inset-x-8 top-10 bottom-10 rounded-[3rem] ${
                    ["bg-rose/15", "bg-amber/25", "bg-plum/15", "bg-ink/10"][index]
                  } rotate-3 blur-sm`}
                  aria-hidden
                />
                <Phone label={step.label} className="relative">
                  {step.screen}
                </Phone>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetyBand() {
  const items = [
    ["Liveness verification", "Everyone you see has proved they're a live person."],
    [
      "Trusted contacts",
      "Share exactly what you choose — venue, time, first name — with people who don't need the app.",
    ],
    ["Timed check-ins", "Before, during and after. Escalation you decided in advance."],
    ["Report & block anywhere", "In discovery, chat, planning and booking. A real team reviews every report."],
  ];
  return (
    <section
      aria-labelledby="safety-title"
      className="relative overflow-hidden bg-ink px-5 py-24 text-cream sm:px-8 sm:py-32"
    >
      <div
        className="pointer-events-none absolute top-[-20%] right-[-10%] size-[640px] rounded-full bg-plum/60 blur-[140px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06]" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow tone="light">Safety</Eyebrow>
            <h2 id="safety-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
              Safety is a feature you use,{" "}
              <span className="text-gradient-light font-serif font-normal italic">not a page you find.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-cream/70">
              It shows up where risk shows up — when you&rsquo;re deciding who to meet, what to say, where to go and how
              to get home. And it is never, ever behind a paywall.
            </p>
            <ButtonLink href="/safety" variant="light" className="mt-8">
              Read our safety standards
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-4xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, body], index) => (
            <Reveal
              key={title}
              delay={index * 90}
              className="bg-ink p-8 transition-colors duration-500 hover:bg-ink-800"
            >
              <span className="font-serif text-4xl text-amber italic">0{index + 1}</span>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoupleTeaser() {
  return (
    <section aria-labelledby="couple-title" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div
        className="pointer-events-none absolute top-1/3 -left-40 size-[520px] rounded-full bg-rose/15 blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative flex justify-center">
          <div
            className="absolute inset-x-10 top-10 bottom-10 -rotate-3 rounded-[3rem] bg-linear-to-br from-amber/40 to-rose/30 blur-sm"
            aria-hidden
          />
          <Phone label="Couple Mode: shared plans and milestones" className="relative">
            <CoupleScreen />
          </Phone>
        </Reveal>
        <Reveal delay={100}>
          <Eyebrow>Couple Mode</Eyebrow>
          <h2 id="couple-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            When it works,{" "}
            <span className="font-serif font-normal text-rose italic">you don&rsquo;t have to delete us.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Most dating apps lose you the moment they succeed. VYBE becomes the place for your date nights,
            anniversaries and the work of staying close — with a clear line between what&rsquo;s shared and what&rsquo;s
            just yours.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Both of you have to agree",
              "Date nights & surprises",
              "Anniversaries & wishlists",
              "Guided programmes",
              "Double dates & sitters",
              "Private notes stay private",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 font-semibold"
              >
                <Mark size={20} />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href="/couples" variant="secondary" className="mt-10">
            Explore Couple Mode
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  const wont = [
    ["No streaks, no countdowns", "No “someone likes you” teasers you can't act on. We don't manufacture urgency."],
    ["No AI speaking for you", "It suggests. You decide. It never sends, books or pays on its own."],
    ["No hidden sponsorship", "A paid placement is labelled — and never replaces a clearly better option."],
    ["No background tracking", "Location is for discovery and check-ins you switch on. That's all."],
    ["No exclusivity theatre", "We keep out bad actors, not people. No income or employer gating."],
    ["No hostage data", "Pause, export and delete are ordinary buttons, not a support ticket."],
  ];
  return (
    <section aria-labelledby="principles-title" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <Eyebrow>Our principles</Eyebrow>
          <h2 id="principles-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            What we <span className="font-serif font-normal text-rose italic">won&rsquo;t</span> do is the point.
          </h2>
          <p className="mt-6 text-lg text-muted">
            VYBE earns when you actually go out — not when you keep swiping. So we can afford to leave out the tricks.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {wont.map(([title, body], index) => (
            <Reveal key={title} delay={(index % 3) * 90} className="border-t-2 border-ink pt-6">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersTeaser() {
  return (
    <section className="px-5 pt-24 sm:px-8 sm:pt-32">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-plum via-rose to-amber p-10 text-white sm:p-16">
        <Mark
          size={420}
          monochrome="rgba(255,255,255,0.12)"
          className="pointer-events-none absolute -right-16 -bottom-24"
        />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
            For restaurants, lounges & experiences
          </p>
          <h2 className="mt-5 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
            Your next regulars are deciding where to go tonight.
          </h2>
          <p className="mt-5 text-lg text-white/85">
            VYBE sends you guests at the exact moment they&rsquo;re choosing — with confirmed bookings, paid deposits
            and reporting you can actually attribute.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/partners" className="bg-white! text-plum! shadow-none! hover:bg-cream!">
              Become a VYBE partner
            </ButtonLink>
            <Link
              href="/partners#how"
              className="inline-flex min-h-12 items-center px-4 font-semibold text-white/90 underline-offset-4 hover:underline"
            >
              How it works for venues
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
