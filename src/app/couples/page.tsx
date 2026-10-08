import { Mark } from "@/components/brand/mark";
import { CoupleScreen, Phone, SurpriseScreen } from "@/components/phone/phone";
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
    "Couple Mode on VYBE: date nights and surprises, anniversaries and wishlists, guided programmes, shared goals, double dates and checked sitters — switched on by both of you, with private notes that stay private and an exit that protects you both.",
  path: "/couples",
});

/* The copy follows the app's (vybe-mobile/lib/presentation/couple/**). */
const groups: { name: string; items: [string, string][] }[] = [
  {
    name: "Start together",
    items: [
      [
        "Met somewhere else? Invite them",
        "You get a code to send your partner. It works once, for 7 days, and your couple space opens when they enter it.",
      ],
      [
        "Met here? Propose from the chat",
        "They see exactly what changes before they decide. If they don't answer, the proposal quietly expires.",
      ],
      ["Off the market, quietly", "Both profiles leave discovery. No announcements, no new likes."],
    ],
  },
  {
    name: "Small things, every week",
    items: [
      ["This week, together", "Five quick ratings each, then see your week side by side."],
      ["Questions for two", "Answer on your own. Your partner sees your answers only once they've answered too."],
      ["Appreciation jar", "Thank-yous from your partner collect here, for reading on the hard days."],
    ],
  },
  {
    name: "Date nights",
    items: [
      [
        "A rhythm that holds",
        "Pick a rhythm and VYBE brings ideas before every one. Nothing is booked until you both say yes.",
      ],
      [
        "Surprise mode",
        "You pick the place. They agree to the evening and the dress code, and find out where when you choose.",
      ],
      ["A sitter for date night", "Sitters our team has met, with the checks we've done. Ask to be put in touch."],
    ],
  },
  {
    name: "Milestones & gifts",
    items: [
      [
        "Anniversaries, remembered",
        "Two weeks before, and again three days before — with an idea or two. Only your partner is reminded about your birthday.",
      ],
      [
        "Wishlists and sizes",
        "Add your sizes so a present always fits. They never see what you've picked from theirs.",
      ],
      ["Shared memories", "Each photo belongs to whoever added it. They can download or delete their own, any time."],
    ],
  },
  {
    name: "Growing together",
    items: [
      [
        "Guided programmes",
        "Before we marry, fighting fair, money as a team. Short sessions you each answer on your own, at your own pace.",
      ],
      ["Our agreements", "Each session ends with one thing you agree on, kept where you can both look back at it."],
      [
        "Shared goals",
        "Rent upfront, a wedding, a trip to Calabar, a 10k: set something to work towards, and see it move.",
      ],
    ],
  },
  {
    name: "Life around you",
    items: [
      [
        "Friends and double dates",
        "Connect with another couple you know, then suggest an evening for the four of you.",
      ],
      ["Experiences for two", "Classes, activities and staycations from places we've partnered with."],
      [
        "Talk to a counsellor",
        "Every counsellor listed has had their credentials checked by our team. Ask to be put in touch, privately.",
      ],
    ],
  },
];

const faqs: FaqItem[] = [
  {
    q: "Can one person turn on Couple Mode?",
    a: "No. One of you proposes or sends an invitation, and the other confirms separately. If it isn't answered it simply expires, and declining is private — they only see that it's no longer open.",
  },
  {
    q: "We didn't meet on VYBE. Can we still use it?",
    a: "Yes. Invite your partner from the Couple tab and send them the code. It works once, for 7 days. Only a fingerprint of the code is stored, so if you lose it you get a new one rather than seeing the old one again.",
  },
  {
    q: "What happens if we break up?",
    a: "Either of you can leave Couple Mode at any time, immediately, without the other's permission. Shared plans, milestones and shared notes close for both of you, each of you keeps your own contributions and history, and neither of you gains access to the other's private notes, location or payment details.",
  },
  {
    q: "Can I leave without my partner being notified?",
    a: "Yes. Choose to leave quietly and they get no notification, email or alert — they find out in the app, the next time they open it. If you don't feel safe, you can also ask our safety team to contact you, privately. We contact no one else.",
  },
  {
    q: "Does my partner see my answers in a programme?",
    a: "Only once you've both answered. Until then, nothing shows what either of you said, and you can still change your answers. Intimacy questions only appear if you both turn them on.",
  },
  {
    q: "How are counsellors and sitters checked?",
    a: "Our team checks every counsellor's credentials, and meets every sitter and shows you the date of each check, before anyone is listed. You ask to be put in touch and we arrange the introduction. Your contact details and note are erased on a fixed schedule once the request is closed.",
  },
  {
    q: "Do our photos get used for anything?",
    a: "No. Memories, notes and answers are never used for recommendations, advertising or training models.",
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
        lead="The best thing a dating app can do is work. When it does, VYBE turns into somewhere for your date nights, milestones and the work of staying close — built from the start to be just as good for you if it ends."
        aside={
          <Phone label="Couple Mode: shared plans and milestones" className="-rotate-2">
            <CoupleScreen />
          </Phone>
        }
      >
        <ButtonLink href="/#waitlist">Join the waitlist</ButtonLink>
      </PageIntro>

      <section aria-label="What Couple Mode does" className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.name} delay={(index % 3) * 90} className="rounded-4xl border border-line bg-white p-8">
              <div className="flex items-center gap-3">
                <Mark size={28} />
                <h2 className="text-xl font-bold">{group.name}</h2>
              </div>
              <dl className="mt-6 space-y-5">
                {group.items.map(([title, body]) => (
                  <div key={title}>
                    <dt className="font-semibold">{title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">{body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="surprise-title" className="relative overflow-hidden px-5 pb-24 sm:px-8 sm:pb-32">
        <div
          className="pointer-events-none absolute top-1/4 -right-40 size-[520px] rounded-full bg-amber/20 blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Date night</Eyebrow>
            <h2 id="surprise-title" className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
              Keep the evenings coming.{" "}
              <span className="font-serif font-normal text-rose italic">Keep some of them a surprise.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Every week, every other week or once a month — whatever rhythm you pick, ideas arrive before each one.
              Plan it together, or plan it as a surprise: they agree to the evening and the dress code, and the venue
              stays yours until you reveal it. If they look early, you&rsquo;re told.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
              Either of you can skip one. Nothing is booked or paid until you both say yes.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex justify-center">
            <Phone label="A surprise date night" className="rotate-2">
              <SurpriseScreen />
            </Phone>
          </Reveal>
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
                "Access is revoked both ways, reminders and surprises are cancelled, and your data leaves with you.",
              ],
            ].map(([title, body], index) => (
              <Reveal key={title} delay={index * 100} className="rounded-4xl bg-ink p-8 text-cream">
                <span className="font-serif text-5xl text-amber italic">{index + 1}</span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-cream/65">{body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 grid gap-6 rounded-4xl border border-plum/15 bg-white p-8 sm:p-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-rose uppercase">Discreet support</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">
                If you don&rsquo;t feel safe, you can go quietly.
              </h3>
            </div>
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                Leave quietly and your partner gets no notification, email or alert — they find out in the app. Shared
                things close for both of you straight away; your own notes are still yours.
              </p>
              <p>
                From the same screen you can ask our safety team to contact you, the way you choose. Only our team sees
                the request, we contact no one else, and we don&rsquo;t leave voicemails or messages others might see.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={faqs} title="Couple Mode questions." />
      <WaitlistSection />
    </>
  );
}
