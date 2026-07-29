# Juwan's Place

> A documentation-only home for the vision, content, and future digital presence
> of Juwan's Place—an entire-home vacation rental in Lapu-Lapu City, Cebu,
> Philippines.

## Repository status

**Planning and documentation only.**

This repository intentionally contains one file: this README. The previous
website implementation has been retired so a future version can begin from a
clear brief instead of inheriting unwanted technical or design decisions.

## Contents

- [About Juwan's Place](#about-juwans-place)
- [Property snapshot](#property-snapshot)
- [Purpose of this repository](#purpose-of-this-repository)
- [Goals](#goals)
- [Non-goals](#non-goals)
- [Audience](#audience)
- [Brand direction](#brand-direction)
- [Core messaging](#core-messaging)
- [Future website scope](#future-website-scope)
- [Content requirements](#content-requirements)
- [Experience requirements](#experience-requirements)
- [Trust, privacy, and safety](#trust-privacy-and-safety)
- [Accessibility](#accessibility)
- [Search and discoverability](#search-and-discoverability)
- [Performance and quality](#performance-and-quality)
- [Success criteria](#success-criteria)
- [Open decisions](#open-decisions)
- [Future roadmap](#future-roadmap)
- [Repository conventions](#repository-conventions)
- [Repository metadata](#repository-metadata)

## About Juwan's Place

Juwan's Place is an entire-home vacation rental in Lapu-Lapu City on Mactan
Island, Cebu. It is intended to give families and small groups a comfortable,
practical home base while visiting the area.

Any future website should help guests understand the property, decide whether
it suits their stay, and continue to the property's official Airbnb listing.
Airbnb remains the booking channel and source of truth for live availability,
pricing, fees, reviews, and reservation terms.

## Property snapshot

The following working details should be checked against the live Airbnb listing
before they are published anywhere:

| Detail | Current brief |
| --- | --- |
| Property type | Entire home |
| General location | Lapu-Lapu City, Mactan, Cebu, Philippines |
| Guest capacity | Up to 6 guests |
| Bedrooms | 3 |
| Beds | 3 |
| Bathrooms | 2 |
| Primary booking channel | Official Airbnb listing |
| Direct booking | Not supported |
| Exact address | Private; shared only through the booking process |

Live facts such as the nightly price, availability, rating, review count,
amenities, policies, and host status must never be copied into permanent
marketing content without a review process. When in doubt, link to Airbnb
instead of presenting information that may become stale.

## Purpose of this repository

This README is the source brief for Juwan's Place. It exists to:

- preserve the property's positioning and communication principles;
- define what a future website should and should not do;
- document content, experience, privacy, and quality requirements;
- keep open decisions visible before development restarts; and
- give a future designer or developer a clean, implementation-neutral handoff.

No framework, hosting platform, CMS, analytics service, or design system has
been selected.

## Goals

A future Juwan's Place website should:

1. Present the home clearly, honestly, and attractively.
2. Give potential guests enough information to judge whether the property
   matches their needs.
3. Build confidence with accurate photography, practical details, and
   transparent expectations.
4. Send booking-ready visitors to the official Airbnb listing.
5. Represent the local setting without publishing the property's exact address.
6. Work well on phones, slow connections, keyboards, and assistive technology.
7. Remain easy for the owner or host to review and update.

## Non-goals

The future website is not intended to:

- accept reservations or payments;
- replace Airbnb's availability, pricing, messaging, or review systems;
- create user accounts;
- publish the property's exact address;
- promise unverified amenities, travel times, or nearby attractions;
- reproduce Airbnb reviews without permission and a clear verification method;
- use fake scarcity, countdowns, or misleading booking prompts; or
- commit the project to a technology stack before its requirements are agreed.

## Audience

### Primary audience

- Families planning a stay in Mactan or greater Cebu
- Small groups of up to six people
- Domestic travelers looking for a practical entire-home stay
- International visitors who want clear, plain-language property information

### What visitors need to know

Visitors should quickly be able to answer:

- What kind of property is this?
- How many people can it accommodate?
- What rooms and facilities are included?
- What does the home look and feel like?
- What rules or limitations should I know?
- Is the general location suitable for my plans?
- Where can I see current pricing and availability?
- How do I book safely through the official listing?

## Brand direction

### Positioning

**A comfortable, practical home base for exploring Mactan and Cebu.**

The presentation should feel welcoming and dependable rather than luxurious for
its own sake. Specific, useful information should do more of the persuasive work
than exaggerated claims.

### Brand qualities

- Warm
- Honest
- Calm
- Practical
- Local
- Hospitable
- Uncomplicated

### Voice

Use friendly, direct English that is easy to understand for both local and
international guests. Keep sentences concise. Prefer concrete descriptions over
superlatives.

### Avoid

- "Best," "perfect," "world-class," or similar unsupported claims
- Invented distances or travel times
- Language that implies direct booking when none exists
- Pressure tactics
- Overly formal hospitality jargon
- Decorative copy that hides important limitations or rules

## Core messaging

Every future channel should communicate the same essentials:

1. **Entire-home stay** — guests have a home suited to a family or small group.
2. **Room for up to six** — capacity and sleeping arrangements are stated
   plainly and verified before publication.
3. **Lapu-Lapu City base** — location is described at an area level, with Mactan
   and Cebu context where useful.
4. **Practical comfort** — photographs and factual details set realistic
   expectations.
5. **Book through Airbnb** — current price, availability, policies, and
   reservations remain on the official listing.

## Future website scope

A future website may include the following pages or sections.

| Page or section | Purpose |
| --- | --- |
| Home | Introduce the property, key facts, selected photography, and Airbnb call to action |
| The Home | Explain rooms, sleeping arrangements, bathrooms, shared spaces, and verified amenities |
| Gallery | Show organized, accurately captioned property photographs |
| Location | Describe Lapu-Lapu City and Mactan without revealing the exact address |
| House Rules | Set expectations for capacity, visitors, pets, smoking, noise, and care of the home |
| Frequently Asked Questions | Answer common pre-booking questions and route live booking questions to Airbnb |
| Contact or Booking | Explain that reservations are completed on the official Airbnb listing |
| Privacy | Disclose any analytics, embeds, forms, cookies, or personal-data processing |
| Accessibility | Explain known accessibility features and limitations without overclaiming |

The final information architecture should be based on real content. Pages should
not be created merely to make the site appear larger.

## Content requirements

### Required before design or development

- Confirmed official Airbnb listing URL
- Approved short and long property descriptions
- Verified capacity, room, bed, and bathroom details
- Current amenity inventory
- Approved house rules and guest limitations
- High-resolution photographs with ownership or usage rights
- Image captions and room labels
- General location copy approved for privacy
- Booking and cancellation language that matches Airbnb
- Contact details that are safe to publish

### Photography standards

- Use only photographs of the actual property.
- Keep colors and proportions realistic.
- Do not use AI-generated rooms as if they were real.
- Avoid edits that materially misrepresent room size, condition, views, or
  amenities.
- Remove image metadata when it could disclose the exact location.
- Add useful alternative text; do not stuff it with search keywords.
- Confirm that identifiable guests or private information are not visible.

### Reviews and social proof

Ratings, review counts, badges, and quotations are time-sensitive. If used, they
must be:

- sourced from the official listing;
- accurate at the time shown;
- dated where appropriate;
- reproduced only when permitted; and
- easy to update or remove.

The safest default is to direct visitors to Airbnb for current reviews.

## Experience requirements

### Primary journey

1. A visitor discovers Juwan's Place.
2. They understand the property type, capacity, and general location.
3. They explore rooms, photographs, rules, and frequently asked questions.
4. They decide whether the home fits their group.
5. They follow a clearly labeled link to the official Airbnb listing.
6. Airbnb handles availability, pricing, communication, and booking.

### Calls to action

Use labels such as:

- View on Airbnb
- Check availability on Airbnb
- See current pricing on Airbnb
- Read guest reviews on Airbnb

Do not use "Book direct" or imply that a click confirms a reservation.
External-booking links should be clearly identified and should not be visually
confused with forms or payment controls.

### Responsive behavior

The most common guest journey is expected to happen on a phone. Any future
experience should therefore be designed mobile-first, while remaining equally
usable on tablets, laptops, and large screens.

## Trust, privacy, and safety

### Exact-address privacy

Public content may describe Lapu-Lapu City, Mactan, Cebu, and approved nearby
landmarks. It must not expose:

- a street address;
- precise map coordinates;
- unit, lot, or subdivision details;
- access instructions;
- lockbox or key information; or
- photographs whose metadata or visible details reveal the address.

### Booking integrity

- Airbnb is the authoritative booking destination.
- No website element should collect payment or imitate Airbnb checkout.
- Price and availability should not be cached as permanent facts.
- Every booking link must be verified before release.
- Links should use HTTPS and point to the expected Airbnb domain.

### Personal data

Collect no personal information unless a clear business need is established.
If forms, analytics, cookies, embedded maps, or third-party media are added,
document what is collected, why it is needed, how long it is kept, and how a
visitor can exercise applicable privacy rights.

## Accessibility

Any future implementation should target WCAG 2.2 Level AA as a practical
baseline. At minimum:

- all functionality works with a keyboard;
- focus is visible and follows a logical order;
- headings and landmarks describe the page structure;
- text and controls meet color-contrast requirements;
- images have meaningful alternative text or are marked decorative;
- controls have accessible names and adequate target sizes;
- content remains usable when zoomed or reflowed;
- animation respects reduced-motion preferences;
- galleries and dialogs manage focus correctly; and
- important information is never conveyed by color alone.

Accessibility claims must be tested, not assumed.

## Search and discoverability

Future search content should focus on accurate intent rather than keyword
volume. Useful subjects may include:

- entire-home stay in Lapu-Lapu City;
- family or small-group accommodation in Mactan;
- vacation rental information for Cebu visitors; and
- verified property features and house rules.

Before launch, define:

- one canonical domain;
- unique page titles and descriptions;
- social-sharing images;
- structured data that matches visible, verified content;
- sitemap and indexing rules;
- redirect behavior; and
- a process for correcting stale search information.

Do not publish exact-address structured data or unsupported pricing, ratings, or
availability.

## Performance and quality

A future implementation should prioritize:

- fast first loads on typical mobile connections;
- appropriately sized and compressed images;
- minimal third-party scripts;
- stable layouts without disruptive shifts;
- progressive enhancement for galleries and animation;
- clear empty, error, and external-link states;
- secure defaults and dependency maintenance; and
- automated checks for broken links, accessibility, and key booking journeys.

Technology choices should follow these requirements rather than define them.

## Success criteria

The project is successful when:

- visitors understand the essential property details without confusion;
- qualified visitors can reach the official Airbnb listing easily;
- no page exposes the exact address or unsafe access information;
- published facts match the approved source of truth;
- the experience is usable across common mobile and desktop devices;
- accessibility and performance checks meet agreed targets;
- content owners can update time-sensitive information safely; and
- the website creates no ambiguity about who handles reservations and payments.

Possible future metrics include outbound Airbnb link clicks, engagement with
property details, frequently asked question usage, page performance, and
verified accessibility results. Metrics should be collected only with an
appropriate privacy approach.

## Open decisions

The following items remain intentionally undecided:

- official Airbnb listing URL;
- public website domain;
- final property copy and approved facts;
- photo library and usage rights;
- final house rules and frequently asked questions;
- whether a separate website is still the best guest-acquisition channel;
- visual identity, logo, typography, and color palette;
- content management workflow;
- analytics requirements;
- framework and hosting platform; and
- launch owner and ongoing maintenance responsibilities.

These decisions should be resolved before a new implementation is commissioned.

## Future roadmap

### Phase 1 — Verify

- Confirm the business goal and audience.
- Audit the live Airbnb listing.
- Approve property facts, rules, and privacy boundaries.
- Collect and organize photography.

### Phase 2 — Define

- Finalize the content model and page scope.
- Write and approve production copy.
- Establish the visual direction.
- Agree on accessibility, performance, and measurement targets.

### Phase 3 — Prototype

- Create low-fidelity flows.
- Test the mobile guest journey.
- Validate the Airbnb handoff.
- Review the design with the property owner or host.

### Phase 4 — Build

- Select the smallest suitable technology stack.
- Implement approved content and interactions.
- Test accessibility, responsiveness, performance, privacy, and external links.
- Prepare ownership and maintenance documentation.

### Phase 5 — Launch and maintain

- Complete a final facts and safety review.
- Publish to the approved domain.
- Monitor broken links and experience quality.
- Re-verify changing property information on a regular schedule.

## Repository conventions

Until a new build is approved:

- keep the repository README-only;
- use issues or external planning tools for proposals rather than committing
  speculative application code;
- treat all property facts as draft until verified;
- never commit secrets, guest information, access instructions, or the exact
  address; and
- begin any future implementation with an explicit scope and architecture
  decision.

When development restarts, this README should remain the product brief and be
updated alongside material decisions.

## Repository metadata

| Field | Value |
| --- | --- |
| Repository | `nathanaellarida/juwans-place` |
| Description | Documentation and future digital-product brief for Juwan's Place, an entire-home vacation rental in Lapu-Lapu City, Cebu, Philippines. |
| Visibility | Private |
| Default branch | `main` |
| Status | Documentation only |

Suggested GitHub topics:

`juwans-place` · `vacation-rental` · `hospitality` · `airbnb` ·
`lapu-lapu-city` · `mactan` · `cebu` · `philippines` · `travel` ·
`product-brief` · `documentation`

## Rights and usage

Unless the owner states otherwise in writing, the property name, copy,
photographs, and other brand assets are reserved for Juwan's Place. This
repository does not grant a general license to reuse them.

---

Last updated: July 25, 2026.
