# 02 — Editing the site

## The one rule

The HTML pages do **not** load `assets/js/data.js`, `home.js`, etc. They load a single
concatenated file: **`assets/js/bundle.js`**, built by `build.js`. That is what makes the site
work when you double-click `index.html` with no web server (browsers refuse `import` on
`file://`).

So after **any** change inside `assets/js/`:

```bash
cd ~/Desktop/Baruch-Financial-Group
node build.js          # → "wrote assets/js/bundle.js (…) 9 modules"
```

Then reload the page. If an edit seems to do nothing, 9 times out of 10 it is a skipped
`node build.js`; the tenth is browser cache — hard reload with `Cmd+Shift+R`.

Changes to `*.html`, `assets/css/styles.css` and images need no rebuild. Changes to
`assets/css/themes.css` and `assets/js/theme-meta.js` also need no rebuild *if* you hand-edit
them — but don't: they are generated (see §6).

### Run it while you edit

```bash
./start.command          # or: python3 -m http.server 8777
```

Serving over `http://` (rather than `file://`) matters: browsers restrict `localStorage` and
clipboard access on `file://`, which is what remembers the chosen visual style.

---

## 1. Where everything lives — `assets/js/data.js`

This one file holds all the copy. Learn these six names and you can change 95% of the site
without opening anything else.

| Export | What it controls | Appears on |
|---|---|---|
| `FIRM` | Group name, short name, school, tagline, founded year, fund size, member count, alumni count, placement %, partner-firm count | Header, footer, home "at a glance" band, generated PDFs |
| `BRAND` | Organisation string + contact line used in document headers/footers | Every generated PDF / CSV / Word file |
| `AUM_BREAKDOWN` | The three allocation rows in the "fund at a glance" band | `index.html` |
| `SLIDES` | The four hero carousel sections (Learn / Invest / Launch / Member of the Week) — eyebrow, nav label, headline (HTML allowed, `<em>` for italics), lede, two CTA buttons, the art class, and (except the member slide) three count-up figures | `index.html` carousel |
| `PROGRAMS` | The eight programme cards: id, title, category, audience, status, summary, fee, minimum, horizon, highlights, timeline, documents, FAQs, video tag. `featured: true` pins it to the home page | `resources.html` + home |
| `SAMPLE_MEDIA` | The six sessions: id, title, tag, kind, duration (seconds), published date, author, platform, `youtubeId`, description | `media.html` |
| `EVENTS` | The calendar: title, ISO date, time, location, audience and description. Upcoming/past is derived from the date | `events.html` |
| `EVENT_CATEGORIES` | The filter chips for the Events tab | `events.html` |
| `INSIGHTS` | The three-item "research rail" on the home page: kicker, title, blurb, read time, tag | `index.html` |

Also in the file: `CATEGORIES` and `AUDIENCES` — the filter chip lists. Add a programme with a
new category and you must add that category here too, or it will be unfilterable.

### Recipes

**Change the contact email / handle everywhere:**

```bash
cd ~/Desktop/Baruch-Financial-Group
grep -rn "baruchfinancialgroup\|baruchfinance" --include="*.js" --include="*.html" . | grep -v bundle.js
```

Edit `BRAND.contact` in `data.js`, the socials in `site.js` (~line 180, the footer), and the
two `mailto:` links in `index.html`. Then `node build.js`.

**Change a carousel slide:** edit that object in `SLIDES`. `title` accepts HTML (the design
uses `<em>` for the italic accent). `cards` are the three count-up figures for that slide.

**Add a programme:** copy an existing object in `PROGRAMS`, keep `id` unique and kebab-case
(the id is the deep link: `resources.html?id=your-id`), set `category` to one of
`CATEGORIES`, and give it `highlights`, `timeline`, `documents` and `faqs` arrays. Document
`type` accepts `pdf`, `xls` (CSV) or `doc` (Word-compatible HTML) — see §5.

