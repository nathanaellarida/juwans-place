# Juwan's Place

An original, responsive property website for Juwan's Place in Lapu-Lapu City,
Philippines. The experience uses a bold editorial layout, warm tropical color,
smooth scroll, accessible motion, and property-first storytelling while keeping
reservations and payments on Airbnb.

## Stack

- Next.js 16 App Router with React 19 and TypeScript
- Tailwind CSS 4
- GSAP and ScrollTrigger for choreographed motion
- Lenis for smooth scrolling
- Self-hosted Instrument Sans and Archivo Narrow fonts
- Playwright-compatible responsive smoke tests

## Local development

Node.js 20.9 or newer is required.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

All integrations are optional. Missing values render honest, non-clickable
fallbacks instead of guessed links.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_AIRBNB_URL` | Official Juwan's Place Airbnb listing |
| `NEXT_PUBLIC_MATTERPORT_URL` | Matterport showcase URL for the virtual tour |
| `NEXT_PUBLIC_AREA_MAP_URL` | General-area map URL; do not use a precise address pin |
| `NEXT_PUBLIC_CONTACT_URL` | Optional contact link, such as the host's approved WhatsApp URL |

Reservations and payments must continue through Airbnb only. Do not add direct
checkout, prices, payment collection, or a guessed listing URL.

## Property photos

Add approved images to the category folders under `public/images/property/`.
Destination images belong under `public/images/lapu-lapu/`. The generator
creates `src/generated/image-manifest.ts` automatically before development and
production builds.

```bash
npm run images
```

Empty folders are intentional: the UI shows designed placeholders until real
files are supplied. See [docs/image-guide.md](docs/image-guide.md) for filenames,
crop guidance, licensing, privacy exclusions, and the complete folder map.

## Content updates

Durable facts live in `src/data/` and integration values live in
`src/config/site.ts`. Keep price, availability, cancellation terms, fees, and
arrival instructions on Airbnb.

The main routes are:

- `/` — landing page
- `/the-house` — rooms, amenities, and virtual tour
- `/location` — general Lapu-Lapu and Mactan context
- `/house-rules` — stay expectations
- `/faq` — practical guest questions
- `/privacy`, `/booking-safety`, `/accessibility` — policy pages

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke
```

The smoke suite starts the production build, checks every public route, verifies
the accessible menu, watches for browser errors, tests horizontal overflow at
360, 390, 430, 768, 1024, 1280, 1440, and 1920 pixels, and saves representative
screenshots to `implementation-captures/`.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Use the detected Next.js settings.
3. Add only the approved environment variables listed above.
4. Deploy, then verify the Airbnb, Matterport, area map, and contact links in the
   production environment.
5. Add the production domain to the Airbnb listing or other trusted host
   profiles so guests can confirm the site's legitimacy.

The site is statically prerendered and does not require a database.

## Project documentation

- [Layout specification](docs/layout-specification.md)
- [Motion specification](docs/motion-specification.md)
- [Responsive specification](docs/responsive-specification.md)
- [Implementation map](docs/implementation-map.md)
- [Fidelity review](docs/fidelity-review.md)
- [Content guide](docs/content-guide.md)
- [Image guide](docs/image-guide.md)
- [Security notes](docs/security-notes.md)

All
code, graphics, copy, and the Juwan's Place identity in this repository are
original.
