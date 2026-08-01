export type NavigationItem = {
  label: string;
  href: string;
};

const optionalUrl = (
  value: string | undefined,
  allowedProtocols: ReadonlyArray<string> = ["https:", "http:"],
) => {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const parsed = new URL(candidate);
    return allowedProtocols.includes(parsed.protocol) ? parsed.toString() : null;
  } catch {
    return null;
  }
};

const defaults = {
  airbnbUrl: "https://www.airbnb.com/rooms/27705702",
  areaMapUrl: "https://maps.app.goo.gl/2exe4A7Uad8qCo5f9",
  contactUrl: "tel:+639099493593",
} as const;

export const siteConfig = {
  name: "Juwan’s Place",
  shortName: "Juwan’s",
  /**
   * The canonical origin. Open Graph and Twitter card images are declared as
   * paths, and a crawler cannot fetch a path — Next has to resolve them against
   * an absolute origin, and without one it falls back to localhost, which is
   * what the build has been warning about. Overridable so preview deployments
   * describe themselves rather than production.
   */
  url:
    optionalUrl(process.env.NEXT_PUBLIC_SITE_URL, ["https:"]) ??
    "https://juwansplace.com",
  location: "Lapu-Lapu City, Central Visayas, Philippines",
  description:
    "A welcoming three-bedroom entire home for families, friends, tourists, and working travelers exploring Mactan and Cebu.",
  airbnbUrl: optionalUrl(
    process.env.NEXT_PUBLIC_AIRBNB_URL || defaults.airbnbUrl,
  ),
  matterportUrl: optionalUrl(process.env.NEXT_PUBLIC_MATTERPORT_URL),
  areaMapUrl: optionalUrl(
    process.env.NEXT_PUBLIC_AREA_MAP_URL || defaults.areaMapUrl,
  ),
  contactUrl: optionalUrl(
    process.env.NEXT_PUBLIC_CONTACT_URL || defaults.contactUrl,
    ["https:", "http:", "tel:"],
  ),
  contactDisplay: "0909 949 3593",
  // "The House" rather than "The Home": next to the landing page's "Home" the
  // two labels were indistinguishable at a glance.
  navigation: [
    { label: "Home", href: "/" },
    { label: "The House", href: "/the-house" },
    { label: "3D Tour", href: "/#tour" },
    { label: "Location", href: "/location" },
    { label: "House Rules", href: "/house-rules" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavigationItem[],
  footerNavigation: [
    { label: "Home", href: "/" },
    { label: "The House", href: "/the-house" },
    { label: "Location", href: "/location" },
    { label: "House Rules", href: "/house-rules" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavigationItem[],
  quickLinks: [
    { label: "Book on Airbnb", href: "#book" },
    { label: "Airport Pickup", href: "/the-house#services" },
    { label: "Transportation", href: "/the-house#services" },
    { label: "Pet-Friendly Notes", href: "/house-rules#pets" },
    { label: "3D Tour", href: "/#tour" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavigationItem[],
  legalNavigation: [
    { label: "Privacy", href: "/privacy" },
    { label: "House Rules", href: "/house-rules" },
    { label: "Booking Safety", href: "/booking-safety" },
    { label: "Accessibility", href: "/accessibility" },
  ] satisfies NavigationItem[],
  socialLinks: [] as NavigationItem[],
} as const;
