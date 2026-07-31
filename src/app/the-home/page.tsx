import type { Metadata } from "next";
import { Bath, BedDouble, House, Users } from "lucide-react";
import { BookingLink } from "@/components/BookingLink";
import { ImagePanel } from "@/components/ImagePanel";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { amenities } from "@/data/amenities";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "The Home",
  description:
    "Explore the bedrooms, shared spaces, amenities, and practical services at Juwan’s Place.",
};

const facts = [
  { label: "Guests", value: "Up to 6", Icon: Users },
  { label: "Bedrooms", value: "3", Icon: BedDouble },
  { label: "Beds", value: "3", Icon: House },
  { label: "Bathrooms", value: "2", Icon: Bath },
];

export default function TheHomePage() {
  return (
    <>
      <PageHero
        eyebrow="An entire home in Lapu-Lapu City"
        title={
          <>
            Made for
            <br />
            real stays.
          </>
        }
        description="Three colorful bedrooms and practical shared spaces give families, friends, tourists, and working travelers room to settle in."
        category="property/exterior"
        preferredFileName="exterior-main.jpg"
        label="Juwan’s Place exterior"
      />

      <section className="section-pad bg-[#f7f3ea]">
        <Reveal className="mx-auto max-w-[92rem]">
          <div className="grid gap-px overflow-hidden rounded-[1rem] bg-black md:grid-cols-4">
            {facts.map(({ label, value, Icon }) => (
              <div
                key={label}
                data-reveal-item
                className="flex min-h-52 flex-col justify-between bg-[#f7f3ea] p-7"
              >
                <Icon aria-hidden="true" size={30} strokeWidth={1.5} />
                <div>
                  <p className="font-display text-5xl uppercase">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-black/55">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-pad bg-[#102f3e] text-white">
        <Reveal className="mx-auto max-w-[92rem]">
          <p data-reveal-item className="eyebrow mb-7 text-[#9cc6b2]">
            The three bedrooms
          </p>
          <h2 data-reveal-item className="display-title">
            Choose your
            <br />
            color.
          </h2>
          <div className="mt-[clamp(4rem,7vw,7rem)] space-y-5">
            {property.rooms.map((room, index) => (
              <article
                key={room.name}
                data-reveal-item
                className="grid overflow-hidden rounded-[1rem] bg-black md:grid-cols-2"
              >
                <ImagePanel
                  category={room.category}
                  preferredFileName={room.preferredImage}
                  alt={`${room.name} at Juwan’s Place`}
                  label={`Add ${room.name.toLowerCase()} photography`}
                  className={`min-h-[30rem] ${index % 2 ? "md:order-2" : ""}`}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
                <div
                  className="flex min-h-[26rem] flex-col justify-end p-8 md:p-12"
                  style={{ backgroundColor: room.color }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/65">
                    Bedroom {index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(4.5rem,7vw,7.5rem)] uppercase leading-[0.78]">
                    {room.name}
                  </h3>
                  <p className="mt-7 max-w-md text-lg leading-relaxed text-white/78">
                    {room.description}
                  </p>
                  <p className="mt-4 text-sm text-white/55">
                    Bed size is confirmed through the official Airbnb listing.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-pad bg-[#f7f3ea]">
        <Reveal className="mx-auto max-w-[92rem]">
          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p data-reveal-item className="eyebrow mb-7 text-[#e45d3a]">
                Shared spaces
              </p>
              <h2 data-reveal-item className="font-display text-[clamp(4.5rem,7vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
                Live the day,
                <br />
                your way.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {property.spaces.map((space) => (
                <article data-reveal-item key={space.title} className="group">
                  <ImagePanel
                    category={space.category}
                    preferredFileName={space.preferredImage}
                    alt={`${space.title} at Juwan’s Place`}
                    label={`Add ${space.title.toLowerCase()} photography`}
                    className="aspect-[4/5] rounded-[1rem]"
                    imageClassName="transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 767px) 100vw, 35vw"
                  />
                  <h3 className="mt-5 font-display text-4xl uppercase">
                    {space.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">
                    {space.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="services" className="section-pad bg-[#d5a82e]">
        <Reveal className="mx-auto grid max-w-[92rem] gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div data-reveal-item>
            <p className="eyebrow mb-7">Amenities & services</p>
            <h2 className="font-display text-[clamp(4.5rem,7vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
              The useful
              <br />
              details.
            </h2>
          </div>
          <div
            data-reveal-item
            className="grid gap-px overflow-hidden rounded-[1rem] bg-black sm:grid-cols-2"
          >
            {amenities.map((amenity) => (
              <article key={amenity.title} className="bg-[#f7f3ea] p-6">
                <h3 className="font-display text-3xl uppercase">
                  {amenity.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {amenity.detail}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-pad bg-[#f7f3ea] text-center">
        <Reveal className="mx-auto max-w-5xl">
          <p data-reveal-item className="eyebrow mb-7 text-[#145c5b]">
            Continue on Airbnb
          </p>
          <h2 data-reveal-item className="display-title">
            See if the home
            <br />
            fits your stay.
          </h2>
          <div data-reveal-item>
            <BookingLink className="mt-9 bg-black text-white" showIcon />
          </div>
          <p data-reveal-item className="mt-5 text-xs text-black/50">
            Current pricing, availability, and exact booking terms are shown on
            Airbnb.
          </p>
        </Reveal>
      </section>
    </>
  );
}
