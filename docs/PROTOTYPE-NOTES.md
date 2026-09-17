# Baruch College Financial Group — prototype site

A local, interactive proof of concept for a student-run college financial group, built around the
three features that were asked for, plus **five switchable visual styles** so a direction can be chosen.

| Feature requested | Where it lives |
|---|---|
| **Front-page carousel with three sections** | `index.html` — Learn / Invest / Launch |
| **Media tab with video storage & player** | `media.html` — curated YouTube library with an inline player |
| **Resources listing programme details** | `resources.html` — 8 programmes, filters, generated documents |

The look borrows its structure from the three comparison sites: NB.com's three-part hero carousel
and "at a glance" figure band, Aptus's dated media entries with embedded players, Aptus Financial's
expandable programme cards, and Amara's warm editorial voice.

---

## Publish it

Step-by-step publishing instructions (GitHub Pages / Netlify / Vercel) and a pre-launch
checklist are in **`~/Desktop/note.txt`**.

## Run it

**Option A — double-click (macOS).** Open `start.command`. It picks a free port, serves the folder
and opens the browser. (First run: right-click → Open if macOS blocks it.)

**Option B — just open the file.** Double-click `index.html`. Everything works from `file://`
because the JavaScript is bundled into one classic script. Two caveats: some browsers restrict
local storage on `file://` (only affects remembering the chosen style). Option A is better.

**Option C — any static server.**

```bash
cd financial-poc
python3 -m http.server 8000    # → http://localhost:8000
```

No dependencies, no build step needed to view, no network calls except the six embedded YouTube sessions.

---

## The five styles

Open **`themes.html`** to compare them side by side with live previews, or use the floating
**Style** dock in the bottom-left of any page. The choice is remembered, and every page accepts
a `?theme=` link so you can send someone a specific look.

| Style | Character | Best for |
|---|---|---|
| **Ivory & Navy** | Serif headlines, brass accents, soft depth | Faculty, trustees, alumni — the conservative choice |
| **Atlas** | Grotesque type, hairline rules, square corners, cobalt | A design-forward, modern-university feel |
| **Terrace** | Cream paper, terracotta and forest, large serif, flat | Warm, editorial, human |
| **Nightfall** | Dark, mint accent, rounded panels, soft glow | The one students tend to pick |
| **Varsity** | Crimson on charcoal, heavy weights, chunky shadows | Recruiting season, school spirit |

Themes change typography, shape, density, elevation and colour — not just hue.

### Adding a sixth style

Edit the `THEMES` array in `tools/build-themes.mjs` (one object) and run:

```bash
node tools/build-themes.mjs
```

That regenerates `assets/css/themes.css` and `assets/js/theme-meta.js`, and prints a contrast
report. Colours for text-on-background are **derived and contrast-checked**, not hand-picked, so a
new theme cannot silently ship unreadable text. It exits non-zero if any pair fails.

---

## The three headline features

### 1. Front-page carousel — `index.html`
- **Three sections** (Learn / Invest / Launch), each with its own headline, sub-copy, two CTAs and a
  glass "at a glance" panel whose figures **count up** when the slide activates.
- **Tab bar** across the bottom with a per-slide progress bar that fills over 8.5s.
- Arrows, play/pause, **left/right arrow keys**, **swipe on touch**.
- Auto-advances, but pauses on hover, when the hero scrolls out of view, and when the tab is hidden.
- Fully respects `prefers-reduced-motion` (no autoplay, no Ken Burns, no reveal animations).

### 2. Media tab — a curated library with an inline player — `media.html`
- Six real **YouTube embeds** (finance/education) with correct titles, channels and durations,
  red YouTube badges and auto-fetched thumbnails.
- Click any session to play it inline — an **embedded YouTube player** with an up-next playlist,
  a fullscreen button, a "Watch on YouTube" link, and `←/→` / `Esc` keyboard shortcuts.
