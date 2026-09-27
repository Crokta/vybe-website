import { ImageResponse } from "next/og";

import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * The share card, drawn from the brand: ink ground, the mark, a headline. Each route's
 * `opengraph-image.tsx` calls this with its own words so a shared link says where it goes.
 */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: `radial-gradient(circle at 85% 10%, ${site.colors.plum} 0%, ${site.colors.ink} 55%)`,
        color: site.colors.cream,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="72" height="72" viewBox="0 0 120 120">
          <path d="M30 30 L60 80" stroke={site.colors.plum} strokeWidth="17" strokeLinecap="round" fill="none" />
          <path d="M90 21 L60 80" stroke={site.colors.rose} strokeWidth="17" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="80" r="10.5" fill={site.colors.amber} />
        </svg>
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 7 }}>VYBE</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: site.colors.amber,
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, maxWidth: 980 }}>{title}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,247,242,0.6)" }}>
        <div>{site.tagline}</div>
        <div>{site.url.replace(/^https?:\/\//, "")}</div>
      </div>
    </div>,
    ogSize,
  );
}
