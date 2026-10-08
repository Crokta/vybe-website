import { PageIntro } from "@/components/sections/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy commitments",
  description:
    "The privacy commitments VYBE is built on: minimal data, no background location tracking, no selling your data, clear consent, published retention periods, and pause, export and delete as ordinary controls that reach every part of VYBE.",
  path: "/privacy",
});

/*
 * These are the product's commitments as specified in the PRD, written for members. The full
 * privacy policy is a legal document and is published separately once approved by Compliance.
 */
const commitments = [
  [
    "We collect what we need, and say why",
    "Every piece of information we ask for has a stated purpose. The waitlist asks for three things; the app asks for more only when a feature needs it.",
  ],
  [
    "Your location stays coarse",
    "Other members see a distance band, never your position. There is no background or continuous tracking. Precise location is only used for a date check-in you switch on, and only for as long as it runs.",
  ],
  [
    "Biometrics are for verification only",
    "Your liveness check proves you're a real person. It's stored as a result plus a protected reference, and nobody at VYBE can look at raw material without a logged, justified reason.",
  ],
  [
    "No pre-ticked boxes",
    "Consent is asked for clearly, one purpose at a time, and can be withdrawn as easily as it was given.",
  ],
  [
    "We don't sell your data",
    "Not to advertisers, not to partners. Venues see what they need to honour your booking — nothing more.",
  ],
  [
    "Your memories aren't training data",
    "Couple Mode photos and notes are never used for recommendations, advertising or model training.",
  ],
  [
    "Shared doesn't mean merged",
    "In Couple Mode each of you keeps your own account. Your private notes, location and payment details never become your partner's, and if you leave, what you contributed leaves with you.",
  ],
  [
    "Nothing kept longer than its reason",
    "Every kind of data has a published retention period and a reason for it. Sensitive requests — to our safety team, or to be introduced to a counsellor or sitter — have their contact details erased on a fixed schedule once they're closed.",
  ],
  [
    "Deleted means deleted, everywhere",
    "When you close your account, every part of VYBE holding your data is told to remove it, and each has to confirm it did — or state the legal reason it must keep something, like a payment record. If one doesn't confirm in time, it's flagged for our team.",
  ],
  ["Pause, export, delete", "These are ordinary buttons in the app, not a support ticket. Your exit is yours."],
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy commitments", path: "/privacy" },
        ])}
      />

      <PageIntro
        eyebrow="Privacy"
        title={
          <>
            Known, <span className="font-serif font-normal text-rose italic">not exposed.</span>
          </>
        }
        lead="You should be verified — and so should everyone else — without handing over your life. These are the commitments VYBE is built on."
      />

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-4xl">
          <ol className="divide-y divide-line border-y border-line">
            {commitments.map(([title, body], index) => (
              <Reveal as="li" key={title} className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr]">
                <span className="font-serif text-4xl text-rose/70 italic">{index + 1}</span>
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 rounded-3xl bg-sand p-6 text-sm leading-relaxed text-ink/75">
            Our full privacy policy, compliant with the Nigeria Data Protection Act, will be published here before the
            app opens to members. For any question or data request in the meantime, write to{" "}
            <a
              href={`mailto:${site.email.privacy}`}
              className="font-semibold text-rose underline-offset-4 hover:underline"
            >
              {site.email.privacy}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
