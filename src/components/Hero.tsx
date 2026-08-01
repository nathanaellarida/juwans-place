"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { BookingLink } from "@/components/BookingLink";
import { ImagePanel } from "@/components/ImagePanel";
import { property } from "@/data/property";
import { motion, prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLParagraphElement>(null);
  const facts = useRef<HTMLParagraphElement>(null);
  const controls = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduced = prefersReducedMotion();
    let split: SplitText | null = null;
    let cleanupAnimation: (() => void) | undefined;

    const animate = () => {
      if (!root.current || !title.current || reduced) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const context = gsap.context(() => {
        split = SplitText.create(title.current, {
          type: "lines",
          mask: "lines",
          aria: "auto",
        });

        const timeline = gsap.timeline();
        timeline
          .fromTo(
            media.current,
            { scale: 1.1, filter: "brightness(0.72)" },
            {
              scale: 1,
              filter: "brightness(1)",
              duration: motion.hero.imageDuration,
              ease: motion.easing.smooth,
            },
          )
          .fromTo(
            split.lines,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: motion.hero.lineDuration,
              stagger: motion.hero.stagger,
              ease: motion.easing.expressive,
            },
            0.12,
          )
          .fromTo(
            [facts.current, copy.current],
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              stagger: 0.1,
              ease: motion.easing.reveal,
            },
            0.38,
          )
          .fromTo(
            controls.current?.children ?? [],
            { y: 28, opacity: 0, rotate: -2 },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.65,
              stagger: motion.hero.controlsStagger,
              ease: motion.easing.elastic,
            },
            0.52,
          );

        gsap.to(media.current, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }, root);

      cleanupAnimation = () => context.revert();
    };

    if (document.documentElement.dataset.juwansLoaded === "true") {
      animate();
    } else {
      window.addEventListener("juwans:ready", animate, { once: true });
    }

    return () => {
      window.removeEventListener("juwans:ready", animate);
      cleanupAnimation?.();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative h-dvh min-h-[42rem] bg-[#f7f3ea] p-2.5 md:p-4"
      aria-labelledby="hero-title"
    >
      <div className="relative h-full overflow-hidden rounded-[1.1rem] bg-[#102f3e]">
        <div ref={media} data-hero-image className="absolute -inset-[8%]">
          <ImagePanel
            category="property/hero"
            preferredFileName="juwans-place-hero.jpg"
            alt="Juwan’s Place entire home in Lapu-Lapu City"
            label="Add the main Juwan’s Place exterior or living-room photo"
            className="h-full w-full"
            imageClassName="object-center"
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-8 pt-24 text-center text-white md:px-8 md:pt-28">
          <p
            ref={facts}
            className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-white/80 md:text-sm"
          >
            {property.factsLine}
          </p>
          <h1
            ref={title}
            id="hero-title"
            className="font-display text-[clamp(4.8rem,11vw,11.5rem)] uppercase leading-[0.75] tracking-[-0.065em]"
          >
            Your Home Base
            <br />
            In Lapu-Lapu
          </h1>
          <p
            ref={copy}
            className="mt-7 max-w-[46rem] text-balance text-sm leading-relaxed text-white/90 md:text-lg"
          >
            A welcoming three-bedroom home for families, friends, tourists, and
            working travelers exploring Mactan and Cebu.
          </p>

          <div
            ref={controls}
            className="mt-8 flex w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:flex-row"
          >
            <Link
              href="#home-intro"
              className="hero-cta bg-[#fcba57] text-black"
            >
              Explore the home
            </Link>
            <Link href="/location" className="hero-cta bg-[#e45d3a] text-black">
              Discover Lapu-Lapu
            </Link>
            <BookingLink className="hero-cta rounded-[0.55rem] bg-[#145c5b] text-white" />
          </div>
          <p className="mt-5 max-w-lg text-xs leading-relaxed text-white/60">
            For guest protection, reservations and payments are completed
            through Airbnb only.
          </p>
        </div>

        <Link
          href="#home-intro"
          className="absolute bottom-5 left-5 z-20 flex size-12 items-center justify-center rounded-full border border-white/50 text-white transition-transform hover:rotate-45 md:bottom-7 md:left-7"
          aria-label="Continue to property introduction"
        >
          <ArrowDownRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
