# 04 — Maintaining it

The good news is in `docs/05-TECH-STACK.md`: there are **no dependencies**. Nothing to patch,
no security advisories, no version treadmill, no framework major-version migration. Maintenance
here is content, ownership and the domain — not code.

---

## 1. The routine

| When | Task | Effort |
|---|---|---|
| **Weekly (term time)** | Publish or schedule one post/announcement. Reply to emails sent to the site address. | 20 min |
| **Monthly** | Add the month's session recordings to `SAMPLE_MEDIA` (`youtubeId` values), `node build.js`, commit, push. Open the site on a real phone and click through the five pages. | 20 min |
| **Per semester** | Update `FIRM` numbers (members, fund size, alumni), refresh the programme dates in `PROGRAMS` (cohorts, deadlines, rooms), archive anything that has ended. Rebuild + push. | 1–2 hours |
| **Quarterly** | Fund update post. Check the analytics and the uptime monitor. Re-read the claims on the home page and make sure every figure is still true. | 1 hour |
| **Annually (do it in one sitting)** | Handover: add the new officers to GitHub/registrar/DNS/YouTube/email, remove the graduated ones, confirm the domain renews, re-verify every number and name on the site. | 2–3 hours |
| **When something breaks** | `docs/06-TROUBLESHOOTING.md` | — |

The single most valuable habit: **anything announced on Instagram also gets posted to the
site**, because the site is the only channel the club owns.

---

## 2. The update loop

```bash
cd ~/Desktop/Baruch-Financial-Group
# ... edit assets/js/data.js ...
node build.js                      # ALWAYS, if you touched assets/js/
git add -A
git commit -m "Fall cohort dates"
git push
```

GitHub Pages redeploys in about a minute. Check the commit in the repo's **Actions** tab if the
site does not change — a failed Pages build emails the repo owner and is usually a bad path or
a `CNAME` typo.

Useful before committing:

```bash
node tools/build-themes.mjs        # theme contrast report; fails loudly if a palette breaks
git status                         # uncommitted files
git log --oneline -10              # what changed recently
```

And a poor man's link check, to catch renamed pages and dead internal links:

```bash
grep -rhoE 'href="[^"#][^"]*\.html[^"]*"' *.html assets/js/*.js \
  | sed -E 's/href="//; s/"$//; s/\?.*$//' | sort -u \
  | while read -r f; do [ -f "$f" ] || echo "MISSING: $f"; done
```

---

## 3. Backups

The site is 28 files and about 400 kB. There is no excuse for losing it.

- **GitHub is the primary backup.** Every commit is a full snapshot, and every officer with
  push access is a copy. This is the main argument for pushing even when you have no intention
  of publishing changes.
- **Time Machine** covers the folder on this Mac automatically. Do not rely on it alone — it
  dies with the laptop.
- **One offline mirror per year**, kept in the club's Google Drive / OneDrive:

  ```bash
  git clone --mirror ~/Desktop/Baruch-Financial-Group ~/Desktop/bcfg-$(date +%Y%m%d).git
  ```

  Or just zip it: `cd ~/Desktop && zip -r bcfg-$(date +%Y%m%d).zip Baruch-Financial-Group -x "*.DS_Store"`.
- **Never make the repository's only copy live on one officer's laptop** and then graduate.

---

## 4. Monitoring and analytics

| Need | Free option | Notes |
|---|---|---|
| Uptime alert | **UptimeRobot** (free: 50 monitors, 5-minute checks) or **Better Stack** free tier | Point it at the site root. Alerts to a shared mailbox, not a personal one |
| Traffic | **Cloudflare Web Analytics** (free, no cookies), **Umami Cloud** free tier, **GoatCounter** (free, no cookies), or **Google Analytics 4** | Prefer a cookieless one: no cookie banner needed, nothing to declare. This site currently ships **no analytics at all**, which is a perfectly good state |
| Page errors | Sentry free tier, or just watch the browser console | The site has no error reporting; for a static site that is usually fine |
| Search presence | Google Search Console (free) | Submit `sitemap.xml` once. Tells you what people actually search to find you |
| Form submissions | **Google Forms** (free, easiest), **Formspree** free tier (~50/month), **Netlify Forms** free (~100/month) | Whichever you use, make sure submissions land in a mailbox more than one person can read |

Add analytics by pasting one `<script>` before `</body>` on each page, and write a comment
above it saying what it is — the next maintainer will thank you.

---

## 5. Domain, DNS and email

- **Auto-renew ON**, and a calendar reminder **60 days before expiry**. Expired domains are the
  number-one way small organisation sites die, and a lapsed `.org` gets picked up by squatters
  fast.
- Registrar and DNS logins belong to the club, in a shared vault — not to one officer's
  personal Namecheap account.
- **A real mailbox on the domain** looks materially more legitimate to recruiters and alumni
  than a Gmail address. Zoho Mail has a free tier for custom domains (~5 users); Google
  Workspace is ~$7/user/month *(verify)*. Then set the placeholder address in `data.js` and
  `index.html` to `club@yourdomain.org` and add a forward to whoever is answering that term.
- Turn on **HTTPS enforcement** at the host (GitHub Pages: Settings → Pages → Enforce HTTPS;
  Netlify/Cloudflare: automatic) and never link to `http://`.
