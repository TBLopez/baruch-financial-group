# 03 — Blog and posting workflow

The site has no blog. This document is how to add one, and — more usefully — which of the six
ways to do it fits a student finance club.

Prices are marked *(verify)* — they change. Everything else is mechanical.

---

## 0. Decide first: what is the blog *for*?

Clubs build "a blog" for three different jobs, and each job has a different best answer.

| Job | What it looks like | Right tool |
|---|---|---|
| **Announcements** — meeting times, recruiting, "we won the case competition" | 6–12 posts a year, written the night before | A newsletter (Option A) or posts in `data.js` (Option B). Do **not** install a CMS for this. |
| **Market commentary / research** — the fund's write-ups, sector notes, pitch decks | 1–4 posts a month, several authors, images, tables | A git-based CMS (Option C) or a proper static-site generator (Option D) |
| **Audience building** — reaching alumni, recruiters and prospective members by email | Subscribers, open rates, forwarding | A newsletter platform, always (Option A), regardless of what else you do |

The honest recommendation for a club at this stage: **Option A first, Option B if you want the
posts on your own domain, Option C when more than one person needs to publish without touching
Git.** Option D is the right long-term answer if the site becomes the club's main channel;
it is also a genuine rewrite of the deploy model, so it is a deliberate decision, not an
upgrade.

---

## Option A — Newsletter-first (Substack / Beehiiv / Buttondown)

**Best for:** announcements, alumni outreach, everything. One hour of setup, near-zero
maintenance. The post lives on their domain, your site links to it.

**Why this wins for a student club:** the asset is the email list, not the website. When the
officers graduate, the list transfers; the RSS reader does not. Substack also gives you an
archive page, a subscribe form, and email delivery for free.

Exact steps:

1. Create the publication (e.g. `bcfg.substack.com`). Free on Substack; Beehiiv free to
   ~2,500 subscribers *(verify)*; Buttondown is the cleanest small one, free to ~100 *(verify)*.
2. Custom domain: on a paid Substack tier you can point `blog.yourdomain.org` at it
   (`CNAME` → `substack.com`, follow their on-screen instructions). Free tier: keep the
   `substack.com` subdomain and link to it.
3. Add a nav entry in `assets/js/site.js` (~line 104):

   ```js
   { href: 'https://bcfg.substack.com', label: 'Blog' },
   ```

4. Put a subscribe block on the home page. Cheapest version — Substack's own embed snippet,
   dropped into `index.html` above the final CTA section. It is one `<iframe>` and the only
   third-party script on the site, so it is worth a comment above it saying so.
5. Cross-post every post to LinkedIn and Instagram with the site URL. That loop — not the CMS
   — is what actually gets read.

**Trade-offs:** posts are not on your domain (free tier), the platform can change its terms,
and you inherit their design, not yours. The site's five visual styles do not apply.

---

## Option B — Posts inside the existing site (no new tools)

**Best for:** one or two technical officers publishing on your own domain with the site's own
design. Uses the stack you already have — no CMS, no build step beyond `node build.js`.

The home page already has a three-item "research rail" (`INSIGHTS` in `assets/js/data.js`).
Promote that idea into a real post list:

**1. `assets/js/data.js`** — replace `INSIGHTS` with a richer `POSTS` array:

```js
export const POSTS = [
  {
    id: 'q3-fund-update',
    title: 'What the committee changed this quarter',
    date: '2026-09-14',
    tag: 'Market Update',
    author: 'Investment Committee',
    read: '6 min',
    body: `
      <p>Two exits, one new position, and why we trimmed the alternatives sleeve.</p>
      <h3>The exits</h3>
      <p>Full HTML here — the site has no markdown step, so <strong>write HTML</strong>.</p>
    `,
  },
];
```

**2. `blog.html`** — copy `media.html`, set `<body data-page="blog">`, and leave `<main id="main">`
mostly empty; the module renders the list.

**3. `assets/js/blog.js`** — new module (see `docs/02-EDITING.md` §2 for the full walkthrough):

