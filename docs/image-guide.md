# Image guide

## Recommended preparation

- Landscape orientation for primary property images
- About `2000 × 1333px` or larger
- `3:2` is a useful source ratio
- Keep the main subject away from extreme edges because responsive panels crop
- Export high-quality `.jpg`, `.webp`, or `.avif`

The manifest also accepts `.jpeg` and `.png`.

## Folder structure

```text
public/images/
  property/
    hero/
    exterior/
    bedrooms/
    living/
    dining/
    kitchen/
    bathrooms/
    fitness/
    stairs/
    storage/
    details/
    _excluded/
  lapu-lapu/
    shrine/
    monument/
    coast/
    food/
    airport/
    city/
  placeholders/
```

Run `npm run images` after adding files. Development and production builds run
the same generator automatically.

## Preferred property filenames

- `property/hero/juwans-place-hero.jpg`
- `property/exterior/exterior-main.jpg`
- `property/exterior/garage.jpg`
- `property/exterior/entrance.jpg`
- `property/bedrooms/blue-bedroom.jpg`
- `property/bedrooms/yellow-bedroom.jpg`
- `property/bedrooms/pink-bedroom.jpg`
- `property/living/living-room-main.jpg`
- `property/living/living-room-tv.jpg`
- `property/living/open-plan-living.jpg`
- `property/dining/dining-area.jpg`
- `property/kitchen/kitchen-main.jpg`
- `property/kitchen/kitchen-angle-2.jpg`
- `property/kitchen/kitchen-angle-3.jpg`
- `property/bathrooms/upstairs-bathtub.jpg`
- `property/bathrooms/shower-bathroom.jpg`
- `property/fitness/stationary-bike.jpg`
- `property/fitness/home-gym.jpg`
- `property/stairs/wooden-staircase.jpg`
- `property/storage/wardrobe-area.jpg`
- `property/details/home-detail.jpg`

## Preferred Lapu-Lapu filenames

- `lapu-lapu/shrine/mactan-shrine.jpg`
- `lapu-lapu/monument/lapu-lapu-monument.jpg`
- `lapu-lapu/coast/mactan-coast.jpg`
- `lapu-lapu/food/local-food.jpg`
- `lapu-lapu/airport/airport-area.jpg`
- `lapu-lapu/city/lapu-lapu-city.jpg`

Use only properly licensed destination images. Do not hotlink.

## Slot behavior

1. The preferred filename wins when present.
2. Otherwise, the first image in that category fills the slot.
3. Otherwise, the designed spatial placeholder is shown.
4. Additional approved images stay available to any slot that names their
   category.

## Exclusion and privacy

Move unsafe or unused property files into
`public/images/property/_excluded/`. The generator ignores that folder and all
directories beginning with `_`.

Do not publish images that reveal:

- a street, block, lot, unit, or full address;
- lock, key, security, or access-control details;
- private documents or personal information;
- identifiable guests without permission; or
- metadata that creates a precise-location risk.

Also exclude:

- visible third-party watermarks;
- visibly AI-generated property images;
- edits that materially misrepresent size, condition, view, or amenities; and
- the close-up property-address sign image.
