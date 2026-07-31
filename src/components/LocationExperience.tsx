"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, Camera, MapPin, Plane, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookingLink } from "@/components/BookingLink";
import { DrawnLine } from "@/components/DrawnLine";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ImagePanel } from "@/components/ImagePanel";
import { InteractiveLetters } from "@/components/InteractiveLetters";
import { faqs } from "@/data/faqs";
import { places } from "@/data/places";
import { prefersReducedMotion } from "@/lib/motion";

const ORANGE = "#ff431e";
const BLUE = "#1384c5";
const GREEN = "#307c5f";

const featureCards = [
  {
    title: "History within reach",
    copy: "Discover the story of Mactan and the city named for Lapu-Lapu.",
    category: "lapu-lapu/shrine",
    image: "mactan-shrine.jpg",
    color: BLUE,
  },
  {
    title: "A practical airport base",
    copy: "Stay in Lapu-Lapu City within the wider Mactan airport area.",
    category: "lapu-lapu/airport",
    image: "airport-area.jpg",
    color: ORANGE,
  },
  {
    title: "Island days, home nights",
    copy: "Build coastal plans around the comfort of an entire private home.",
    category: "lapu-lapu/coast",
    image: "mactan-coast.jpg",
    color: GREEN,
  },
  {
    title: "Cebuano food nearby",
    copy: "Try local favorites, neighborhood dining, and the wider Cebu food scene.",
    category: "lapu-lapu/food",
    image: "local-food.jpg",
    color: BLUE,
  },
  {
    title: "Space for your people",
    copy: "Return from the city to three bedrooms and practical shared spaces.",
    category: "property/living",
    image: "living-room-main.jpg",
    color: ORANGE,
  },
  {
    title: "Plans can go farther",
    copy: "Arrange Cebu City or province trips around your own itinerary.",
    category: "lapu-lapu/city",
    image: "lapu-lapu-city.jpg",
    color: GREEN,
  },
  {
    title: "Pickup for longer stays",
    copy: "Qualifying stays may include airport pickup when confirmed by the host.",
    category: "lapu-lapu/airport",
    image: "airport-area.jpg",
    color: BLUE,
  },
  {
    title: "A guarded home base",
    copy: "Come back to residential comfort with 24/7 neighborhood security.",
    category: "property/exterior",
    image: "home-exterior.jpg",
    color: ORANGE,
  },
] as const;

const postcardPlaces = [
  {
    name: "Lapu-Lapu",
    detail: "Your home base",
    color: GREEN,
    glyph: "LL",
  },
  {
    name: "Mactan",
    detail: "Island days",
    color: BLUE,
    glyph: "MC",
  },
  {
    name: "Cebu",
    detail: "Go farther",
    color: ORANGE,
    glyph: "CE",
  },
] as const;

const perkCards = [
  {
    number: "01",
    eyebrow: "Easy arrivals",
    title: "Airport-area base",
    copy: "Start and end a Cebu trip from Lapu-Lapu City. Qualifying longer stays may include pickup when the host confirms it.",
    category: "lapu-lapu/airport",
    image: "airport-area.jpg",
    color: ORANGE,
  },
  {
    number: "02",
    eyebrow: "Local days",
    title: "Mactan within reach",
    copy: "Make room for history, food, coastlines, and island experiences without turning the home into a secondary detail.",
    category: "lapu-lapu/coast",
    image: "mactan-coast.jpg",
    color: BLUE,
  },
  {
    number: "03",
    eyebrow: "Wider plans",
    title: "Cebu on your terms",
    copy: "Transportation may be arranged for Cebu City and province trips, subject to the host’s availability.",
    category: "lapu-lapu/city",
    image: "lapu-lapu-city.jpg",
    color: GREEN,
  },
] as const;

