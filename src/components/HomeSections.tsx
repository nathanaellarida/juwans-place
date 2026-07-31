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
        rightInk="edge-ink-coral"
      />
      <div className="section-pad relative z-10 mx-auto grid max-w-[100rem] gap-14 md:grid-cols-[0.72fr_1.28fr] md:items-center">
        <Reveal>
          <div data-reveal-item>
            <p className="eyebrow mb-7 text-[#9cc6b2]">Living together</p>
            <h2 className="font-display text-[clamp(4.4rem,8vw,8rem)] uppercase leading-[0.78] tracking-[-0.055em]">
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
              href="/the-home"
              className="mt-9 inline-flex min-h-11 items-center rounded-lg bg-[#e45d3a] px-6 py-3 text-sm font-bold uppercase text-white transition-transform hover:rotate-2"
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
        leftInk="edge-ink-coral"
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
        <div className="grid gap-5 md:grid-cols-2">
          <article
            data-reveal-item
            className="relative min-h-[34rem] overflow-hidden rounded-[1.1rem] bg-[#e45d3a] p-8 text-white md:p-12"
          >
            <Plane aria-hidden="true" className="size-14" strokeWidth={1.35} />
            <p className="mt-16 text-xs font-bold uppercase tracking-[0.17em]">
              For qualifying longer stays
            </p>
            <h2 className="mt-4 font-display text-[clamp(4rem,6.5vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
              Airport
              <br />
              pickup.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/80">
              Free airport pickup may be available when the stay meets the
              host’s conditions. Confirm availability through Airbnb before
              relying on this service.
            </p>
          </article>
          <article
            data-reveal-item
            className="relative min-h-[34rem] overflow-hidden rounded-[1.1rem] bg-[#145c5b] p-8 text-white md:p-12"
          >
            <CarFront
              aria-hidden="true"
              className="size-14"
              strokeWidth={1.35}
            />
            <p className="mt-16 text-xs font-bold uppercase tracking-[0.17em]">
              Cebu City & province trips
            </p>
            <h2 className="mt-4 font-display text-[clamp(4rem,6.5vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
              Go
              <br />
              farther.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/80">
              Transportation may be arranged around city plans and province
              trips. Service depends on availability and is confirmed with the
              host.
            </p>
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
        rightInk="edge-ink-coral"
      />
      <Reveal className="relative z-10 mx-auto grid max-w-[92rem] gap-12 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <div data-reveal-item>
          <p className="eyebrow mb-7 text-[#8e1e55]">Verified on Airbnb</p>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-[clamp(6rem,12vw,11rem)] leading-[0.7] tracking-[-0.06em]">
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
          <h2 className="font-display text-[clamp(4rem,7.5vw,7.5rem)] uppercase leading-[0.8] tracking-[-0.05em]">
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
                      ? "#e45d3a"
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
            This website does not scrape or reproduce guest testimonials.
            Airbnb remains the source for current ratings and verified review
            content.
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
            <h2 className="font-display text-[clamp(4.7rem,8.5vw,8.5rem)] uppercase leading-[0.78] tracking-[-0.055em]">
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
        leftInk="edge-ink-coral"
        rightInk="edge-ink-teal"
      />
      <Reveal className="relative z-10 mx-auto max-w-[92rem]">
        <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
          <div data-reveal-item>
            <p className="eyebrow mb-7 text-[#145c5b]">Before you book</p>
            <h2 className="font-display text-[clamp(4.5rem,7vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
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
    <section id="book" className="bg-[#f7f3ea] p-2.5 md:p-4">
      <div className="relative flex min-h-[74vh] items-center justify-center overflow-hidden rounded-[1.1rem] bg-[#145c5b] px-6 py-24 text-center text-white">
        <EdgeLines
          left="edgeTail"
          right="edgeFold"
          leftInk="edge-ink-coral"
          rightInk="edge-ink-gold"
        />
        <Reveal className="relative z-10 max-w-5xl">
          <p data-reveal-item className="eyebrow mb-8 text-[#9cc6b2]">
            Ready when you are
          </p>
          <h2 data-reveal-item className="display-title">
            Make Lapu-Lapu
            <br />
            feel like home.
          </h2>
          <p
            data-reveal-item
            className="mx-auto mt-8 max-w-2xl text-balance text-lg text-white/70"
          >
            See current availability, pricing, booking terms, and verified
            reviews on Airbnb.
          </p>
          <div data-reveal-item>
            <BookingLink
              className="mt-9 bg-white text-black transition-transform hover:rotate-2"
              showIcon
            />
          </div>
          <p data-reveal-item className="mt-5 text-xs text-white/50">
            For guest protection, reservations and payments are completed
            through Airbnb only.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
