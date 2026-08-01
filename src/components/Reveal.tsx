"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/styles";

type RevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Reveal({ children, className, stagger }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || prefersReducedMotion()) return;
    // Without an observer there is no safe way to hide the content first, so
    // leave it alone: visible and unanimated beats invisible.
    if (typeof IntersectionObserver === "undefined") return;

    const items = container.querySelectorAll("[data-reveal-item]");
    const targets: Element[] = items.length ? [...items] : [container];

    // Deliberately an IntersectionObserver rather than a ScrollTrigger. These
    // tweens start the content at opacity 0, so a trigger that never fires
    // leaves the block invisible for good — which is what stranded the footer
    // on route changes. ScrollTrigger caches absolute scroll positions at
    // creation, and a client-side navigation swaps the whole page under it
    // with no resize or load event to invalidate them; late images and pinned
    // sections then move everything again. The observer reports real geometry
    // each time the browser recomputes it, so it cannot go stale.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: motion.reveal.duration,
          stagger: stagger ?? motion.reveal.stagger,
          ease: motion.easing.reveal,
          overwrite: "auto",
        });
      },
      // Mirrors the previous "top 84%" start: hold until the block has cleared
      // the bottom sixth of the viewport.
      { rootMargin: "0px 0px -16% 0px" },
    );

    gsap.set(targets, { y: motion.reveal.y, opacity: 0 });
    observer.observe(container);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "opacity,transform" });
    };
  }, [stagger]);

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  );
}

export function Parallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { yPercent: -motion.parallax.travelPercent },
        {
          yPercent: motion.parallax.travelPercent,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: motion.parallax.scrub,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
