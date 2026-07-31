"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/styles";

type DrawnLineProps = {
  /** Positioning and colour classes. Colour is taken from `currentColor`. */
  className?: string;
  /** Box width in viewBox units. One unit equals 0.1rem. */
  width: number;
  /** Box height in viewBox units. One unit equals 0.1rem. */
  height: number;
  strokeWidth?: number;
  opacity?: number;
  /** Custom geometry. Defaults to an ellipse that fills the box. */
  d?: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

const ellipse = (width: number, height: number, strokeWidth: number) => {
  const rx = Math.max(0, (width - strokeWidth) / 2);
  const ry = Math.max(0, (height - strokeWidth) / 2);
  const cx = width / 2;
  const cy = height / 2;

  return [
    `M ${cx} ${cy - ry}`,
    `A ${rx} ${ry} 0 0 1 ${cx} ${cy + ry}`,
    `A ${rx} ${ry} 0 0 1 ${cx} ${cy - ry}`,
  ].join(" ");
};

/**
 * Decorative stroke that draws itself as the surrounding section scrolls.
 * The path length is measured at runtime, converted into a dash pattern, and
 * the offset is scrubbed back to zero so the line reads as hand drawn.
 */
export function DrawnLine({
  className,
  width,
  height,
  strokeWidth = 34,
  opacity = 1,
  d,
  start = motion.drawn.start,
  end = motion.drawn.end,
  scrub = motion.drawn.scrub,
}: DrawnLineProps) {
  const container = useRef<HTMLSpanElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const line = path.current;
    const box = container.current;
    if (!line || !box || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const length = line.getTotalLength();
    if (!length) return;

    const trigger = box.closest("section") ?? box.parentElement ?? box;
    const context = gsap.context(() => {
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      });
    }, box);

    return () => context.revert();
  }, [start, end, scrub]);

  return (
    <span ref={container} aria-hidden="true" className={cn("drawn-line", className)}>
      <svg viewBox={`0 0 ${width} ${height}`} fill="none" focusable="false">
        <path
          ref={path}
          d={d ?? ellipse(width, height, strokeWidth)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
