"use server";

/*
 * The two things a visitor can hand us: a place on the waitlist and a partner enquiry.
 *
 * The platform has no public intake endpoint yet, so each submission is validated here and
 * forwarded to a webhook named in the environment (a CRM, a form backend, or a BFF route once
 * one exists). Without one configured — local development — it is logged instead, so the forms
 * are exercisable end to end without any backend running.
 *
 * Waitlist capture is deliberately minimal: what is needed to select a cohort and nothing more
 * (PRD GRW-01).
 */

export type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string>;
      /** What was submitted, so the form can be refilled — React resets a form after its action runs. */
      values?: Record<string, string>;
    };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (data: FormData, key: string, max = 200) =>
  String(data.get(key) ?? "")
    .trim()
    .slice(0, max);

async function forward(kind: "waitlist" | "partner", payload: Record<string, string>) {
  const url = kind === "waitlist" ? process.env.WAITLIST_WEBHOOK_URL : process.env.PARTNER_WEBHOOK_URL;
  const body = { kind, submittedAt: new Date().toISOString(), ...payload };

  if (!url) {
    console.info(`[vybe-website] ${kind} submission (no webhook configured)`, body);
    return true;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.FORMS_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.FORMS_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok;
  } catch (error) {
    console.error(`[vybe-website] ${kind} webhook failed`, error);
    return false;
  }
}

export async function joinWaitlist(_prev: FormState, data: FormData): Promise<FormState> {
  // Honeypot: a person never sees this field, so anything in it came from a bot. Pretend it worked.
  if (text(data, "company_website")) {
    return { status: "success", message: "You're on the list." };
  }

  const firstName = text(data, "firstName", 60);
  const email = text(data, "email", 254).toLowerCase();
  const area = text(data, "area", 60);
  const consent = data.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "Tell us what to call you.";
  if (!EMAIL.test(email)) fieldErrors.email = "That email doesn't look right.";
  if (!area) fieldErrors.area = "Pick the area closest to you.";
  if (!consent) fieldErrors.consent = "We need your OK to email you about your invite.";

  if (Object.keys(fieldErrors).length) {
    return {
      status: "error",
      message: "A couple of things need fixing.",
      fieldErrors,
      values: { firstName, email, area },
    };
  }

  const ok = await forward("waitlist", { firstName, email, area });
  if (!ok) {
    return {
      status: "error",
      message: "We couldn't save that just now. Please try again in a minute.",
      values: { firstName, email, area },
    };
  }

  return {
    status: "success",
    message:
      area === "Outside Lagos"
        ? `Thanks, ${firstName}. We're starting in Lagos — we'll email you the moment VYBE reaches you.`
        : `Thanks, ${firstName}. You're on the list. We open neighbourhoods one at a time and we'll email when yours is ready — no spam, no guessing.`,
  };
}

export async function submitPartnerEnquiry(_prev: FormState, data: FormData): Promise<FormState> {
  if (text(data, "company_website")) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const name = text(data, "name", 80);
  const email = text(data, "email", 254).toLowerCase();
  const phone = text(data, "phone", 30);
  const business = text(data, "business", 120);
  const category = text(data, "category", 40);
  const area = text(data, "area", 80);
  const message = text(data, "message", 1500);

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Who should we speak to?";
  if (!EMAIL.test(email)) fieldErrors.email = "That email doesn't look right.";
  if (!business) fieldErrors.business = "What's the venue or business called?";
  if (!category) fieldErrors.category = "Pick the closest category.";

  const values = { name, email, phone, business, category, area, message };
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "A couple of things need fixing.", fieldErrors, values };
  }

  const ok = await forward("partner", values);
  if (!ok) {
    return {
      status: "error",
      message: "We couldn't send that just now. Please try again, or email us directly.",
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${name}. Our partnerships team will reach out within two working days about ${business}.`,
  };
}
