import Link from "next/link";
import {
  Bath,
  CarFront,
  Dumbbell,
  House,
  PawPrint,
  Plane,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  Star,
  Tv,
  Users,
  Wifi,
} from "lucide-react";
import { AreaMap } from "@/components/AreaMap";
import { BookingLink } from "@/components/BookingLink";
import { EdgeLines } from "@/components/EdgeLines";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ImagePanel } from "@/components/ImagePanel";
import { Parallax, Reveal } from "@/components/Reveal";
import { VirtualTour } from "@/components/VirtualTour";
import { amenities } from "@/data/amenities";
import { faqs } from "@/data/faqs";
import { houseRules } from "@/data/house-rules";
import { places } from "@/data/places";
import { property } from "@/data/property";

const amenityIcons = [
  Snowflake,
  Wifi,
  Tv,
  Refrigerator,
  Bath,
  CarFront,
  Dumbbell,
  ShieldCheck,
  PawPrint,
  House,
  Plane,
  Users,
];

export function HomeSections() {
  return (
    <>
      <PropertyStory />
      <AmenitiesSection />
      <ServicesSection />
      <DestinationSection />
      <ReviewsSection />
      <VirtualTour />
      <RulesSection />
      <FaqSection />
      <FinalBookingSection />
    </>
  );
}