```js
import { $, esc, mountChrome, initReveal } from './site.js';
import { mountThemeDock } from './theme.js';
import { POSTS } from './data.js';

const byDate = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
const fmt = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US',
  { year: 'numeric', month: 'long', day: 'numeric' });

function bootBlog() {
  mountChrome('blog.html');
  mountThemeDock();
  const single = new URLSearchParams(location.search).get('post');   // blog.html?post=q3-fund-update
  $('#main').innerHTML = single
    ? renderPost(byDate.find((p) => p.id === single) || byDate[0])
    : `<section class="section"><div class="wrap">
         <div class="section-head reveal"><p class="eyebrow">Blog</p><h1>From the group</h1></div>
         ${byDate.map(renderCard).join('')}
       </div></section>`;
  initReveal();
}

const renderCard = (p) => `
  <article class="card card-pad reveal" style="margin-top:18px">
    <p class="eyebrow">${esc(p.tag)} · ${fmt(p.date)}</p>
    <h2 style="font-size:clamp(22px,2.6vw,30px);margin:10px 0 8px">
      <a href="blog.html?post=${encodeURIComponent(p.id)}">${esc(p.title)}</a></h2>
    <p class="lede">${p.body.split('</p>')[0].replace(/<[^>]+>/g, '').slice(0, 180)}…</p>
    <p class="tiny muted">${esc(p.author)} · ${esc(p.read)} read</p>
  </article>`;

const renderPost = (p) => `
  <section class="section"><div class="wrap" style="max-width:760px">
    <p class="eyebrow"><a href="blog.html">← All posts</a></p>
    <h1 style="margin:12px 0 6px">${esc(p.title)}</h1>
    <p class="tiny muted">${esc(p.author)} · ${fmt(p.date)} · ${esc(p.read)} read</p>
    <div class="prose" style="margin-top:24px">${p.body}</div>
  </div></section>`;

if (document.body.dataset.page === 'blog') bootBlog();
```

**4. Wire it up:** add `'blog'` to `ORDER` in `build.js`, add `{ href: 'blog.html', label: 'Blog' }`
to `NAV` in `site.js`, add the URL to `sitemap.xml`, then:

```bash
node build.js
```

**Trade-offs:** writing means editing a JavaScript file and running a command. HTML in a JS
template literal is unforgiving — a stray backtick breaks the build. Fine for one author,
painful for five.

---

## Option C — Git-based CMS: write in a browser, publish on your domain

**Best for:** your own domain, several non-technical authors, no monthly fee. This is the
"log into `/admin` and write a post" experience, backed by your GitHub repo. Nothing is stored
on someone else's platform — the files are markdown in your own repository.

**Use Sveltia CMS** (a drop-in modern replacement for the now-unmaintained Netlify/Decap CMS;
same config format, single script tag, better editor and mobile support).
*Decap CMS* still works if you prefer the older, more documented one.

### Pieces

```
admin/
  index.html        ← the CMS interface
  config.yml        ← schemas for "Post", "Programme", "Meeting note"
posts/
  2026-09-14-q3-fund-update.md
tools/
  build-blog.mjs    ← markdown → assets/js/posts-data.js
```

### 1. `admin/index.html`

```html
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">   <!-- keep the CMS out of Google -->
<title>Content — Baruch College Financial Group</title>
</head><body>
<script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
</body></html>
```

### 2. `admin/config.yml`

```yaml
backend:
  name: github
  repo: YOUR-ORG/baruch-financial-group
  branch: main
  base_url: https://YOUR-AUTH-WORKER.workers.dev    # see step 4

media_folder: assets/blog
public_folder: /assets/blog

collections:
  - name: posts
    label: Blog posts
    folder: posts
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { name: title,  label: Title,  widget: string }
      - { name: date,   label: Date,   widget: datetime }
      - { name: author, label: Author, widget: string, default: "Baruch College Financial Group" }
      - { name: tag,    label: Tag,    widget: select,
          options: [Market Update, Workshop, Careers, Fund update, Announcement] }
      - { name: draft,  label: Draft,  widget: boolean, default: false }
      - { name: body,   label: Body,   widget: markdown }
```

### 3. `tools/build-blog.mjs` — markdown → data the site can load

This is the one place a dependency earns its keep (`gray-matter` + `marked`, build-time only —
neither ships to visitors):

```bash
npm init -y
npm i -D gray-matter marked
```

