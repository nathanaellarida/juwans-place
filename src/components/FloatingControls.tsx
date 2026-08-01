"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Orbit, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/motion";

export function FloatingControls() {
  const [showTop, setShowTop] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let scheduled = false;
    const update = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        setShowTop(window.scrollY > 900);
        setPastHero(window.scrollY > window.innerHeight * 0.5);
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
      {/* These sit in the bottom-right corner, which on a phone is where the
          hero's last call to action and its fine print land. Measured on a
          393x714 viewport — a handset with the browser bar showing — the hero
          needs 704px to clear them and has 694px, so the collision cannot be
          padded away without cutting copy or dropping the 48px tap targets
          below the accessible minimum.

          So on a phone they stand aside until the hero is half scrolled past,
          which is the same deferral the back-to-top control below already
          makes. From `md` up there is room and they never move. The element
          stays in the DOM either way, so the #contact link still resolves. */}
      <div
        id="contact"
        className={`fixed bottom-5 right-4 z-[490] flex flex-col gap-2 transition-opacity duration-300 md:bottom-8 md:right-8 ${
          pastHero ? "" : "max-md:pointer-events-none max-md:opacity-0"
        }`}
      >
        {siteConfig.contactUrl ? (
          <a
            href={siteConfig.contactUrl}
            className="floating-control bg-[#fcba57] text-black"
            aria-label={`Call Juwan’s Place at ${siteConfig.contactDisplay}`}
            title={`Call ${siteConfig.contactDisplay}`}
          >
            <Phone aria-hidden="true" size={21} />
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
