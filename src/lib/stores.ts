/** The app's store listings, from the environment. Empty until they are configured. */
export const appStores = [
  { label: "Download on the App Store", href: process.env.NEXT_PUBLIC_APP_STORE_URL },
  { label: "Get it on Google Play", href: process.env.NEXT_PUBLIC_PLAY_STORE_URL },
].filter((store): store is { label: string; href: string } => Boolean(store.href));
