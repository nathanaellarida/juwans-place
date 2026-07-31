import type { ReactNode } from "react";
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
      <section className="section-pad bg-[#f7f3ea]">
        <div className="prose-juwans mx-auto max-w-4xl">{children}</div>
      </section>
    </>
  );
}
