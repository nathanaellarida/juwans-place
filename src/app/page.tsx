import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomeIntro } from "@/components/HomeIntro";
import { HomeSections } from "@/components/HomeSections";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <HomeSections />
    </>
  );
}
