import { Mark } from "@/components/brand/mark";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function WaitlistSection({
  title = "Your invite is one form away.",
  lead = "VYBE opens in Lagos one neighbourhood at a time, so there is always someone worth meeting and somewhere worth going when you arrive. Tell us where you are and we'll let you know honestly when it's your turn.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative overflow-hidden bg-ink px-5 py-24 text-cream sm:px-8 sm:py-32"
    >
      <div
        className="pointer-events-none absolute top-0 -left-40 size-[520px] rounded-full bg-plum/50 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 size-[420px] rounded-full bg-rose/30 blur-[120px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <Eyebrow tone="light">Invite-only · Lagos first</Eyebrow>
          <h2 id="waitlist-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">{lead}</p>
          <ul className="mt-10 space-y-4 text-cream/80">
            {[
              "We ask for three things. Nothing else until you're invited.",
              "No activation into an empty city — you'll join when your area has people and places.",
              "Verification, reporting and check-ins are free. Always.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Mark size={22} className="mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={120}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-10"
        >
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}
