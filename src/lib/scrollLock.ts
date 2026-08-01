/**
 * Holds the page still while a modal is open.
 *
 * The obvious `body { overflow: hidden }` is wrong for this site twice over.
 * `overflow: hidden` makes the body a scroll container, and every
 * `position: sticky` panel then resolves against the body's scrollport instead
 * of the viewport — the location page's panels jumped a viewport and a half out
 * of view, leaving a blank screen behind the menu. It also locked nothing:
 * `html` carries `overflow-x: clip`, which suppresses the body-to-viewport
 * overflow propagation that would have stopped the scroll.
 *
 * Setting it on the root element instead propagates to the viewport, so the
 * viewport stops scrolling while remaining the same scroll container that the
 * sticky panels were already resolving against. Lenis drives the scroll
 * programmatically and `overflow` cannot stop that, so it has to be told
 * separately.
 */

type Scroller = { stop: () => void; start: () => void };

let scroller: Scroller | null = null;
let locks = 0;

export function registerScroller(instance: Scroller | null) {
  scroller = instance;
}

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  scroller?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  scroller?.start();
}
