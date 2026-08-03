"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { coverPage, dropCover, uncoverPage } from "@/lib/entrance";
import { motion, prefersReducedMotion } from "@/lib/motion";

/** Closes front to back and opens back to front, so the logo yellow is the
 *  colour that lands last over the old page and lifts first off the new one. */
const layers = [
  { color: "var(--teal)" },
  { color: "var(--coral)" },
  { color: "var(--sunflower)" },
];

const DURATION_MS = motion.route.duration * 1000;
const LAYER_DELAY_MS = motion.route.layerDelay * 1000;
/** Last layer starts last, so the whole sweep is one delay stack plus a cross. */
const SWEEP_MS = DURATION_MS + (layers.length - 1) * LAYER_DELAY_MS;

/**
 * Last resort only, for a route that never resolves at all. The curtain is
 * supposed to open when the new page arrives; this is the escape hatch if that
 * never happens.
 *
 * It used to be 2500ms, which is inside the range a real phone takes to fetch a
 * route. Measured against a 500ms-latency connection, pages arrived at 6.6s and
 * 6.9s while this fired at 4.0s — so the curtain swept open over the page the
 * visitor was leaving, and the new one then appeared with no cover at all. That
 * is the transition "only closing": the opening had already been spent.
 *
 * Long enough now that a slow network cannot trip it. Links are prefetched, so
 * a normal navigation resolves long before either figure.
 */
const FAILSAFE_MS = 12000;

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [closed, setClosed] = useState(false);
  const busy = useRef(false);
  const failsafe = useRef(0);
  const handover = useRef(0);
  const covering = useRef(false);

  const open = useCallback(() => {
    window.clearTimeout(failsafe.current);

    // Released as the curtain starts to part, not after. The new route mounts
    // while the curtain is still shut, so an entrance left to start on mount
    // played out behind it and the page was simply already settled by the time
    // it could be seen. Only this component's own cover is released — the first
    // run of the effect below is a mount, not a navigation.
    if (covering.current) {
      covering.current = false;
      uncoverPage();
    }

    setClosed(false);
    busy.current = false;
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
        // An anchor on this page: leave it entirely alone so the browser and
        // Lenis handle the jump the way they already do.
        if (destination.hash) return;

        // A link to the page you are already on — Home in the menu while the
        // home page is open. There is nothing to cover, but Next still treated
        // it as a navigation and re-rendered the whole route for no change,
        // which on a phone is real work landing right as the menu animates
        // shut. Prevented here so that never starts, and answered the way the
        // click means it: back to the top.
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
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

      covering.current = true;
      coverPage();
      setClosed(true);

      // The push waits for the close to finish so the old page is never seen
      // being replaced. A timer rather than a transition event: the handover
      // only needs to be roughly on the beat, and a timer cannot be missed if a
      // transition is interrupted.
      handover.current = window.setTimeout(() => {
        router.push(href);
        failsafe.current = window.setTimeout(open, FAILSAFE_MS);
      }, SWEEP_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(failsafe.current);
      window.clearTimeout(handover.current);
      if (covering.current) {
        covering.current = false;
        dropCover();
      }
    };
  }, [router, open]);

  return (
    <div aria-hidden="true">
      {layers.map((layer, index) => {
        // Front to back on the way in, back to front on the way out.
        const delay = closed
          ? index * LAYER_DELAY_MS
          : (layers.length - 1 - index) * LAYER_DELAY_MS;
        const style = {
          background: layer.color,
          zIndex: 9000 + index,
          pointerEvents: closed ? "auto" : "none",
          "--curtain-duration": `${DURATION_MS}ms`,
          "--curtain-delay": `${delay}ms`,
        } as React.CSSProperties;

        return (
          <div key={layer.color}>
            {/* Parked off screen by layout rather than by a transform, so the
                transform is free to mean "how far across is it" and nothing
                else. A CSS translate here would be the starting position and
                the panels would travel twice as far as they should — which is
                exactly why this curtain never appeared at first. */}
            <div
              className="route-curtain route-curtain-left"
              data-closed={closed}
              style={style}
            />
            <div
              className="route-curtain route-curtain-right"
              data-closed={closed}
              style={style}
            />
          </div>
        );
      })}
    </div>
  );
}
