import type { Metadata } from "next";
import { InformationPage } from "@/components/InformationPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility approach and known limitations for the Juwan’s Place website.",
};

export default function AccessibilityPage() {
  return (
    <InformationPage
      eyebrow="Accessibility"
      title={
        <>
          Designed to
          <br />
          include.
        </>
      }
      description="The website targets WCAG 2.2 AA practices without making unverified claims about the physical accessibility of the property."
    >
      <h2>Website experience</h2>
      <p>
        Core navigation, the menu, gallery, lightbox, FAQ, links, and buttons
        are keyboard accessible. Focus indicators remain visible, headings
        describe the page structure, and controls have accessible names and
        practical touch targets.
      </p>
      <h2>Motion preferences</h2>
      <p>
        When reduced motion is requested, the animated preloader, smooth
        scrolling, parallax, scroll scrubbing, and non-essential movement are
        skipped or minimized.
      </p>
      <h2>Images and embeds</h2>
      <p>
        Property images use descriptive alternative text. Decorative shapes are
        hidden from assistive technology. A configured 3D tour has an accessible
        iframe title and an external fallback link.
      </p>
      <h2>Physical property information</h2>
      <p>
        This website does not claim that Juwan’s Place is wheelchair
        accessible or suitable for a specific mobility, sensory, or medical
        need. Guests should ask the host through Airbnb for current,
        requirement-specific information before booking.
      </p>
    </InformationPage>
  );
}
