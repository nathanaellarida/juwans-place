"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Orbit } from "lucide-react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/motion";

export function FloatingControls() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let scheduled = false;
    const update = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        setShowTop(window.scrollY > 900);
        scheduled = false;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div
        id="contact"
        className="fixed bottom-5 right-4 z-[490] flex flex-col gap-2 md:bottom-8 md:right-8"
      >
        {siteConfig.contactUrl ? (
          <a
            href={siteConfig.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-control bg-[#e45d3a] text-white"
            aria-label="Contact Juwan’s Place"
          >
            <MessageCircle aria-hidden="true" size={22} />
          </a>
        ) : null}
        <Link
          href="/#tour"
          className="floating-control group bg-black text-white"
          aria-label="3D tour coming soon"
          title="3D tour coming soon"
        >
          <Orbit
            aria-hidden="true"
            size={23}
            className="transition-transform duration-500 group-hover:rotate-180"
          />
        </Link>
      </div>

      <button
        type="button"
        onClick={goToTop}
        aria-label="Back to top"
        className={`floating-control fixed bottom-5 left-3 z-[490] bg-[#d5a82e] text-black transition-all duration-300 md:bottom-8 md:left-6 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp aria-hidden="true" size={24} />
      </button>
    </>
  );
}
