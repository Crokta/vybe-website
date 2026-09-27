import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "VYBE — verified dating that ends in a real evening out";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Invite-only · Lagos", title: "Meet someone. Then actually go out." });
}
