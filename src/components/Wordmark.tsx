import { Logo } from "@/components/Logo";
import { cn } from "@/lib/styles";

type WordmarkProps = {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
  /** Flatten the monogram where the lockup is blended against the page. */
  mono?: boolean;
};

export function Wordmark({
  className,
  compact = false,
  inverted = false,
  mono = false,
}: WordmarkProps) {
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
        size={compact ? 26 : 44}
        mono={mono}
        className={cn("mb-1", compact ? "size-[1.625rem]" : "size-11")}
      />
      <span
        className={cn(
          "font-display uppercase tracking-[-0.035em]",
          compact ? "text-[clamp(1rem,1.35vw,1.35rem)]" : "text-3xl",
        )}
      >
        Juwan’s
      </span>
      <span
        className={cn(
          "font-body font-semibold uppercase tracking-[0.32em]",
          compact ? "mt-0.5 text-[0.42rem]" : "mt-1 text-[0.58rem]",
        )}
      >
        Place
      </span>
    </span>
  );
}
