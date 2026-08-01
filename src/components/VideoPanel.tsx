"use client";

import { useState, useSyncExternalStore } from "react";
import { ImagePanel } from "@/components/ImagePanel";
import { basePosition, cn } from "@/lib/styles";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

type VideoPanelProps = {
  src: string;
  /** Still frame shown while the video buffers, and in place of it when the
   *  visitor asks for reduced motion. Reuses the image manifest slots. */
  posterCategory: string;
  posterFileName?: string;
  alt: string;
  label?: string;
  className?: string;
  overlay?: boolean;
};

export function VideoPanel({
  src,
  posterCategory,
  posterFileName,
  alt,
  label,
  className,
  overlay = false,
}: VideoPanelProps) {
  // Server and first client paint both render the poster, so the hero is never
  // an empty box while the file downloads.
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  return (
    <div
      className={cn(
        "isolate overflow-hidden bg-[#183e44]",
        basePosition(className),
        className,
      )}
    >
      <ImagePanel
        category={posterCategory}
        preferredFileName={posterFileName}
        alt={alt}
        label={label}
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          playing ? "opacity-0" : "opacity-100",
        )}
        sizes="100vw"
        priority
      />

      {reducedMotion ? null : (
        <video
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
          )}
          src={src}
          muted
          loop
          // Required for inline autoplay on iOS rather than a fullscreen takeover.
          playsInline
          autoPlay
          preload="auto"
          aria-label={alt}
          // If autoplay is refused — low-power mode, a browser policy — neither
          // handler fires and the poster simply stays put. `onTimeUpdate` is the
          // safety net: native autoplay can start before React hydrates, and the
          // single `playing` event is then missed entirely.
          onPlaying={() => setPlaying(true)}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime > 0) setPlaying(true);
          }}
        />
      )}

      {overlay ? (
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