```js
// tools/build-blog.mjs
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import matter from 'gray-matter';
import { marked } from 'marked';

const posts = readdirSync('posts')
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const { data, content } = matter(readFileSync(`posts/${f}`, 'utf8'));
    if (data.draft) return null;
    return {
      id: f.replace(/\.md$/, ''),
      title: data.title, date: new Date(data.date).toISOString().slice(0, 10),
      author: data.author, tag: data.tag,
      html: marked.parse(content),
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.date.localeCompare(a.date));

mkdirSync('assets/js', { recursive: true });
writeFileSync('assets/js/posts-data.js',
  '/* GENERATED by tools/build-blog.mjs — do not edit. */\n' +
  `export const POSTS = ${JSON.stringify(posts, null, 2)};\n`);
console.log(`blog: ${posts.length} posts`);
```

Point `blog.js` at `POSTS` from `./posts-data.js` and add `'posts-data'` to `ORDER` in
`build.js` (first, before `blog`).

### 4. Authentication (the only fiddly part)

A git-based CMS writes to GitHub on the author's behalf, so GitHub wants an OAuth app — a
token cannot live in a static page. Deploy the free Sveltia auth worker once:

```bash
# https://github.com/sveltia/sveltia-cms-auth — one-click Deploy to Cloudflare Workers
npx --yes wrangler deploy        # from the cloned worker repo
```

Then register a GitHub OAuth app (Settings → Developer settings → OAuth Apps): homepage =
your site, callback =
`https://YOUR-AUTH-WORKER.workers.dev/callback`. Put the client ID/secret into the worker's
environment variables. Paste the worker URL into `base_url` above. Authors then sign in with
GitHub at `yoursite.org/admin/`.

If that sounds like a lot: it is a 20-minute, one-time job, and it is the price of free hosting
with no vendor. The alternative is a paid CMS-as-a-service (Sanity, Contentful, Prismic — all
have free tiers, all require the same build step).

### 5. Publishing: the build step GitHub Pages cannot skip

Markdown in the repo is not a website. Two ways to run the converter:

**(a) GitHub Actions — recommended.** Switch Pages to Actions mode
(**Settings → Pages → Source: GitHub Actions**; the `Deploy from a branch` mode cannot run
build commands), then add `.github/workflows/pages.yml`:

