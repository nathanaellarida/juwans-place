"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/styles";
import type { Review } from "@/data/reviews";

export function ReviewCarousel({ items }: { items: Review[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const element = track.current;
    if (!element) return;
    setAtStart(element.scrollLeft <= 4);
    setAtEnd(
      element.scrollLeft + element.clientWidth >= element.scrollWidth - 4,
    );
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;

    sync();
    element.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      element.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector("li");
    const amount = card
      ? card.getBoundingClientRect().width + 24
      : element.clientWidth * 0.8;
    element.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="location-review-carousel">
      {/* data-lenis-prevent keeps the smooth-scroll wrapper from swallowing
          horizontal wheel and trackpad gestures inside the track. */}
      <ul ref={track} data-lenis-prevent className="location-review-track">
        {items.map((review, index) => (
          <li
            key={review.author || `review-${index}`}
            className={cn(
              "location-review-card",
              !review.quote && "is-placeholder",
            )}
            style={
              {
                // Eight tilts rather than four, so a long row does not fall
                // into a visibly repeating pattern.
                "--review-rotate": `${
                  [-2.5, 1.8, -1.4, 2.2, -1.9, 1.2, -2.8, 1.6][index % 8]
                }deg`,
              } as React.CSSProperties
            }
          >
            {review.quote ? (
              <>
                <blockquote>{review.quote}</blockquote>
                <cite>
                  {review.author}
                  {review.context ? <span>{review.context}</span> : null}
                </cite>
              </>
            ) : (
              <p className="location-review-empty">
                Paste a verified Airbnb review for this card in
                <code>src/data/reviews.ts</code>
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="location-review-controls">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Show previous reviews"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Show next reviews"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
