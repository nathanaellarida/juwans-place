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
    const update = (event: PointerEvent) => {
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(
          event.clientX - centerX,
          event.clientY - centerY,
        );
        const strength = Math.max(0, 1 - distance / 150);
        letter.style.setProperty("--pop", strength.toFixed(3));
        letter.style.setProperty(
          "--pop-direction",
          event.clientX < centerX ? "-1" : "1",
        );
      });
    };
    const clear = () =>
      letters.forEach((letter) => letter.style.setProperty("--pop", "0"));

    element.addEventListener("pointermove", update);
    element.addEventListener("pointerleave", clear);
    return () => {
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