**Add or replace a video:** the six entries in `SAMPLE_MEDIA` are *real* YouTube videos used as
stand-ins. To use your own, upload to YouTube (unlisted works), take the ID out of
`youtube.com/watch?v=**XXXXXXXXXXX**`, and replace `youtubeId`. Title, thumbnail, duration
labels and the inline player all follow. Test that the video allows embedding — a publisher
who disabled it shows YouTube error 101/150 in a black frame.

**Change the "Come to a Wednesday meeting" text:** it lives in `index.html`, not `data.js`
(the final CTA block near the bottom). While you are there, note it currently contradicts
itself — the heading says "Wednesday" and the sentence below says "Tuesdays 7pm", and
`site.js` agrees with Tuesday. Fix one. Also replace the placeholder room line
`NVC · 55 Lexington Ave` if the meeting place is different.

**Add an image:** drop it in `assets/` and reference it with a relative path, e.g.
`<img src="assets/team.jpg" alt="…" width="1200" height="800">`. Always give `width`/`height`
so the layout does not jump while loading, and always write real `alt` text. For the main
photos, export two sizes (about 1600px for hero, 800px for cards) and use `.jpg` at ~80%
quality — this site has no image pipeline, so whatever you drop in is what visitors download.

---

## 2. Adding a whole new page

Worked example — a `blog.html`. Five small edits, then rebuild.

**a. `blog.html`** — copy the top of `media.html` and change the title/description, then:

```html
<body data-page="blog">            <!-- ← this drives which module boots -->
...
<main id="main"> … your markup … </main>
<script defer src="assets/js/bundle.js"></script>
```

**b. `assets/js/site.js`** — add it to the nav (~line 104):

```js
const NAV = [
  { href: 'index.html',   label: 'Home' },
  { href: 'blog.html',    label: 'Blog' },     // new
  { href: 'media.html',   label: 'Media' },
  { href: 'resources.html', label: 'Resources' },
];
```

The desktop nav and the mobile drawer both read from this array, and the "active" state is
matched against the `data-page` value, so `data-page="blog"` + `href: 'blog.html'` is what
highlights the tab.

**c. `assets/js/blog.js`** — a new ES module:

```js
import { $, esc, mountChrome, initReveal } from './site.js';
import { mountThemeDock } from './theme.js';
import { POSTS } from './data.js';

function bootBlog() {
  mountChrome('blog.html');
  mountThemeDock();
  $('#main').insertAdjacentHTML('beforeend',
    POSTS.map((p) => `<article class="card reveal"><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`).join(''));
  initReveal();
}

if (document.body.dataset.page === 'blog') bootBlog();
```

**d. `build.js`** — one line: add `'blog'` to `ORDER`. Order only matters in that a module must
appear *after* anything it imports, so put `'blog'` after `'data'` and `'site'` (before or after
`'gallery'` is fine). `POSTS` itself is defined in `data.js`, which is already first in the list.

**e. Rebuild:** `node build.js`, then reload.

Add the new URL to `sitemap.xml` so search engines see it.

---

## 3. URL parameters the site already understands

Everything below is a shareable deep link — useful for Instagram bios and QR codes.

| Link | Does |
|---|---|
| `index.html?theme=nightfall` | Opens in a specific visual style (also works on every page) |
| `media.html?tag=Workshop` | Pre-filters the media library by tag |
| `media.html?tag=Market+Update` | Multi-word tags use `+` or `%20` |
| `resources.html?cat=Competition` | Pre-filters programmes by category |
| `resources.html?id=student-fund` | Opens that one programme, expanded |

Filters also sync back into the address bar as you click, so the URL in the bar is always
copy-pasteable.

---

## 4. Visual styles and colours

Five complete styles ship: **ivory** (default), **atlas**, **terrace**, **nightfall**,
**varsity**. They change typography, corner radius, density, shadows and colour — not just hue.
Visitors switch with the floating pill in the bottom-left corner; the choice is stored under
the `bcfg.theme` key in `localStorage`.

