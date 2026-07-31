# Implementation map

| Requirement | Implementation |
| --- | --- |
| Global editable site data | `src/config/site.ts` |
| Property facts and rooms | `src/data/property.ts` |
| Amenities | `src/data/amenities.ts` |
| FAQs | `src/data/faqs.ts` |
| Destination places | `src/data/places.ts` |
| House rules | `src/data/house-rules.ts` |
| Central motion values | `src/lib/motion.ts` |
| Generated image inventory | `src/generated/image-manifest.ts` |
| Image manifest generator | `scripts/generate-image-manifest.mjs` |
| Preloader | `src/components/Preloader.tsx` |
| Smooth scroll | `src/components/SmoothScroll.tsx` |
| Route curtains | `src/components/RouteTransition.tsx` |
| Header and menu trigger | `src/components/SiteHeader.tsx` |
| Accessible overlay menu | `src/components/MenuOverlay.tsx` |
| Hero | `src/components/Hero.tsx` |
| Intro and bedroom cards | `src/components/HomeIntro.tsx` |
| Extended homepage flow | `src/components/HomeSections.tsx` |
| Image slot / placeholder | `src/components/ImagePanel.tsx` |
| Gallery filters and lightbox | `src/components/GalleryClient.tsx` |
| 3D tour gate and iframe | `src/components/VirtualTour.tsx` |
| Accessible FAQ accordion | `src/components/FaqAccordion.tsx` |
| Floating contact/tour/top controls | `src/components/FloatingControls.tsx` |
| Footer | `src/components/Footer.tsx` |
| Homepage | `src/app/page.tsx` |
| Detailed property route | `src/app/the-home/page.tsx` |
| Gallery route | `src/app/gallery/page.tsx` |
| Location route | `src/app/location/page.tsx` |
| Rules route | `src/app/house-rules/page.tsx` |
| FAQ route | `src/app/faq/page.tsx` |
| Privacy route | `src/app/privacy/page.tsx` |
| Booking safety route | `src/app/booking-safety/page.tsx` |
| Accessibility route | `src/app/accessibility/page.tsx` |
| Automated route/viewport smoke test | `scripts/smoke.mjs` |

## Environment-controlled behavior

| Variable | Missing state | Configured state |
| --- | --- | --- |
| `NEXT_PUBLIC_AIRBNB_URL` | clearly disabled “Airbnb link coming soon” controls | safe new-tab Airbnb controls |
| `NEXT_PUBLIC_MATTERPORT_URL` | premium “3D tour coming soon” panel | near-viewport lazy iframe and external fallback |
| `NEXT_PUBLIC_AREA_MAP_URL` | “Area map coming soon” | external approved area-map control |
| `NEXT_PUBLIC_CONTACT_URL` | floating contact control hidden; footer says coming soon | floating and footer external contact controls |
