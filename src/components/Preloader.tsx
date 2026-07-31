"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, prefersReducedMotion } from "@/lib/motion";
import { Wordmark } from "@/components/Wordmark";

const SESSION_KEY = "juwans-place-preloader-complete";

function signalReady() {
  document.documentElement.dataset.juwansLoaded = "true";
  window.dispatchEvent(new CustomEvent("juwans:ready"));
}

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const percentage = useRef<HTMLParagraphElement>(null);
  const paths = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    let hasPlayed = false;
    try {
      hasPlayed = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      hasPlayed = false;
    }

    if (hasPlayed || prefersReducedMotion()) {
      signalReady();
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }

    document.body.style.overflow = "hidden";
    const startedAt = performance.now();
    let assetsReady = false;
    let animationFrame = 0;

    const image = document.querySelector<HTMLImageElement>(
      "[data-hero-image] img",
    );
    const imageReady = image?.complete
      ? Promise.resolve()
      : image?.decode().catch(() => undefined) ?? Promise.resolve();

    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      imageReady,
    ]).finally(() => {
      assetsReady = true;
    });

    paths.current.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: motion.easing.expressive,
      });
    });

    gsap.fromTo(
      logo.current,
      { opacity: 0, scale: 0.84, y: 24 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: motion.preloader.logoDuration,
        ease: motion.easing.elastic,
      },
    );

    const tick = (time: number) => {
      const elapsed = time - startedAt;
      const minimum = motion.preloader.minimumDurationMs;
      const next = Math.min(96, Math.round((elapsed / minimum) * 96));
      setProgress(next);

      if (assetsReady && elapsed >= minimum) {
        setProgress(100);
        gsap
          .timeline({
            onComplete: () => {
              document.body.style.overflow = "";
              try {
                sessionStorage.setItem(SESSION_KEY, "true");
              } catch {
                // Session storage can be unavailable in hardened browsers.
              }
              signalReady();
              setVisible(false);
            },
          })
          .to([logo.current, percentage.current], {
            opacity: 0,
            y: 16,
            duration: 0.28,
            ease: "power2.in",
          })
          .to(
            root.current,
            {
              yPercent: -100,
              duration: motion.preloader.exitDuration,
              ease: "expo.inOut",
            },
            "+=0.1",
          );
        return;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrame);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  const registerPath = (path: SVGPathElement | null) => {
    if (path && !paths.current.includes(path)) paths.current.push(path);
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] overflow-hidden bg-[#f7f3ea]"
      role="status"
      aria-live="polite"
      aria-label={`Loading Juwan’s Place, ${progress}%`}
    >
      <svg
        aria-hidden="true"
        className="absolute -left-[16vw] -top-[35vh] h-[70vh] w-[78vw] rotate-[8deg] text-[#145c5b] md:-top-[28vh]"
        viewBox="0 0 600 360"
        fill="none"
      >
        <path
          ref={registerPath}
          d="M15 330C175 60 425 60 585 330"
          stroke="currentColor"
          strokeWidth="62"
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -right-[26vw] -top-[16vh] h-[58vh] w-[70vw] rotate-[-20deg] text-[#e45d3a]"
        viewBox="0 0 600 360"
        fill="none"
      >
        <path
          ref={registerPath}
          d="M15 330C175 60 425 60 585 330"
          stroke="currentColor"
          strokeWidth="48"
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -bottom-[31vh] -left-[6vw] h-[58vh] w-[70vw] rotate-[160deg] text-[#d5a82e]"
        viewBox="0 0 600 360"
        fill="none"
      >
        <path
          ref={registerPath}
          d="M15 330C175 60 425 60 585 330"
          stroke="currentColor"
          strokeWidth="50"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={logo} className="w-[min(58vw,25rem)] opacity-0">
          <Wordmark />
        </div>
      </div>
      <p
        ref={percentage}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-lg font-semibold tabular-nums md:text-2xl"
      >
        {progress}%
      </p>
    </div>
  );
}