export function LocationExperience() {
  const root = useRef<HTMLDivElement>(null);
  const featureSection = useRef<HTMLElement>(null);
  const featureTrack = useRef<HTMLDivElement>(null);
  const postcardSection = useRef<HTMLElement>(null);
  const collageSection = useRef<HTMLElement>(null);
  const bannerSection = useRef<HTMLElement>(null);
  const cameraSection = useRef<HTMLElement>(null);
  const perksSection = useRef<HTMLElement>(null);
  const perkTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const desktop = window.matchMedia("(min-width: 768px)");
    const context = gsap.context(() => {
      gsap.from(".location-hero-line", {
        yPercent: 125,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        delay: 0.15,
        ease: "power4.out",
      });

      gsap.fromTo(
        ".location-hero-media",
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.65,
          ease: "power2.inOut",
        },
      );

      if (desktop.matches && featureSection.current && featureTrack.current) {
        const distance = () =>
          Math.max(
            0,
            featureTrack.current!.scrollWidth -
              featureSection.current!.clientWidth +
              window.innerWidth * 0.18,
          );

        gsap.to(featureTrack.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: featureSection.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      if (postcardSection.current) {
        const postcards =
          postcardSection.current.querySelectorAll("[data-postcard]");
        const sideCopy =
          postcardSection.current.querySelectorAll("[data-postcard-side]");

        gsap.from("[data-postcard-line]", {
          yPercent: 118,
          duration: 1.15,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: {
            trigger: postcardSection.current,
            start: "top 72%",
            once: true,
          },
        });

        gsap.from(sideCopy, {
          y: 64,
          autoAlpha: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: postcardSection.current,
            start: "top 45%",
            once: true,
          },
        });

        const spread = desktop.matches ? 108 : 0;
        const postcardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: postcardSection.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.75,
          },
        });

        postcardTimeline
          .fromTo(
            postcards,
            { y: "115vh", rotate: (index) => [-11, 8, -5][index] },
            {
              y: (index) => [40, 125, 210][index],
              rotate: (index) => [-4, 5, -2][index],
              duration: 1,
              stagger: 0.18,
              ease: "power2.out",
            },
          )
          // Fan the stack apart so every postcard is readable at once.
          .to(
            postcards,
            {
              xPercent: (index) => [-spread, 0, spread][index],
              y: (index) =>
                desktop.matches ? [56, 178, 56][index] : [40, 150, 260][index],
              rotate: (index) => [-7, 1, 7][index],
              scale: desktop.matches ? 0.92 : 1,
              duration: 1.1,
              ease: "power3.inOut",
            },
            "+=0.2",
          )
          .to(
            sideCopy,
            {
              x: (index) => [-70, 70][index],
              autoAlpha: 0.22,
              duration: 1.1,
              ease: "power3.inOut",
            },
            "<",
          )
          .to(
            postcards,
            {
              y: "-115vh",
              rotate: (index) => [7, -8, 5][index],
              duration: 1.2,
              stagger: 0.09,
              ease: "power2.in",
            },
            "+=0.45",
          );
      }

      if (collageSection.current) {
        const collageCards =
          collageSection.current.querySelectorAll("[data-collage-card]");
        gsap.fromTo(
          collageCards,
          {
            y: (index) => [150, -120, 190][index],
            rotate: (index) => [-16, 12, 9][index],
          },
          {
            y: (index) => [-90, 110, -135][index],
            rotate: (index) => [-5, -8, 3][index],
            ease: "none",
            scrollTrigger: {
              trigger: collageSection.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      if (bannerSection.current) {
        gsap.from("[data-banner-word]", {
          autoAlpha: 0,
          scale: 0.84,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerSection.current,
            start: "top 62%",
            once: true,
          },
        });

        gsap.fromTo(
          "[data-banner-media]",
          { scale: 1.22, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: bannerSection.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );

        // Kept small: the headline nearly fills its box, so a wide drift
        // would push the wordmark past the banner's clipped edge.
        if (desktop.matches) {
          gsap.fromTo(
            "[data-banner-word]",
            { xPercent: 3.5 },
            {
              xPercent: -3.5,
              ease: "none",
              scrollTrigger: {
                trigger: bannerSection.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        }
      }

      if (cameraSection.current) {
        const instantCards =
          cameraSection.current.querySelectorAll("[data-instant-card]");

        gsap.from("[data-camera-line]", {
          yPercent: 122,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cameraSection.current,
            start: "top 74%",
            once: true,
          },
        });

        const shutter = gsap.timeline({
          scrollTrigger: {
            trigger: ".location-camera",
            start: "top 76%",
            once: true,
          },
        });

        shutter
          .from(".location-camera", {
            scale: 0.72,
            rotate: -7,
            autoAlpha: 0,
            duration: 0.85,
            ease: "back.out(1.7)",
          })
          // Fire the flash, then let the prints drop out of the camera.
          .to(
            ".location-camera-flash",
            { opacity: 0.85, duration: 0.12, ease: "power1.out" },
            "-=0.15",
          )
          .to(".location-camera-flash", {
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
          })
          .from(
            instantCards,
            {
              y: -230,
              scale: 0.42,
              rotate: (index) => [16, -13, 10][index],
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.14,
              ease: "power3.out",
            },
            "-=0.3",
          );

        // Drift uses yPercent so it composes with the entrance tween on y.
        gsap.fromTo(
          instantCards,
          { yPercent: (index) => [6, -5, 4][index] },
          {
            yPercent: (index) => [-8, 6, -5][index],
            ease: "none",
            scrollTrigger: {
              trigger: ".location-instant-grid",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          },
        );
      }

      if (desktop.matches && perksSection.current && perkTrack.current) {
        const cards = perksSection.current.querySelectorAll("[data-perk-card]");
        // Travel far enough for the last card to clear the right edge.
        const distance = () =>
          Math.max(
            0,
            perkTrack.current!.scrollWidth -
              perksSection.current!.clientWidth +
              window.innerWidth * 0.12,
          );

        gsap.to(perkTrack.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: perksSection.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.from(cards, {
          yPercent: 26,
          rotate: (index) => [-6, 5, -4][index],
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: perksSection.current,
            start: "top 62%",
            once: true,
          },
        });
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={root} className="location-experience">
      <LocationHero />
      <FeatureReel sectionRef={featureSection} trackRef={featureTrack} />
      <PostcardSection sectionRef={postcardSection} />
      <CommunityCollage sectionRef={collageSection} />
      <PlacesSection />
      <MaskedBanner sectionRef={bannerSection} />
      <CameraSection sectionRef={cameraSection} />
      <PerksSection sectionRef={perksSection} trackRef={perkTrack} />
      <GuestProof />
      <LocationFaq />
    </div>
  );
}

function LocationHero() {
  return (
    <section className="location-hero">
      <div className="location-hero-panel">
        <ImagePanel
          category="lapu-lapu/city"
          preferredFileName="lapu-lapu-city.jpg"
          alt="Lapu-Lapu City and Mactan"
          label="Add approved Lapu-Lapu City photography"
          className="location-hero-media absolute inset-0"
          sizes="100vw"
          overlay
          priority
        />
        <div className="location-hero-copy" aria-label="A world where Cebu feels like home">
          <MaskedLine className="text-[clamp(2.3rem,4.2vw,4.5rem)]">
            A world where
          </MaskedLine>
          <MaskedLine className="text-[clamp(5.4rem,11vw,11rem)]">
            Cebu
          </MaskedLine>
          <MaskedLine className="text-[clamp(2.2rem,4.6vw,5rem)]">
            feels like
          </MaskedLine>
          <MaskedLine className="text-[clamp(5.4rem,11vw,11rem)]">
            home.
          </MaskedLine>
        </div>
      </div>
    </section>
  );
}

function MaskedLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <span className={`location-hero-line block ${className}`}>{children}</span>
    </span>
  );
}

function FeatureReel({
  sectionRef,
  trackRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      id="location-features"
      ref={sectionRef}
      className="location-feature-scroll"
    >
      <div className="location-sticky-panel">
        <div className="location-ghost-title">
          Welcome
          <br />
          to Lapu-Lapu
        </div>
        <div className="location-feature-intro">
          <p>
            A place where you
            <br />
            <em>find your pace</em>
          </p>
          <p>
            Start in Mactan and
            <br />
            <em>go farther.</em>
          </p>
        </div>
        <div ref={trackRef} className="location-feature-track">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              className="location-feature-card"
              style={{ "--card-color": card.color } as CSSProperties}
            >
              <ImagePanel
                category={card.category}
                preferredFileName={card.image}
                alt={card.title}
                label={card.title}
                className="location-feature-image"
                sizes="(max-width: 767px) 78vw, 32vw"
              />
              <span className="location-feature-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{card.title}</p>
              <small>{card.copy}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostcardSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      id="location-postcards"
      ref={sectionRef}
      className="location-postcard-scroll"
    >
      <div className="location-sticky-panel">
        <div className="location-ghost-title location-postcard-title">
          <span className="location-line-mask">
            <span data-postcard-line>Where to</span>
          </span>
          <span className="location-line-mask">
            <span data-postcard-line>catch Cebu</span>
          </span>
        </div>
        <p
          data-postcard-side
          className="location-postcard-side location-postcard-side-left"
        >
          More island
          <br />
          stories...
        </p>
        <p
          data-postcard-side
          className="location-postcard-side location-postcard-side-right"
        >
          Stay
          <br />
          curious
        </p>
        <div className="location-postcard-stack">
          {postcardPlaces.map((place) => (
            <article
              data-postcard
              key={place.name}
              className="location-postcard"
              style={{ "--postcard-color": place.color } as CSSProperties}
            >
              <span>{place.detail}</span>
              <strong aria-hidden="true">{place.glyph}</strong>
              <p>{place.name}</p>
              <MapPin aria-hidden="true" size={28} strokeWidth={1.5} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityCollage({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      id="location-collage"
      ref={sectionRef}
      className="location-collage-scroll"
    >
      <div className="location-sticky-panel location-collage-panel">
        <div className="location-collage-words" aria-hidden="true">
          Stay roam return
        </div>
        <div
          data-collage-card
          className="location-collage-card location-collage-one"
        >
          <ImagePanel
            category="lapu-lapu/food"
            preferredFileName="local-food.jpg"
            alt="Cebuano food and neighborhood dining"
            label="Local food"
            className="h-full"
            sizes="30vw"
          />
        </div>
        <div
          data-collage-card
          className="location-collage-card location-collage-two"
        >
          <ImagePanel
            category="lapu-lapu/shrine"
            preferredFileName="mactan-shrine.jpg"
            alt="Mactan Shrine"
            label="Mactan history"
            className="h-full"
            sizes="30vw"
          />
        </div>
        <div
          data-collage-card
          className="location-collage-card location-collage-three"
        >
          <ImagePanel
            category="lapu-lapu/coast"
            preferredFileName="mactan-coast.jpg"
            alt="Mactan coast"
            label="Island days"
            className="h-full"
            sizes="30vw"
          />
        </div>
        <div className="location-collage-copy">
          <p className="eyebrow">Juwan’s Place · Lapu-Lapu City</p>
          <h2>
            Live local.
            <br />
            Explore together.
          </h2>
          <p>
            Your calendar can hold history, coastlines, local food, Cebu City,
            and slower days at home.
          </p>
          <BookingLink
            className="mt-7 bg-white text-black"
            label="Check Airbnb"
          />
        </div>
      </div>
    </section>
  );
}

function PlacesSection() {
  return (
    <section id="places" className="location-places-section">
      <div className="location-places-heading">
        <InteractiveLetters text="HOME BASE," />
        <InteractiveLetters text="GO FARTHER." />
      </div>
      <p className="location-places-kicker">Three ways to start exploring</p>
      <div className="location-place-grid">
        {places.slice(0, 3).map((place) => (
          <article key={place.name} className="location-place-card">
            <ImagePanel
              category={place.category}
              preferredFileName={place.preferredImage}
              alt={place.name}
              label={`Add approved ${place.name} photography`}
              className="location-place-image"
              sizes="(max-width: 767px) 100vw, 33vw"
            />
            <div>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <Link href="#area-note">
                Explore the area
                <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MaskedBanner({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section ref={sectionRef} className="location-masked-banner">
      <div className="location-masked-media">
        <div data-banner-media className="absolute inset-0">
          <ImagePanel
            category="lapu-lapu/city"
            preferredFileName="lapu-lapu-city.jpg"
            alt="A day out in Lapu-Lapu City"
            label="Add a wide Lapu-Lapu City photograph"
            className="absolute inset-0"
            sizes="100vw"
          />
        </div>
      </div>
      <p data-banner-word>This is Mactan</p>
    </section>
  );
}

function CameraSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section ref={sectionRef} className="location-camera-section">
      <DrawnLine
        className="location-camera-line-left"
        width={320}
        height={1100}
        strokeWidth={70}
        opacity={0.18}
        d="M280 20C120 200 340 430 140 610C-60 790 250 900 200 1080"
      />
      <DrawnLine
        className="location-camera-line-right"
        width={320}
        height={1100}
        strokeWidth={70}
        opacity={0.16}
        d="M40 20C200 200 -20 430 180 610C380 790 70 900 120 1080"
      />
      <div className="location-camera-heading">
        <span className="location-line-mask">
          <span data-camera-line>Caught in</span>
        </span>
        <strong className="location-line-mask">
          <span data-camera-line>Mactan</span>
        </strong>
      </div>
      <div className="location-camera">
        <Camera aria-hidden="true" />
        <span>JUWAN CAM</span>
        <i aria-hidden="true" />
        <div className="location-camera-flash" aria-hidden="true" />
      </div>
      <div className="location-instant-grid">
        {places.slice(3, 6).map((place, index) => (
          <article
            data-instant-card
            key={place.name}
            style={{ "--instant-rotate": `${[-5, 4, -2][index]}deg` } as CSSProperties}
          >
            <ImagePanel
              category={place.category}
              preferredFileName={place.preferredImage}
              alt={place.name}
              label={place.name}
              className="aspect-square"
              sizes="(max-width: 767px) 80vw, 25vw"
            />
            <p>{place.name}</p>
            <span>{place.description}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PerksSection({
  sectionRef,
  trackRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      id="location-perks"
      ref={sectionRef}
      className="location-perks-scroll"
    >
      <div className="location-sticky-panel location-perks-panel">
        <div className="location-perks-copy">
          <h2>
            <span>Perks?</span>
            <span aria-hidden="true">Perks?</span>
            <span aria-hidden="true">Perks?</span>
          </h2>
          <p>
            We got
            <br />
            you covered.
          </p>
          <small>
            A useful base, an entire home, and support for the Cebu plans you
            want to make.
          </small>
        </div>
        <div ref={trackRef} className="location-perk-cards">
          {perkCards.map((perk) => (
            <article
              data-perk-card
              key={perk.number}
              className="location-perk-card"
              style={{ "--perk-color": perk.color } as CSSProperties}
            >
              <div className="location-perk-card-copy">
                <span>{perk.number}</span>
                <small>{perk.eyebrow}</small>
                <h3>{perk.title}</h3>
                <p>{perk.copy}</p>
              </div>
              <ImagePanel
                category={perk.category}
                preferredFileName={perk.image}
                alt={perk.title}
                label={perk.title}
                className="location-perk-image"
                sizes="(max-width: 767px) 100vw, 55vw"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuestProof() {
  const proofCards = [
    {
      icon: <ShieldCheck aria-hidden="true" />,
      title: "Superhost",
      copy: "Hosted by Estrella Duran",
    },
    {
      icon: <Plane aria-hidden="true" />,
      title: "4.75 rating",
      copy: "Across 40 Airbnb reviews",
    },
    {
      icon: <MapPin aria-hidden="true" />,
      title: "Area context",
      copy: "Exact address stays private until booking",
    },
  ];

  return (
    <section className="location-proof-section">
      <div>
        <p>Real stay.</p>
        <p>Real place.</p>
      </div>
      <div className="location-proof-cards">
        {proofCards.map((proof, index) => (
          <article
            key={proof.title}
            style={{ "--proof-rotate": `${[-4, 3, -2][index]}deg` } as CSSProperties}
          >
            {proof.icon}
            <h3>{proof.title}</h3>
            <p>{proof.copy}</p>
          </article>
        ))}
      </div>
      <BookingLink
        className="mt-10 border border-black bg-white text-black"
        label="View verified details on Airbnb"
      />
    </section>
  );
}

function LocationFaq() {
  return (
    <section id="area-note" className="location-faq-section">
      <DrawnLine
        className="location-faq-loop location-faq-loop-left"
        width={300}
        height={620}
        strokeWidth={25}
      />
      <DrawnLine
        className="location-faq-loop location-faq-loop-right"
        width={300}
        height={620}
        strokeWidth={25}
      />
      <div className="location-faq-heading">
        <h2>FAQs</h2>
        <p>Location questions? Here is the honest version.</p>
      </div>
      <FaqAccordion items={faqs.filter((_, index) => [1, 2, 5, 6, 7].includes(index))} initialOpen={null} />
      <p className="location-privacy-note">
        Public location guidance is intentionally area-level. The home’s exact
        address, street, lot, subdivision, and access details are shared only
        through the confirmed Airbnb booking process.
      </p>
    </section>
  );
}
