"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Orbit } from "lucide-react";
import { siteConfig } from "@/config/site";

export function VirtualTour() {
  const root = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    if (!siteConfig.matterportUrl || !root.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={root}
      id="tour"
      className="section-pad bg-[#f7f3ea]"
      aria-labelledby="tour-title"
    >
      <div className="mx-auto max-w-[92rem]">
        <p className="eyebrow mb-6 text-[#145c5b]">Explore before you arrive</p>
        <h2 id="tour-title" className="sr-only">
          3D tour of Juwan’s Place
        </h2>
        <div className="relative min-h-[36rem] overflow-hidden rounded-[1.2rem] bg-[#071f27] text-white md:min-h-[46rem]">
          {siteConfig.matterportUrl && nearViewport ? (
            <>
              <iframe
                src={siteConfig.matterportUrl}
                title="Interactive 3D tour of Juwan’s Place"
                className="absolute inset-0 h-full w-full"
                allow="fullscreen; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
              <a
                href={siteConfig.matterportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-lg bg-black px-4 py-3 text-xs font-bold uppercase text-white"
              >
                Open tour externally
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </>
          ) : (
            <TourPlaceholder configured={Boolean(siteConfig.matterportUrl)} />
          )}
        </div>
      </div>
    </section>
  );
}

function TourPlaceholder({ configured }: { configured: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-7 text-center">
      <span
        className="absolute left-1/2 top-1/2 size-[min(82vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9cc6b2]/35"
        aria-hidden="true"
      />
      <span
        className="absolute left-1/2 top-1/2 size-[min(58vw,35rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e45d3a]/50"
        aria-hidden="true"
      />
      <span
        className="absolute left-1/2 top-1/2 size-[min(36vw,21rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d5a82e]/60"
        aria-hidden="true"
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1200 700"
        fill="none"
      >
        <path
          d="M60 590L302 360L502 484L704 204L1140 448"
          stroke="#9CC6B2"
          strokeWidth="2"
        />
        <path
          d="M92 640H1110M228 92V630M552 54V650M910 88V624"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeDasharray="8 16"
        />
      </svg>
      <div className="relative z-10 max-w-3xl">
        <Orbit className="mx-auto mb-7 size-14 text-[#d5a82e]" aria-hidden />
        <p
          className="font-display text-[clamp(4.1rem,8vw,8rem)] uppercase leading-[0.8] tracking-[-0.05em]"
        >
          {configured ? "3D Tour Loading" : "3D Tour Coming Soon"}
        </p>
        <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-white/70 md:text-lg">
          {configured
            ? "The interactive tour will load as this section approaches the viewport."
            : "Our interactive house tour is being prepared. Soon, you’ll be able to explore Juwan’s Place room by room before booking."}
        </p>
      </div>
    </div>
  );
}
