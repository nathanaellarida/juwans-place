"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, prefersReducedMotion } from "@/lib/motion";

/** How often to check whether the new page has stopped resizing, and how long
 *  to keep checking before giving up on a hash target. */
const HASH_POLL_MS = 100;
const HASH_TIMEOUT_MS = 4000;

export function SmoothScroll() {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const instance = new Lenis({
      duration: motion.lenis.duration,
      smoothWheel: true,
      anchors: true,
      // Hands a gesture to a nested scroller only when that scroller can
      // actually move on the gesture's axis. The review carousel scrolls
      // horizontally, so sideways gestures pan the row while vertical ones
      // stay with Lenis and keep the page smooth under the cursor.
      allowNestedScroll: true,
    });
    lenis.current = instance;

    const update = (time: number) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Dropping a hash does not change the pathname, so the reset below never
    // ran for it: going back from /#tour to / left the page sitting at the
    // tour's offset under a URL that says the top of the home page. Lenis owns
    // the position, so the browser's own restoration cannot correct it either.
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== "#") return;
      instance.scrollTo(0, { immediate: true, force: true });
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      gsap.ticker.remove(update);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    // Lenis owns the scroll position and re-applies its own value on the next
    // frame, so the router's reset gets undone and the new page opens wherever
    // the last one was left — clamped to the shorter document, which lands on
    // the footer. Put it back to the top ourselves.
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

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

    // A cross-page link like /the-house#services never reached its section: the
    // router does not scroll for a hash it arrives with, and Lenis owns the
    // position anyway. Scrolling straight away does not work either — the new
    // page is still laid out at the old one's height, so Lenis clamps the jump
    // to that shorter document. Wait for the height to stop moving, then jump
    // once, and drop it entirely if the visitor starts scrolling first.
    const hash = window.location.hash;
    let hashTimer = 0;
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };

    if (hash && hash !== "#") {
      window.addEventListener("wheel", cancel, { once: true, passive: true });
      window.addEventListener("touchstart", cancel, { once: true, passive: true });
      window.addEventListener("keydown", cancel, { once: true });

      let lastHeight = -1;
      let quietPasses = 0;
      let waited = 0;

      const tick = () => {
        if (cancelled) return;
        const height = document.documentElement.scrollHeight;
        if (height === lastHeight) quietPasses += 1;
        else {
          quietPasses = 0;
          lastHeight = height;
        }

        const target = document.querySelector(hash);
        if (quietPasses >= 2 && target instanceof HTMLElement) {
          ScrollTrigger.refresh();
          lenis.current?.scrollTo(target, { immediate: true, force: true });
          return;
        }

        waited += HASH_POLL_MS;
        if (waited < HASH_TIMEOUT_MS) hashTimer = window.setTimeout(tick, HASH_POLL_MS);
      };
      hashTimer = window.setTimeout(tick, HASH_POLL_MS);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(debounce);
      window.clearTimeout(hashTimer);
      cancelled = true;
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
