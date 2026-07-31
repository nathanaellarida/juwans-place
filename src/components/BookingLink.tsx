import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/styles";

type BookingLinkProps = {
  className?: string;
  label?: string;
  missingLabel?: string;
  showIcon?: boolean;
};

export function BookingLink({
  className,
  label = "Book on Airbnb",
  missingLabel = "Airbnb link coming soon",
  showIcon = false,
}: BookingLinkProps) {
  const shared = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.55rem] px-5 py-3 text-center text-sm font-bold uppercase tracking-[-0.02em]",
    className,
  );

  if (!siteConfig.airbnbUrl) {
    return (
      <span className={cn(shared, "cursor-not-allowed opacity-70")} aria-disabled>
        {missingLabel}
      </span>
    );
  }

  return (
    <a
      className={shared}
      href={siteConfig.airbnbUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      {showIcon ? <ExternalLink aria-hidden="true" size={16} /> : null}
    </a>
  );
}