- If the club ever gets a `baruch.cuny.edu` subdomain or a USG-provided page, decide
  deliberately which URL is canonical and 301 one to the other — do not run two half-maintained
  copies.

---

## 6. Security, and why there is very little of it

There is no server, no database, no login, no user input, and no API keys, so the usual
web-security surface does not exist. What is left:

- **2FA on every account** that can change the site: GitHub org owners, the domain registrar,
  DNS, YouTube, the mailbox. Recovery codes in the shared vault.
- **Keep the number of GitHub org owners small but not one.** Two or three current officers.
  Remove graduating ones in the annual handover — an ex-member with push access is a risk in
  search of an incident.
- **Never commit secrets.** There are none today. If you add a form, an analytics key, or a CMS
  token, remember that anything in a static site is public by definition — a "secret" in a
  static page is not a secret. Put anything sensitive in a Cloudflare Worker or a Netlify
  Function at minimum.
- **If you add a CMS, review its collaborators list each term.** CMS access is repo access.
- **Watch for impersonation:** a club with a `.org` domain is a phishing target. Register the
  obvious lookalike handles early if the club can afford the tokens, and put a single canonical
  link everywhere (the site footer, every social bio).
- No user data is collected today. Collect none, and you have nothing to protect, declare or
  leak — including no cookie banner, no GDPR/CCPA question and no FERPA exposure.

---

## 7. Accessibility is maintenance, not a one-off

The build was verified at 60 renders across five styles and three widths with zero contrast
failures and no touch targets under 24 px. Keeping that true is a two-line habit:

- Run `node tools/build-themes.mjs` after touching any colour. It refuses to generate a palette
  that fails WCAG AA 4.5:1 — the check is automatic, the discipline is remembering to run it.
- Every new `<img>` gets real `alt` text and `width`/`height`. Every new interactive element
  must be reachable with Tab and operable with Enter/Space, and needs a visible focus ring —
  do not add `outline: none` without a replacement.
- Check the carousel, filters and player still respond to keyboard after any change to
  `home.js`, `media.js` or `resources.js`. They are built with ARIA roles and a live region for
  toasts; keep them.
- Zoom the browser to 200% once a term. Nothing should clip.

---

## 8. Officer turnover — the handover checklist

Print this. Fill it in at the end of each year and store it in the shared vault.

- [ ] **Domain:** registrar + DNS credentials in the shared vault; auto-renew on; expiry date
      and renewal price recorded below.
- [ ] **Hosting:** GitHub org has ≥2 owners; the repo is in the org, not a personal account;
      a new officer has confirmed they can push and see the site update.
- [ ] **Email:** mailbox or forwarder updated; the address on the site matches reality.
- [ ] **Analytics / monitoring / forms:** accounts transferred or shared; the uptime alert
      points at a mailbox someone reads.
- [ ] **Socials:** the handles in `site.js` footer are current.
- [ ] **Content:** all figures in `data.js` verified true as of today; expired programmes
      archived; meeting time and room correct (the site currently contains a `Wednesday` vs
      `Tuesdays 7pm` contradiction — check `index.html` and `site.js` agree).
- [ ] **This documentation:** update the two facts below and, if you changed how the site is
      built, update `docs/05-TECH-STACK.md`.

```
Domain:            ____________________
Registrar login:   ____________________  (vault entry: ____________)
Renews:            ____________________  at  $________
Host:              ____________________  (account: ____________)
Repo:              ____________________
Mailbox owner:     ____________________
Budget owner:      ____________________
Last full audit:   ____________________  by  ____________
```

---

## 9. What is genuinely fragile

Everything else is fine, but these four things will eventually bite, in this order:

1. **The domain expiring** after a handover nobody documented. Fix: §5.
2. **YouTube videos going away.** A deleted or made-private video leaves a black frame in the
   media library. Fix: check the six IDs each semester, or prefer videos the club owns; if you
   ever upload your own recordings, keep the masters in the club's Drive.
3. **Fabricated figures surviving into year three.** A number that was invented in a prototype
   and never corrected becomes a claim the club is stuck defending. Fix: the annual audit in §1,
   and see `docs/01-GO-LIVE.md` §7.
4. **The `node build.js` step being forgotten** by a new maintainer, so edits silently do not
   appear. Fix: the rebuild rule is stated at the top of `README.md`, `docs/02-EDITING.md` and
   the comment above the `<script>` tag in all five pages. If it keeps happening, switch to
   `Option D` in `docs/03-BLOG-AND-POSTING.md`, where a real build tool owns that step.

---

## 10. Cost and renewals to track

| Item | Recurring | Renews |
|---|---|---|
| Domain | ~$10–15 / year | annually, auto-renew |
| Hosting (GitHub Pages / Netlify / Cloudflare Pages) | $0 | — |
| Mailbox (free tier) or Google Workspace | $0 / ~$7 per user per month | monthly |
| Analytics, uptime, forms (free tiers) | $0 | — |
| TLS certificate | $0, automatic at every host in this guide | — |

Total realistically: **the domain, plus a mailbox if the club wants one.** If the club ever
decides to spend money, spend it on the domain and the mailbox before spending it on a theme.
