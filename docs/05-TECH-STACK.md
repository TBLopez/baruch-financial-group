# 05 — What it is actually built with

## The answer in one line

**Hand-written static HTML, CSS and JavaScript. No framework, no CSS library, no npm
dependencies, no build step required to deploy, no server, no database.** Node is used only to
run two optional helper scripts; Python is used only to serve the folder locally while you edit.

Everything below is verifiable by reading the files — this is a description, not a
specification the code is trying to live up to.

---

## 1. The layers

| Layer | Technology | Notes |
|---|---|---|
| **Markup** | HTML5, hand-written | 6 pages: `index.html`, `events.html`, `media.html`, `resources.html`, `themes.html`, `404.html`. Semantic elements (`header`, `main`, `section`, `article`, `nav`), ARIA roles on the carousel, tabs, accordion, player and modal, `lang="en"`, skip links |
| **Styling** | Plain CSS3, no preprocessor, no framework | 2 files. 1,032 lines of hand-written structure (`assets/css/styles.css`) + 502 lines of **generated** palettes (`assets/css/themes.css`). Design tokens as CSS custom properties; `clamp()` for fluid type; 6 breakpoints + a `print` block + a `prefers-reduced-motion` block |
| **Scripting** | ES2020+ JavaScript, hand-written ES modules | 10 modules, ~2,700 lines. No React/Vue/Svelte/jQuery, no TypeScript, no state library. `IntersectionObserver`, `URLSearchParams`, `history.replaceState`, `localStorage`, `matchMedia`, `Blob` + `URL.createObjectURL`, `requestFullscreen`, `requestAnimationFrame`, `crypto.randomUUID` |
| **Bundling** | A **custom 75-line Node script** (`build.js`) | Merges the 10 modules into one classic script (`assets/js/bundle.js`). No webpack/Vite/Rollup/esbuild. Exists for one reason: browsers block ES module imports on `file://`, and this keeps the site double-clickable |
| **Theme engine** | A **custom ~400-line Node script** (`tools/build-themes.mjs`) | Generates the five palettes and contrast-checks every text/background pair against WCAG AA before writing anything |
| **Document generation** | A **hand-written PDF writer** (`assets/js/pdf.js`, 354 lines) | Base-14 Helvetica metrics, word wrap, multi-page layout, correct cross-reference table. Also emits CSV and Word-compatible `.doc` HTML. No jsPDF, no pdf-lib |
| **Media** | YouTube embeds | Privacy-enhanced `youtube-nocookie.com` iframes, created on click (nothing loads from YouTube until a visitor presses play); thumbnails from `i.ytimg.com`. These are the **only** external network requests the site makes |
| **Fonts** | System font stacks | `-apple-system`, `Segoe UI`, `Roboto`, `Georgia`, `Iowan Old Style`, etc. **No webfonts, no Google Fonts** — zero render-blocking type requests, and the site renders identically offline |
| **Images** | Plain `<img>` / CSS backgrounds | `og.jpg` (85 kB), `favicon.svg`, `favicon.ico`. No image service, no CDN transform. Dev-only screenshots live in `previews/` |
| **Local dev server** | `python3 -m http.server 8777 --bind 127.0.0.1` | Started by `start.command` (auto-increments the port if 8777 is taken). Purely a convenience — **not part of the product** |
| **Runtime / hosting** | Any static host | GitHub Pages, Netlify, Cloudflare Pages, Vercel, S3 + CloudFront, an Apache/nginx box. No server-side language, no database, no functions, no edge config |
| **Toolchain required** | Node 22 + Python 3 | Only for `build.js`, `build-themes.mjs` and the local preview. Deploying requires neither |

---

## 2. What "no dependencies" actually means

There is **no `package.json`, no `node_modules`, no lockfile** in this project. That is a
deliberate design choice with real consequences:

- **No supply chain.** Nothing to audit, no transitive package that can be hijacked, no
  `npm audit` findings, no licence questions.
- **No version treadmill.** No framework major-version migration, no deprecated API to chase.
  The code will still run in five years without a single change — this is the main reason the
  next set of officers can inherit it.
- **No build required to deploy.** The repository *is* the website. What you push is what
  visitors get.
- **No mystery.** Every line that runs is in this folder and was written for this site. There
  is nowhere for a problem to hide.

The cost: features that a framework would give you (routing, a component model, image
optimisation, a content pipeline) are either hand-written here or deliberately absent. When you
add one — a blog CMS, for instance — see `docs/03-BLOG-AND-POSTING.md`; that is the point at
which introducing a build tool becomes the right call rather than a reflex.

---

## 3. The bespoke parts, since they are the interesting ones

### The bundler — `build.js`

Reads `assets/js/` in a fixed order and rewrites:

```js
import { FIRM, SLIDES } from './data.js';
export function bootHome() { … }
```

into a small module registry inside one IIFE:

```js
__def("home", function () {
  const {FIRM, SLIDES} = __req('data');
  function bootHome() { … }
  return { bootHome };
});
```

It only understands **named** imports/exports, and it throws a clear error if it meets anything
else. That is a feature: the transform stays 75 lines you can read in a minute. Pages then load
one file, so `file://` works and the site is a single HTTP request for all its logic.

