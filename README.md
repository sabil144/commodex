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
| `src/index.css` | Tokens, font stacks, `horizon-scan` / `pulse-node` / `ticker-blink` keyframes. A `prefers-reduced-motion` block is appended at the end — the only local addition. |
| `tailwind.config.js` | Requires `tailwindcss-animate`. Stays CommonJS; Tailwind loads it through jiti despite `"type": "module"`. |
| `components.json` | shadcn config (new-york, jsx, neutral, lucide). |
| `src/components/ui/image-helpers.js`, `src/hooks/use-size.js` | Wix media transform pipeline. |
| `src/pages/ComingSoon.jsx`, `src/components/commode/Hero.jsx` | Page composition and hero. |
| `src/components/ui/image.jsx` | Two local deviations, both documented in the file header: a `fallbackSrc` prop, and object-fit applied on the plain-`<img>` branches. |

**Rebuilt here from a screenshot** — placeholders meant to be replaced by the real exports; each says so
at the top of the file: `Countdown`, `StrategicIntent`, `InquiryPortal`, `GlobalPulse`, `CornerMenu`,
`HorizonScan`.

## Outstanding

- **`LAUNCH` date** in `Countdown.jsx` is a guess: `2026-12-31T00:00:00+11:00`, which reads 132 days.
- **The six rebuilt components** — copy, spacing and the map's route pairs are inferences from one
  screenshot. The theme underneath them is exact.
- **Hero image** — `Hero.jsx` points at the Base44 CDN, with `public/hero.jpg` (a generated
  molten-metal texture) as the `fallbackSrc`. To self-host, save the real asset over `public/hero.jpg`
  and point `HERO_IMG` at `/hero.jpg`.
- **`DEX` clips off-screen on phones.** In `Hero.jsx` both halves of the wordmark are `text-[20vw]`
  inside a `justify-between` row, so at 390px the second half ends ~104px past the viewport and the
  hero's `overflow-hidden` cuts it. Fix in Base44 by dropping the mobile step to about `text-[13vw]`,
  or stacking the two halves below `sm`.

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
