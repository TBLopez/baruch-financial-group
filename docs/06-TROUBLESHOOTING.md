# 06 — Troubleshooting

Everything here has been hit for real at some point. Commands assume:

```bash
cd ~/Desktop/Baruch-Financial-Group
```

---

## "I changed something and the site didn't change"

In order of likelihood:

1. **You skipped the rebuild.** You edited a file in `assets/js/`, but the pages load
   `assets/js/bundle.js`. Run `node build.js` and reload. This is the cause ~90% of the time.
2. **Browser cache.** Hard reload: `Cmd+Shift+R` (Chrome/Safari/Firefox on macOS). The
   `bundle.js` filename never changes, so a normal reload can serve the old copy.
3. **You edited a generated file and it got regenerated.** `themes.css`, `theme-meta.js` and
   `bundle.js` are outputs. Your edit is overwritten by the next build. Edit the source:
   `tools/build-themes.mjs` for themes, `assets/js/*.js` for everything else.
4. **You edited a module the page does not load.** e.g. changes to `assets/js/gallery.js` only
   show on `themes.html`, and `bootX()` functions only run when `<body data-page="...">`
   matches — check the `data-page` attribute in the HTML you are looking at.
5. **You are looking at the other folder.** `~/Desktop/financial-poc` is the original prototype
   copy and is *not* this project. Confirm you are editing the right file:

   ```bash
   grep -n "the text I just wrote" assets/js/data.js
   ```

6. **You changed `data.js` but `bundle.js` is stale in the browser *and* on disk.** Check the
   build actually ran and wrote the text in:

   ```bash
   grep -c "the text I just wrote" assets/js/bundle.js
   ```

---

## "The local preview won't start / port is busy"

`start.command` picks the first free port from 8777 upward and prints it. If you want to know
what is holding the port:

```bash
lsof -nP -iTCP:8777 -sTCP:LISTEN
kill <PID>                       # e.g. kill 3016
```

For reference, right now the site is being served by:

```
Python  PID 3016  TCP 127.0.0.1:8777 (LISTEN)
/opt/homebrew/.../python3.14 -m http.server 8777 --bind 127.0.0.1
```

To start it yourself:

```bash
./start.command                  # double-clickable, auto-port, opens the browser
# or
python3 -m http.server 8777 --bind 127.0.0.1
# or any static server
npx --yes serve .
```

**Windows maintainers:** `start.command` is macOS-only (a Bash script). On Windows, either
double-click `index.html`, or open PowerShell in the folder and run
`python -m http.server 8777`. Nothing about the site requires macOS.

---

## "macOS won't let me open start.command"

Gatekeeper quarantines downloaded scripts. Either right-click → **Open** → **Open** once, or:

```bash
xattr -d com.apple.quarantine start.command
chmod +x start.command
```

---

## Opening `index.html` directly (no server) — what is different

It works; that is the point of the bundler. Two caveats on `file://`, and both are browser
policy, not site bugs:

- The chosen visual style is not remembered (browsers restrict `localStorage` on `file://`).
  The site catches this and still renders — it just forgets after a reload. `?theme=nightfall`
  in the URL still works.
- Clipboard and picture-in-picture APIs are restricted or missing. Neither is used by the site.

Use `./start.command` while working; it removes both caveats.

---

## "I broke it" — JavaScript errors after editing

Symptoms: blank sections, a page stuck with no header, console errors on load.

**First, read the console.** Chrome: `Cmd+Option+J`. Safari: enable Develop menu in
Preferences → Advanced, then `Cmd+Option+C`. The error names the file and line — with the
bundle, the line numbers refer to `bundle.js`, so search the message for the function name and
then find it in the module.

The four mistakes that cause almost all of them:

| Mistake | Example | Fix |
|---|---|---|
| **Smart quotes** pasted from Word, Google Docs, Notes or a chat app | `name: ‘Baruch’` | Use `'` or `"`. Find them: `grep -n "[‘’“”]" assets/js/*.js` |
| Unescaped apostrophe in a single-quoted string | `summary: 'the group's fund'` | Use double quotes or escape: `"the group's fund"` |
| Stray or trailing comma / unbalanced bracket in `data.js` | `{ a: 1, },` at the end of an object is fine, but `{ a: 1,, }` is not | Fix the punctuation |
| A backtick or `${` inside a template literal | writing `$` `{` in body copy | Escape it with `\${` |

