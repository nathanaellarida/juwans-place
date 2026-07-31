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
  { quote: "", author: "", context: "" },
  { quote: "", author: "", context: "" },
  { quote: "", author: "", context: "" },
  { quote: "", author: "", context: "" },
];
