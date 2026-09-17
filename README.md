# Baruch College Financial Group — website project

**This folder is the project.** The whole site is in here, ready to publish as-is.
Nothing is installed, nothing is generated at deploy time, and there is no dependency to
keep alive. Upload this folder → it is a live website.

- **Local preview:** double-click **`start.command`** (serves on `http://localhost:8777`)
- **Verified running:** yes — Python 3.14 static server, `127.0.0.1:8777`
- **Original prototype folder** (`~/Desktop/financial-poc`) is untouched and still exists.
  This folder is a copy of it, renamed, with the handoff documentation added.

---

## Read the docs in this order

| # | Document | What it answers |
|---|---|---|
| 01 | [`docs/01-GO-LIVE.md`](docs/01-GO-LIVE.md) | Exact commands to publish it (GitHub Pages / Netlify / Cloudflare / Vercel), custom domain + DNS, pre-launch checklist |
| 02 | [`docs/02-EDITING.md`](docs/02-EDITING.md) | How to change text, programmes, videos, colours, add a page. The one rule you must not break. |
| 03 | [`docs/03-BLOG-AND-POSTING.md`](docs/03-BLOG-AND-POSTING.md) | Apps and pipelines for publishing posts — from "zero code" to a real CMS, ranked, with setup steps |
| 04 | [`docs/04-MAINTENANCE.md`](docs/04-MAINTENANCE.md) | Weekly / monthly / yearly upkeep, backups, monitoring, officer turnover, costs, ownership |
| 05 | [`docs/05-TECH-STACK.md`](docs/05-TECH-STACK.md) | **What it was actually built with**, file by file, and why it works offline |
| 06 | [`docs/06-TROUBLESHOOTING.md`](docs/06-TROUBLESHOOTING.md) | Every failure mode worth knowing, with the fix |
| 07 | [`docs/PROTOTYPE-NOTES.md`](docs/PROTOTYPE-NOTES.md) | The original build notes (features, testing evidence, design lineage) |

---

## 30-second version

**Stack:** hand-written static HTML + CSS + JavaScript. No framework, no npm packages,
no database, no server-side code. Node is used only to run two optional build scripts.

**To go live:** `gh repo create` → push → Settings → Pages → main / root. Custom domain goes
in the `CNAME` file. Full commands in [`docs/01-GO-LIVE.md`](docs/01-GO-LIVE.md).

**To edit:** almost everything is one file — `assets/js/data.js`. Then run `node build.js`
and reload. That single rule is the thing people get wrong; it is explained in
[`docs/02-EDITING.md`](docs/02-EDITING.md).

**To blog:** either extend the existing `INSIGHTS` array (no new tools), or bolt on a
free git-based CMS, or run a newsletter. Recommendation and setup steps in
[`docs/03-BLOG-AND-POSTING.md`](docs/03-BLOG-AND-POSTING.md).

---

## Folder map

```
Baruch-Financial-Group/
├── README.md                  ← you are here
├── docs/                      handoff documentation (not published to the web)
│   ├── 01-GO-LIVE.md
│   ├── 02-EDITING.md
│   ├── 03-BLOG-AND-POSTING.md
│   ├── 04-MAINTENANCE.md
│   ├── 05-TECH-STACK.md
│   ├── 06-TROUBLESHOOTING.md
│   └── PROTOTYPE-NOTES.md
│
├── index.html                 home — 3-section hero carousel
├── media.html                 media library + inline YouTube player
├── resources.html             the 8 programmes, filters, document generation
├── themes.html                side-by-side comparison of the 5 visual styles
├── 404.html                   not-found page (GitHub Pages / Netlify pick it up automatically)
├── robots.txt                 crawl rules + sitemap pointer
├── sitemap.xml                URL list for search engines
├── .nojekyll                  tells GitHub Pages "serve as-is, no Jekyll"
├── favicon.ico
├── start.command              double-click local server (macOS)
├── build.js                   bundles assets/js/*.js → assets/js/bundle.js
├── tools/
│   └── build-themes.mjs       generates themes.css + theme-meta.js, contrast-checked
├── previews/                  screenshots of every style (delete before launch if you like)
└── assets/
    ├── css/
    │   ├── styles.css         structure, components, layout (token-driven)
    │   └── themes.css         GENERATED — the 5 palettes
    ├── js/
    │   ├── data.js            ★ ALL the copy lives here
    │   ├── theme-meta.js      GENERATED — style id / label / blurb / swatches
    │   ├── site.js            icons, header, footer, toasts, motion helpers
    │   ├── theme.js           style switcher + floating dock
    │   ├── pdf.js             dependency-free PDF / CSV / Word writer
    │   ├── home.js            carousel + home sections
    │   ├── media.js           media library, filters, inline player
    │   ├── resources.js       programme filters, accordion, document generation
    │   ├── gallery.js         the themes.html comparison page
    │   └── bundle.js          AUTO-GENERATED — what the pages actually load
    ├── favicon.svg
    └── og.jpg                 social preview image
```

---

## The one rule

Pages load **`assets/js/bundle.js`**, not the individual modules. After changing anything in
`assets/js/`, run:

```bash
cd ~/Desktop/Baruch-Financial-Group
node build.js
```

Skip that step and your edit appears to do nothing. Everything else about the stack is a
convenience, not a requirement.

---

## Before launch — the short list

1. Real contact details (currently `baruchfinancialgroup@gmail.com` and `@baruchfinance`).
2. Real domain in `robots.txt`, `sitemap.xml`, and the `og:image` tags in each page's `<head>`.
3. Read the copy in `assets/js/data.js` — the fund figures, member counts, room number and
   partner-firm list are illustrative.
4. Real YouTube IDs for the six seeded sessions.
5. Decide whether the site's fabricated performance figures stay. **See the note in
   `docs/01-GO-LIVE.md` §7 — for a finance club this matters, and it is the one item on the
   list with a real downside if skipped.**

Full checklist: [`docs/01-GO-LIVE.md`](docs/01-GO-LIVE.md).
