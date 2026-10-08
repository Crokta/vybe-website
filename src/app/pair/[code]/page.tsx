import type { Metadata } from "next";

import { Mark } from "@/components/brand/mark";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { appStores } from "@/lib/stores";

/*
 * What an invitation link opens: vybe.crokta.com/pair/K7M4Q2XP. Couple Mode lives in the app,
 * so this page's job is to hand the code over clearly and say how to use it. Not indexed and
 * not in the sitemap, and the code stays out of the title so it is not saved in history lists.
 */
export const metadata: Metadata = {
  title: "Join your partner",
  description: "Your partner invited you to Couple Mode on VYBE.",
  robots: { index: false, follow: false },
};

const ALPHABET = /^[2-9A-HJKMNP-Z]{8}$/;

/** The code as the app shows it, or null when the link does not carry a usable one. */
function formatCode(raw: string): string | null {
  const cleaned = decodeURIComponent(raw).replace(/[\s-]/g, "").toUpperCase();
  return ALPHABET.test(cleaned) ? `${cleaned.slice(0, 4)}-${cleaned.slice(4)}` : null;
}

const steps = [
  ["Get the VYBE app", "On iPhone or Android. If you already have it, open it."],
  [
    "Sign up and choose “We’re a couple”",
    "You won’t need a dating profile, and nobody will see you in discovery. Everyone does a quick selfie check.",
  ],
  ["Open the Couple tab and tap “I have a code”", "Enter the code above. You’ll see what changes before you say yes."],
];

export default async function PairPage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = formatCode(raw);

  return (
    <section className="relative overflow-hidden px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <div
        className="pointer-events-none absolute -top-40 -left-40 size-[640px] rounded-full bg-amber/20 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <Mark size={88} animated className="mx-auto" />
        <h1 className="mt-10 text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
          Your partner invited you to <span className="font-serif font-normal text-rose italic">Couple Mode.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Shared plans, milestones and date nights for the two of you. It only starts when you say yes, and either of
          you can leave at any time.
        </p>

        {code ? (
          <div className="mx-auto mt-10 max-w-md rounded-4xl bg-ink px-6 py-8 text-cream">
            <p className="text-xs font-bold tracking-[0.2em] text-amber uppercase">Your code</p>
            <p className="mt-3 font-mono text-3xl font-bold tracking-[0.12em] whitespace-nowrap tabular-nums select-all sm:text-5xl">
              {code}
            </p>
            <p className="mt-3 text-sm text-cream/60">Works once, for 7 days from when it was made.</p>
          </div>
        ) : (
          <p className="mx-auto mt-10 max-w-md rounded-3xl bg-sand px-6 py-5 text-ink/80">
            This link doesn&rsquo;t carry a code we recognise. Ask your partner to copy the invitation again from their
            Couple tab.
          </p>
        )}

        <ol className="mx-auto mt-12 max-w-md space-y-4 text-left">
          {steps.map(([title, body], index) => (
            <li key={title} className="flex gap-4 rounded-3xl border border-line bg-white p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-rose text-sm font-bold text-white">
                {index + 1}
              </span>
              <span>
                <strong className="block">{title}</strong>
                <span className="text-sm text-muted">{body}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {appStores.length > 0 ? (
            appStores.map((store) => (
              <ButtonLink key={store.href} href={store.href} variant="secondary">
                {store.label}
              </ButtonLink>
            ))
          ) : (
            <p className="rounded-2xl bg-sand px-5 py-4 text-sm text-ink/75">
              The app is opening to couples in Lagos first. Write to{" "}
              <a href={`mailto:${site.email.hello}`} className="font-semibold text-rose">
                {site.email.hello}
              </a>{" "}
              and we&rsquo;ll send you the download link.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
