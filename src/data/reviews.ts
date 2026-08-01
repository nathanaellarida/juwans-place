export type Review = {
  /** The guest's own words, copied from the official Airbnb listing. */
  quote: string;
  /** The reviewer name as Airbnb shows it. */
  author: string;
  /** Optional short context, for example "Stayed with family". */
  context?: string;
};

/**
 * Verified Airbnb reviews are filled in here by hand.
 *
 * Leave an entry's `quote` empty and the card renders a designed placeholder
 * instead, so the layout can be checked before the real wording lands. Only
 * paste text that actually appears on the official listing — this site does
 * not paraphrase, summarise, or invent guest feedback, and Airbnb stays the
 * source of truth for the current rating and review count.
 */
export const reviews: Review[] = [
  {
    quote:
      "We stayed at Ms. Estrella's place for 4d3n and we had a wonderful stay! The place was clean, comfortable, and exactly as described. Check-in was smooth, and the host was friendly, responsive, and accommodating throughout our stay. The location was convenient, and we had everything we needed for a relaxing trip. We would definitely stay here again and highly recommend this place to anyone visiting the area. ⭐ ⭐ ⭐ ⭐ ⭐",
    author: "Queen",
    context: "June 2026",
  },
  {
    quote:
      "We have a nice stay and it’s great that there are also fitness equipments you can do exercise while staying inside 😊",
    author: "Janine",
    context: "January 2026",
  },
  {
    quote:
      "The owner is so friendly. The house is clean and complete with utensils, especially in the kitchen, so you can really cook. There is also a store next door. Superb",
    author: "Roan Jared",
    context: "October 2025",
  },
  {
    quote:
      "unit owner is very responsive and easy to reschedule our stay... we will definitely book this unit again, We absolutely recommended to our friends and relatives. Thank you",
    author: "Alfredo",
    context: "July 2024",
  },
  {
    quote:
      "Stayed for 5 days and 4 nights, our family felt like home. We brought our PWD with us gladly it was convenient as well to our PWD. We enjoyed and hopefully we get back to check in again soon. Everything was complete and easy to use. Thank you.",
    author: "Princess",
    context: "February 2024",
  },
  {
    quote:
      "The place was easy to find and the house is clean and has a homey feeling. The host is very welcoming, responsive, and helpful.",
    author: "Jasmagne Jhade",
    context: "March 2024",
  },
  {
    quote:
      "Very kind, accommodating and hospitable hosts. The place was clean. We had a comfortable sleep. The host even provided us a ride (with a reasonable price) and dropped us off the airport even if it was short notice and early in the morning. Big thanks to the hosts for their accommodation. Will definitely recommend this place.",
    author: "Jesseca Kates",
    context: "February 2019",
  },
  {
    quote:
      "It's our second time to book the place. And Mam Estrella is very responsive to our qUeries. The place is clean and has peaceful surroundings. Hoping I can book again next year. Thank you. Pit Senyor. 😊",
    author: "Kim",
    context: "January 2023",
  },
];
