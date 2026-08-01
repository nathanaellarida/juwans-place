"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { coverPage, dropCover, uncoverPage } from "@/lib/entrance";
import { motion, prefersReducedMotion } from "@/lib/motion";

/** Closes front to back and opens back to front, so the logo yellow is the
 *  colour that lands last over the old page and lifts first off the new one. */
const layers = [
  { color: "var(--teal)" },
  { color: "var(--coral)" },
  { color: "var(--sunflower)" },
];

const EASE = "power3.inOut";

/** If a route somehow never resolves, the visitor must not be left staring at
 *  a closed curtain. */
const FAILSAFE_MS = 2500;

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const left = useRef<Array<HTMLDivElement | null>>([]);
  const right = useRef<Array<HTMLDivElement | null>>([]);
  const busy = useRef(false);
  const failsafe = useRef(0);
  const covering = useRef(false);

  const open = useCallback(() => {
    window.clearTimeout(failsafe.current);

    const both = [...left.current, ...right.current];
    both.forEach((panel) => {
      if (panel) panel.style.pointerEvents = "none";
    });

    // Released as the curtain starts to part, not after. The new route mounts
    // while the curtain is still shut, so an entrance left to start on mount
    // played out behind it and the page was simply already settled by the time
    // it could be seen. Only this component's own cover is released — the first
    // run of the effect below is a mount, not a navigation.
    if (covering.current) {
      covering.current = false;
      uncoverPage();
    }

    if (prefersReducedMotion()) {
      both.forEach((panel) => panel && gsap.set(panel, { xPercent: 0 }));
      busy.current = false;
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });

    for (let index = layers.length - 1; index >= 0; index -= 1) {
      const at = (layers.length - 1 - index) * motion.route.layerDelay;
      timeline.to(
        [left.current[index], right.current[index]],
        { xPercent: 0, duration: motion.route.duration, ease: EASE },
        at,
      );
    }
  }, []);

  // Runs on mount and after every navigation, so whatever is covering the page
  // lifts once the new route has painted. Two frames rather than a fixed pause:
  // the second one is scheduled from inside the first, which puts it after the
  // paint that renders the new route instead of guessing at how long that takes.
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(open);
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [pathname, open]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      const href = `${destination.pathname}${destination.search}${destination.hash}`;

      // Next's Link runs its own onClick and then bails on a prevented event,
      // and React delegates from the root — below document. Listening in the
      // capture phase is what puts us ahead of it: preventDefault here stops
      // Link from navigating, while its onClick still fires, so things like the
      // menu's close-on-select keep working.
      event.preventDefault();
      if (busy.current) return;
      busy.current = true;

      if (prefersReducedMotion()) {
        busy.current = false;
        router.push(href);
        return;
      }

      const timeline = gsap.timeline({
        onStart: () => {
          [...left.current, ...right.current].forEach((panel) => {
            if (panel) panel.style.pointerEvents = "auto";
          });
          covering.current = true;
          coverPage();
        },
        onComplete: () => {
          router.push(href);
          failsafe.current = window.setTimeout(open, FAILSAFE_MS);
        },
      });

      layers.forEach((_, index) => {
        const at = index * motion.route.layerDelay;
        timeline.to(
          left.current[index],
          { xPercent: 100, duration: motion.route.duration, ease: EASE },
          at,
        );
        timeline.to(
          right.current[index],
          { xPercent: -100, duration: motion.route.duration, ease: EASE },
          at,
        );
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(failsafe.current);
      if (covering.current) {
        covering.current = false;
        dropCover();
      }
    };
  }, [router, open]);

  return (
    <div aria-hidden="true">
      {layers.map((layer, index) => (
        <div key={layer.color}>
          {/* Parked off screen by layout rather than by a transform, so GSAP
              owns the transform outright. A CSS translate here would be read as
              the starting x and the panels would travel twice as far as they
              should — which is exactly why this curtain never appeared. */}
          <div
            ref={(element) => {
              left.current[index] = element;
            }}
            className="route-curtain route-curtain-left"
            style={{ background: layer.color, zIndex: 9000 + index }}
          />
          <div
            ref={(element) => {
              right.current[index] = element;
            }}
            className="route-curtain route-curtain-right"
            style={{ background: layer.color, zIndex: 9000 + index }}
          />
        </div>
      ))}
    </div>
  );
}
