"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/styles";

export function InteractiveLetters({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const wrapper = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = wrapper.current;
    if (!element || prefersReducedMotion()) return;

    const letters = [
      ...element.querySelectorAll<HTMLElement>("[data-pop-letter]"),
    ];
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    // One pass per painted frame, reads strictly before writes. The previous
    // shape measured each letter after styling the one before it, so every
    // letter forced its own reflow, on every pointermove — and pointer events
    // arrive faster than frames. Styles set between paints were never visible,
    // so the last position before each frame produces identical pixels.
    const apply = () => {
      frame = 0;
      const centers = letters.map((letter) => {
        const rect = letter.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });
      letters.forEach((letter, index) => {
        const center = centers[index];
        const distance = Math.hypot(pointerX - center.x, pointerY - center.y);
        const strength = Math.max(0, 1 - distance / 150);
        letter.style.setProperty("--pop", strength.toFixed(3));
        letter.style.setProperty(
          "--pop-direction",
          pointerX < center.x ? "-1" : "1",
        );
      });
    };
    const update = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const clear = () => {
      // A pending frame would re-pop the letters after the pointer has left.
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      letters.forEach((letter) => letter.style.setProperty("--pop", "0"));
    };

    element.addEventListener("pointermove", update);
    element.addEventListener("pointerleave", clear);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", update);
      element.removeEventListener("pointerleave", clear);
    };
  }, []);

  return (
    <span
      ref={wrapper}
      className={cn("location-pop-line", className)}
      aria-label={text}
    >
      {[...text].map((letter, index) =>
        letter === " " ? (
          <span key={`${letter}-${index}`} className="location-pop-space" />
        ) : (
          <span
            data-pop-letter
            key={`${letter}-${index}`}
            className="location-pop-letter"
            style={{ "--pop": 0, "--pop-direction": 1 } as CSSProperties}
            aria-hidden="true"
          >
            <span className="location-pop-base">{letter}</span>
            <span className="location-pop-clone location-pop-clone-one">
              {letter}
            </span>
            <span className="location-pop-clone location-pop-clone-two">
              {letter}
            </span>
          </span>
        ),
      )}
    </span>
  );
}
