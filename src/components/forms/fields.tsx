import { startTransition, type ComponentProps, type ReactNode } from "react";

type Tone = "light" | "dark";

const inputClass = (tone: Tone, invalid: boolean) =>
  `w-full rounded-2xl border px-4 py-3.5 text-[15px] outline-none transition-all duration-200 ${
    tone === "dark"
      ? "bg-white/5 text-cream placeholder:text-cream/35 focus:bg-white/10"
      : "bg-white text-ink placeholder:text-ink/35"
  } ${
    invalid
      ? "border-rose-400 ring-2 ring-rose/20"
      : tone === "dark"
        ? "border-white/15 focus:border-amber focus:ring-4 focus:ring-amber/15"
        : "border-line focus:border-rose focus:ring-4 focus:ring-rose/10"
  }`;

type FieldShell = { label: string; name: string; error?: string; tone?: Tone; hint?: ReactNode };

function Shell({ label, name, error, tone = "light", hint, children }: FieldShell & { children: ReactNode }) {
  return (
    <div>
      <label
        htmlFor={name}
        className={`mb-2 block text-sm font-semibold ${tone === "dark" ? "text-cream/80" : "text-ink/80"}`}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${name}-error`}
          className={`mt-2 text-sm font-medium ${tone === "dark" ? "text-rose-400" : "text-rose"}`}
        >
          {error}
        </p>
      ) : hint ? (
        <p className={`mt-2 text-xs ${tone === "dark" ? "text-cream/45" : "text-muted"}`}>{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  name,
  error,
  tone = "light",
  hint,
  ...props
}: FieldShell & ComponentProps<"input">) {
  return (
    <Shell label={label} name={name} error={error} tone={tone} hint={hint}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass(tone, !!error)}
        {...props}
      />
    </Shell>
  );
}

export function SelectField({
  label,
  name,
  error,
  tone = "light",
  options,
  placeholder,
  defaultValue = "",
  ...props
}: FieldShell & ComponentProps<"select"> & { options: readonly string[]; placeholder: string }) {
  return (
    <Shell label={label} name={name} error={error} tone={tone}>
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${inputClass(tone, !!error)} appearance-none pr-10`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 opacity-50"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Shell>
  );
}

/** Invisible to people, irresistible to bots. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function Spinner() {
  return <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />;
}

/**
 * React resets a form after its `action` runs, which would wipe what someone typed whenever a
 * field fails validation. Submitting through `onSubmit` keeps their input; the `action` prop
 * stays on the form so it still works before hydration.
 */
export function keepValuesOnSubmit(dispatch: (data: FormData) => void) {
  return (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => dispatch(data));
  };
}