**Change the default style:** two places.

1. In `tools/build-themes.mjs`, move the chosen theme object to the **top** of the `THEMES`
   array, and run `node tools/build-themes.mjs`. The first entry becomes `:root` and defines
   `DEFAULT_THEME` in the generated `theme-meta.js`.
2. In the small inline `<script>` in the `<head>` of `index.html`, `media.html`,
   `resources.html`, `themes.html` and `404.html`, change the fallback string `'ivory'` to your
   theme id. That script sets the style *before first paint* (no flash of the wrong theme) and
   must stay in sync.

**Tweak one colour:** edit the theme seed object in `tools/build-themes.mjs` and re-run it. Do
not hand-edit `themes.css` — it is overwritten. The generator *derives* text colours from your
seeds and refuses to emit a palette where any text/background pair fails WCAG AA (4.5:1), so a
hand-picked dark grey on navy will be corrected or rejected rather than shipped.

**Add a sixth style:** append one object to `THEMES` and run `node tools/build-themes.mjs`
(it prints a contrast report and exits non-zero on failure). For a
seed, copy an existing entry — the fields are background, surface, ink, accent and mode. Then
add the new id to the `ok` array in that inline `<script>` in the five HTML files, or
`?theme=yourid` and the stored preference will be rejected.

**Change layout, spacing or a component:** `assets/css/styles.css`. It is plain CSS with custom
properties at the top (`--pad`, `--maxw`, `--section-y`, `--r-md`, `--ease`) and no
preprocessor. Comments mark each section.

**Change typefaces:** the font stacks are `--stack-serif` and `--stack-sans` at the top of
`styles.css`. They are deliberately system fonts — nothing is downloaded, so the site is fast
and works offline. If you switch to a webfont, self-host the `.woff2` files in `assets/fonts/`
and use `font-display: swap`; do not add a Google Fonts `<link>` — it adds a render-blocking
third-party request to every page load.

---

## 5. How the downloadable documents work

Nothing is pre-made. `resources.html` generates files in the browser:

- **PDF** — `assets/js/pdf.js` is a small, dependency-free PDF writer (Helvetica, word-wrap,
  multi-page, correct cross-reference table). `buildPdf()` for a full document,
  `programFactSheet()` for a one-pager.
- **XLS** — actually CSV, opened by Excel/Numbers. `buildCsv()`.
- **DOC** — Word-compatible HTML with a `.doc` extension. Opens in Word and Google Docs.
- **"Download all documents"** merges a whole programme into one multi-page PDF.

The document lists themselves are just `documents: [{ name, type }]` arrays on each programme
in `data.js`. Add an entry and the button appears. Add `type: 'pdf'` for a PDF; the content is
pulled from that programme's summary, highlights, timeline and FAQs — so keep those filled in
or the exported document looks thin.

`BRAND.org` / `BRAND.contact` are what get stamped into the headers and footers.

---

## 6. Generated files — do not hand-edit

| File | Regenerate with |
|---|---|
| `assets/js/bundle.js` | `node build.js` |
| `assets/css/themes.css` | `node tools/build-themes.mjs` |
| `assets/js/theme-meta.js` | `node tools/build-themes.mjs` |

Each carries a "GENERATED — do not edit" banner at the top. Editing them directly means your
change silently disappears the next time anyone runs the build.

---

## 7. Pre-flight before you push

```bash
cd ~/Desktop/Baruch-Financial-Group
node build.js                                   # bundle is current
node tools/build-themes.mjs                     # contrast report, exits non-zero on failure
git status                                      # did you forget to add a file?
git diff --stat
```

Then open the five pages at three widths in the browser (a narrow window, a tablet-ish one,
and full width) and check the console for errors — `Cmd+Option+J` in Chrome, `Cmd+Option+C`
in Safari. The build already passed 60 automated renders across 5 styles × 3 widths with zero
contrast failures and zero JS errors, so any new error is almost certainly from your edit.
