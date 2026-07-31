export const property = {
  name: "Juwan’s Place",
  type: "Entire home",
  location: "Lapu-Lapu City, Central Visayas, Philippines",
  capacity: 6,
  bedrooms: 3,
  beds: 3,
  bathrooms: 2,
  host: "Estrella Duran",
  hostStatus: "Superhost",
  rating: 4.75,
  reviewCount: 40,
  factsLine: "Up to 6 guests · 3 bedrooms · 3 beds · 2 bathrooms",
  rooms: [
    {
      name: "Blue Room",
      category: "property/bedrooms",
      preferredImage: "blue-bedroom.jpg",
      description:
        "A calm, air-conditioned bedroom with storage and natural light.",
      color: "#145C5B",
    },
    {
      name: "Yellow Room",
      category: "property/bedrooms",
      preferredImage: "yellow-bedroom.jpg",
      description:
        "A bright, spacious bedroom designed for a warm and comfortable stay.",
      color: "#D5A82E",
    },
    {
      name: "Pink Room",
      category: "property/bedrooms",
      preferredImage: "pink-bedroom.jpg",
      description:
        "A cozy, air-conditioned bedroom with a soft and welcoming character.",
      color: "#8E1E55",
    },
  ],
  spaces: [
    {
      title: "Living & Dining",
      category: "property/living",
      preferredImage: "living-room-main.jpg",
      copy: "A shared place to slow down, eat together, watch cable TV, and plan the next Cebu day.",
    },
    {
      title: "Kitchen",
      category: "property/kitchen",
      preferredImage: "kitchen-main.jpg",
      copy: "Kitchen access, a refrigerator, and practical room for everyday meals are part of the home.",
    },
    {
      title: "Bathrooms",
      category: "property/bathrooms",
      preferredImage: "upstairs-bathtub.jpg",
      copy: "Two bathrooms include hot and cold shower facilities and an upstairs bathtub.",
    },
    {
      title: "Move & Recharge",
      category: "property/fitness",
      preferredImage: "stationary-bike.jpg",
      copy: "A stationary bike and multifunctional home gym station make longer stays easier to keep in rhythm.",
    },
  ],
} as const;
