import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/styles";

const { lat, lng } = siteConfig.address;

/**
 * The keyless embed endpoint — the same one Google's own "Share → Embed a map"
 * produces. The documented Maps Embed API would need a billing-enabled key
 * shipped to the browser, and this page only ever shows one fixed pin.
 *
 * Coordinates rather than a name query, so the pin cannot drift onto a
 * similarly named business; the label in parentheses is what the marker's
 * bubble reads.
 */
const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}(${encodeURIComponent(
  siteConfig.name,
)})&z=16&hl=en&output=embed`;

/** Documented, keyless, and hands off to whichever maps app the device uses. */
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

type AreaMapProps = {
  className?: string;
  /**
   * Drops the component's own height so the caller can size it — used where
   * the map is a flex child filling whatever the section has left after its
   * heading and controls.
   */
  fill?: boolean;
};

export function AreaMap({ className, fill = false }: AreaMapProps) {
  const openUrl = siteConfig.areaMapUrl;

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-[1.1rem] bg-[#e8e4dc]",
        fill ? "" : "h-[clamp(26rem,66vh,46rem)]",
        className,
      )}
    >
      <iframe
        // Lazy, because the map is below the fold everywhere it is used and an
        // eager iframe pulls in Google's whole map bundle during the entrance.
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${siteConfig.name} in ${siteConfig.address.area}`}
        src={embedSrc}
        className="absolute inset-0 size-full border-0"
      />

      {/* Mirrors the place card Google overlays on its own embeds, but built
          here so it carries the site's type and colours and can name the two
          actions instead of relying on unlabelled Google chrome. */}
      <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex justify-start sm:inset-x-4 sm:top-4">
        {/* text-left explicitly: both sections that use this map centre their
            own copy, and the card was inheriting that.

            Everything here is sized twice. At full size in a section that is
            only ever as tall as the screen, the card took 70% of the map's
            height on a 360px phone — the two actions stopped fitting on one
            row below ~390px and wrapped, which alone added 77px to a card
            sitting in 308px of map. The phone size keeps both actions on one
            row and trims the rest to match. */}
        <div className="pointer-events-auto max-w-[min(22rem,calc(100%-0.5rem))] rounded-[0.7rem] bg-white p-3 text-left shadow-[0_0.5rem_1.4rem_rgb(0_0_0/16%)] sm:rounded-[0.8rem] sm:p-4 sm:shadow-[0_0.6rem_1.6rem_rgb(0_0_0/18%)]">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <span
              className="mt-px flex size-7 shrink-0 items-center justify-center rounded-full bg-[#145c5b] text-white sm:mt-0.5 sm:size-8"
              aria-hidden="true"
            >
              <MapPin strokeWidth={2} className="size-[15px] sm:size-[17px]" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-base uppercase leading-[1.05] tracking-[-0.02em] text-black sm:text-lg">
                {siteConfig.name}
              </p>
              <p className="mt-0.5 text-[0.68rem] leading-[1.3] text-black/65 sm:mt-1 sm:text-xs sm:leading-snug">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.area}
              </p>
            </div>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3.5 sm:gap-2">
            {openUrl ? (
              <a
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1 rounded-[0.45rem] bg-black px-2.5 text-[0.62rem] font-bold uppercase tracking-[0.03em] text-white transition-transform hover:-rotate-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a82e] sm:gap-1.5 sm:rounded-[0.5rem] sm:px-3 sm:text-xs sm:tracking-[0.04em]"
              >
                Open in Maps
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3 sm:size-3.5"
                />
              </a>
            ) : null}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1 rounded-[0.45rem] border border-black/20 px-2.5 text-[0.62rem] font-bold uppercase tracking-[0.03em] text-black transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a82e] sm:gap-1.5 sm:rounded-[0.5rem] sm:px-3 sm:text-xs sm:tracking-[0.04em]"
            >
              <Navigation aria-hidden="true" className="size-3 sm:size-3.5" />
              Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
