# YatraVibes — static React rebuild

A hand-built, pre-rendered React rebuild of the YatraVibes travel site (`travel-trusted-5.emergent.host`),
recreated screen-for-screen from the original's own source code and assets — but shipped as a
**server-rendered / statically pre-rendered site**, so the full content is in the HTML that search
engines and social crawlers receive (the original was a client-only SPA that returned an empty shell).

## What's in here

```
src/
  routes/
    __root.tsx        document shell (lang, theme-color, dark body, font preloads)
    index.tsx         "/" route — head/SEO tags + the page composition
  components/
    Navbar.tsx        fixed blurred header, anchor nav, phone + Book Trip CTA
    Hero.tsx          full-screen hero, parallax on scroll, headline/CTAs/scroll hint
    Marquee.tsx       infinite word marquee
    Manifesto.tsx     "Why Choose Us" — 2×2 chapter grid
    Cars.tsx          "Spacious Cars" — Vitara Brezza + Grand Vitara cards
    Destinations.tsx  "Where To Next" — 4 trip tiles in a 12-column grid
    EnquiryModal.tsx  enquiry dialog (validation, toasts) — demo mode by default
    Footer.tsx        brand mark, contact details, quick enquiry / WhatsApp
    GrainOverlay.tsx  film-grain overlay
    HomePage.tsx      page composition + Lenis smooth scroll + toaster state
    motion.ts         shared easings and the reveal hook
  styles/app.css      design tokens, the original's custom utility classes, @font-face
public/
  img/                all photography + logos (WebP / PNG) — nothing hot-linked
  fonts/              self-hosted Syne, Plus Jakarta Sans, JetBrains Mono (woff2)
docs/QA-DIFF.md       the measured fidelity report (reference vs this build)
```

## Run it

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev      # local dev server
bun run build    # production build
bun run start    # serve the production build
```

## Fidelity

Measured against the live reference in the same headless Chromium:

| viewport | reference page height | this build |
|---|---|---|
| 1440 px | 5019 px | 5019 px |
| 1024 px | 5212 px | 5212 px |
| 390 px  | 6867 px | 6867 px |

Section heights, type sizes, tracking, line-heights, colours and image framing were compared element
by element — see `docs/QA-DIFF.md` for the table, the two deviations found (both Tailwind v4 line-height
cascade differences) and their fixes.

## Deliberate differences from the original

1. **Pre-rendered HTML + real SEO head** — proper `<title>`, meta description, canonical, Open Graph /
   Twitter tags and JSON-LD. The original shipped `<title>Emergent | Fullstack App</title>`.
2. **`prefers-reduced-motion` is respected** — smooth scrolling is skipped and reveals resolve to their
   final state. The original ignored the setting.
3. **The enquiry form does not fake a submission.** The original posted to a backend that isn't
   deployed and always errored. This build validates the form and, in demo mode, tells the user the
   enquiry was *not* sent and points at phone/WhatsApp. Set `ENQUIRY_ENDPOINT` and turn off `DEMO_MODE`
   in `src/components/EnquiryModal.tsx` to wire a real endpoint.
4. **`/admin` is not included.** The original's enquiries dashboard requires a backend login that
   doesn't exist here; the footer link is kept for visual fidelity only.
5. **Esc closes the modal** and validation messages are inline (the original relied on bare HTML5
   `required`).

## Rights

The copy, photography, logo and contact details come from the YatraVibes site. Confirm you own or are
licensed to use them before publishing this under your own name and domain.
