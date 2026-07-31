import type { Metadata } from "next";
import { EdgeLines } from "@/components/EdgeLines";
import { GalleryClient } from "@/components/GalleryClient";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse approved photographs of the bedrooms and shared spaces at Juwan’s Place.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="The property, room by room"
        title={
          <>
            A closer
            <br />
            look.
          </>
        }
        description="Approved property photographs are organized automatically so the gallery stays complete as new images are added."
        category="property/details"
        preferredFileName="home-detail.jpg"
        label="Juwan’s Place interior detail"
      />
      <section className="section-pad relative overflow-hidden bg-[#f7f3ea]">
        <EdgeLines
          left="edgeRibbon"
          right="edgeFold"
          leftInk="edge-ink-coral"
          rightInk="edge-ink-teal"
        />
        <div className="relative z-10 mx-auto max-w-[92rem]">
          <GalleryClient />
        </div>
      </section>
    </>
  );
}
