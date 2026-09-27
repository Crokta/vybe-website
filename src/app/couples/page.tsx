import { Mark } from "@/components/brand/mark";
import { CoupleScreen, Phone } from "@/components/phone/phone";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { PageIntro } from "@/components/sections/page-intro";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Couple Mode",
  description:
    "Couple Mode on VYBE: a shared home for your plans, milestones and memories once you're together — switched on by both of you, with private notes that stay private and an exit that protects you both.",
  path: "/couples",
});

const features = [
  ["Shared plans & calendar", "Everything you've booked and everything you're planning, in one place you both see."],
  ["Milestones", "Six months since that first table? VYBE remembers, and has an idea or two."],
  ["Private notes", "Visible only to you. Never in a shared view, a notification or the other person's export."],
  ["Shared memories", "Each photo belongs to whoever added it. They can download or delete their own, any time."],
  [
    "Gifts & experiences",
    "Ideas that respect what you both like — and surprises that stay surprises until they arrive.",
  ],
  ["Off the market, quietly", "Both profiles leave discovery. No announcements, no new likes."],
];

const faqs: FaqItem[] = [
  {
    q: "Can one person turn on Couple Mode?",
    a: "No. One of you proposes and the other confirms separately. If the proposal isn't answered it simply expires, and declining is private — it doesn't end your match.",
  },
  {
    q: "What happens if we break up?",
    a: "Either of you can leave Couple Mode at any time, immediately, without the other's permission. Shared spaces close, each of you keeps your own contributions and history, and neither of you gains access to the other's private notes, location or payment details.",
  },
  {
    q: "Do our photos get used for anything?",
    a: "No. Memories are never used for recommendations, advertising or training models.",
  },
  {
    q: "Does leaving Couple Mode put me back on discovery?",
    a: "Not automatically. Discovery stays paused for both of you until each person chooses to switch it back on.",
  },
];

export default function CouplesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Couple Mode", path: "/couples" },
        ])}
      />

      <PageIntro
        eyebrow="Couple Mode"
        title={
          <>
            Ours, <span className="font-serif font-normal text-rose italic">not mine.</span>
          </>
        }
        lead="The best thing a dating app can do is work. When it does, VYBE turns into somewhere that holds your plans and memories — built from the start to be just as good for you if it ends."
        aside={
          <Phone label="Couple Mode: shared plans and milestones" className="-rotate-2">
            <CoupleScreen />
          </Phone>
        }
      >
        <ButtonLink href="/#waitlist">Join the waitlist</ButtonLink>
      </PageIntro>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, body], index) => (
            <Reveal key={title} delay={(index % 3) * 90} className="rounded-4xl border border-line bg-white p-8">
              <Mark size={32} />
              <h2 className="mt-6 text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand/70 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <Eyebrow>Designed for the hardest case</Eyebrow>
            <h2 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
              Every Couple Mode feature is tested against one question: what if it ends badly?
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["Two-sided to start", "Nobody can declare a relationship on someone else's behalf."],
              ["One-sided to leave", "Either of you can exit, instantly, without permission and without a reason."],
              [
                "Separated by default",
                "Access is revoked both ways, reminders are cancelled, and your data leaves with you.",
              ],
            ].map(([title, body], index) => (
              <Reveal key={title} delay={index * 100} className="rounded-4xl bg-ink p-8 text-cream">
                <span className="font-serif text-5xl text-amber italic">{index + 1}</span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-cream/65">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Couple Mode questions." />
      <WaitlistSection />
    </>
  );
}
