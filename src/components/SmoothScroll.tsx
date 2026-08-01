"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, prefersReducedMotion } from "@/lib/motion";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: motion.lenis.duration,
      smoothWheel: true,
      anchors: true,
      // Hands a gesture to a nested scroller only when that scroller can
      // actually move on the gesture's axis. The review carousel scrolls
      // horizontally, so sideways gestures pan the row while vertical ones
      // stay with Lenis and keep the page smooth under the cursor.
      allowNestedScroll: true,
    });

    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    // ScrollTrigger caches each trigger's start and end as absolute scroll
    // offsets. A client-side navigation replaces the page without firing the
    // resize or load events it would otherwise refresh on, and media that
    // arrives afterwards moves everything again — so every cached offset
    // belongs to a layout that no longer exists. Refresh once the new page has
    // painted, then keep watching the document for height changes.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    let debounce = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(debounce);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
