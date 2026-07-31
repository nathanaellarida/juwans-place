import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource/archivo-narrow/400.css";
import "@fontsource/archivo-narrow/700.css";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Juwan’s Place | Entire Home in Lapu-Lapu City",
    template: "%s | Juwan’s Place",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Juwan’s Place",
    "Lapu-Lapu City entire home",
    "Mactan family stay",
    "Cebu vacation rental",
    "Airbnb Lapu-Lapu City",
  ],
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: siteConfig.name,
    title: "Juwan’s Place | Your Home Base in Lapu-Lapu",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Juwan’s Place | Your Home Base in Lapu-Lapu",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f3ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteShell />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
