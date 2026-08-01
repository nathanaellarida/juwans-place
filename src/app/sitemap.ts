import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Priorities describe what a visitor is here to find, not how much work a page
 * took. The landing page and the house itself are what a booking decision turns
 * on; the legal and policy pages exist to be linked to, not to be found.
 */
const routes = [
  { path: "/", priority: 1 },
  { path: "/the-house", priority: 0.9 },
  { path: "/location", priority: 0.8 },
  { path: "/house-rules", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/booking-safety", priority: 0.4 },
  { path: "/accessibility", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // One timestamp for the whole build. The site is fully prerendered, so every
  // page genuinely was last modified when it was built, and claiming otherwise
  // per-page would be invented precision.
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
