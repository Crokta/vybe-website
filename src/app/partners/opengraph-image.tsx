import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Partner with VYBE";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "For venues & partners", title: "Be the place they agreed on." });
}
