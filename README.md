# vybe-website

The public site: the proposition, the waitlist, the safety standards and the partner enquiry
(PRD §8 — "marketing pages" are the only member-facing web surface; members use the app).

Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript · pnpm.

```bash
cp .env.example .env.local
pnpm install
pnpm dev            # http://localhost:3300 (Grafana has :3000, Tempo :3200)
```

| Script | |
|---|---|
| `pnpm dev` | Dev server on `$PORT`, default 3300 |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` · `pnpm typecheck` · `pnpm format` | ESLint · `next typegen` + `tsc` · Prettier (with class sorting) |

Don't run `pnpm build` while `pnpm dev` is running — they share `.next/` and the dev server
starts serving stale output.

## Brand

Nothing here is redrawn. The palette and the mark come from the member app
(`vybe-mobile/lib/presentation/brand/vybe_mark.dart`) and the assets from
`vybe-mobile/assets/brand/`:

| Token | Hex | Role |
|---|---|---|
| `plum` | `#7A2348` | The mark's left path |
| `rose` | `#D6455F` | The right path; primary action colour |
| `amber` | `#F5A65B` | The meeting point; highlights on dark |
| `ink` | `#1A0A12` | The ground; dark sections |

They are Tailwind theme tokens in `src/app/globals.css` (`bg-rose`, `text-plum`, …).
`src/components/brand/mark.tsx` draws the mark from the same geometry as the app's painter,
so it is crisp at any size and can go monochrome. If the mark changes, change it in
`tools/brand/mark.py` and re-copy `public/brand/`, `src/app/icon.svg` and `src/app/apple-icon.png`.

Type: Manrope (the closest open grotesque to the wordmark's Avenir Next) and Instrument Serif
for the italic accents.

The phone screens on the site are HTML, not screenshots: `src/components/phone/phone.tsx`.
Their copy follows the app's; the people and venues in them are illustrative.

## SEO

- **Metadata** — defaults in `src/app/layout.tsx`; each page calls `pageMetadata()` from
  `src/lib/seo.ts` for its title, description, canonical URL and Open Graph/Twitter fields.
- **Share images** — every route has an `opengraph-image.tsx` rendered at build time from one
  template (`src/lib/og.tsx`).
- **Structured data** — Organization and WebSite on every page, MobileApplication on the home
  page, FAQPage wherever the FAQ appears, BreadcrumbList on inner pages.
- **`/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`** — generated from `src/lib/site.ts`.
  Add a page there and it's in the sitemap.
- **Indexing is off unless `VYBE_ENV=production`** — previews and staging serve a disallow-all
  `robots.txt` so they never compete with the live site.

Set `NEXT_PUBLIC_SITE_URL` to the real origin before building for production; canonical URLs
and share images are resolved against it.

## Forms

The waitlist and partner enquiry are Server Actions (`src/app/actions.ts`). A valid submission
is sent through the gateway to the admin BFF's intake routes:

| Form | Route | Owned by |
|---|---|---|
| Waitlist | `POST /admin/v1/intake/waitlist` | `vybe-identity-service` (GRW-01) |
| Partner enquiry | `POST /admin/v1/intake/partner-enquiries` | `vybe-marketplace-service` |

Each call carries `X-Vybe-Intake-Key` (from `VYBE_INTAKE_KEY`, server-side only) and an
`X-Device-Id` derived from a hash of the visitor, so the platform's rate limit applies per
visitor rather than to the whole website. Operations works both lists in the backoffice under
**Leads**.

With `VYBE_API_URL` unset, submissions are logged to the server console instead, so the site
runs on its own. Both forms have a honeypot field against bots. The waitlist asks for first
name, email and area — the minimum for cohort selection.

## Docker

```bash
docker build -t vybe-website --build-arg NEXT_PUBLIC_SITE_URL=https://vybe.crokta.com .
docker run -p 3300:3300 -e VYBE_ENV=production vybe-website
```

Multi-stage, standalone output, runs as a non-root user.
