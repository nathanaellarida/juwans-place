export const motion = {
  easing: {
    expressive: "power4.out",
    reveal: "power3.out",
    smooth: "power2.inOut",
    panel: "circ.inOut",
    elastic: "back.out(1.7)",
  },
  preloader: {
    minimumDurationMs: 1400,
    logoDuration: 0.75,
    exitDuration: 0.9,
  },
  hero: {
    imageDuration: 1.35,
    lineDuration: 1.05,
    stagger: 0.1,
    controlsStagger: 0.08,
  },
  reveal: {
    y: 72,
    duration: 0.95,
    stagger: 0.09,
    start: "top 84%",
  },
  menu: {
    openDuration: 0.8,
    closeDuration: 0.48,
    itemDuration: 0.32,
    itemStagger: 0.07,
  },
  route: {
    duration: 0.72,
    layerDelay: 0.09,
  },
  parallax: {
    travelPercent: 9,
    scrub: 0.75,
  },
  lenis: {
    duration: 1.15,
  },
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