> Source of truth is the ES modules. `bundle.js` is generated — never edit it.

### The theme generator — `tools/build-themes.mjs`

Five complete visual styles are not five hand-picked colour sets. Each theme is a small seed
object (background, surface, ink, accent, mode). The generator:

1. converts hex → sRGB → relative luminance using the WCAG formula,
2. for every text-on-background pair, **walks HSL lightness until the contrast ratio clears
   4.5:1** rather than trusting the seed,
3. picks white or near-black for text sitting on the accent fill by comparing both,
4. writes `assets/css/themes.css` and `assets/js/theme-meta.js`,
5. prints a contrast report and **exits non-zero** if any pair fails.

So an unreadable palette cannot be shipped by accident — including one added by a future
officer who does not know what a contrast ratio is. Themes change typography, radius, density
and elevation too, not just hue.

### The PDF writer — `assets/js/pdf.js`

Every document the site offers is generated in the browser at the moment of download. Nothing
is pre-made and no library is involved: the file assembles a valid PDF byte stream (Helvetica
base-14, word-wrapped text, multi-page layout, objects and a correct `xref` table), wraps it in
a `Blob`, and hands it to the browser. Excel-compatible CSV and Word-compatible `.doc` HTML come
from the same file. Verified against Apple's own PDFKit during the build.

### The style switcher — `assets/js/theme.js`

The chosen style is stored under the `bcfg.theme` key in `localStorage` **and** accepted from a
`?theme=` query parameter, applied by a tiny inline script in each page's `<head>` so the page
paints in the right style from the first frame (no flash of the wrong theme). Every page accepts
`?theme=nightfall` — that is how you send someone "the dark one".

---

## 4. Size and weight

| | |
|---|---|
| Published payload | **392 kB across 28 files** (everything except `previews/`, `docs/` and `.git`) |
| Largest single file | `assets/js/bundle.js` — 96 kB raw, **28 kB gzipped** (unminified on purpose, so it stays readable) |
| CSS | 45 kB + 14 kB raw → **13 kB gzipped** |
| Home page HTML | 10 kB raw → 3 kB gzipped |
| Whole published site, gzipped | **≈ 174 kB** |
| Third-party requests | 0 until someone presses play on a video |
| Cookies | none |
| Analytics | none |

All the numbers above are reproducible:

```bash
cd ~/Desktop/Baruch-Financial-Group
find . -path ./.git -prune -o -path ./previews -prune -o -path ./docs -prune -o -type f -print0 \
  | xargs -0 stat -f%z | awk '{s+=$1} END {printf "%.0f kB in %d files\n", s/1024, NR}'
gzip -9c assets/js/bundle.js | wc -c
```

---

## 5. Browser support

Requires CSS custom properties, `clamp()`, `aspect-ratio`, grid/flex, `IntersectionObserver`
and ES2015+. In practice: **Safari 15+, Chrome/Edge 90+, Firefox 88+** — anything from about
2021. No Internet Explorer support, and none is pretended. There is no polyfill and no
transpiler, so nothing silently degrades for older browsers.

---

## 6. What was *not* used

Anticipating the obvious questions: no React, Next.js, Vue, Svelte, Astro, Eleventy or Jekyll;
no Tailwind, Bootstrap, Bulma or Sass/Less; no jQuery, Lodash, Axios or Alpine; no TypeScript;
no webpack, Vite, Rollup, Parcel or esbuild; no WordPress; no CMS; no CSS-in-JS; no Google
Fonts; no analytics; no jQuery-era polyfills; no Docker; no CI required to deploy.

None of that is a criticism of those tools — it is the reason this site is 174 kB, costs
nothing to host, has nothing to patch, and can be handed to a sophomore who knows HTML.

---

## 7. How it was verified (so you can trust the baseline)

During the build, not by eye: **60 headless-Chromium renders** across 4 pages × 5 styles × 3
widths (390 / 834 / 1440 px), asserting zero horizontal scroll, zero elements overflowing the
viewport, zero JavaScript errors, zero contrast failures at WCAG AA, and zero touch targets
below 24×24 px. Plus data-integrity checks (every programme's rendered highlights, timeline,
documents and FAQs compared against `data.js`), interaction tests (carousel, filters, deep
links, player, playlist, keyboard, all three download formats) and PDF validation in Apple
Preview.

That harness is not part of this folder — it was a build-time instrument, not a shipped
dependency. If the club wants it back later, the honest path is a small
Playwright script checked into a `tests/` folder that runs on push; the checks above are the
list to implement. Full detail in `docs/PROTOTYPE-NOTES.md`.

---

## 8. Where to change what

| You want to… | Go to |
|---|---|
| Change text, figures, programmes, videos | `assets/js/data.js` → `node build.js` |
| Change layout, spacing, type scale, components | `assets/css/styles.css` |
| Change or add a visual style | `tools/build-themes.mjs` (seeds) → `node tools/build-themes.mjs` |
| Add a page | `docs/02-EDITING.md` §2 |
| Add a blog, CMS or newsletter | `docs/03-BLOG-AND-POSTING.md` |
| Understand a build/deploy failure | `docs/06-TROUBLESHOOTING.md` |
