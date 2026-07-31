"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";

export function FaqAccordion({
  items,
  initialOpen = 0,
}: {
  items: Faq[];
  initialOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen);

  return (
    <div className="divide-y divide-black/20 border-y border-black/20">
      {items.map((item, index) => {
        const open = openIndex === index;
        const answerId = `faq-answer-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left font-display text-[clamp(1.75rem,3vw,2.8rem)] uppercase leading-none"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question}</span>
                <Plus
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="pb-6"
            >
              <p className="max-w-3xl text-base leading-relaxed text-black/65 md:text-lg">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
