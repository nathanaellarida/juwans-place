import type { Metadata } from "next";
import { LocationExperience } from "@/components/LocationExperience";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Discover Juwan’s Place as a home base for Lapu-Lapu City, Mactan, and wider Cebu plans.",
};

export default function LocationPage() {
  return <LocationExperience />;
}
