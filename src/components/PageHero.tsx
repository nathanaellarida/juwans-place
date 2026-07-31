import type { ReactNode } from "react";
import { ImagePanel } from "@/components/ImagePanel";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  category: string;
  preferredFileName?: string;
  label: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  category,
  preferredFileName,
  label,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[76vh] bg-[#f7f3ea] p-2.5 md:p-4">
      <div className="relative flex min-h-[calc(76vh-1.25rem)] items-end overflow-hidden rounded-[1.1rem] bg-[#102f3e] p-[clamp(1.5rem,5vw,5rem)] text-white">
        <ImagePanel
          category={category}
          preferredFileName={preferredFileName}
          alt={label}
          label={`Add ${label.toLowerCase()} photography`}
          className="absolute inset-0"
          sizes="100vw"
          overlay
          priority
        />
        <div className="relative z-10 grid w-full gap-8 md:grid-cols-[1.35fr_0.65fr] md:items-end">
          <div>
            <p className="eyebrow mb-7 text-[#d5a82e]">{eyebrow}</p>
            <h1 className="page-title">{title}</h1>
          </div>
          <p className="body-large max-w-xl text-white/80">{description}</p>
        </div>
      </div>
    </section>
  );
}
