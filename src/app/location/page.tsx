import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ImagePanel } from "@/components/ImagePanel";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";
import { places } from "@/data/places";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Explore Lapu-Lapu City and Mactan at an area level while the exact Juwan’s Place address remains private.",
};

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="Lapu-Lapu City, Mactan, Cebu"
        title={
          <>
            More to
            <br />
            explore.
          </>
        }
        description="History, local food, island experiences, airport routes, and wider Cebu plans can all be part of the stay."
        category="lapu-lapu/city"
        preferredFileName="lapu-lapu-city.jpg"
        label="Lapu-Lapu City"
      />

      <section className="section-pad bg-[#f7f3ea]">
        <Reveal className="mx-auto max-w-[92rem]">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
            <div data-reveal-item>
              <p className="eyebrow mb-7 text-[#e45d3a]">Your wider base</p>
              <h2 className="font-display text-[clamp(4.5rem,7vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
                Stay local.
                <br />
                Go farther.
              </h2>
            </div>
            <div data-reveal-item>
              <p className="body-large max-w-2xl">
                Juwan’s Place keeps the property at the center of the
                experience. The destination guide simply helps guests see how
                a Lapu-Lapu City home can support Mactan and Cebu plans.
              </p>
              <p className="mt-6 rounded-xl bg-[#d5a82e] p-5 text-sm font-semibold">
                Exact travel time depends on traffic and destination. The exact
                property address is shared only through the confirmed Airbnb
                booking process.
              </p>
            </div>
          </div>

          <div className="mt-[clamp(4rem,7vw,7rem)] grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <article
                data-reveal-item
                key={place.name}
                className="group overflow-hidden rounded-[1rem] bg-white"
              >
                <ImagePanel
                  category={place.category}
                  preferredFileName={place.preferredImage}
                  alt={place.name}
                  label={`Licensed ${place.name} image placeholder`}
                  className="aspect-[4/5]"
                  imageClassName="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
                <div className="p-6">
                  <h3 className="font-display text-4xl uppercase">{place.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {place.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-pad bg-[#145c5b] text-white">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p data-reveal-item className="eyebrow mb-7 text-[#9cc6b2]">
            Privacy first
          </p>
          <h2 data-reveal-item className="display-title">
            Area context,
            <br />
            not a pin.
          </h2>
          <p
            data-reveal-item
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Public maps should help with general trip planning without exposing
            the home’s street, lot, subdivision, or access details.
          </p>
          {siteConfig.areaMapUrl ? (
            <a
              data-reveal-item
              href={siteConfig.areaMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase text-black"
            >
              View the approved area map
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          ) : (
            <p
              data-reveal-item
              className="mt-8 inline-flex min-h-11 items-center rounded-lg border border-white/40 px-6 py-3 text-sm uppercase text-white/60"
            >
              Area map coming soon
            </p>
          )}
        </Reveal>
      </section>
    </>
  );
}
