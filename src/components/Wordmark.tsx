import { Logo } from "@/components/Logo";
import { cn } from "@/lib/styles";

type WordmarkProps = {
  className?: string;
  compact?: boolean;
  /**
   * Grows the lockup on wider screens. The loading screen gives it a whole
   * empty viewport, where the standard size reads as lost in the middle.
   * Every step is a clamp that bottoms out at the standard size, so nothing
   * below roughly 1300px changes at all.
   */
  large?: boolean;
  inverted?: boolean;
  /** Flatten the monogram where the lockup is blended against the page. */
  mono?: boolean;
};

/** Monogram, name, and rule sizes per variant. The ratios between the three
 *  are held constant — 1.47 between the monogram and the name, 0.31 between
 *  the rule and the name — so a bigger lockup is the same drawing, not a
 *  re-proportioned one. */
const sizing = {
  compact: {
    logo: "size-[1.625rem]",
    name: "text-[clamp(1rem,1.35vw,1.35rem)]",
    rule: "mt-0.5 text-[0.42rem]",
  },
  standard: {
    logo: "size-11",
    name: "text-3xl",
    rule: "mt-1 text-[0.58rem]",
  },
  large: {
    logo: "size-[clamp(2.75rem,3.6vw,4.75rem)]",
    name: "text-[clamp(1.875rem,2.45vw,3.25rem)]",
    rule: "mt-1 text-[clamp(0.58rem,0.76vw,1rem)]",
  },
} as const;

export function Wordmark({
  className,
  compact = false,
  large = false,
  inverted = false,
  mono = false,
}: WordmarkProps) {
  const size = compact ? sizing.compact : large ? sizing.large : sizing.standard;

  return (
    <span
      className={cn(
        "wordmark inline-flex flex-col items-center leading-none",
        inverted ? "text-white" : "text-black",
        className,
      )}
      aria-label="Juwan’s Place"
    >
      <Logo
        size={compact ? 26 : large ? 76 : 44}
        mono={mono}
        className={cn("mb-1", size.logo)}
      />
      <span className={cn("font-display uppercase tracking-[-0.035em]", size.name)}>
        Juwan’s
      </span>
      <span
        className={cn(
          "font-body font-semibold uppercase tracking-[0.32em]",
          size.rule,
        )}
      >
        Place
      </span>
    </span>
  );
}
