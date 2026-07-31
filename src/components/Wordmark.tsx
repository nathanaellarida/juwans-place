import { cn } from "@/lib/styles";

type WordmarkProps = {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
};

export function Wordmark({
  className,
  compact = false,
  inverted = false,
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
      <svg
        aria-hidden="true"
        viewBox="0 0 140 18"
        className={cn("mb-1 w-full", compact ? "h-2.5" : "h-3.5")}
        fill="none"
      >
        <path
          d="M4 14C19 2 32 2 46 14C60 2 74 2 88 14C102 2 116 2 136 14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
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
