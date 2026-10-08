import type { ReactNode } from "react";

import { Mark } from "@/components/brand/mark";

/**
 * A phone, drawn in CSS, showing the app's own screens. The copy on every screen is the app's
 * copy (lib/presentation/**); the people and venues are illustrative.
 */
export function Phone({ children, className = "", label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <figure
      aria-label={label}
      className={`relative aspect-[9/19] w-[280px] shrink-0 rounded-[3rem] bg-ink p-2.5 shadow-[0_50px_100px_-30px_rgba(58,15,34,0.6),0_0_0_1px_rgba(255,255,255,0.06)_inset] ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-cream">
        <div className="absolute top-2.5 left-1/2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
        <div className="flex h-9 items-end justify-between px-7 pb-1 text-[10px] font-bold text-ink" aria-hidden>
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] border border-ink/70" />
          </span>
        </div>
        <div className="h-[calc(100%-2.25rem)]">{children}</div>
      </div>
    </figure>
  );
}

const Icon = {
  verified: (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
      <path
        d="M8 1l1.8 1.3 2.2-.1.7 2.1 1.8 1.3-.7 2.1.7 2.1-1.8 1.3-.7 2.1-2.2-.1L8 15l-1.8-1.3-2.2.1-.7-2.1L1.5 10.4l.7-2.1-.7-2.1 1.8-1.3.7-2.1 2.2.1z"
        fill="currentColor"
      />
      <path
        d="M5.4 8.2l1.8 1.7 3.4-3.6"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" fill="currentColor" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7z" fill="currentColor" />
    </svg>
  ),
};

function Portrait({ hue, className = "" }: { hue: "rose" | "amber" | "plum"; className?: string }) {
  const gradients = {
    rose: "from-rose via-plum to-ink",
    amber: "from-amber via-rose to-plum",
    plum: "from-plum via-ink-700 to-ink",
  };
  // An abstract silhouette in place of a photograph of a real person.
  return (
    <div className={`overflow-hidden bg-linear-to-br ${gradients[hue]} ${className}`} aria-hidden>
      <div className="absolute top-[22%] left-1/2 size-[34%] -translate-x-1/2 rounded-full bg-white/20 blur-[1px]" />
      <div className="absolute top-[52%] left-1/2 h-[60%] w-[70%] -translate-x-1/2 rounded-t-full bg-white/15 blur-[1px]" />
      <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
    </div>
  );
}

export function DiscoverScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-4">
      <div className="flex items-center justify-between py-2">
        <p className="text-[15px] font-bold">Today&rsquo;s set</p>
        <p className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-semibold text-muted">4 of 12</p>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-3xl">
        <Portrait hue="rose" className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink via-ink/70 to-transparent p-4 pt-16 text-white">
          <p className="flex items-center gap-1.5 text-xl font-bold">
            Tolu, 29 <span className="text-amber">{Icon.verified}</span>
          </p>
          <p className="text-[11px] text-white/70">Yaba · about 5 km away</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">
              Something serious
            </span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">
              Live music
            </span>
          </div>
          <p className="mt-3 rounded-2xl bg-white/10 p-2.5 text-[10.5px] leading-snug text-white/85 backdrop-blur">
            <span className="font-bold text-amber">Why you&rsquo;re seeing Tolu · </span>
            You both want something serious and both said Afrobeats &amp; jazz nights.
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-4">
        <span className="grid size-12 place-items-center rounded-full border border-line bg-white text-muted shadow-sm">
          {Icon.close}
        </span>
        <span className="grid size-11 place-items-center rounded-full bg-amber text-ink shadow-sm">{Icon.spark}</span>
        <span className="grid size-14 place-items-center rounded-full bg-rose text-white shadow-lg shadow-rose/30">
          {Icon.heart}
        </span>
      </div>
    </div>
  );
}

const planOptions = [
  {
    name: "Saffron Room",
    meta: "Ikoyi · Modern West African",
    price: "₦₦",
    time: "Sat 7:30pm",
    why: "Quiet enough to talk",
  },
  {
    name: "Lagoon Terrace",
    meta: "Victoria Island · Live band",
    price: "₦₦₦",
    time: "Sat 8:00pm",
    why: "You both picked live music",
  },
  {
    name: "Clay & Kiln",
    meta: "Lekki · Pottery for two",
    price: "₦₦",
    time: "Sat 4:00pm",
    why: "Something to do, not just eat",
  },
];

export function PlanScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-4">
      <p className="py-2 text-[15px] font-bold">Plan with Tolu</p>
      <div className="rounded-2xl bg-ink p-3 text-cream">
        <p className="text-[10px] font-bold tracking-widest text-amber uppercase">You asked for</p>
        <p className="mt-1 text-[12.5px] leading-snug">
          &ldquo;Something nice on Saturday, not too far, mid budget.&rdquo;
        </p>
      </div>
      <p className="mt-3 text-[10px] font-bold tracking-widest text-muted uppercase">Three good options</p>
      <div className="mt-2 space-y-2">
        {planOptions.map((option, index) => (
          <div
            key={option.name}
            className={`rounded-2xl border bg-white p-3 ${index === 0 ? "border-rose ring-2 ring-rose/15" : "border-line"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-bold">{option.name}</p>
                <p className="text-[10.5px] text-muted">{option.meta}</p>
              </div>
              <span className="text-[11px] font-bold text-plum">{option.price}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px]">
              <span className="rounded-full bg-sand px-2 py-0.5 font-semibold">{option.time}</span>
              <span className="text-muted">{option.why}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-full bg-rose py-3 text-center text-[12.5px] font-bold text-white">
        Propose Saffron Room
      </div>
    </div>
  );
}

export function BookingScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-4">
      <p className="py-2 text-[15px] font-bold">Booking review</p>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="h-24 bg-linear-to-br from-amber via-rose to-plum" aria-hidden />
        <div className="p-3.5">
          <p className="text-[14px] font-bold">Saffron Room</p>
          <p className="text-[10.5px] text-muted">Table for two · Saturday 7:30pm</p>
          <dl className="mt-3 space-y-1.5 text-[11px]">
            {[
              ["Table deposit", "₦20,000"],
              ["Tolu's share", "₦10,000"],
              ["Your share", "₦10,000"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 rounded-xl bg-sand p-2 text-[10px] leading-snug text-ink/75">
            Free cancellation until Friday 7:30pm. After that the deposit is kept by the venue.
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-line bg-white p-3">
        <span className="grid size-8 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path
              d="M3.5 8.5l3 3 6-7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-[11px] leading-snug">
          <span className="font-bold">Tolu accepted.</span> Split request sent.
        </p>
      </div>
      <div className="mt-auto rounded-full bg-ink py-3 text-center text-[12.5px] font-bold text-white">Pay ₦10,000</div>
    </div>
  );
}

export function CheckInScreen() {
  return (
    <div className="flex h-full flex-col bg-ink px-4 pb-4 text-cream">
      <p className="py-2 text-[15px] font-bold">Date check-in</p>
      <div className="relative mx-auto mt-6 grid size-40 place-items-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-amber/60" aria-hidden />
        <span
          className="absolute inset-4 animate-pulse-ring rounded-full border-2 border-rose/50 [animation-delay:0.8s]"
          aria-hidden
        />
        <div className="grid size-28 place-items-center rounded-full bg-linear-to-br from-rose to-plum shadow-xl shadow-rose/30">
          <div className="text-center">
            <p className="text-[10px] tracking-widest text-white/70 uppercase">Next at</p>
            <p className="text-2xl font-bold">9:30</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-[12.5px] leading-snug text-cream/80">
        If you don&rsquo;t answer within 15 minutes, <span className="font-bold text-amber">Kemi</span> gets your venue
        and the time.
      </p>
      <div className="mt-auto space-y-2">
        <div className="rounded-full bg-cream py-3 text-center text-[12.5px] font-bold text-ink">I&rsquo;m okay</div>
        <div className="grid grid-cols-2 gap-2 text-[11.5px] font-semibold">
          <div className="rounded-full border border-white/15 py-2.5 text-center">Extend 1 hour</div>
          <div className="rounded-full border border-white/15 py-2.5 text-center">End check-in</div>
        </div>
      </div>
    </div>
  );
}

export function CoupleScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-4">
      <div className="flex items-center gap-2 py-2">
        <div className="flex -space-x-2">
          <Portrait hue="amber" className="relative size-8 rounded-full ring-2 ring-cream" />
          <Portrait hue="rose" className="relative size-8 rounded-full ring-2 ring-cream" />
        </div>
        <p className="text-[15px] font-bold">You &amp; Tolu</p>
      </div>
      <div className="rounded-3xl bg-linear-to-br from-plum to-rose p-4 text-white">
        <p className="text-[10px] font-bold tracking-widest text-amber-200 uppercase">Milestone · Sunday</p>
        <p className="mt-1 font-serif text-[22px] leading-tight italic">Six months since Saffron Room.</p>
        <p className="mt-2 text-[10.5px] text-white/75">Want to go back, or try somewhere new?</p>
      </div>
      <p className="mt-4 text-[10px] font-bold tracking-widest text-muted uppercase">Shared plans</p>
      <div className="mt-2 space-y-2">
        {[
          ["Sunday brunch", "Sun 11:00am · Booked"],
          ["Weekend in Epe", "Oct 18–19 · Planning"],
        ].map(([title, meta]) => (
          <div key={title} className="flex items-center justify-between rounded-2xl border border-line bg-white p-3">
            <div>
              <p className="text-[12.5px] font-bold">{title}</p>
              <p className="text-[10.5px] text-muted">{meta}</p>
            </div>
            <Mark size={20} />
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-sand p-3 text-[10.5px] leading-snug text-ink/75">
        <span className="font-bold text-ink">Private note · only you can see this.</span> Get the flowers from the place
        on Admiralty.
      </div>
    </div>
  );
}

export function SurpriseScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-4">
      <p className="py-2 text-[15px] font-bold">Date night</p>
      <div className="rounded-3xl bg-ink p-4 text-cream">
        <p className="text-[10px] font-bold tracking-widest text-amber uppercase">Surprise · Friday 7:30pm</p>
        <p className="mt-1 font-serif text-[22px] leading-tight italic">Somewhere new. Dress up a little.</p>
        <p className="mt-2 text-[10.5px] text-cream/70">
          Tolu said yes to the evening and the dress code. They find out where on Friday at 5pm.
        </p>
      </div>
      <p className="mt-4 text-[10px] font-bold tracking-widest text-muted uppercase">Every other Friday</p>
      <div className="mt-2 space-y-2">
        {[
          ["Rooftop dinner, Ikoyi", "Ideas for the next one · Nothing booked"],
          ["Pottery for two, Lekki", "From ₦28,000 · Experiences"],
        ].map(([title, meta]) => (
          <div key={title} className="flex items-center justify-between rounded-2xl border border-line bg-white p-3">
            <div>
              <p className="text-[12.5px] font-bold">{title}</p>
              <p className="text-[10.5px] text-muted">{meta}</p>
            </div>
            <Mark size={20} />
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-sand p-3 text-[10.5px] leading-snug text-ink/75">
        <span className="font-bold text-ink">A sitter for date night.</span> Sitters our team has checked, near you.
      </div>
    </div>
  );
}
