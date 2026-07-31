"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageManifestItem } from "@/generated/image-manifest";
import { galleryImages } from "@/lib/images";

const fallbackCategories = [
  "Exterior",
  "Bedrooms",
  "Living",
  "Dining",
  "Kitchen",
  "Bathrooms",
  "Fitness",
  "Details",
];

const titleCase = (value: string) =>
  value
    .split("/")
    .at(-1)
    ?.replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) ?? value;

export function GalleryClient() {
  const propertyImages = galleryImages.filter((image) =>
    image.category.startsWith("property/"),
  );
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(propertyImages.map((image) => image.category))).map(
        titleCase,
      ),
    ],
    [propertyImages],
  );
  const [filter, setFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const filtered =
    filter === "All"
      ? propertyImages
      : propertyImages.filter((image) => titleCase(image.category) === filter);

  useEffect(() => {
    if (selectedIndex === null) return;
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => closeButton.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % filtered.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null
            ? null
            : (current - 1 + filtered.length) % filtered.length,
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [filtered.length, selectedIndex]);

  if (!propertyImages.length) {
    return (
      <div>
        <div className="mb-10 flex flex-wrap gap-2" aria-label="Gallery categories">
          {["All", ...fallbackCategories].map((category, index) => (
            <span
              key={category}
              className={`rounded-full border border-black px-4 py-2 text-xs font-bold uppercase ${
                index === 0 ? "bg-black text-white" : ""
              }`}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallbackCategories.map((category, index) => (
            <div
              key={category}
              className={`placeholder-art relative min-h-[22rem] overflow-hidden rounded-[1rem] ${
                index % 4 === 0 ? "sm:col-span-2" : ""
              }`}
              role="img"
              aria-label={`${category} photography will be added soon`}
            >
              <span className="placeholder-sun" aria-hidden="true" />
              <span
                className="placeholder-wave placeholder-wave-one"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-6 left-6 z-10 font-display text-4xl uppercase text-white"
              >
                {category}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-black/55">
          Property photos will appear automatically after approved files are
          added to the matching image folders. No code changes are required.
        </p>
      </div>
    );
  }

  const selected = selectedIndex === null ? null : filtered[selectedIndex];

  return (
    <>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="toolbar"
        aria-label="Filter gallery"
      >
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => {
              setFilter(category);
              setSelectedIndex(null);
            }}
            aria-pressed={filter === category}
            className={`min-h-11 rounded-full border border-black px-5 py-2 text-xs font-bold uppercase ${
              filter === category ? "bg-black text-white" : "hover:bg-black/5"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((image, index) => (
          <button
            type="button"
            key={image.src}
            onClick={() => setSelectedIndex(index)}
            className={`group relative min-h-[22rem] overflow-hidden rounded-[1rem] text-left ${
              index % 5 === 0 ? "sm:col-span-2" : ""
            }`}
            aria-label={`Open ${image.caption}`}
          >
            <Image
              src={image.src}
              alt={image.caption}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-sm font-bold uppercase text-white">
              {image.caption}
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <Lightbox
          image={selected}
          closeButton={closeButton}
          onClose={() => setSelectedIndex(null)}
          onPrevious={() =>
            setSelectedIndex(
              (selectedIndex! - 1 + filtered.length) % filtered.length,
            )
          }
          onNext={() =>
            setSelectedIndex((selectedIndex! + 1) % filtered.length)
          }
        />
      ) : null}
    </>
  );
}

function Lightbox({
  image,
  closeButton,
  onClose,
  onPrevious,
  onNext,
}: {
  image: ImageManifestItem;
  closeButton: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/95 p-4 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.caption} gallery image`}
    >
      <button
        ref={closeButton}
        type="button"
        className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center rounded-full bg-white text-black"
        aria-label="Close image"
        onClick={onClose}
      >
        <X aria-hidden="true" />
      </button>
      <button
        type="button"
        className="absolute left-3 z-10 flex size-12 items-center justify-center rounded-full bg-white text-black"
        aria-label="Previous image"
        onClick={onPrevious}
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <div className="relative h-[82dvh] w-[min(86vw,86rem)]">
        <Image
          src={image.src}
          alt={image.caption}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>
      <button
        type="button"
        className="absolute right-3 z-10 flex size-12 items-center justify-center rounded-full bg-white text-black"
        aria-label="Next image"
        onClick={onNext}
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold">
        {image.caption}
      </p>
    </div>
  );
}
