export type Amenity = {
  title: string;
  detail: string;
  group: "comfort" | "home" | "practical" | "services";
};

export const amenities: Amenity[] = [
  {
    title: "Air conditioning",
    detail: "Available in all three bedrooms.",
    group: "comfort",
  },
  {
    title: "Free Wi-Fi",
    detail: "Internet access for everyday browsing and work.",
    group: "comfort",
  },
  {
    title: "Cable TV",
    detail: "A shared entertainment option in the living area.",
    group: "comfort",
  },
  {
    title: "Kitchen access",
    detail: "Includes a refrigerator and dining area.",
    group: "home",
  },
  {
    title: "Two bathrooms",
    detail: "Hot and cold shower, plus an upstairs bathtub.",
    group: "home",
  },
  {
    title: "Garage & parking",
    detail: "Free parking is available at the property.",
    group: "practical",
  },
  {
    title: "Home fitness",
    detail: "Stationary bike and multifunctional gym station.",
    group: "practical",
  },
  {
    title: "Subdivision security",
    detail: "The subdivision has 24/7 security.",
    group: "practical",
  },
  {
    title: "Pet-friendly",
    detail: "Pet rules apply and should be confirmed through Airbnb.",
    group: "practical",
  },
  {
    title: "Optional cleaning",
    detail: "Arrange availability and details with the host.",
    group: "services",
  },
  {
    title: "Airport pickup",
    detail:
      "Free pickup may be available for qualifying longer stays, subject to conditions and availability.",
    group: "services",
  },
  {
    title: "Transportation",
    detail:
      "Cebu City and province-trip transportation may be arranged, subject to availability.",
    group: "services",
  },
];
