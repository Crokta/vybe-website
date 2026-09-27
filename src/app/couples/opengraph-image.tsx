import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "VYBE Couple Mode";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Couple Mode", title: "When it works, you don't have to delete us." });
}
