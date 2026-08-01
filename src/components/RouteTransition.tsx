"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { motion, prefersReducedMotion } from "@/lib/motion";

const colors = ["#fcba57", "#8e1e55", "#145c5b"];

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const left = useRef<Array<HTMLDivElement | null>>([]);
  const right = useRef<Array<HTMLDivElement | null>>([]);
  const transitioning = useRef(false);

  const revealPage = useCallback(() => {
    if (prefersReducedMotion()) {
      left.current.forEach((element) => element && gsap.set(element, { xPercent: -100 }));
      right.current.forEach((element) => element && gsap.set(element, { xPercent: 100 }));
      transitioning.current = false;
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        transitioning.current = false;
      },
    });

    colors.forEach((_, index) => {
      const delay = index * motion.route.layerDelay;
      timeline.to(
        left.current[index],
        {
          xPercent: -100,
          duration: motion.route.duration,
          ease: motion.easing.smooth,
        },
        delay,
      );
      timeline.to(
        right.current[index],
        {
          xPercent: 100,
          duration: motion.route.duration,
          ease: motion.easing.smooth,
        },
        delay,
      );
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(revealPage, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, revealPage]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
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

      event.preventDefault();
      if (transitioning.current) return;

      if (prefersReducedMotion()) {
        router.push(`${destination.pathname}${destination.search}${destination.hash}`);
        return;
      }

      transitioning.current = true;
      const timeline = gsap.timeline({
        onStart: () => {
          [...left.current, ...right.current].forEach((element) => {
            if (element) element.style.pointerEvents = "auto";
          });
        },
        onComplete: () => {
          router.push(
            `${destination.pathname}${destination.search}${destination.hash}`,
          );
        },
      });

      [...colors].reverse().forEach((_, reverseIndex) => {
        const index = colors.length - reverseIndex - 1;
        const delay = reverseIndex * motion.route.layerDelay;
        timeline.to(
          left.current[index],
          {
            xPercent: 0,
            duration: motion.route.duration,
            ease: motion.easing.smooth,
          },
          delay,
        );
        timeline.to(
          right.current[index],
          {
            xPercent: 0,
            duration: motion.route.duration,
            ease: motion.easing.smooth,
          },
          delay,
        );
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return (
    <div aria-hidden="true">
      {colors.map((color, index) => (
        <div key={`left-${color}`}>
          <div
            ref={(element) => {
              left.current[index] = element;
            }}
            className="fixed left-0 top-0 z-[9000] h-dvh w-1/2 -translate-x-full pointer-events-none"
            style={{ backgroundColor: color, zIndex: 9000 - index }}
          />
          <div
            ref={(element) => {
              right.current[index] = element;
            }}
            className="fixed right-0 top-0 z-[9000] h-dvh w-1/2 translate-x-full pointer-events-none"
            style={{ backgroundColor: color, zIndex: 9000 - index }}
          />
        </div>
      ))}
    </div>
  );
}
