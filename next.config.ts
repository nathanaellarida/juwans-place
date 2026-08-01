import type { NextConfig } from "next";

/**
 * The bare domain is canonical — it is what the sitemap, robots host and every
 * canonical tag point at. Both addresses resolve, so without this the same page
 * is served at two origins and search engines have to guess which one counts.
 *
 * Kept here rather than as a host dashboard setting so it lives with the code:
 * reviewable, and it survives the project being rebuilt or moved.
 */
const CANONICAL_HOST = "juwansplace.com";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
