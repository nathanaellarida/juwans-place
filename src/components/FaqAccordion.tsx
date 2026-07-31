"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/styles";
import type { Faq } from "@/data/faqs";

export function FaqAccordion({
  items,
  initialOpen = 0,
}: {
  items: Faq[];
  initialOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen);
  const panels = useRef<Array<HTMLDivElement | null>>([]);
  const firstRun = useRef(true);

  useEffect(() => {
    const instant = firstRun.current || prefersReducedMotion();
    firstRun.current = false;

    const tweens = panels.current.map((panel, index) => {
      if (!panel) return null;
      const open = index === openIndex;

      return gsap.to(panel, {
        height: open ? "auto" : 0,
        autoAlpha: open ? 1 : 0,
        duration: instant ? 0 : motion.accordion.duration,
        ease: motion.accordion.ease,
        overwrite: true,
      });
    });

    return () => {
      tweens.forEach((tween) => tween?.kill());
    };
  }, [openIndex]);

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const open = openIndex === index;
        const answerId = `faq-answer-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={item.question}
            className={cn("faq-item", open && "is-open")}
          >
            <h3 className="faq-item-heading">
              <button
                id={buttonId}
                type="button"
                className="faq-trigger"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span className="faq-question">{item.question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-panel"
              ref={(node) => {
                panels.current[index] = node;
              }}
            >
              <p className="faq-answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
