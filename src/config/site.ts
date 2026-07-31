export type NavigationItem = {
  label: string;
  href: string;
};

const optionalUrl = (value: string | undefined) => {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? parsed.toString()
      : null;
  } catch {
    return null;
  }
};

export const siteConfig = {
  name: "Juwan’s Place",
  shortName: "Juwan’s",
  location: "Lapu-Lapu City, Central Visayas, Philippines",
  description:
    "A welcoming three-bedroom entire home for families, friends, tourists, and working travelers exploring Mactan and Cebu.",
  airbnbUrl: optionalUrl(process.env.NEXT_PUBLIC_AIRBNB_URL),
  matterportUrl: optionalUrl(process.env.NEXT_PUBLIC_MATTERPORT_URL),
  areaMapUrl: optionalUrl(process.env.NEXT_PUBLIC_AREA_MAP_URL),
  contactUrl: optionalUrl(process.env.NEXT_PUBLIC_CONTACT_URL),
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