`data.js` is the file people edit most and the easiest to check in isolation — it is pure data
with no DOM access, so this parses *and executes* it, and prints the offending line if it is
broken:

```bash
node --input-type=module -e "$(cat assets/js/data.js)" && echo "data.js OK"
```

> Note: `node --check file.js` is **not** reliable for these ES modules; it can report success
> on files that will throw in the browser. Use the command above for `data.js`, and the browser
> console for everything else.

Then rebuild and reload:

```bash
node build.js && echo "bundle rebuilt"
```

---

## `node build.js` errors

| Message | Meaning | Fix |
|---|---|---|
| `missing module: assets/js/x.js` | A module listed in `ORDER` does not exist | Create it or remove it from `ORDER` |
| `unsupported import statement remains` / `unsupported export statement remains` | You used a syntax the 75-line bundler does not handle — a default export, `export * from`, or a dynamic `import()` | Convert to **named** imports/exports only: `export function foo()`, `import { foo } from './x.js'` |
| `node: command not found` | Node is not on the PATH in that shell | It is installed at `~/.nvm/.../node`; open a fresh terminal, or `source ~/.nvm/nvm.sh` |

Rebuilding is not required to *deploy* — only to make your own edit visible, because the
generated `bundle.js` is committed.

---

## Deployment problems

### Site deployed but shows the old version

- GitHub Pages: check the repo's **Actions** tab for a failed build; a failure emails the owner.
  Also check the deployed commit hash shown in Settings → Pages.
- Netlify / Cloudflare / Vercel: open the deploy log; "no changes detected" means the push
  did not include the files (check `git status` before pushing).
- Cache: GitHub Pages sends fairly aggressive cache headers. Try a private window, then check
  whether the live `bundle.js` contains your change:

  ```bash
  curl -s https://YOUR-DOMAIN/assets/js/bundle.js | grep -c "your new text"
  ```

### Custom domain does not work

Work down this list:

```bash
dig +short yourdomain.org          # expect the four 185.199.108-111.153 addresses
dig +short www.yourdomain.org      # expect YOUR-USERNAME.github.io
```

1. `CNAME` file at the repo root must contain **only** the bare domain — no `https://`, no
   trailing slash, no path, one line. `printf 'yourdomain.org\n' > CNAME`.
2. Delete stale `A`/`CNAME` records on `@` and `www` — a registrar parking page is the classic
   culprit.
3. DNS can take up to 24 hours, though it is usually minutes.
4. **Using Cloudflare as your DNS? Set the record to "DNS only" (grey cloud), not proxied.**
   The orange-cloud proxy sits between Cloudflare and GitHub, which breaks GitHub's
   certificate issuance and causes "Enforce HTTPS" to stay greyed out or produce redirect loops.
   Once GitHub issues the cert you can experiment with proxying, but DNS-only is the supported
   configuration.
5. Still stuck: remove the custom domain in Settings → Pages, save, re-add it, save. This
   re-triggers certificate issuance.
6. For Netlify/Cloudflare Pages/Vercel, do not hand-write DNS records at all — add the domain
   in their dashboard and follow the records they show you.

### HTTPS stays off / certificate not issued

Certificate issuance only starts after DNS resolves correctly. Fix DNS first (§ above), then
wait up to an hour. If it is still failing after 24 hours, remove and re-add the custom domain.

### Everything 404s, including the home page

- You are visiting the wrong path. For a project site the URL is
  `https://USERNAME.github.io/REPO-NAME/` — with the trailing slash.
- The files are in a subfolder in the repo (e.g. `site/index.html`). Pages serves the repo
  root, so move the site files to the root or set the Pages folder to `/docs`… which is exactly
  why this project keeps the site at the root and these notes in `docs/` rather than publishing
  from it.
- If the site lives in `docs/` and you set Pages to `/docs`, remember GitHub cannot also use
  that folder for its own configuration.

### `.html` extensions appearing / Jekyll mangling files

`.nojekyll` is present, which makes GitHub serve the folder verbatim. Do not delete it — **the
one exception** is if you deliberately add a Jekyll-powered blog, which requires removing it so
Jekyll runs. Jekyll also refuses to publish files or folders beginning with `_` unless
`.nojekyll` exists.

### The 404 page has broken links

