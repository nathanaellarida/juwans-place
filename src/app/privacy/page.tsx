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
        Booking links open Airbnb in a new tab. An approved area map,
        Matterport tour, or contact link is loaded only when the corresponding
        public environment variable is configured.
      </p>
      <h2>Property privacy</h2>
      <p>
        The public website does not publish the exact street, block, lot,
        subdivision, access instructions, locks, or private documents. The
        exact address is shared only through the confirmed Airbnb booking
        process.
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
