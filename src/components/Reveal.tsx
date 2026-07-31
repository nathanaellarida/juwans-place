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
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const elements = root.current.querySelectorAll("[data-reveal-item]");
    const targets = elements.length ? elements : [root.current];
    const context = gsap.context(() => {
      gsap.from(targets, {
        y: motion.reveal.y,
        opacity: 0,
        duration: motion.reveal.duration,
        stagger: stagger ?? motion.reveal.stagger,
        ease: motion.easing.reveal,
        scrollTrigger: {
          trigger: root.current,
          start: motion.reveal.start,
          once: true,
        },
      });
    }, root);

    return () => context.revert();
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
