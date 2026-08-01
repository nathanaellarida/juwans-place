"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { BookingLink } from "@/components/BookingLink";
import { siteConfig } from "@/config/site";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

type MenuOverlayProps = {
  onClosed: () => void;
};

export function MenuOverlay({ onClosed }: MenuOverlayProps) {
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const links = useRef<Array<HTMLDivElement | null>>([]);
  const closing = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;

    if (prefersReducedMotion()) {
      onClosed();
      return;
    }

    const compact = window.matchMedia("(max-width: 767px)").matches;
    gsap.to(backdrop.current, { opacity: 0, duration: compact ? 0.16 : 0.22 });
    gsap.to(panel.current, {
      opacity: 0,
      scale: 0,
      duration: compact
        ? motion.menu.closeDurationCompact
        : motion.menu.closeDuration,
      ease: motion.easing.panel,
      onComplete: onClosed,
    });
  }, [onClosed]);

  useLayoutEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement;
    const reduced = prefersReducedMotion();
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    if (!reduced) {
      gsap.fromTo(
        backdrop.current,
        { opacity: 0 },
        { opacity: 1, duration: mobile ? 0.18 : 0.28 },
      );
      gsap.fromTo(
        panel.current,
        {
          opacity: 0,
          scale: 0,
          // The corner the panel grows out of has to be the corner the button
          // that opened it sits in, and Menu is top-left at every width. Below
          // md the panel is also flush to the left edge and rounded only on the
          // right, so a right-hand origin grew it backwards, out of its own
          // square edge and away from the tap.
          transformOrigin: "top left",
        },
        {
          opacity: 1,
          scale: 1,
          duration: mobile
            ? motion.menu.openDurationCompact
            : motion.menu.openDuration,
          ease: motion.easing.panel,
        },
      );
      gsap.fromTo(
        links.current.filter(Boolean),
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          // The links used to land a second after the tap once the delay and
          // the stagger across seven items were added together, which is the
          // part that read as the menu still loading.
          delay: mobile ? motion.menu.itemDelayCompact : 0.1,
          duration: mobile
            ? motion.menu.itemDurationCompact
            : motion.menu.itemDuration,
          stagger: mobile
            ? motion.menu.itemStaggerCompact
            : motion.menu.itemStagger,
          ease: motion.easing.reveal,
        },
      );
    }

    const frame = requestAnimationFrame(() => closeButton.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      returnFocus.current?.focus();
    };
  }, []);

  useEffect(() => {
    lockScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  return (
    <>
      <button
        ref={backdrop}
        type="button"
        // The 1px blur costs a full-screen readback on every frame it is
        // composited, which a phone GPU pays for while the panel is scaling —
        // and at 1px there is nothing to see for it. Kept from md up.
        className="fixed inset-0 z-[600] cursor-default bg-black/12 md:backdrop-blur-[1px]"
        onClick={close}
        aria-label="Close navigation"
        tabIndex={-1}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="fixed left-[2.5vw] top-[2.5vw] z-[700] flex max-h-[calc(100dvh-5vw)] w-[min(32rem,38vw)] origin-top-left flex-col overflow-y-auto rounded-[1.1rem] bg-black p-[clamp(1.25rem,2.2vw,2rem)] text-white shadow-2xl max-md:inset-0 max-md:max-h-none max-md:w-[92vw] max-md:rounded-r-[1.5rem] max-md:rounded-l-none"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={close}
          className="mb-7 flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#b57d0d] shadow-[4px_0_0_#145c5b] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-md:ml-auto"
          aria-label="Close menu"
        >
          <X aria-hidden="true" size={23} />
        </button>

        <nav className="flex flex-col gap-1.5" aria-label="Primary navigation">
          {siteConfig.navigation.map((item, index) => (
            <div
              key={item.href}
              ref={(element) => {
                links.current[index] = element;
              }}
              className="overflow-hidden"
            >
              <Link
                href={item.href}
                onClick={close}
                className="menu-roll block font-display text-[clamp(1.65rem,2.45vw,2.9rem)] uppercase leading-[1.05] tracking-[-0.035em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a82e]"
              >
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </Link>
            </div>
          ))}
        </nav>

        <div
          ref={(element) => {
            links.current[siteConfig.navigation.length] = element;
          }}
          className="mt-8 border-t border-white/20 pt-6"
        >
          <BookingLink className="w-full bg-white text-black transition-transform hover:-rotate-1" />
        </div>
      </div>
    </>
  );
}
