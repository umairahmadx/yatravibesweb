# YatraVibes — Static React Build

A hand-built, pre-rendered React rebuild of the YatraVibes travel site, recreating the design and components in React with Vite & TanStack Router.

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
  styles/app.css      design tokens, custom utility classes, @font-face
public/
  img/                all photography + logos (WebP / PNG)
  fonts/              self-hosted fonts (woff2)
docs/QA-DIFF.md       fidelity report
```

## Local Development

Requires [Bun](https://bun.sh) or Node.js.

```bash
bun install
bun run dev          # local dev server
bun run build:pages  # static build for deployment
bun run start        # serve locally
```

## Deploying to Cloudflare Pages

To deploy this site on Cloudflare Pages:

1. Go to **Cloudflare Pages** -> **Create a project** -> **Connect to Git**.
2. Select your repository (`yatravibesweb`).
3. Set the following **Build Settings**:
   - **Framework preset**: `None` (or `Vite`)
   - **Build command**: `bun run build:pages` (or `npm run build:pages`)
   - **Build output directory**: `dist/client`
4. Click **Save and Deploy**.

Cloudflare Pages will build the site, generate pre-rendered static HTML (`index.html`) with complete SEO meta tags, and serve it via Cloudflare CDN.
