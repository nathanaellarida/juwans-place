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
 * Every edge stroke shares this box. Left-hand variants may wander past x=0
 * and right-hand variants past x=260 — that side is the page edge, so the
 * crop is invisible. Neither may cross the opposite boundary, or the stroke
 * gets sliced off mid-curve in open space.
 */
const EDGE_BOX = "0 0 260 1100";

/**
 * Loose, hand-drawn geometry. Each preset carries its own viewBox so the
 * curves keep their proportions regardless of the box they are placed in.
 * Nothing here is meant to be geometrically exact — the wobble is the point.
 */
const shapes: Record<Exclude<ShapeName, "ring">, { d: string; box: string }> = {
  // Left-hand strokes: they bleed off x=0 and stay clear of the inner edge.
  edgeCross: {
    box: EDGE_BOX,
    d: "M 248 -70 C 196 160 74 316 -40 470 C -168 646 -70 856 96 900 C 214 932 252 800 194 664 C 148 552 40 470 58 300 C 74 150 150 30 206 -80",
  },
  edgeHook: {
    box: EDGE_BOX,
    d: "M 214 -70 C 200 200 140 400 76 580 C 12 760 44 920 154 962 C 240 994 250 866 150 840 C 40 812 -70 900 -140 1090",
  },
  edgeWave: {
    box: EDGE_BOX,
    d: "M 40 -70 C 140 150 236 320 178 510 C 120 700 -30 780 24 966 C 60 1088 140 1120 176 1180",
  },
  edgeCurl: {
    box: EDGE_BOX,
    d: "M 60 -70 C 120 90 240 130 236 300 C 232 448 90 470 78 330 C 68 210 190 190 228 340 C 250 460 190 640 130 800 C 80 936 30 1030 -40 1160",
  },
  edgeDrift: {
    box: EDGE_BOX,
    d: "M 236 -70 C 150 130 30 260 70 440 C 108 612 250 620 240 452 C 232 320 96 340 92 520 C 88 720 170 900 118 1180",
  },

  // Right-hand strokes: they bleed off x=260 and stay clear of x=0.
  edgeLoop: {
    box: EDGE_BOX,
    d: "M 40 -70 C 30 190 96 380 186 540 C 280 706 250 880 140 928 C 60 962 22 862 96 818 C 190 762 300 862 336 1080",
  },
  edgeSweep: {
    box: EDGE_BOX,
    d: "M 180 -70 C 96 130 20 340 66 540 C 110 726 268 742 258 566 C 250 430 110 452 118 654 C 126 856 232 976 316 1160",
  },
  edgeArc: {
    box: EDGE_BOX,
    d: "M 20 -70 C 130 210 300 420 268 660 C 240 866 96 940 78 1160",
  },
  edgeZag: {
    box: EDGE_BOX,
    d: "M 60 -70 C 190 120 60 300 150 470 C 250 656 90 760 170 940 C 230 1074 300 1110 340 1180",
  },
  edgeReturn: {
    box: EDGE_BOX,
    d: "M 210 -70 C 230 200 300 380 244 560 C 190 734 40 780 60 930 C 76 1050 200 1080 250 1180",
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
