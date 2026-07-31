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

type ShapeName =
  | "ring"
  | "star"
  | "edgeCross"
  | "edgeHook"
  | "edgeWave"
  | "edgeCurl"
  | "edgeDrift"
  | "edgeLoop"
  | "edgeSweep"
  | "edgeArc"
  | "edgeZag"
  | "edgeReturn";

/**
 * Every edge stroke shares this box.
 *
 * Both endpoints of every variant sit outside the box on the page-edge side —
 * past x=0 for left-hand strokes, past x=260 for right-hand ones. The round
 * caps are therefore always cropped exactly where the section ends, so the
 * stroke reads as running out from the edge of the page rather than being cut
 * off in open space. Nothing may touch the opposite side, or the top and
 * bottom, where a crop would show as a flat slice.
 */
const EDGE_BOX = "0 0 260 1100";

/**
 * Loose, hand-drawn geometry. Each preset carries its own viewBox so the
 * curves keep their proportions regardless of the box they are placed in.
 * Nothing here is meant to be geometrically exact — the wobble is the point.
 */
const shapes: Record<Exclude<ShapeName, "ring">, { d: string; box: string }> = {
  // Left-hand strokes: both ends run out past x=0.
  edgeCross: {
    box: EDGE_BOX,
    d: "M -70 140 C 80 160 220 250 200 420 C 182 570 40 560 66 420 C 92 286 240 300 244 520 C 248 730 110 900 -70 940",
  },
  edgeHook: {
    box: EDGE_BOX,
    d: "M -70 300 C 100 280 230 380 208 540 C 190 676 60 720 62 610 C 64 520 170 520 176 640 C 182 760 80 860 -70 840",
  },
  edgeWave: {
    box: EDGE_BOX,
    d: "M -70 240 C 60 200 150 300 130 420 C 112 530 20 560 30 660 C 40 770 170 780 214 700 C 250 634 190 560 120 590 C 30 628 -20 800 -70 880",
  },
  edgeCurl: {
    box: EDGE_BOX,
    d: "M -70 340 C 60 320 200 340 214 470 C 226 586 110 640 76 546 C 46 462 150 420 196 510 C 244 606 160 780 -70 820",
  },
  edgeDrift: {
    box: EDGE_BOX,
    d: "M -70 180 C 110 210 210 330 190 470 C 172 596 60 640 70 760 C 78 862 180 900 210 960 C 226 992 180 1010 -70 1000",
  },

  // Right-hand strokes: both ends run out past x=260.
  edgeLoop: {
    box: EDGE_BOX,
    d: "M 330 200 C 180 220 40 300 56 460 C 70 600 210 610 190 480 C 172 366 30 380 22 560 C 12 780 150 920 330 950",
  },
  edgeSweep: {
    box: EDGE_BOX,
    d: "M 330 260 C 200 240 90 320 70 460 C 50 600 150 680 200 600 C 244 528 150 470 100 540 C 40 622 60 820 330 900",
  },
  edgeArc: {
    box: EDGE_BOX,
    d: "M 330 240 C 140 260 26 430 34 630 C 42 810 170 930 330 940",
  },
  edgeZag: {
    box: EDGE_BOX,
    d: "M 330 180 C 190 200 60 280 84 400 C 106 508 220 520 214 620 C 208 730 70 740 44 850 C 26 928 140 980 330 990",
  },
  edgeReturn: {
    box: EDGE_BOX,
    d: "M 330 320 C 170 300 40 400 60 540 C 78 664 200 690 208 580 C 216 486 110 470 96 590 C 80 730 190 850 330 880",
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
