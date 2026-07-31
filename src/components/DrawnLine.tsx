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
  shape?: ShapeName;
  /** Custom geometry. Overrides `shape`. */
  d?: string;
  /** Use "slice" variants to make an edge stroke fill and bleed past its box. */
  preserveAspectRatio?: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

type ShapeName = "ring" | "edge" | "star";

/**
 * Loose, hand-drawn geometry. Each preset carries its own viewBox so the
 * curves keep their proportions regardless of the box they are placed in.
 * Nothing here is meant to be geometrically exact — the wobble is the point.
 */
const shapes: Record<Exclude<ShapeName, "ring">, { d: string; box: string }> = {
  /**
   * A single sweeping stroke that wanders far outside its own viewBox and
   * crosses itself once inside it. Anchored to a section edge and cropped,
   * only the crossing and a couple of strands stay on screen — the rest reads
   * as a much larger drawing continuing past the page.
   */
  edge: {
    box: "0 0 260 1780",
    d: "M 315 -80 C 228 200 95 460 -47 740 C -220 1080 -79 1380 118 1400 C 260 1414 339 1200 276 1000 C 221 826 71 660 76 400 C 79 190 181 60 339 96",
  },
  // Five points, deliberately uneven.
  star: {
    box: "0 0 400 400",
    d: "M 198 26 Q 216 92 250 148 Q 314 148 372 156 Q 316 200 264 232 Q 286 294 310 354 Q 250 316 200 274 Q 146 314 88 350 Q 112 288 132 228 Q 78 190 24 146 Q 92 148 152 148 Z",
  },
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
  shape = "ring",
  d,
  preserveAspectRatio,
  start = motion.drawn.start,
  end = motion.drawn.end,
  scrub = motion.drawn.scrub,
}: DrawnLineProps) {
  const container = useRef<HTMLSpanElement>(null);
  const path = useRef<SVGPathElement>(null);
  const preset = shape === "ring" ? null : shapes[shape];
  const geometry = d ?? preset?.d ?? ellipse(width, height, strokeWidth);
  const viewBox = preset && !d ? preset.box : `0 0 ${width} ${height}`;

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
      <svg
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        fill="none"
        focusable="false"
      >
        <path
          ref={path}
          d={geometry}
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
