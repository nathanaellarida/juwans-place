"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { registerScroller } from "@/lib/scrollLock";

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
    // On a phone, hiding and showing the browser bar fires resize while the
    // page is moving under the finger. ScrollTrigger's own resize handler
    // refreshes every trigger, and a refresh mid-scroll recomputes the cached
    // offsets that scrubbed and pinned sections are animating against — which
    // lands as a one-frame jump. This flag makes ScrollTrigger ignore exactly
    // that resize (touch device, width unchanged) and nothing else.
    ScrollTrigger.config({ ignoreMobileResize: true });
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
    // Lenis owns the scroll position, so a modal cannot hold the page still
    // with CSS alone — it has to be able to stop the instance too.
    registerScroller(instance);

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

    // Lenis 1.3.25 only adopts a native scroll when it is idle — its
    // onNativeScroll ignores events that land while isScrolling is "smooth",
    // so a PageDown, Space, Home/End, find-in-page or scrollbar drag arriving
    // mid-lerp is overwritten by the very next animation frame: the page yanks
    // backwards and springs forward again, one frame at a time. Measured as a
    // +36px, −18px, +12px scroll sequence on consecutive frames.
    //
    // Detect the foreign write and make Lenis yield. Two signals, either
    // sufficient: Lenis marks its own writes with a flag its handler consumes
    // (a capture listener runs first and can still see it), and a foreign jump
    // moves the page much farther from Lenis's animated position than one
    // frame of its own lerp ever could. reset() adopts the new position and
    // stops the stale animation; wheel input keeps flowing through Lenis
    // untouched, so the scroll feel does not change.
    // reset() is typed private but is a plain runtime method the library
    // itself uses for exactly this yielding (middle-click autoscroll). The
    // version is pinned, and both lookups are guarded so a future Lenis that
    // renames its internals degrades to today's behavior, not a crash.
    const internals = instance as unknown as {
      _preventNextNativeScrollEvent?: boolean;
      reset?: () => void;
    };
    const yieldToNativeScroll = () => {
      if (instance.isScrolling !== "smooth") return;
      const drift = Math.abs(window.scrollY - instance.animatedScroll);
      const foreign =
        internals._preventNextNativeScrollEvent === false ||
        drift > Math.max(250, Math.abs(instance.velocity) * 3);
      if (foreign && drift > 1) internals.reset?.();
    };
    window.addEventListener("scroll", yieldToNativeScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", yieldToNativeScroll, {
        capture: true,
      });
      gsap.ticker.remove(update);
      registerScroller(null);
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
    const refreshWhenSettled = () => {
      // Refreshing recomputes every trigger's cached offsets, and doing that
      // while Lenis is still lerping snaps each scrubbed element to its
      // re-derived position — a visible mid-scroll jump. The work is not
      // skipped, only held until the scroll settles; the debounce re-arms at
      // the same interval it already used.
      if (lenis.current?.isScrolling) {
        debounce = window.setTimeout(refreshWhenSettled, 200);
        return;
      }
      ScrollTrigger.refresh();
    };
    const observer = new ResizeObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(refreshWhenSettled, 200);
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
