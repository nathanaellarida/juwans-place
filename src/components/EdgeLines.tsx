import { DrawnLine, type LeftShape, type RightShape } from "@/components/DrawnLine";

type EdgeLinesProps = {
  /** Stroke that runs out through the left-hand edge. */
  left: LeftShape;
  /** Stroke that runs out through the right-hand edge. */
  right: RightShape;
  /** Colour class for each stroke — the artwork paints with currentColor. */
  leftInk: string;
  rightInk: string;
  start?: string;
  end?: string;
};

/**
 * The pair of hand-drawn strokes that bleed out through the sides of a
 * section and draw themselves as it scrolls past.
 *
 * The two shapes are chosen per placement rather than derived from one path,
 * because a single shape flipped across the panel reads as a mirror instead of
 * two separate drawings.
 *
 * Whatever hosts a pair needs `relative overflow-hidden`, and its content needs
 * to sit above z-index 1 so the strokes stay in the background.
 */
export function EdgeLines({
  left,
  right,
  leftInk,
  rightInk,
  // Drawn while the section is on screen rather than on approach, so the
  // stroke is visibly still being laid down when the reader arrives.
  start = "top 92%",
  end = "bottom 25%",
}: EdgeLinesProps) {
  return (
    <>
      <DrawnLine
        className={`edge-line edge-line-left ${leftInk}`}
        width={260}
        height={1100}
        strokeWidth={46}
        shape={left}
        start={start}
        end={end}
      />
      <DrawnLine
        className={`edge-line edge-line-right ${rightInk}`}
        width={260}
        height={1100}
        strokeWidth={46}
        shape={right}
        start={start}
        end={end}
      />
    </>
  );
}
