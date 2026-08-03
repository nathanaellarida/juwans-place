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
      <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-start sm:inset-x-4 sm:top-4">
        <div className="pointer-events-auto max-w-[min(22rem,calc(100%-1rem))] rounded-[0.8rem] bg-white p-4 shadow-[0_0.6rem_1.6rem_rgb(0_0_0/18%)]">
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#145c5b] text-white"
              aria-hidden="true"
            >
              <MapPin size={17} strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg uppercase leading-[1.05] tracking-[-0.02em] text-black">
                {siteConfig.name}
              </p>
              <p className="mt-1 text-xs leading-snug text-black/65">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.area}
              </p>
            </div>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2">
            {openUrl ? (
              <a
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-[0.5rem] bg-black px-3 text-xs font-bold uppercase tracking-[0.04em] text-white transition-transform hover:-rotate-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a82e]"
              >
                Open in Maps
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ) : null}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-[0.5rem] border border-black/20 px-3 text-xs font-bold uppercase tracking-[0.04em] text-black transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a82e]"
            >
              <Navigation aria-hidden="true" size={14} />
              Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
