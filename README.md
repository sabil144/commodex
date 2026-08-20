# Commodex Pty Ltd

Coming-soon site for **Commodex Pty Ltd** — React + Vite + Tailwind, ported from the
Base44 build so the source lives in git.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview   # serve the production build
```

## Layout

```
index.html                    Vite entry + Google Fonts
vite.config.js                "@" -> ./src, deploy base path
tailwind.config.js            colour tokens + display/body/mono-label families
src/
  main.jsx                    mounts <ComingSoon />
  index.css                   Tailwind directives + :root design tokens
  lib/utils.js                cn() helper (clsx + tailwind-merge)
  pages/ComingSoon.jsx        page composition
  components/ui/image.jsx     <Image> stand-in for the Base44 component
  components/commode/         Hero, Countdown, StrategicIntent, InquiryPortal,
                              GlobalPulse, CornerMenu, HorizonScan
```

## Still to come from Base44

`Hero.jsx` and `ComingSoon.jsx` are the real exports. These are placeholders and are
meant to be overwritten with their Base44 versions — each says so at the top of the file:

| File | Placeholder behaviour |
| --- | --- |
| `components/commode/Countdown.jsx` | Working 5-unit countdown, but `LAUNCH` is a guess (2026-12-31) |
| `components/commode/StrategicIntent.jsx` | Eyebrow + heading only |
| `components/commode/InquiryPortal.jsx` | Eyebrow + heading only |
| `components/commode/GlobalPulse.jsx` | Eyebrow + heading only |
| `components/commode/CornerMenu.jsx` | Renders nothing |
| `components/commode/HorizonScan.jsx` | Renders nothing |
| `components/ui/image.jsx` | `<img>` honouring `fittingType="fill" \| "fit"` |

`clsx`, `tailwind-merge`, `lucide-react` and `framer-motion` are already installed, so
Base44 components that import `cn`, Lucide icons or motion drop in without changes.

## Design tokens

Colours live as bare HSL triples on `:root` in `src/index.css` and are mapped in
`tailwind.config.js` with `<alpha-value>`, which is what makes `bg-background/80` and
`hsl(var(--accent) / 0.12)` work. The palette is single-theme dark by intent.

| Token | Role |
| --- | --- |
| `--background` `30 8% 4%` | page ground |
| `--foreground` `40 18% 89%` | bone text |
| `--accent` `39 48% 58%` | gold — countdown ms, section eyebrows, hover states |
| `--muted-foreground` `40 7% 51%` | labels, secondary copy |
| `--border` `33 8% 16%` | hairlines |

Fonts (Google Fonts, loaded in `index.html`): **Bodoni Moda** display, **Inter** body,
**IBM Plex Mono** for the uppercase machine labels. `.font-mono-label` in `src/index.css`
adds the uppercase + letter-spacing those labels rely on.

## Hero image

`Hero.jsx` points at the Base44 CDN
(`media.base44.com/images/public/…/7c0241032_generated_082ac954.png`). To self-host it,
save the file to `public/hero.png` and change `HERO_IMG` in `src/components/commode/Hero.jsx`
to `/hero.png`.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to
`main` or `claude/commodex-website-template-bbkrd2`. One-time setup: repo
**Settings → Pages → Source: GitHub Actions**.

`public/CNAME` points at `commodex.au` and `vite.config.js` uses `base: "/"`. For
`sabil144.github.io/commodex/` instead, delete the CNAME and set `base: "/commodex/"`.
