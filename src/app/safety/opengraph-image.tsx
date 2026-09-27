import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "VYBE safety centre";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Safety centre", title: "Safety you set up while you're calm." });
}