function PropertyStory() {
  return (
    <section className="relative overflow-hidden bg-[#102f3e] text-white">
      <EdgeLines
        left="edgeHook"
        right="edgeSweep"
        leftInk="edge-ink-mint"
        rightInk="edge-ink-sunflower"
      />
      <div className="section-pad relative z-10 mx-auto grid max-w-[100rem] gap-14 md:grid-cols-[0.72fr_1.28fr] md:items-center">
        <Reveal>
          <div data-reveal-item>
            <p className="eyebrow mb-7 text-[#9cc6b2]">Living together</p>
            <h2 className="font-display text-[clamp(2.2rem,8vw,8rem)] uppercase leading-[0.78] tracking-[-0.055em] max-md:text-[min(3.5rem,13vw)]">
              Space to live.
              <br />
              Room to rest.
            </h2>
            <p className="body-large mt-8 max-w-xl text-white/72">
              Juwan’s Place is more than a set of bedrooms. It is an entire home
              with practical shared spaces for meals, conversations, work, and
              the quiet parts between Cebu plans.
            </p>
            <Link
              href="/the-house"
              className="mt-9 inline-flex min-h-11 items-center rounded-lg bg-[#fcba57] px-6 py-3 text-sm font-bold uppercase text-black transition-transform hover:rotate-2"
            >
              Walk through the home
            </Link>
          </div>
        </Reveal>

        <div className="relative min-h-[34rem] overflow-hidden rounded-[1.1rem] md:min-h-[48rem]">
          <Parallax className="absolute -inset-y-[12%] inset-x-0">
            <ImagePanel
              category="property/living"
              preferredFileName="living-room-main.jpg"
              alt="Living area at Juwan’s Place"
              label="Add the main living-area photograph"
              className="h-full"
              sizes="(max-width: 767px) 100vw, 65vw"
            />
          </Parallax>
          <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-black/75 p-5 backdrop-blur-sm md:bottom-7 md:left-7 md:right-auto md:max-w-sm md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#d5a82e]">
              Entire home
            </p>
            <p className="mt-2 text-lg leading-snug">
              Living, dining, kitchen, bathrooms, parking, storage, and fitness
              features—together in one private stay.
            </p>
          </div>
        </div>
      </div>

      <Reveal className="relative z-10 grid border-t border-white/20 md:grid-cols-4">
        {property.spaces.map((space) => (
          <article
            data-reveal-item
            key={space.title}
            className="group border-b border-white/20 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <ImagePanel
              category={space.category}
              preferredFileName={space.preferredImage}
              alt={`${space.title} at Juwan’s Place`}
              label={`Add ${space.title.toLowerCase()} photography`}
              className="aspect-[4/5] rounded-[0.85rem]"
              imageClassName="transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 767px) 100vw, 25vw"
            />
            <h3 className="mt-5 font-display text-4xl uppercase leading-none">
              {space.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {space.copy}
            </p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

function AmenitiesSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-black text-white">
      <EdgeLines
        left="edgeWave"
        right="edgeArc"
        leftInk="edge-ink-sunflower"
        rightInk="edge-ink-gold"
      />
      <Reveal className="relative z-10 mx-auto max-w-[92rem]">
        <p data-reveal-item className="eyebrow mb-7 text-[#d5a82e]">
          Comfort without guesswork
        </p>
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.55fr]">
          <h2 data-reveal-item className="display-title">
            Everything
            <br />
            You need.
          </h2>
          <p data-reveal-item className="body-large pb-2 text-white/65">
            The amenities are practical, verified, and centered on how people
            actually use a home during a stay.
          </p>
        </div>
        <div className="mt-[clamp(4rem,7vw,7rem)] grid gap-px overflow-hidden rounded-[1.1rem] bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity, index) => {
            const Icon = amenityIcons[index % amenityIcons.length];
            return (
              <article
                data-reveal-item
                key={amenity.title}
                className="min-h-52 bg-black p-7 transition-colors hover:bg-[#102f3e]"
              >
                <Icon
                  aria-hidden="true"
                  className="mb-9 text-[#9cc6b2]"
                  size={30}
                  strokeWidth={1.6}
                />
                <h3 className="font-display text-3xl uppercase">
                  {amenity.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {amenity.detail}
                </p>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden bg-[#f7f3ea]"
    >
      <EdgeLines
        left="edgeCurl"
        right="edgeZag"
        leftInk="edge-ink-teal"
        rightInk="edge-ink-plum"
      />
      <Reveal className="relative z-10 mx-auto max-w-[92rem]">
        <div
          data-reveal-item
          className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.9fr_1.1fr] md:items-end"
        >
          <div>
            <p className="eyebrow text-[#145c5b]">Getting around</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,7.5rem)] uppercase leading-[0.78] tracking-[-0.055em]">
              From touchdown
              <br />
              to day trips.
            </h2>
          </div>
          <p className="body-large max-w-2xl text-black/65 md:justify-self-end">
            Start in Mactan, then make Cebu your own. The host can help arrange
            the journeys on either side of your stay when availability allows.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <article
            data-reveal-item
            className="group relative min-h-[38rem] overflow-hidden rounded-[1.1rem] bg-[#fcba57] p-8 text-black md:p-12"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full text-black"
              viewBox="0 0 720 680"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="airport-card-dots"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="1"
                    cy="1"
                    r="0.7"
                    fill="currentColor"
                    opacity="0.09"
                  />
                </pattern>
              </defs>
              <rect width="720" height="680" fill="url(#airport-card-dots)" />
              <path
                d="M-55 222 C88 106 184 306 318 205 S535 98 775 254"
                fill="none"
                stroke="currentColor"
                strokeDasharray="4 13"
                strokeLinecap="round"
                strokeWidth="3"
                opacity="0.2"
              />
              <circle
                cx="318"
                cy="205"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.26"
              />
              <circle
                cx="318"
                cy="205"
                r="2.5"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 top-20 font-display text-[clamp(8rem,17vw,16rem)] leading-none tracking-[-0.08em] text-black/[0.055]"
            >
              CEB
            </span>

            <div className="relative z-10 flex items-start justify-between gap-5">
              <span className="flex size-20 -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-black/55 transition-transform duration-300 group-hover:-rotate-2">
                <Plane
                  aria-hidden="true"
                  className="size-11"
                  strokeWidth={1.35}
                />
              </span>
              <span className="pt-2 text-right text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-black/60">
                01 / Arrive
                <br />
                Mactan-Cebu
              </span>
            </div>

            <div className="relative z-10 mt-16">
              <p className="inline-flex rounded-full border border-black/30 bg-[#fcba57]/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] backdrop-blur-[2px]">
                Long stays · Host arranged
              </p>
              <h3 className="mt-5 font-display text-[clamp(3.25rem,6.5vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
                Airport
                <br />
                pickup.
              </h3>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-black/75">
                Free airport pickup may be available when the stay meets the
                host’s conditions. Confirm availability through Airbnb before
                relying on this service.
              </p>
              <BookingLink
                className="mt-8 bg-black text-white transition-transform hover:-rotate-1"
                label="Ask about pickup"
                showIcon
              />
            </div>
          </article>
          <article
            data-reveal-item
            className="group relative min-h-[38rem] overflow-hidden rounded-[1.1rem] bg-[#145c5b] p-8 text-white md:p-12"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full text-white"
              viewBox="0 0 720 680"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="trip-card-dots"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="1"
                    cy="1"
                    r="0.7"
                    fill="currentColor"
                    opacity="0.08"
                  />
                </pattern>
              </defs>
              <rect width="720" height="680" fill="url(#trip-card-dots)" />
              <path
                d="M-35 278 C88 152 187 351 326 234 S548 129 762 326"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
                opacity="0.17"
              />
              <path
                d="M-35 300 C88 174 187 373 326 256 S548 151 762 348"
                fill="none"
                stroke="currentColor"
                strokeDasharray="2 12"
                strokeLinecap="round"
                strokeWidth="2"
                opacity="0.22"
              />
              <circle
                cx="326"
                cy="245"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.3"
              />
              <circle
                cx="326"
                cy="245"
                r="2.5"
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 top-20 font-display text-[clamp(7rem,15vw,14rem)] leading-none tracking-[-0.08em] text-white/[0.055]"
            >
              CEBU
            </span>

            <div className="relative z-10 flex items-start justify-between gap-5">
              <span className="flex size-20 rotate-6 items-center justify-center rounded-full border-2 border-dashed border-white/55 transition-transform duration-300 group-hover:rotate-2">
                <CarFront
                  aria-hidden="true"
                  className="size-11"
                  strokeWidth={1.35}
                />
              </span>
              <span className="pt-2 text-right text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-white/65">
                02 / Explore
                <br />
                Cebu island
              </span>
            </div>

            <div className="relative z-10 mt-16">
              <p className="inline-flex rounded-full border border-white/30 bg-[#145c5b]/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] backdrop-blur-[2px]">
                City · Province · Your pace
              </p>
              <h3 className="mt-5 font-display text-[clamp(3.25rem,6.5vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
                Go
                <br />
                farther.
              </h3>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/80">
                Transportation may be arranged around city plans and province
                trips. Service depends on availability and is confirmed with the
                host.
              </p>
              <BookingLink
                className="mt-8 bg-[#fcba57] text-black transition-transform hover:rotate-1"
                label="Plan with the host"
                showIcon
              />
            </div>
          </article>
        </div>
        <p
          data-reveal-item
          className="mt-5 text-sm leading-relaxed text-black/55"
        >
          No transportation or pickup is guaranteed until the host confirms
          the arrangement.
        </p>
      </Reveal>
    </section>
  );
}

function DestinationSection() {
  const featuredPlaces = places.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#d5a82e] px-[clamp(1.25rem,4vw,4rem)] py-[clamp(6rem,11vw,11rem)]">
      <EdgeLines
        left="edgeDrift"
        right="edgeReturn"
        leftInk="edge-ink-deep"
        rightInk="edge-ink-plum"
      />
      <Reveal className="relative z-10 mx-auto max-w-[92rem]">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.6fr] md:items-end">
          <div>
            <p data-reveal-item className="eyebrow mb-7">
              Lapu-Lapu City & Mactan
            </p>
            <h2 data-reveal-item className="display-title">
              More to explore
              <br />
              beyond the home.
            </h2>
          </div>
          <div data-reveal-item>
            <p className="body-large">
              Stay close to Mactan’s history, local food, island experiences,
              airport routes, and Cebu adventures while returning to the
              privacy of an entire home.
            </p>
            <p className="mt-5 text-sm font-semibold">
              Exact travel time depends on traffic and destination.
            </p>
            <Link
              href="/location"
              className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-black px-6 py-3 text-sm font-bold uppercase text-white transition-transform hover:rotate-2"
            >
              Discover Lapu-Lapu
            </Link>
          </div>
        </div>

        <div className="mt-[clamp(4rem,7vw,7rem)] grid gap-4 md:grid-cols-3">
          {featuredPlaces.map((place) => (
            <article
              data-reveal-item
              key={place.name}
              className="group overflow-hidden rounded-[1rem] bg-[#f7f3ea]"
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
  );
}

function ReviewsSection() {
  const values = [
    "Comfortable home",
    "Space for families",
    "Helpful hosting",
    "Useful amenities",
    "Convenient Lapu-Lapu base",
  ];

  return (
    // Short section: a full section-pad at both ends stacks with the next
    // section's padding into a band of empty paper, so the tail is trimmed.
    <section className="relative overflow-hidden bg-[#f7f3ea] px-[clamp(1.25rem,4vw,4rem)] pb-[clamp(2rem,3.5vw,3.5rem)] pt-[clamp(5rem,10vw,10rem)]">
      <EdgeLines
        left="edgeBloom"
        right="edgeSpiral"
        leftInk="edge-ink-plum"
        rightInk="edge-ink-sunflower"
      />
      <Reveal className="relative z-10 mx-auto grid max-w-[92rem] gap-12 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <div data-reveal-item>
          <p className="eyebrow mb-7 text-[#8e1e55]">Verified on Airbnb</p>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-[clamp(2.7rem,12vw,11rem)] leading-[0.7] tracking-[-0.06em]">
              {property.rating}
            </span>
            <Star className="fill-[#d5a82e] text-[#d5a82e]" aria-hidden />
          </div>
          <p className="mt-5 text-lg">
            {property.reviewCount} Airbnb reviews
          </p>
          <p className="mt-2 text-black/60">
            Hosted by {property.host} · {property.hostStatus}
          </p>
          <BookingLink
            className="mt-8 bg-black text-white"
            label="Read verified reviews on Airbnb"
          />
        </div>

        <div data-reveal-item>
          <h2 className="font-display text-[clamp(2.2rem,7.5vw,7.5rem)] uppercase leading-[0.8] tracking-[-0.05em] max-md:text-[min(3.6rem,13.5vw)]">
            What guests value.
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            {values.map((value, index) => (
              <span
                key={value}
                className="rounded-full border border-black px-5 py-3 text-sm font-semibold"
                style={{
                  backgroundColor:
                    index === 0
                      ? "#fcba57"
                      : index === 1
                        ? "#d5a82e"
                        : index === 2
                          ? "#9cc6b2"
                          : "transparent",
                }}
              >
                {value}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/55">
            Selected verified guest reviews are reproduced on the Location
            page. Airbnb remains the source for current ratings and the full
            review history.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function RulesSection() {
  return (
    <section className="relative overflow-hidden bg-[#8e1e55] px-[clamp(1.25rem,4vw,4rem)] py-[clamp(5rem,10vw,10rem)] text-white">
      <EdgeLines
        left="edgeRibbon"
        right="edgeLasso"
        leftInk="edge-ink-lemon"
        rightInk="edge-ink-mint"
      />
      <Reveal className="relative z-10 mx-auto max-w-[92rem]">
        {/* items-start, or the list stretches to match the column beside it and
            leaves its closing rule floating below the last house rule. */}
        <div className="grid gap-12 md:grid-cols-[0.72fr_1.28fr] md:items-start">
          <div data-reveal-item>
            <p className="eyebrow mb-7 text-[#f3c75d]">Stay with confidence</p>
            <h2 className="font-display text-[clamp(2.2rem,8.5vw,8.5rem)] uppercase leading-[0.78] tracking-[-0.055em] max-md:text-[min(3.75rem,14vw)]">
              Clear rules.
              <br />
              Safer stays.
            </h2>
            <p className="body-large mt-8 max-w-lg text-white/70">
              Straightforward expectations protect guests, the home, and the
              surrounding community.
            </p>
            <Link
              href="/house-rules"
              className="mt-9 inline-flex min-h-11 items-center rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase text-black"
            >
              Read all house rules
            </Link>
          </div>
          <ol
            data-reveal-item
            className="divide-y divide-white/25 border-y border-white/25"
          >
            {houseRules.slice(0, 7).map((rule, index) => (
              <li
                key={rule.id}
                className="grid gap-4 py-6 sm:grid-cols-[3rem_0.72fr_1.28fr]"
              >
                <span className="text-sm text-white/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl uppercase">
                  {rule.title}
                </span>
                <span className="text-sm leading-relaxed text-white/65">
                  {rule.detail}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-[#f7f3ea]">
      <EdgeLines
        left="edgeStep"
        right="edgeSlope"
        leftInk="edge-ink-sunflower"
        rightInk="edge-ink-teal"
      />
      <Reveal className="relative z-10 mx-auto max-w-[92rem]">
        <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
          <div data-reveal-item>
            <p className="eyebrow mb-7 text-[#145c5b]">Before you book</p>
            <h2 className="font-display text-[clamp(2.2rem,7vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em] max-md:text-[min(3.6rem,13.5vw)]">
              Questions,
              <br />
              answered.
            </h2>
            <Link
              href="/faq"
              className="mt-8 inline-block text-sm font-bold uppercase underline decoration-2 underline-offset-8"
            >
              View all FAQs
            </Link>
          </div>
          <div data-reveal-item>
            <FaqAccordion items={faqs.slice(0, 5)} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FinalBookingSection() {
  return (
    // The map used to sit inside the teal card, which read as a panel within a
    // panel — two nested rounded boxes with the map's own frame making a third.
    // It gets the section itself now, the way the location page presents it.
    <section
      id="book"
      // Teal, because the section above it is the same cream as the page and
      // the two ran together as one long field with a map floating in it.
      className="relative flex min-h-svh flex-col overflow-hidden bg-[#145c5b] px-[clamp(1.25rem,2.5vw,2.5rem)] py-[clamp(2.5rem,4.5vw,5rem)] text-center text-white"
    >
      <EdgeLines
        left="edgeTail"
        right="edgeFold"
        leftInk="edge-ink-sunflower"
        rightInk="edge-ink-gold"
      />
      <Reveal className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div data-reveal-item className="location-map-heading">
          <h2>Find us</h2>
          <p>Juwan’s Place on the map, in Barangay Babag.</p>
        </div>
        {/* The map takes whatever the heading and the controls leave, so the
            section lands on one screen the way the hero does. */}
        <div data-reveal-item className="flex min-h-[13rem] flex-1 flex-col">
          <AreaMap fill className="mx-auto h-full max-w-[104rem] flex-1" />
        </div>
        <div data-reveal-item>
          <BookingLink
            className="mt-8 bg-white text-black transition-transform hover:rotate-2"
            showIcon
          />
        </div>
        <p data-reveal-item className="mt-4 text-xs text-white/55">
          For guest protection, reservations and payments are completed through
          Airbnb only.
        </p>
      </Reveal>
    </section>
  );
}
