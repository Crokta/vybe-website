"use client";

import { useActionState } from "react";

import { submitPartnerEnquiry, type FormState } from "@/app/actions";
import { Mark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";

import { Honeypot, keepValuesOnSubmit, SelectField, Spinner, TextField } from "./fields";

const categories = [
  "Restaurant",
  "Bar / lounge",
  "Café / dessert",
  "Activity / experience",
  "Events / live music",
  "Staycation / hotel",
  "Gifts / florist",
  "Other",
] as const;

const initial: FormState = { status: "idle" };

export function PartnerForm() {
  const [state, action, pending] = useActionState(submitPartnerEnquiry, initial);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center rounded-4xl bg-white p-10 text-center shadow-sm">
        <Mark size={72} animated />
        <p className="mt-6 font-serif text-3xl italic">Enquiry received.</p>
        <p className="mt-3 max-w-sm text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      onSubmit={keepValuesOnSubmit(action)}
      noValidate
      className="relative space-y-5 rounded-4xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(26,10,18,0.35)] sm:p-10"
    >
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Your name"
          name="name"
          defaultValue={values.name}
          autoComplete="name"
          required
          error={errors.name}
        />
        <TextField
          label="Work email"
          name="email"
          defaultValue={values.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField
          label="Venue or business"
          name="business"
          defaultValue={values.business}
          autoComplete="organization"
          required
          error={errors.business}
        />
        <TextField
          label="Phone (optional)"
          name="phone"
          defaultValue={values.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
        />
        <SelectField
          label="Category"
          name="category"
          defaultValue={values.category}
          placeholder="Choose one"
          options={categories}
          required
          error={errors.category}
        />
        <TextField label="Area" name="area" defaultValue={values.area} placeholder="e.g. Victoria Island" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink/80">
          Anything we should know? (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={values.message}
          className="w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] transition-all outline-none focus:border-rose focus:ring-4 focus:ring-rose/10"
          placeholder="Capacity, opening hours, what makes an evening with you special…"
        />
      </div>

      {state.status === "error" && !Object.keys(errors).length && (
        <p role="alert" className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-plum">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          "Start the conversation"
        )}
      </Button>
    </form>
  );
}
