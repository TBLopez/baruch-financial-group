# 01 — Going live

Everything here is copy-paste. Commands assume you are in the project folder:

```bash
cd ~/Desktop/Baruch-Financial-Group
```

I have already run `git init` and made the first commit, so the Git half of each option is
done. Check with `git log --oneline`.

**Rule of thumb: publish the whole folder, root included.** No build command, no output
directory, no environment variables. `index.html` sits at the root and everything else is
relative to it, so the site works at a bare domain *and* at a sub-path like
`username.github.io/bcfg/`.

---

## 0. What is in the folder that should not be published

Optional, do this first if you want a lean deploy:

```bash
rm -rf previews docs          # screenshots + these handoff notes
```

`previews/` (30 screenshots) and `themes.html` + the floating style dock are review tools.
They cost nothing to keep and nothing to remove — links to them are not in the main nav.
Keep `docs/` out of the published tree or just leave it; it is plain text.

Do **not** delete: `index.html`, `media.html`, `resources.html`, `404.html`, `assets/`,
`favicon.ico`, `robots.txt`, `sitemap.xml`, `.nojekyll`.

---

## 1. Put it in front of people in 5 minutes (Netlify Drop — no account needed to start)

Fastest possible path, good for showing the friend:

```bash
cd ~/Desktop/Baruch-Financial-Group
npx --yes netlify-cli deploy --dir=. --prod
```

First run opens a browser to log in (GitHub login works). It prints a live
`https://<name>.netlify.app` URL. Drag-and-drop at <https://app.netlify.com/drop> does the
same thing with no terminal at all.

---

## 2. GitHub Pages — recommended for a student org

Free, no bandwidth worries for this size of site, gives you a real Git history so the next set
of officers inherits the site instead of a zip file. Your machine already has an authenticated
`gh` CLI (account `TBLopez`).

### 2a. Create the repo and push

```bash
cd ~/Desktop/Baruch-Financial-Group

# PRIVATE is a fine choice for a club site; Pages works on private repos on free plans too,
# but simplest is public:
gh repo create baruch-financial-group --public --source=. --remote=origin --push
```

If you would rather create the repo by hand on github.com, then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/baruch-financial-group.git
git push -u origin main
```

### 2b. Turn on Pages

Website way (clearest):

1. Repo → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main`, folder `/ (root)` → **Save**
4. Wait ~60 seconds. Live at `https://YOUR-USERNAME.github.io/baruch-financial-group/`

Terminal way (same thing via the API):

```bash
gh api -X POST repos/{owner}/{repo}/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

All internal links are relative, so the `/baruch-financial-group/` sub-path just works.
`404.html` is picked up automatically. `.nojekyll` is already present so GitHub serves the
files verbatim.

### 2c. Custom domain (skip if the .github.io URL is fine)

The `CNAME` file must contain the bare domain and nothing else:

```bash
cd ~/Desktop/Baruch-Financial-Group
printf 'bcfg.org\n' > CNAME          # ← your real domain, no https://, no trailing slash
git add CNAME && git commit -m "Add custom domain" && git push
```

Then in **Settings → Pages → Custom domain** type the same domain and **Save**.
Tick **Enforce HTTPS** once the certificate is issued (usually under an hour).

DNS at your registrar:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

Delete any pre-existing `A`/`CNAME` records on `@` and `www` first, including a registrar
parking page — a stale `A` record is the single most common cause of "custom domain is broken".

### 2d. Later updates

```bash
git add -A && git commit -m "Update fund figures" && git push
```

Pages redeploys in about a minute. That is the entire maintenance loop.

---

## 3. Cloudflare Pages — best free tier, fastest CDN

```bash
npx --yes wrangler pages deploy . --project-name=bcfg
```

First run opens a browser to authorise. Free tier has unlimited bandwidth and requests.
Custom domain: project → **Custom domains** → add it; if the domain's DNS is already on
Cloudflare, add a `CNAME` to `bcfg.pages.dev` and Cloudflare flattens the apex for you.

---

## 4. Vercel

```bash
npx --yes vercel --prod
```

Free "Hobby" tier is for non-commercial projects — a student club qualifies, a site that starts
selling anything does not. DNS: apex `A` → `76.76.21.21`, `www` `CNAME` → `cname.vercel-dns.com`.

---

## 5. Any other static host

S3 + CloudFront, Firebase Hosting, Render, Surge, a CUNY/USG server, an old-school shared host:
upload **the contents of this folder** to the web root. Nothing else. No PHP, no Node, no
database, no rewrite rules required.

Two small notes for non-GitHub hosts:

- **GitHub Pages** uses `.nojekyll`; other hosts ignore it. Harmless everywhere.
- If you later add a **Jekyll** blog (§ `docs/03-BLOG-AND-POSTING.md`), delete `.nojekyll` —
  it exists specifically to stop Jekyll from running.

---

## 6. Pre-launch checklist

Copy this into a note and tick it off. Items 1–4 are mechanical; item 5 is the one that
matters.

- [ ] **1. Contact details.** Replace `baruchfinancialgroup@gmail.com` and `@baruchfinance`.
      They appear in `assets/js/data.js` (`BRAND.contact`) and possibly `assets/js/site.js`
      (footer socials). Find every occurrence:

      ```bash
      grep -rn "baruchfinancialgroup\|baruchfinance" --include="*.js" --include="*.html" .
      ```

- [ ] **2. Domain.** `robots.txt` and `sitemap.xml` reference
      `https://baruchfinancialgroup.org`. Replace it with the real domain, or delete the
      `Sitemap:` line in `robots.txt` if there is no domain.

