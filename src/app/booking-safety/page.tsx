import type { Metadata } from "next";
import { InformationPage } from "@/components/InformationPage";

export const metadata: Metadata = {
  title: "Booking Safety",
  description:
    "How to complete a Juwan’s Place reservation safely through Airbnb.",
  alternates: {
    canonical: "/booking-safety",
  },
};

export default function BookingSafetyPage() {
  return (
    <InformationPage
      eyebrow="Booking safety"
      title={
        <>
          Keep the
          <br />
          booking official.
        </>
      }
      description="Airbnb is the only reservation and payment destination linked from this website."
    >
      <h2>Book and pay only through Airbnb</h2>
      <p>
        This website does not have a checkout, payment form, deposit request,
        or direct-booking system. Use the configured Airbnb link for current
        availability, prices, fees, policies, messages, reservations, and
        payments.
      </p>
      <h2>Check the destination</h2>
      <p>
        Official booking controls open in a new tab and should lead to Airbnb.
        Do not send payment details through an unofficial form or to an
        unverified account.
      </p>
      <h2>Address and access details</h2>
      <p>
        The address is public. Juwan’s Place is listed on Google Maps and shown
        on this website, so a route can be planned before booking. What is
        shared only through the confirmed booking are the access details: keys,
        lock codes, and the arrival instructions themselves.
      </p>
      <h2>Changing information</h2>
      <p>
        Prices, availability, cancellation rules, check-in details, transport,
        pickup conditions, and fees may change. The live Airbnb listing and
        host messages are the source of truth.
      </p>
    </InformationPage>
  );
}
