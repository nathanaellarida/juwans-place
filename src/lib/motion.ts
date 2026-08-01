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
    // Each half of the curtain crosses in this long, and the three colours are
    // offset by layerDelay, so a close runs duration + 2 * layerDelay and a
    // navigation costs roughly twice that. Kept tight: the curtain should read
    // as a wipe between pages, not as a wait.
    duration: 0.55,
    layerDelay: 0.08,
  },
  parallax: {
    travelPercent: 9,
    scrub: 0.75,
  },
  drawn: {
    start: "top bottom",
    end: "center top",
    scrub: 0.9,
  },
  accordion: {
    duration: 0.52,
    ease: "power3.out",
  },
  lenis: {
    duration: 1.15,
  },
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
