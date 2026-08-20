# Commodex Pty Ltd

Coming-soon site for **Commodex Pty Ltd** — React + Vite + Tailwind, ported from the Base44 build.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview   # serve the production build
```

## Provenance of each file

**Base44 exports, used verbatim** — do not hand-edit; re-export instead:

| File | Notes |
| --- | --- |
| `src/index.css` | Tokens, font stacks, `horizon-scan` / `pulse-node` / `ticker-blink` keyframes. Local additions are appended at the end only: a `prefers-reduced-motion` block and the `wave-drift` / `wave-sheen` hero keyframes. |
| `tailwind.config.js` | Requires `tailwindcss-animate`. Stays CommonJS; Tailwind loads it through jiti despite `"type": "module"`. |
| `components.json` | shadcn config (new-york, jsx, neutral, lucide). |
| `src/components/ui/image-helpers.js`, `src/hooks/use-size.js` | Wix media transform pipeline. |
| `src/pages/ComingSoon.jsx` | Page composition. |

`src/components/commode/Hero.jsx` is the Base44 export with three requested changes: the wordmark is
one word (`COMMODEX` at `13.2vw`, centred) instead of `COMMO` / `DEX` split to the edges, the
background wrapper carries `animate-wave-drift`, and a `wave-sheen` layer ripples light across the
texture. The one-word wordmark also resolved the old mobile clipping.
| `src/components/ui/image.jsx` | Two local deviations, both documented in the file header: a `fallbackSrc` prop, and object-fit applied on the plain-`<img>` branches. |

**Rebuilt here from a screenshot** — placeholders meant to be replaced by the real exports; each says so
at the top of the file: `Countdown`, `StrategicIntent`, `InquiryPortal`, `GlobalPulse`, `CornerMenu`,
`HorizonScan`.

## Sector artwork

Each pillar reveals a generated SVG scene on hover — `public/sectors/energy.svg` (refinery and flare
stack), `agriculture.svg` (silos over a wheat field) and `consulting.svg` (a lit skyline). They're
composed for a portrait crop, since the columns are tall and narrow, and sit under a gradient scrim so
the copy stays readable. Swap in photography by replacing those three files; the `image` field on each
entry in `PILLARS` is the only reference.

## The map

`GlobalPulse` draws a dot-matrix landmass from `world-dots.js`, generated offline by
`scripts/generate-world-dots.mjs` from `world-atlas`'s Natural Earth 110m land data — sampled every 3°
of lat/lon and emitted as a single SVG path (1,663 squares, ~31 KB). Nine hubs sit on the same equirectangular
projection — Canada, Brazil, Saudi Arabia, Qatar, Dubai, Bangladesh, Shanghai, Singapore and Australia
— each with a blinking ring marker; Australia is larger and in accent. No route lines. Label placement
(`anchor`, `dy` per hub) is tuned so nothing overlaps; a collision check runs in the verification pass. To change density or extent, edit `STEP`/`DOT`/`LAT_TOP` in the script and re-run
`node scripts/generate-world-dots.mjs`. `world-atlas`, `topojson-client` and `d3-geo` are devDependencies
only — nothing ships to the browser.

## Outstanding

- **`LAUNCH`** in `Countdown.jsx` is `2026-08-22T00:00:00+10:00` (Sydney).
- **The six rebuilt components** — copy and spacing are inferences from a screenshot. The theme
  underneath them is exact.
- **Hero image** — `Hero.jsx` points at the Base44 CDN, with `public/hero.jpg` (a generated
  molten-metal texture) as the `fallbackSrc`. To self-host, save the real asset over `public/hero.jpg`
  and point `HERO_IMG` at `/hero.jpg`.
- **Sector artwork is illustration, not photography.** Generated SVG scenes stand in until real
  imagery exists — see above for how to swap them.

## Fonts

Playfair Display, Inter Tight and JetBrains Mono load from Google Fonts in `index.html`.
`--font-display` lists **"Editorial New"** first — a licensed face that isn't hosted here, so the
wordmark renders in Playfair Display until the `.woff2` files are added to `public/fonts` with an
`@font-face` rule.

## A note on `hsl(var(--x))` and opacity modifiers

Your config maps colours without the `<alpha-value>` placeholder, and the shadcn-adjacent lore says
opacity modifiers silently break in that setup. **Measured, they don't:** with this exact config,
`bg-background/80` computes to `rgba(10, 10, 10, 0.8)` in Chromium. The hero scrim is genuinely 80%
opaque here as designed — no change needed.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on pushes to `main` or
`claude/commodex-website-template-bbkrd2`. One-time setup: **Settings → Pages → Source: GitHub Actions**.
`public/CNAME` points at `commodex.au` with `base: "/"` in `vite.config.js`; for
`sabil144.github.io/commodex/`, delete the CNAME and set `base: "/commodex/"`.
