# QA-DIFF — YatraVibes rebuild vs reference

Method: both sites measured in the *same* headless Chromium (dsf 1, no scrollbar drift) at 1440 / 1024 / 390,
fonts settled, reveals fired. Reference = https://travel-trusted-5.emergent.host/, ours = the port-3000 build.
Scripts: `qa-measure.mjs` (identical probe list on both sites) → `qa-diff.mjs` (field-by-field diff),
`qa-pixdiff.mjs` (full-page pixel diff), `qa-el.mjs` (per-section element diff). Raw data: `lead-shots/qa-{ref,ours}-<w>.json`.

## Page height

| width | reference | ours before | ours now | delta now |
|---|---|---|---|---|
| 1440 | 5019 | 5027 (+8) | **5019** | 0 |
| 1024 | 5212 | 5224 (+12) | **5212** | 0 |
| 390 | 6867 | 6867 | **6867** | 0 |

Note: `recon/screenshots/home-390-full.png` is 6875 tall — that older capture used a different browser context.
Re-measuring the live reference at 390 gives 6867, which is what ours was already producing.

## Section by section

| section | check | reference | ours (before → after) | delta | action |
|---|---|---|---|---|---|
| navbar | header height | 65 | 65 | 0 | none |
| navbar | nav row top / height | 24 / 17 | 24 / 17 | 0 | none |
| hero | section height (min-h-screen) | 900 | 900 | 0 | none |
| hero | h1 line-height @1440 | 96px (h=288) | 91.2 (h=273.6) → 96 | −4.8/line | **fixed** `sm:leading-none` |
| hero | h1 line-height @1024 | 96px (h=288) | 91.2 → 96 | −4.8/line | **fixed** |
| hero | h1 font-size / tracking | 96px / −2.4px | 96px / −2.4px | 0 | none |
| hero | subtitle line-height @sm+ | 28px | 29.25 | −1.25/line | **fixed** `sm:leading-7` |
| marquee | band height (py-5) | 70 | 70 | 0 | none |
| marquee | row width (w-max overflow) | 1576 docW | 1576 docW | 0 | none |
| manifesto | section height @1440 | 955 | 963 → 955 | +8 → 0 | **fixed** |
| manifesto | section height @1024 | 1067 | 1079 → 1067 | +12 → 0 | **fixed** |
| manifesto | section height @390 | 1426 | 1426 | 0 | none |
| manifesto | chapter cell height @1440 | 276 | 280 → 276 | +4 → 0 | **fixed** |
| manifesto | desc line-height @lg | 24px | 26px | −2/line | **fixed** `lg:leading-normal` |
| manifesto | grid / cell padding, gap-px | 555 / p-14 | 555 / p-14 | 0 | none |
| manifesto | eyebrow, h2, h3 size + tracking | 12/48/24px | same | 0 | none |
| cars | section height | 1058 | 1058 | 0 | none |
| cars | intro paragraph line-height @lg | 24px | 26px | −2/line | **fixed** `lg:leading-normal` |
| cars | card, image frame (h-64 / sm:h-80), body | 1058 total | same | 0 | none |
| cars | image object-fit / object-position | cover / 50% 50% | same | 0 | none |
| cars | h3, meta, badges, button boxes | 24px / p-8 | same | 0 | none |
| trips | section height | 1192 | 1192 | 0 | none |
| trips | tile heights (h-72 / sm:h-96), spans 7/5/5/7 | 382 / 464,660 w | same | 0 | none |
| trips | image object-fit / object-position | cover / 50% 50% | same | 0 | none |
| footer | section height @1440 / @390 | 844 / 1094 | 844 / 1094 | 0 | none |
| footer | logo box, wordmark size, 3-col grid, bottom bar | 144 / 144 / … / … | same | 0 | none |
| all | horizontal overflow (docW) | 1576 / 1496 / 520 | 1576 / 1496 / 520 | 0 | none (marquee row, clipped both sides) |
| all | colours (sampled + pixel diff) | — | — | sub-perceptual | none |

## Root cause of the two real deviations

Both come from **Tailwind version cascade semantics**, not from the JSX (the port is class-for-class identical).
The original's compiled CSS (`recon/source-original/main.css`) is v3-style: base utilities are emitted first,
responsive variants last, and a `text-*` utility always carries its own `line-height`. So:

- `.leading-\[0\.95\]` (base range) < `.lg\:text-8xl{font-size:6rem;line-height:1}` (emitted later) → the h1 is
  1.0 line-height at ≥640px in the original, 0.95 below that.
- `.leading-relaxed{1.625}` < `.lg\:text-base{font-size:1rem;line-height:1.5rem}` → 24px, not 26px, at lg.

In Tailwind v4 (our build) `leading-*` writes `--tw-leading`, which the font-size utility obeys at every breakpoint,
so our `leading-*` won. Fixed by adding the breakpoint-matched override the original's cascade produces, at the
four places that pair a `leading-*` with a responsive font size: hero h1 (`sm:leading-none`), hero subtitle
(`sm:leading-7`), manifesto chapters and cars intro (`lg:leading-normal`). No other classes were touched.

## Pixel diff after the fixes (matched captures, mean |Δ| per channel 0–255)

1440: hero 1.45 · marquee 0.08 · manifesto 0.02 · footer 0.96 · cars 0.51 — i.e. text, hairlines and padding rasterise
at the same coordinates on both sites (residual is antialiasing and font rasteriser noise).

Section-level comparison of the two image-heavy sections (`qa-el.mjs`, same DOM node screenshotted on both sides),
after the fixes — **node sizes match exactly**, so the boxes, crops and text flow are identical:

| section | node | reference | ours |
|---|---|---|---|
| cars @1440 | `#cars` | 1440×1058 | 1440×1058 |
| trips @1440 | `#trips` | 1440×1193 | 1440×1193 |
| cars @390 | `#cars` | 390×1794 | 390×1794 |
| trips @390 | `#trips` | 390×1585 | 390×1585 |

Their remaining mean |Δ| (26–43) is **not** an image/crop difference: the reference's element screenshot paints its
own fixed navbar across the middle of the crop and leaves a band blank where its reveal animation had not fired,
while ours shows the revealed content there. Visual check of both car cards side by side confirms the same photos,
the same `object-cover` framing, the same clipped-frame corner and the same type.

## Verification after the fixes

- `bun run publish` → published, serving on port 3000.
- `curl http://localhost:3000/` → 200, 42 KB of HTML; the pre-rendered markup contains the h1 lines
  ("DRIVE." / "EXPLORE."), "Why Choose", both car names, all four trip titles, the WhatsApp CTA and the footer
  contact details (18 occurrences of the brand name).
- Re-shoots in this folder: `ours-1440-full.png` = 1576×5019 (was 5027), `ours-390-full.png` = 520×6867 (unchanged
  height, deltas already zero). `measure-1440.json` now reports h1 line-height 96px.

## Not covered by this pass

- Deliberately deferred to the SEO/a11y pass: robots.txt, sitemap.xml, canonical/OG, JSON-LD, srcset, focus trap.
- The documented `prefers-reduced-motion` deviation (the original ignores the setting; we honour it) remains.
