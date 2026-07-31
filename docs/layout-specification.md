# Layout specification

## Global system

- Warm ivory canvas: `#F7F3EA`
- Black navigation/footer: `#050505`
- Main accent set: Mactan teal, ocean navy, coral, muted gold, seafoam, and
  dusty magenta
- Desktop outer visual-panel inset: approximately `16px`
- Mobile outer visual-panel inset: `10px`
- Primary panel radius: `16–18px`
- Display type: narrow, uppercase, tight line height, negative tracking
- Body type: clean variable sans serif

## Header

The fixed header uses three anchors:

1. menu at the upper left;
2. compact centered wordmark; and
3. Airbnb status/booking control at the upper right.

Controls remain at least `44px` tall. The centered brand uses difference
blending so it remains legible while the page changes from image to cream to
black.

## Hero

- Nearly full viewport height, minimum `42rem`
- Cream outer gutter and one rounded image panel
- One hero image only; no carousel
- Image extends slightly outside the panel to support scale and parallax
- Bottom-heavy black overlay for readable white text
- Fact line above the title
- Two-line display title centered at fluid `clamp(4.8rem, 11vw, 11.5rem)`
- Supporting copy constrained to roughly `46rem`
- Three equal-behavior CTA controls on desktop
- CTAs stack to full width on small screens
- A circular continue control sits at the lower-left edge
- Contact and 3D controls remain fixed at the lower-right

## Intro and bedroom cards

Desktop upper composition is a two-column `1.15fr / .65fr` grid:

- the main statement occupies the left;
- the rotating badge, body copy, and compact CTA occupy the right; and
- generous vertical space separates the introduction from the cards.

Bedroom cards:

- three equal columns;
- tall `78–82vh` card rhythm;
- upper image at `68%`;
- lower colored panel at `32%`;
- one accent per bedroom; and
- full-width stacked cards on mobile.

## Property content rhythm

The extended Juwan’s Place homepage uses this rhythm:

1. full-bleed hero;
2. cream intro and three large cards;
3. dark property story and shared-space grid;
4. black amenities field;
5. paired service panels;
6. one destination section;
7. Airbnb rating/host block;
8. premium 3D-tour block;
9. house-rules block;
10. FAQ block;
11. final booking panel; and
12. oversized black footer.

Property content occupies the clear majority of the flow. Destination content
is contained to one supporting section and one dedicated route.

## Location route scene system

The dedicated route uses an editorial sequence built around Juwan’s Place
content:

1. `100svh` rounded image hero;
2. `500vh` pinned horizontal feature reel;
3. `300vh` stacked Lapu-Lapu/Mactan/Cebu postcards;
4. `180vh` orange image collage;
5. three equal local-place cards;
6. polygon-clipped full-height banner;
7. camera and instant-photo composition;
8. `340vh` black perk-card scene;
9. blue host/rating/location proof section; and
10. oversized FAQ section.

The desktop scroll ranges deliberately create long pinned scenes. Mobile
preserves the editorial scale but converts the reel into a horizontal snap row
and the perk scene into normal stacked cards.

## Menu

- Desktop: `min(32rem, 38vw)`, positioned `2.5vw` from top and left
- Black rounded panel over the current page
- Close control near the panel’s upper edge
- Large stacked uppercase links
- Page remains visible behind the panel
- Mobile: `92vw` panel, full viewport height, square left edge, rounded right
  edge; a visible page strip preserves the overlay character

## Footer

- Full black field
- Left brand/host summary, right navigation columns
- Desktop: two main columns followed by a single oversized statement
- Three outlined value cards under the statement
- Thin lower divider and compact legal/booking-safety line
- Mobile: content becomes a legible stacked grid; oversized text uses `10.5vw`
  so no characters are clipped

## Empty-image layouts

Every photography slot reserves its final aspect ratio. When a file is missing,
an original dark-teal spatial illustration renders in place, preserving the
layout and avoiding cumulative layout shift.
