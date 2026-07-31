# Motion specification

All project timing values are centralized in `src/lib/motion.ts`.

## Choreography map

| Effect | Trigger | Duration / stagger | Easing | Reduced-motion behavior |
| --- | --- | --- | --- | --- |
| Preloader progress | First page load after assets/fonts begin resolving | Minimum `1.4s`; exit `0.9s` | expressive + `expo.inOut` | skipped |
| Preloader curves | First page load | `1.2s` draw | `power4.out` | skipped |
| Preloader logo | First page load | `0.75s` | `back.out(1.7)` | skipped |
| Hero image | `juwans:ready` event | `1.35s` | `power2.inOut` | final state immediately |
| Hero title lines | after image begins | `1.05s`, `0.1s` stagger | `power4.out` | unsplit, visible |
| Hero supporting content | after title begins | `0.72s` | `power3.out` | visible |
| Hero controls | after title begins | `0.65s`, `0.08s` stagger | `back.out(1.7)` | visible |
| Hero parallax | hero scroll | scrub `0.8` | linear | disabled |
| Section reveals | section reaches `top 84%` | `0.95s`, `0.09s` stagger | `power3.out` | visible |
| Media parallax | media crosses viewport | `-9%` to `9%`, scrub `.75` | linear | disabled |
| Bedroom hover | pointer hover | `0.7s` image scale | smooth CSS easing | no essential information depends on it |
| Location feature reel | vertical scroll across `500vh` | scrub `.8` | linear | horizontal touch row / static cards |
| Location postcards | vertical scroll across `300vh` | scrub `.75` | `power2` entrance/exit | static card stack |
| Location collage | section crosses viewport | scrub `.8` | linear | static collage |
| Location perk cards | vertical scroll across `340vh` | scrub `.8` | `power2` entrance/exit | normal stacked cards |
| Letter pop | pointer within `150px` of a glyph | proximity mapped | direct interpolation | colored duplicates remain hidden |
| Menu open | menu activation | `0.8s` | `circ.inOut` | immediate |
| Menu links | panel opens | `0.32s`, `0.07s` stagger | `power3.out` | immediate |
| Menu close | close/Escape/backdrop/link | `0.48s` | `circ.inOut` | immediate |
| Route curtains | eligible internal navigation | `0.72s`, `.09s` layers | `power2.inOut` | direct navigation |
| Rotating badge | idle | `22s` loop | linear | stopped |
| Back to top | after `900px` page scroll | `300ms` appearance | CSS ease | no smooth scroll |

## Preloader logic

- Runs once per browser tab/session through `sessionStorage`.
- Progress follows font and primary-image readiness, with a short minimum used
  to make the transition readable.
- It never waits on non-essential below-the-fold assets.
- Completion sets a document state and dispatches `juwans:ready` so the hero
  animation begins after the overlay exits.
- It does not use a long fake delay.

## Text reveals

The hero uses GSAP SplitText line masks. Reusable content sections use grouped transform/opacity reveals to
avoid applying SplitText to every paragraph.

## Smooth scrolling

Lenis is driven from the GSAP ticker and not from a separate request-animation
loop. ScrollTrigger is updated from Lenis scroll events. Both are omitted when
the user requests reduced motion.

## Menu access and motion

The menu is a real modal dialog:

- focus moves to the close control;
- Tab and Shift+Tab remain inside;
- Escape closes it;
- the page is scroll-locked while open; and
- focus returns to the initiating control.

The visual scale origin is upper-left on desktop and
upper-right on mobile.

## Route transition

Three original Juwan’s Place color layers use paired half-screen curtains.
Normal internal navigation is delayed until the close sequence finishes.
External links, modified clicks, downloads, new-tab links, and same-page hashes
are not intercepted.

## Location scene choreography

The `/location` route uses this scroll grammar:

- desktop feature cards are translated across a sticky viewport according to
  their measured track width;
- three postcard cards enter from `115vh`, settle with separate rotations, and
  exit through `-115vh`;
- collage images receive independent vertical and rotational parallax;
- three perk cards enter from alternating horizontal sides, overlap inside a
  rounded black viewport, and leave upward; and
- mobile replaces the most expensive pinned sequences with touch-scrollable or
  normally stacked content.

The oversized location heading and footer wordmark split into accessible
per-letter wrappers. Pointer distance controls the opacity, scale, offset, and
rotation of green and white duplicate glyphs. The semantic label remains one
unsplit phrase for assistive technology.