- Search, tag chips and five sort orders. Filtered views are shareable:
  `media.html?tag=Workshop`, `media.html?tag=Market+Update`, etc.
- **No uploads.** The library is curated — visitors watch, they don't add files. (This was a
  deliberate change from the first build.)

### 3. Resources — `resources.html`
- Eight programmes with **faceted filtering** (category, year, enrolment), search across
  titles/documents/FAQs, and four sort orders. Filters sync to the URL, so
  `resources.html?cat=Competition` and `resources.html?id=student-fund` are shareable deep links.
- Each programme expands to show scope, a **delivery timeline**, **documents** and an **FAQ accordion**.
- **Every document is generated in the browser — nothing is pre-made.** `assets/js/pdf.js` is a
  dependency-free PDF writer (Helvetica, word-wrap, multi-page, correct xref table) that emits real,
  openable PDFs. Spreadsheets export as CSV; `.doc` files as Word-compatible HTML.
- "Download all documents" merges the whole programme into a single multi-page PDF.

---

## Files

```
financial-poc/
├── index.html              carousel home
├── media.html              media tab
├── resources.html          programme catalogue
├── themes.html             live comparison of all five styles
├── start.command           double-click local server (macOS)
├── build.js                bundles assets/js/*.js → bundle.js
├── previews/
│   └── index.html          stills of every style, for quick review
├── tools/
│   └── build-themes.mjs    generates themes.css + theme-meta.js, contrast-checked
└── assets/
    ├── css/
    │   ├── styles.css      structure + components (token-driven)
    │   └── themes.css      GENERATED — the five palettes
    └── js/
        ├── data.js         ALL copy: brand, slides, programmes, media, research
        ├── theme-meta.js   GENERATED — style id/label/blurb/swatches
        ├── site.js         icons, header/footer, toasts, helpers, motion
        ├── theme.js        style switcher + floating dock
        ├── pdf.js          dependency-free PDF + CSV writer
        ├── home.js         carousel + home sections
        ├── media.js        curated library, filters, inline player
        ├── resources.js    filters, accordion, document generation
        ├── gallery.js      the themes.html comparison page
        └── bundle.js       ← autogenerated; the pages load this
```

### Editing content
**All copy lives in `assets/js/data.js`** — the group name, contact details, the three carousel
sections, all eight programmes, the seeded media and the research rail. Edit that file for almost
any change. The pages load `bundle.js`, so after editing anything in `assets/js/` (or `themes.css`):

```bash
node build.js
```

To work against the ES modules directly instead, swap the `<script defer src="...bundle.js">` tag
for `<script type="module" src="assets/js/home.js">` and serve over `http://`.

---

## What was verified

Rendered in headless Chromium (Puppeteer), not just eyeballed. Across **60 page-renders**
(4 pages × 5 styles × 3 widths: 390 / 834 / 1440):

- **0 horizontal scrollbars**, 0 overflowing content
- **0 contrast failures** — every text/background pair meets WCAG AA (4.5:1); the palettes are
  derived to pass rather than picked by eye
- **0 JavaScript errors**
- **0 touch targets below 24×24** (WCAG 2.2 AA Target Size)

Plus data-integrity checks (every programme's rendered highlights / schedule / documents / FAQs
match `data.js` exactly), interaction tests (carousel, filters, deep links, player, playlist,
keyboard, all three document formats) and PDF validation against Apple's PDFKit.

Three real bugs were found and fixed this way: a duplicate `const` in the PDF writer, a CSS class
collision that made Word-type document icons inherit row padding and border, and a shadowed
variable that would have broken the media modal.

`previews/index.html` holds stills of every style if you would rather look than click.

---

## Notes

- Illustrative sample content only. No member data, nothing leaves the machine, no analytics.
- Accessibility: skip links, ARIA on the carousel/tabs/accordion/player, visible focus rings,
  keyboard operation throughout, and live-region toasts that never intercept clicks.
- Everything is fictional — the group, its members, the fund figures and the outcomes data.
