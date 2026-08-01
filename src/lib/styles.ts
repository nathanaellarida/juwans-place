export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const POSITION_UTILITY = /(?:^|\s)(?:absolute|fixed|relative|sticky|static)(?:\s|$)/;

/**
 * `cn` only joins, so it cannot resolve Tailwind conflicts. Tailwind emits
 * `.relative` after `.absolute`, which means a component's own `relative` beats
 * a caller's `absolute inset-0` and collapses the box to 0x0. Use this for a
 * component's default position so a caller can override it.
 */
export const basePosition = (
  className: string | undefined,
  base = "relative",
) => (className && POSITION_UTILITY.test(className) ? undefined : base);
