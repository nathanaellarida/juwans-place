import type { Metadata } from "next";
import { BookingLink } from "@/components/BookingLink";
import { EdgeLines } from "@/components/EdgeLines";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { houseRules } from "@/data/house-rules";

export const metadata: Metadata = {
  title: "House Rules",
  description:
    "Review occupancy, visitor, pet, arrival, service, and booking-safety expectations for Juwan’s Place.",
};

export default function HouseRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Respect the home and community"
        title={
          <>
            Clear rules.
            <br />
            Better stays.
          </>
        }
        description="These verified expectations help guests decide whether Juwan’s Place is right for their group before completing a reservation on Airbnb."
        category="property/living"
        preferredFileName="living-room-main.jpg"
        label="The living room at Juwan’s Place"
      />

      <section className="section-pad relative overflow-hidden bg-[#f7f3ea]">
        <EdgeLines
          left="edgeStep"
          right="edgeSlope"
          leftInk="edge-ink-plum"
          rightInk="edge-ink-teal"
        />
        <Reveal className="relative z-10 mx-auto max-w-[92rem]">
          <div className="grid gap-12 md:grid-cols-[0.62fr_1.38fr]">
            <div data-reveal-item>
              <p className="eyebrow mb-7 text-[#8e1e55]">Before arrival</p>
              <h2 className="font-display text-[clamp(4.2rem,7vw,7rem)] uppercase leading-[0.8] tracking-[-0.05em]">
                Know what
                <br />
                to expect.
              </h2>
              <p className="mt-7 max-w-md text-base leading-relaxed text-black/60">
                Exact fees, access instructions, check-in details, and live
                policy terms are confirmed through the official Airbnb booking
                process.
              </p>
            </div>

            <ol
              data-reveal-item
              className="divide-y divide-black/20 border-y border-black/20"
            >
              {houseRules.map((rule, index) => (
                <li
                  id={rule.id}
                  key={rule.id}
                  className="scroll-mt-28 grid gap-4 py-7 sm:grid-cols-[3rem_0.72fr_1.28fr]"
                >
                  <span className="text-sm text-black/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-3xl uppercase">
                    {rule.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/62 md:text-base">
                    {rule.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="section-pad relative overflow-hidden bg-[#e45d3a] text-center text-white">
        <EdgeLines
          left="edgeDrift"
          right="edgeArc"
          leftInk="edge-ink-white"
          rightInk="edge-ink-lemon"
        />
        <Reveal className="relative z-10 mx-auto max-w-5xl">
          <p data-reveal-item className="eyebrow mb-7">
            Airbnb is the source of truth
          </p>
          <h2 data-reveal-item className="display-title">
            Confirm the live
            <br />
            booking terms.
          </h2>
          <p
            data-reveal-item
            className="mx-auto mt-8 max-w-2xl text-lg text-white/75"
          >
            Current availability, pricing, fees, cancellation rules, arrival
            details, reservations, and payments are handled on Airbnb only.
          </p>
          <div data-reveal-item>
            <BookingLink className="mt-9 bg-black text-white" showIcon />
          </div>
        </Reveal>
      </section>
    </>
  );
}
