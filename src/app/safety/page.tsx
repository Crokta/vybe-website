import { CheckInScreen, Phone } from "@/components/phone/phone";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { PageIntro } from "@/components/sections/page-intro";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Safety centre",
  description:
    "How VYBE keeps you safe on and off the app: liveness verification, trusted contacts, timed date check-ins, report and block everywhere, and a staffed Trust & Safety team. Free for every member.",
  path: "/safety",
});

const layers = [
  {
    stage: "Before you match",
    title: "Everyone is who they say they are.",
    items: [
      [
        "Liveness check",
        "Every member proves they're a live person before they can be shown to anyone. Not a photo upload.",
      ],
      ["Honest badges", "A badge says exactly what was checked and nothing more. No vague “trusted” labels."],
      ["Intent up front", "Everyone says what they're looking for, and it filters who they see."],
    ],
  },
  {
    stage: "While you talk",
    title: "Tools where the risk is.",
    items: [
      [
        "Report & block anywhere",
        "From a profile, a chat, a plan or a booking — one step, and they're gone from your VYBE.",
      ],
      ["Moderated messaging", "Harmful content is caught and reviewed. Reports go to real people, not a void."],
      ["Your pace", "Unmatch whenever you like. Nobody is told why."],
    ],
  },
  {
    stage: "On the date",
    title: "Someone would know.",
    items: [
      [
        "Trusted contacts",
        "Choose who, and exactly what they see: venue, time, first name, photo — or less. They don't need the app.",
      ],
      [
        "Timed check-ins",
        "Before, during and after. Miss one and, after a grace period, the escalation you chose kicks in.",
      ],
      ["Accountable venues", "Every venue is contracted and vetted. Public places, real staff, real records."],
    ],
  },
  {
    stage: "After",
    title: "Something went wrong? We act.",
    items: [
      [
        "A real incident process",
        "A staffed Trust & Safety team with on-call cover, clear severity levels and response targets.",
      ],
      ["Appeals", "If we get an enforcement decision wrong, there's a working way to tell us."],
      ["Evidence handled carefully", "Reports are kept securely and only seen by the people who need to see them."],
      [
        "Discreet support",
        "Worried about a partner? Leave Couple Mode without them being notified, and ask our team to contact you the way you choose.",
      ],
    ],
  },
];

const faqs: FaqItem[] = [
  {
    q: "Do I have to pay for any safety features?",
    a: "No. Verification, reporting, blocking, trusted contacts and date check-ins are free for every member. Charging for basic safety is against our own rules.",
  },
  {
    q: "Does my trusted contact need to download VYBE?",
    a: "No. Trusted contacts receive the details you chose to share through a normal channel, like SMS, without installing anything.",
  },
  {
    q: "What happens if I forget to check in?",
    a: "You'll get a clear prompt first, and there's a grace period before anyone is alerted, so a forgotten tap doesn't frighten your contact. You can also extend or cancel a check-in in one action.",
  },
  {
    q: "Can the person I'm meeting see my location?",
    a: "No. Other members only see an approximate distance band. If you turn on live location for a check-in, it's shared with your trusted contacts only — never with the other person — and it stops when the check-in ends.",
  },
  {
    q: "What if the person I'm worried about is my partner?",
    a: "From Couple Mode you can leave quietly — they get no notification, email or alert, and find out in the app — and ask our safety team to contact you, privately. Only our team sees the request, we contact no one else, and we never leave voicemails or messages others might see.",
  },
  {
    q: "Is VYBE an emergency service?",
    a: "No, and we will never claim to be. If you're in immediate danger, call 112 or the Lagos emergency line 767 first.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Safety centre", path: "/safety" },
        ])}
      />

      <PageIntro
        eyebrow="Safety centre"
        title={
          <>
            Safety you set up <span className="font-serif font-normal text-rose italic">while you&rsquo;re calm.</span>
          </>
        }
        lead="You should be able to read exactly what a platform will and won't do before you give it anything. So here it is — no account needed."
        aside={
          <Phone label="A timed date check-in" className="rotate-2">
            <CheckInScreen />
          </Phone>
        }
      >
        <ButtonLink href="/#waitlist">Join the waitlist</ButtonLink>
        <ButtonLink href={`mailto:${site.email.safety}`} variant="ghost">
          Contact Trust &amp; Safety
        </ButtonLink>
      </PageIntro>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {layers.map((layer, index) => (
            <Reveal
              key={layer.stage}
              className="grid gap-8 rounded-[2rem] border border-line bg-white p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-rose uppercase">
                  {String(index + 1).padStart(2, "0")} · {layer.stage}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{layer.title}</h2>
              </div>
              <dl className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {layer.items.map(([title, body]) => (
                  <div key={title}>
                    <dt className="font-bold">{title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-cream sm:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow tone="light">Our promise</Eyebrow>
          <p className="font-serif text-4xl leading-tight italic sm:text-5xl">
            &ldquo;A member must never confuse <span className="text-amber">report this person</span> with{" "}
            <span className="text-rose-400">like this person</span>.&rdquo;
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-cream/65">
            It&rsquo;s a line from our design system, and it&rsquo;s why safety actions in VYBE look different from
            everything else, sit where you need them, and have large, forgiving tap targets — because they&rsquo;re used
            under stress.
          </p>
        </Reveal>
      </section>

      <Faq items={faqs} title="Safety questions." />
      <WaitlistSection title="Ready when you are." />
    </>
  );
}