- [ ] **3. Social preview tags.** Each page has `og:image` / `og:url` pointing at
      `assets/og.jpg` with a relative path. Slack, iMessage, LinkedIn and Discord need an
      **absolute** URL: change to `https://YOUR-DOMAIN/assets/og.jpg` and add
      `<meta property="og:url" content="https://YOUR-DOMAIN/">` in all four page heads.

- [ ] **4. Real videos.** The six seeded sessions are real YouTube embeds used as stand-ins.
      Swap the `youtubeId` values in `SAMPLE_MEDIA` (`assets/js/data.js`); titles, thumbnails
      and durations follow automatically. Verify each new video allows embedding — a publisher
      who disabled it renders as a black box with YouTube error 101/150.

- [ ] **5. Verify the claims and the name.** Read the next section before you publish.

---

## 7. The one thing to get right: the numbers and the name

The site currently presents, as fact, a student-run group at Baruch College with **$2.4M under
management, 240 members, 1,900 alumni, a 94% placement rate and 61 partner firms**, and it
carries a Baruch-branded masthead plus a contact address. All of it is invented sample
content — the prototype README says so plainly, but a visitor never sees that README.

Three concrete consequences, in order of likelihood:

1. **Recruiting credibility.** A finance club whose numbers do not survive one question from a
   recruiter or a faculty advisor is worse off than one with honest, smaller numbers. Replace
   them with the real figures, or remove the band.
2. **Institutional affiliation.** A public site presented as a Baruch College organisation,
   using the college's name in the site title and a `@baruch` handle, invites the question of
   whether it is a registered USG club and whether CUNY's name/trademark policy permits the
   presentation. Confirm club registration and, if you plan to use the name this prominently,
   check with the club's USG advisor. The fix is often just an "a student organisation at
   Baruch College — not an official publication of Baruch College" line in the footer.
3. **Financial claims.** Stating a student fund manages $2.4M is a specific, checkable,
   regulated-flavoured claim. Do not publish it unless it is true and documented.

Practical options, cheapest first:

- **Publish with real numbers.** Best outcome. Everything lives in `FIRM`, `AUM_BREAKDOWN` and
  `SLIDES` in `assets/js/data.js`.
- **Publish with placeholder-free copy.** Delete the `AUM_BREAKDOWN` band and the counter
  figures; the layout degrades gracefully — those are just sections on the home page.
- **Publish honestly as a club at Baruch** with real scale: "founded 20XX, 60 members, a
  student-managed portfolio" is a perfectly good site.
- **Keep it as a private prototype** shared by link while the club is chartered.

This is the only item on the checklist with a real downside if it is skipped, which is why it
gets its own section instead of a bullet.

---

## 8. Ownership, so the site outlives its founder

Do this at the same time as launch, not in two years:

- Create a **GitHub organisation** (e.g. `baruch-financial-group`) and put the repo in it, so
  the site is not tied to one personal account. Add the next two or three officers as owners.
- Register the domain to a **club-owned account**, not a personal one. Enable auto-renew and
  turn off "registrar lock" only if you actually need to transfer.
- Put the registrar login, DNS login, GitHub org owner accounts, the YouTube channel and the
  email mailbox in a **shared password manager** (Bitwarden has a free two-person org tier;
  1Password is better if the club will pay).
- Turn on **2FA on every one of those accounts** and store the recovery codes in the same
  vault. A locked-out domain is the most common way a student org site dies.
- Write the handover list once, in `docs/04-MAINTENANCE.md` (§ Officer turnover), and keep it
  current.
