import { Mark } from "@/components/brand/mark";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] flex-col items-center justify-center px-5 pt-24 text-center">
      <Mark size={96} animated />
      <h1 className="mt-10 text-5xl font-bold tracking-tight sm:text-6xl">
        Two paths, <span className="font-serif font-normal text-rose italic">no table.</span>
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        This page doesn&rsquo;t exist — but the evening can still be saved.
      </p>
      <ButtonLink href="/" className="mt-10">
        Back to VYBE
      </ButtonLink>
    </section>
  );
}
