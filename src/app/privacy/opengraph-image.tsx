import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "VYBE privacy commitments";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Privacy", title: "Known, not exposed." });
}
