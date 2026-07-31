import Image from "next/image";
import { cn } from "@/lib/styles";

type LogoProps = {
  className?: string;
  /** Rendered edge length in px. The mark is square. */
  size: number;
  /**
   * Flatten the mark to a white silhouette. The header blends its wordmark
   * against whatever is scrolling underneath, which only works on a single
   * flat colour — the gold would come out a different hue on every section.
   */
  mono?: boolean;
  /** Decorative by default; pass a label where the mark stands alone. */
  alt?: string;
};

/**
 * The Juwan's Place monogram.
 *
 * A single vector path, so it stays crisp from the 26px header lockup up to
 * whatever a phone's home screen asks for. Served as a file rather than
 * inlined, so one 6KB request covers every page instead of the path data
 * riding along in the markup of each one. The optimiser is skipped because it
 * refuses SVG, and there is nothing for it to do here anyway.
 */
export function Logo({ className, size, mono = false, alt }: LogoProps) {
  return (
    <Image
      src="/brand/juwans-place-logo.svg"
      alt={alt ?? ""}
      aria-hidden={alt ? undefined : "true"}
      width={size}
      height={size}
      unoptimized
      className={cn(
        "select-none object-contain",
        // brightness-0 flattens the gold to black; invert lifts it to white,
        // which is what a difference blend needs to read as a clean inversion.
        mono && "brightness-0 invert",
        className,
      )}
    />
  );
}
