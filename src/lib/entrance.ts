/**
 * Entrance animations have to know when the page in front of them is coming
 * off, because there are two things that cover it: the loading screen on a
 * first visit, and the route curtain on every navigation after that.
 *
 * Without this they started on mount, which is while the cover is still down.
 * The loading screen was the visible case — its overlay wiped up to show a
 * finished, settled hero, which then blanked and played its entrance a second
 * later, so the intro read as a stutter and a re-run. The curtain had the
 * quieter version of the same fault: a section animated in behind it and was
 * simply already there when it opened.
 *
 * So a cover registers itself here while it is down, and calls `uncoverPage`
 * the moment it starts to lift — not when it has finished. Both covers ease in
 * slowly, so the first frames reveal almost nothing, which is the head start an
 * entrance needs to be underway rather than waiting.
 */

let covers = 0;
const waiting = new Set<() => void>();

/**
 * A held entrance starts its content at zero opacity, so a cover that never
 * announced itself lifting would strand that content invisible — the same trap
 * that once left the footer blank on route changes. Nothing should reach this,
 * but the cost of being wrong is a permanently empty section, so the wait is
 * bounded. Comfortably longer than the loading screen's minimum plus its exit.
 */
const MAX_COVER_MS = 6000;
let watchdog = 0;

function stopWatchdog() {
  if (!watchdog) return;
  clearTimeout(watchdog);
  watchdog = 0;
}

/** Something opaque is over the page; hold entrances until it moves. */
export function coverPage() {
  covers += 1;
  if (typeof window === "undefined" || watchdog) return;
  watchdog = window.setTimeout(() => {
    watchdog = 0;
    covers = 0;
    release();
  }, MAX_COVER_MS);
}

function release() {
  // Copied first: a callback is free to register another one.
  const queued = [...waiting];
  waiting.clear();
  for (const run of queued) run();
}

/** The cover has started to lift. Anything held back runs now. */
export function uncoverPage() {
  covers = Math.max(0, covers - 1);
  if (covers > 0) return;
  stopWatchdog();
  release();
}

/**
 * Drops a cover without releasing anything, for a cover that is unmounting
 * rather than opening. Strict mode mounts every effect twice, and a release
 * there would run entrances belonging to components that are themselves about
 * to be torn down.
 */
export function dropCover() {
  covers = Math.max(0, covers - 1);
  if (covers === 0) stopWatchdog();
}

/**
 * Runs `start` once the page is uncovered — immediately when nothing is
 * covering it. Returns a cancel for the case where the caller unmounts first.
 */
export function onPageUncovered(start: () => void) {
  if (covers === 0) {
    start();
    return () => {};
  }
  waiting.add(start);
  return () => {
    waiting.delete(start);
  };
}