Real, known trade-off. `404.html` links to `index.html`, `resources.html` and `media.html`
*relatively*. GitHub Pages serves `404.html` while keeping the requested URL in the address bar,
so a 404 at `/deep/path/` makes `index.html` resolve to `/deep/path/index.html` — also missing.
Relative links everywhere else are what let the site work at any sub-path, so the fix belongs
only in the 404 page: once you know your final URL, make its three links root-absolute, e.g.
`/index.html` at a custom domain, or `/baruch-financial-group/index.html` on a project site.

---

## Video problems

| Symptom | Cause | Fix |
|---|---|---|
| Black frame with "Video unavailable", YouTube error 101 or 150 | The uploader disabled embedding for that video | Pick a different video, or watch it on YouTube instead of embedding |
| Thumbnail missing, black tile | Ad blocker or privacy extension blocking `i.ytimg.com` | Cosmetic; the site falls back to a gradient tile. Test in a private window without extensions |
| Player opens but shows the wrong video | `youtubeId` typo'd | The ID is the 11 characters after `v=` in `youtube.com/watch?v=XXXXXXXXXXX` |
| Player never loads offline | Expected — YouTube needs a network connection. Everything else on the site works offline | — |

The site uses `youtube-nocookie.com` and only creates the iframe when a visitor presses play —
no YouTube request happens on page load. Keep that property if you swap the player out.

---

## Theme problems

**`node tools/build-themes.mjs` exits non-zero.** It prints a contrast report naming the pair
that failed. Either pick a different accent/background for that theme, or let the generator fix
it by adjusting the seed's lightness. Do not add a manual override to `themes.css` — the next
run erases it.

**`?theme=yourid` is ignored, or a new theme does not appear in the dock.** The inline script at
the top of each page has a hardcoded allow-list:

```js
var ok = ['ivory', 'atlas', 'terrace', 'nightfall', 'varsity'];
```

Add the new id there, in *all five* HTML files (`index.html`, `media.html`, `resources.html`,
`themes.html`, `404.html`).

**Style resets itself for visitors.** The dock stores the choice under the `bcfg.theme`
`localStorage` key. On `file://` this is blocked; over `http://` it persists. Clearing site data
resets it — that is expected, not a bug.

---

## Git and GitHub problems

```bash
git status                       # what is uncommitted
git log --oneline -5             # recent history
git diff                         # exact change
```

| Symptom | Fix |
|---|---|
| `push` rejected, non-fast-forward | Someone else pushed. `git pull --rebase && git push` |
| `Permission denied (publickey)` / authentication failure | `gh auth login` (GitHub CLI is already installed and logged in as `TBLopez`) |
| Push rejected: protected branch / no write access | You need write access to the repo — ask an org owner to add you |
| Committed a huge image by accident | `git rm --cached big.jpg`, add it to `.gitignore`, commit — but it stays in history and in the clone size. Compress images before committing (`sips -Z 1600 -s formatOptions 78 in.jpg --out out.jpg`) |
| Deleted or overwrote a file | `git restore path/to/file`, or recover from a previous commit: `git checkout <commit> -- path/to/file`, or Time Machine |
| Need the site on a new machine | `git clone https://github.com/ORG/REPO.git` — that is the whole site |

---

## Emergency: the site is live and wrong

Fastest safe rollback, in order of speed:

1. **Revert the commit** (keeps history, redeploys in ~1 minute):

   ```bash
   git revert HEAD --no-edit && git push
   ```

2. **Repoint Pages at the last good commit** — Settings → Pages → Branch, choose a tag or a
   previous commit if you created one.

3. **Take it offline temporarily** — Netlify/Cloudflare/Vercel: pause the deploy or set the
   project to private. GitHub Pages: disable Pages in Settings, or push a single
   `index.html` with a "back shortly" message (the honest, universally-working option).

4. **If the domain is the problem** (expired, hijacked): fix the registrar first. Nothing else
   matters until the DNS is yours again.

---

## Quick reference

```bash
cd ~/Desktop/Baruch-Financial-Group

./start.command                    # preview at http://localhost:8777
node build.js                      # after editing assets/js/
node tools/build-themes.mjs        # after editing theme seeds; also a contrast check
node --input-type=module -e "$(cat assets/js/data.js)" && echo "data.js OK"
lsof -nP -iTCP:8777 -sTCP:LISTEN   # who has the port
git status                         # what changed
git add -A && git commit -m "msg" && git push   # publish
```
