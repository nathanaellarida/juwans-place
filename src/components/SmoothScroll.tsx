"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, prefersReducedMotion } from "@/lib/motion";

export function SmoothScroll() {
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

  return null;
}
