import type { ReactNode } from "react";
import { EdgeLines } from "@/components/EdgeLines";
import { PageHero } from "@/components/PageHero";

export function InformationPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        category="property/details"
        preferredFileName="home-detail.jpg"
        label="Juwan’s Place home detail"
      />
      <section className="section-pad relative overflow-hidden bg-[#f7f3ea]">
        <EdgeLines
          left="edgeCurl"
          right="edgeArc"
          leftInk="edge-ink-teal"
          rightInk="edge-ink-sunflower"
        />
        <div className="prose-juwans relative z-10 mx-auto max-w-4xl">
          {children}
        </div>
      </section>
    </>
  );
}
