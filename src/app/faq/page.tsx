import type { Metadata } from "next";
import { BookingLink } from "@/components/BookingLink";
import { EdgeLines } from "@/components/EdgeLines";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about capacity, booking, visitors, pets, pickup, transport, and privacy at Juwan’s Place.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Useful answers before booking"
        title={
          <>
            Ask before
            <br />
            you arrive.
          </>
        }
        description="Start with the practical facts here, then use Airbnb for current prices, availability, live policies, and reservation messages."
        category="property/exterior"
        preferredFileName="exterior-main.jpg"
        label="The exterior of Juwan’s Place"
      />

      <section className="section-pad relative overflow-hidden bg-[#f7f3ea]">
        <EdgeLines
          left="edgeHook"
          right="edgeSweep"
          leftInk="edge-ink-teal"
          rightInk="edge-ink-coral"
        />
        <Reveal className="relative z-10 mx-auto grid max-w-[92rem] gap-12 md:grid-cols-[0.55fr_1.45fr]">
          <div data-reveal-item>
            <p className="eyebrow mb-7 text-[#145c5b]">The essentials</p>
            <h2 className="font-display text-[clamp(4.4rem,7vw,7rem)] uppercase leading-[0.78] tracking-[-0.05em]">
              Clear,
              <br />
              direct,
              <br />
              useful.
            </h2>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-black/60">
              When a detail can change between stays, this website points to
              Airbnb instead of pretending a fixed answer will always be
              current.
            </p>
          </div>
          <div data-reveal-item>
            <FaqAccordion items={faqs} />
          </div>
        </Reveal>
      </section>

      <section className="section-pad relative overflow-hidden bg-[#d5a82e] text-center">
        <EdgeLines
          left="edgeCross"
          right="edgeLoop"
          leftInk="edge-ink-deep"
          rightInk="edge-ink-plum"
        />
        <Reveal className="relative z-10 mx-auto max-w-5xl">
          <p data-reveal-item className="eyebrow mb-7">
            Ready for current details?
          </p>
          <h2 data-reveal-item className="display-title">
            Continue
            <br />
            on Airbnb.
          </h2>
          <div data-reveal-item>
            <BookingLink className="mt-9 bg-black text-white" showIcon />
          </div>
        </Reveal>
      </section>
    </>
  );
}
