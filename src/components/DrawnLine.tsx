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
  /** Built-in geometry. Ignored when `d` is supplied. */
  shape?: "ring" | "spiral";
  /** Turns drawn by the spiral shape. */
  turns?: number;
  /** Custom geometry. Overrides `shape`. */
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
 * Archimedean spiral sampled outwards from the centre, so scrubbing the dash
 * offset reads as a line coiling out across the section.
 */
const spiral = (
  width: number,
  height: number,
  strokeWidth: number,
  turns: number,
) => {
  const cx = width / 2;
  const cy = height / 2;
  const rx = Math.max(0, (width - strokeWidth) / 2);
  const ry = Math.max(0, (height - strokeWidth) / 2);
  const steps = Math.round(turns * 44);
  const points: string[] = [];

  for (let step = 0; step <= steps; step += 1) {
    const progress = step / steps;
    const angle = progress * turns * Math.PI * 2;
    points.push(
      `${(cx + rx * progress * Math.cos(angle)).toFixed(1)} ${(
        cy +
        ry * progress * Math.sin(angle)
      ).toFixed(1)}`,
    );
  }

  return `M ${points.join(" L ")}`;
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
  shape = "ring",
  turns = 3,
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
          d={
            d ??
            (shape === "spiral"
              ? spiral(width, height, strokeWidth, turns)
              : ellipse(width, height, strokeWidth))
          }
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