```yaml
name: Build and deploy
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: node tools/build-blog.mjs
      - run: node build.js
      - run: node tools/build-themes.mjs
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: . }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: "${{ steps.deployment.outputs.page_url }}" }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Nothing generated is committed; the site is built and deployed on every push. Note that
`docs/`, `admin/`, `posts/` and `tools/` get deployed too — add them to a `.gitignore`-style
exclusion by staging into a `dist/` folder before upload if you care.

**(b) Run it locally and commit the output.** `node tools/build-blog.mjs && node build.js`,
then `git add assets/js/posts-data.js assets/js/bundle.js && git commit`. Slower, but the
committed repo *is* the live site, which keeps the "deploy from branch" simplicity.

### 6. Optional but worth it: RSS

Readers and newsletters need a feed. Append to `tools/build-blog.mjs`: build `feed.xml`
(title, link, date, `<content:encoded>`) from the same array and write it to the root; then add
`<link rel="alternate" type="application/rss+xml" href="/feed.xml">` to each page head.

---

## Option D — A real static-site generator (Astro / Eleventy / Hugo)

**Best for:** when the blog is the main channel — tags, authors, pagination, sitemap, RSS,
drafts, scheduled posts, syntax-highlighted code blocks, image optimisation.

**Astro** is the closest fit to what is here: it is HTML-first, ships zero JavaScript by
default, and pages are plain `.astro`/`.html`/`.md` files, so the existing four pages can move
almost as-is.

```bash
cd ~/Desktop
npm create astro@latest bcfg-astro     # "Empty project", TypeScript: no
cd bcfg-astro
mkdir -p public
cp -R ../Baruch-Financial-Group/{assets,favicon.ico,*.html,404.html,robots.txt,sitemap.xml,.nojekyll} public/
# move the four pages into src/pages/ once you want Astro to own their <head>
```

Blog posts then live in `src/content/blog/*.md` with a small schema, and
`src/pages/blog/[...slug].astro` renders them. Deploy the `dist/` output to any host in this
guide. Eleventy is the same idea with less magic; Hugo is a single binary and the fastest of
the three but a different templating language.

Cost: the deploy model changes from "push files" to "push a build", the `node build.js`
bundle step becomes obsolete (Astro bundles for you), and the hand-rolled theming still works
because it is just CSS custom properties on `<html data-theme>`. Budget an afternoon.

---

## Options E–G — worth knowing about

| Option | What it is | When it makes sense |
|---|---|---|
| **E. Ghost** (Ghost Pro) | Full publishing platform: posts, memberships, paid subscriptions, newsletter, its own admin. Paid plans start around $9–25/mo *(verify)*, or self-host for free on a VPS you now have to administer | The club wants a members-only area, paid dues, or a real editorial team. Run it at `blog.yourdomain.org` so the site here stays as-is |
| **F. Notion as the CMS** | Officers write in Notion (which they already use); a small script or a paid bridge (Super, Potion) turns pages into site content | The club already lives in Notion and nobody wants to learn markdown |
| **G. Obsidian → site** | Write markdown in a local vault (Obsidian is free), commit, build | One author who already writes in markdown. This is Option C minus the CMS interface: the vault *is* the editor |

---

## Writing and posting apps, by device

Whatever pipeline you pick, these are the tools that feed it. All free unless noted.

**Writing**

| App | Platform | Why |
|---|---|---|
| **Obsidian** | Mac / Win / Linux / iOS / Android, free | Markdown vault, wiki links, images via drag-and-drop. The best front-end for Option C or G |
| **iA Writer** | Mac & iOS, paid | Distraction-free markdown with excellent typography |
| **Ulysses** | Mac & iOS, subscription | Markdown + publishing targets; strong if you also write on iPhone |
| **Bear** | Mac & iOS, free tier | Fast notes app, markdown-ish |
| **Google Docs** | everywhere, free | Non-technical officers already know it. Then paste into the CMS or Substack |
| **Notion** | everywhere, free | Drafts + editorial calendar + assignment in one place |

**Git without a terminal** (for editing this repo from a phone or iPad)

| App | Notes |
|---|---|
| **Working Copy** (iOS/iPadOS, free tier + paid unlock) | Full Git client. Clone the repo, edit `data.js` with the built-in editor, commit, push. Genuinely the best way to fix a typo from a bus. Push triggers the Pages rebuild |
| **github.dev** | Press `.` on the repo page in a browser → full VS Code in a tab. No install, works on iPad |
| **GitHub web editor** | Edit a file → Commit changes. Enough for a one-line fix |
| **a-Shell / iSH** (iOS) | Terminal with Node, if you want to run `node build.js` on-device |

**Images and social**

- **Canva** (free tier) — post headers, Instagram squares, slide templates. Export at 1600px
  wide for posts.
- **Squoosh** or `sips` on macOS — compress images before committing. No image pipeline exists
  here, so an uncompressed 6 MB hero photo is a 6 MB download:

  ```bash
  sips -Z 1600 -s formatOptions 78 photo.jpg --out assets/blog/photo-1600.jpg
  ```

- **Buffer / Later** (free tiers, a few channels) — schedule the Instagram and LinkedIn posts
  that point back at the site. This is the step clubs skip and then wonder why nothing gets
  read.
- **QR codes** — make one per deep link (`resources.html?id=analyst-training`,
  `media.html?tag=Workshop`) for flyers and the club fair table. The site's URL parameters
  were designed for this.

---

## Cost summary

| Item | Typical |
|---|---|
| Hosting (GitHub Pages / Netlify / Cloudflare Pages) | **$0** |
| Domain (`.org`) | ~$10–15 / year *(verify)* |
| Newsletter (Substack / Beehiiv / Buttondown free tiers) | $0 until you outgrow it |
| CMS (Sveltia/Decap + Cloudflare Worker auth) | $0 |
| CMS-as-a-service (Sanity / Contentful / Prismic free tiers) | $0, with usage caps |
| Ghost Pro or a CMS beyond free tier | ~$9–25 / month *(verify)* |
| Email on your own domain (Zoho Mail free tier / Google Workspace) | $0 / ~$7 per user per month |
| Analytics (Cloudflare Web Analytics, Umami Cloud, GoatCounter free tiers) | $0 |
| Forms (Formspree / Netlify Forms free tiers) | $0 up to ~50–100 submissions/month |
| Uptime monitoring (UptimeRobot free) | $0 |

A club can run all of this for **the price of the domain**. The recurring cost that actually
matters is the officer time to post something once a month.
