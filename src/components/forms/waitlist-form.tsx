"use client";

import { useActionState } from "react";

import { joinWaitlist, type FormState } from "@/app/actions";
import { Mark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";

import { Honeypot, keepValuesOnSubmit, SelectField, Spinner, TextField } from "./fields";

export const lagosAreas = [
  "Lekki / Ajah",
  "Victoria Island",
  "Ikoyi",
  "Yaba / Surulere",
  "Ikeja / GRA",
  "Gbagada / Magodo",
  "Somewhere else in Lagos",
  "Outside Lagos",
] as const;

const initial: FormState = { status: "idle" };

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-4xl border border-white/10 bg-white/5 p-10 text-center"
      >
        <Mark size={72} animated />
        <p className="mt-6 font-serif text-3xl text-cream italic">You&rsquo;re in the queue.</p>
        <p className="mt-3 max-w-sm text-cream/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={keepValuesOnSubmit(action)} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          tone="dark"
          label="First name"
          name="firstName"
          defaultValue={values.firstName}
          autoComplete="given-name"
          placeholder="Adaeze"
          required
          error={errors.firstName}
        />
        <TextField
          tone="dark"
          label="Email"
          name="email"
          defaultValue={values.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          error={errors.email}
        />
      </div>
      <SelectField
        tone="dark"
        label="Where are you based?"
        name="area"
        defaultValue={values.area}
        placeholder="Choose your area"
        options={lagosAreas}
        required
        error={errors.area}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/70">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-rose"
            aria-invalid={errors.consent ? true : undefined}
          />
          <span>
            Email me about my invite. That&rsquo;s it — no newsletters unless I ask, and I can leave any time.
          </span>
        </label>
        {errors.consent && <p className="mt-2 text-sm font-medium text-rose-400">{errors.consent}</p>}
      </div>

      {state.status === "error" && !Object.keys(errors).length && (
        <p role="alert" className="rounded-2xl bg-rose/15 px-4 py-3 text-sm text-rose-100">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Spinner /> Saving your spot…
          </>
        ) : (
          <>Request an invite</>
        )}
      </Button>
    </form>
  );
}
