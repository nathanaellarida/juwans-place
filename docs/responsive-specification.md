# Responsive specification

## Required QA viewports

- 360 × 800
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900
- 1920 × 1080

## Breakpoint approach

The layout is fluid first. The principal structural breakpoint is `768px`,
which is Tailwind’s `max-md` changeover. Additional grid changes occur at
Tailwind `sm` and `lg` breakpoints only when content density requires them.

## Mobile adaptations

- Hero title is intentionally rewrapped and capped so every word remains
  visible at 360px.
- Hero CTAs become one full-width column.
- Fixed controls retain at least `44px` touch targets.
- The navigation panel keeps a narrow strip of the page visible instead of
  becoming a generic centered link screen.
- Introductory columns stack, but statement, emblem, copy, and CTA retain their
  hierarchy.
- Bedroom cards remain visually large (`60vh` minimum character) rather than
  collapsing into small thumbnails.
- Property-space and destination grids become one column.
- The location feature reel becomes a deliberate, snap-aligned horizontal card
  row; all other location content remains vertically stacked.
- Location postcards preserve the desktop stack, while flying perk cards become
  normal full-width cards inside the black panel.
- Amenity and footer link grids become two columns where legible.
- Footer statement uses viewport-relative type without a hard minimum that
  would clip on phones.
- Parallax and heavy scrubbing are reduced through both breakpoint design and
  the reduced-motion path.

## Tablet adaptations

- 768px portrait uses two-column utility grids while editorial feature blocks
  can remain stacked.
- 1024 × 768 preserves desktop navigation and multi-column cards but uses fluid
  display sizes and shorter visual panels.

## Large-screen adaptations

- Content is capped between `88rem` and `100rem` depending on section role.
- Display type continues to scale up but uses maximum clamps.
- Images preserve their focal area using `object-fit: cover`.
- Footer and intro whitespace increase without creating overly long text lines.

## Overflow and touch rules

- Global horizontal overflow is clipped only for decorative curves; content
  widths are independently constrained.
- No page depends on accidental sideways overflow. The mobile location feature
  reel is the sole intentional horizontal, snap-aligned interaction.
- Essential controls are at least `44px`.
- Hover treatments have visible non-hover defaults.
- Safe outer padding is retained around fixed controls.
