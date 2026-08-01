import type { Metadata } from "next";
import { InformationPage } from "@/components/InformationPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Juwan’s Place marketing website.",
};

export default function PrivacyPage() {
  return (
    <InformationPage
      eyebrow="Privacy"
      title={
        <>
          Less data.
          <br />
          More trust.
        </>
      }
      description="The Juwan’s Place website is designed to market the home without exposing private property or guest information."
    >
      <h2>What this website collects</h2>
      <p>
        This version does not create guest accounts, accept reservations,
        process payments, or provide a contact form. Server and hosting
        providers may retain standard technical request logs for security and
        reliability.
      </p>
      <h2>External services</h2>
      <p>
        Booking links open Airbnb in a new tab, the location page links to the
        public Juwan’s Place listing on Google Maps, and the contact control
        opens the device’s telephone function. A Matterport tour will be
        embedded only after its approved public URL is configured. This website
        does not receive reservation, mapping, or call data from those links.
      </p>
      <h2>Property privacy</h2>
      <p>
        The website may link to the host-provided public Google Maps listing,
        but it does not publish private check-in instructions, lock details,
        access codes, or documents. Those details are shared only through the
        confirmed Airbnb booking process.
      </p>
      <h2>Photography</h2>
      <p>
        Approved images should not reveal personal information, precise address
        details, access controls, or identifiable guests. Location metadata
        should be removed before publishing when it creates a privacy risk.
      </p>
    </InformationPage>
  );
}
