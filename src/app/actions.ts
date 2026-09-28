"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

/*
 * The two things a visitor can hand us: a place on the waitlist and a partner enquiry.
 *
 * Each is validated here, then handed to the admin BFF's intake routes through the gateway —
 * `POST /admin/v1/intake/waitlist` (Identity owns the waitlist) and
 * `POST /admin/v1/intake/partner-enquiries` (Marketplace owns enquiries). Operations works
 * both in the backoffice under Leads.
 *
 * This runs on the server, so the intake key never reaches a browser. With `VYBE_API_URL`
 * unset — the site on its own, without the platform running — submissions are logged
 * instead, so the forms still work end to end.
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

type IntakeOutcome = "ok" | "rate_limited" | "failed";

const intakePaths = {
  waitlist: "/admin/v1/intake/waitlist",
  partner: "/admin/v1/intake/partner-enquiries",
} as const;

/**
 * A stable, anonymous handle for the visitor, sent as X-Device-Id. The platform partitions its
 * write rate limit by it, so one noisy visitor is slowed without slowing everyone else who
 * reaches the platform through this server. Hashed: the platform never sees the address.
 */
async function visitorHandle() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const digest = createHash("sha256")
    .update(`${ip}|${h.get("user-agent") ?? ""}|${process.env.VYBE_INTAKE_KEY ?? ""}`)
    .digest("hex");
  return `web-${digest.slice(0, 32)}`;
}

async function intake(kind: keyof typeof intakePaths, payload: Record<string, string>): Promise<IntakeOutcome> {
  const base = process.env.VYBE_API_URL?.replace(/\/$/, "");
  const body = { ...payload, source: "website" };

  if (!base) {
    console.info(`[vybe-website] ${kind} submission (VYBE_API_URL not set, not sent)`, body);
    return "ok";
  }

  try {
    const response = await fetch(`${base}${intakePaths[kind]}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-vybe-intake-key": process.env.VYBE_INTAKE_KEY ?? "",
        "x-device-id": await visitorHandle(),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (response.ok) return "ok";
    if (response.status === 429) return "rate_limited";

    console.error(`[vybe-website] ${kind} intake refused`, response.status, await response.text().catch(() => ""));
    return "failed";
  } catch (error) {
    console.error(`[vybe-website] ${kind} intake unreachable`, error);
    return "failed";
  }
}

const tooMany = "You've tried a few times in a row. Give it a minute and try again.";

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

  const outcome = await intake("waitlist", { firstName, email, area });
  if (outcome !== "ok") {
    return {
      status: "error",
      message: outcome === "rate_limited" ? tooMany : "We couldn't save that just now. Please try again in a minute.",
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

  const outcome = await intake("partner", values);
  if (outcome !== "ok") {
    return {
      status: "error",
      message:
        outcome === "rate_limited"
          ? tooMany
          : "We couldn't send that just now. Please try again, or email us directly.",
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${name}. Our partnerships team will reach out within two working days about ${business}.`,
  };
}
