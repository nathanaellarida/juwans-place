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
 * `public/brand/juwans-place-logo.svg` is the authored file, but it is an SVG
 * wrapper around a bitmap that is carried twice — once as artwork and once as
 * the luminance mask that gives it transparency — so it weighs 97KB. The PNG
 * beside it is the same picture as a single RGBA image at a quarter of that,
 * and next/image can serve it as avif or webp.
 */
export function Logo({ className, size, mono = false, alt }: LogoProps) {
  return (
    <Image
      src="/brand/juwans-place-logo.png"
      alt={alt ?? ""}
      aria-hidden={alt ? undefined : "true"}
      width={size}
      height={size}
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
