import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary:
    "bg-rose text-white shadow-[0_10px_30px_-10px_rgba(214,69,95,0.7)] hover:bg-plum hover:shadow-[0_14px_36px_-12px_rgba(122,35,72,0.8)]",
  secondary: "bg-ink text-cream hover:bg-plum",
  ghost: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-white/60",
  light: "border border-white/20 text-white hover:border-white/50 hover:bg-white/10",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variants[variant]} disabled:pointer-events-none disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`mb-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${
        tone === "dark" ? "text-rose" : "text-amber"
      }`}
    >
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </p>
  );
}
