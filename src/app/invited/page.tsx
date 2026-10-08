import type { Metadata } from "next";

import { Mark } from "@/components/brand/mark";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { appStores } from "@/lib/stores";

/*
 * Where the invitation email lands. Not indexed and not in the sitemap: it only makes sense to
 * someone holding an invitation. The store buttons appear once their URLs are configured.
 */
export const metadata: Metadata = {
  title: "You're invited",
  description: "Your place on the VYBE waitlist has come up. Here's how to get in.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/invited" },
};

const stores = appStores;

const steps = [
  ["Get the app", "VYBE is on iPhone and Android."],
  ["Sign up with the email we wrote to", "That address is the one your invitation is attached to."],
  ["Take the liveness check", "A few seconds with your camera. Everyone does it — that's the point."],
];

export default function InvitedPage() {
  return (
    <section className="relative overflow-hidden px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
      <div
        className="pointer-events-none absolute -top-40 -right-40 size-[640px] rounded-full bg-rose/15 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <Mark size={88} animated className="mx-auto" />
        <h1 className="mt-10 text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
          Your turn. <span className="font-serif font-normal text-rose italic">Welcome in.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Your place on the waitlist has come up. Three steps and you&rsquo;re meeting people who want the same thing
          you do.
        </p>

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
          {stores.length > 0 ? (
            stores.map((store) => (
              <ButtonLink key={store.href} href={store.href} variant="secondary">
                {store.label}
              </ButtonLink>
            ))
          ) : (
            <p className="rounded-2xl bg-sand px-5 py-4 text-sm text-ink/75">
              The app links are on their way. Reply to your invitation email, or write to{" "}
              <a href={`mailto:${site.email.hello}`} className="font-semibold text-rose">
                {site.email.hello}
              </a>
              , and we&rsquo;ll send them straight to you.
            </p>
          )}
        </div>

        <p className="mt-10 text-sm text-muted">
          Before your first date, have a look at{" "}
          <ButtonLink href="/safety" variant="ghost" className="ml-1 min-h-9! px-4! text-sm!">
            how VYBE keeps you safe
          </ButtonLink>
        </p>
      </div>
    </section>
  );
}
