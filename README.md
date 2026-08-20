# Commodex Pty Ltd — Coming Soon

A single-page "coming soon" site for **Commodex Pty Ltd**, styled after the
Leroux (Qode Interactive) coming-soon layout: full-screen scenic backdrop, thin
inner frame, centred serif wordmark, oversized display heading, live countdown,
newsletter capture and a social row.

Plain HTML/CSS/JS — no build step, no dependencies. Open `index.html` or serve
the folder statically (GitHub Pages, Netlify, S3, cPanel, anything).

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page markup and all visible copy |
| `assets/css/style.css` | Palette, type scale, layout, animations, responsive rules |
| `assets/js/main.js` | Countdown, newsletter form, footer year |
| `assets/img/background.svg` | Wheat field at dusk (vector, ~48 KB, no external images) |
| `assets/img/grain.svg` | Film-grain overlay texture |
| `assets/img/favicon.svg` | Favicon |

## Customising

**Launch date** — edit the `data-launch` attribute (ISO 8601, keep the timezone
offset; `+10:00` is AEST):

```html
<div class="countdown" data-countdown data-launch="2026-10-01T09:00:00+10:00" ...>
```

If the value is missing or unparseable the countdown falls back to 90 days out.

**Newsletter form** — by default the form validates the address and hands it to
the visitor's mail client (`data-mailto`). To post it to a form service instead
(Mailchimp, Formspree, Netlify Forms, your own endpoint), fill in
`data-endpoint`; it receives `POST` with a JSON body `{"email": "..."}`:

```html
<form class="subscribe__form" data-subscribe
      data-endpoint="https://formspree.io/f/xxxxxxx"
      data-mailto="info@commodex.au" novalidate>
```

**Contact details and social links** — the email (`info@commodex.au`) and ABN
(`40 686 470 502`) in the `<footer>` of `index.html` are the real ones. Still
placeholders: the phone number (`+61 (0)0 0000 0000`) and the `href="#"` on each
social icon — replace those before going live, or delete the list items you
don't need.

**Colours and fonts** — the tokens at the top of `assets/css/style.css`:

```css
--ink: #12140f;        /* page black          */
--bone: #f2ece1;       /* primary text        */
--gold: #c2a15c;       /* accent              */
--gold-bright: #e0c489;/* accent, highlighted */
--font-display: "Cormorant Garamond", …;
--font-body: "Jost", …;
```

Fonts load from Google Fonts; both have local serif/sans fallbacks, so the page
still renders correctly if that request is blocked.

**Background** — swap `assets/img/background.svg` for a photograph by changing
the URL in `.backdrop__image`. Tune the darkening layer in `.backdrop__veil` if
the new image needs more or less contrast behind the text.

## Notes

- Layout is height-aware as well as width-aware, so the full composition fits
  one screen from 1440×900 down to 1280×720 and on phones.
- Respects `prefers-reduced-motion`: the background drift and entrance
  animations are disabled.
- Social icons and the logo mark are inline SVG; the form is keyboard
  accessible and status messages are announced via `role="status"`.
