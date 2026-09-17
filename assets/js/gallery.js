/* ==========================================================================
   gallery.js — themes.html
   Live, scrollable previews of every look, scaled from a real 1440px render
   of index.html so what you see is the actual site, not a mockup.
   ========================================================================== */

import { $, $$, esc, toast, mountChrome } from './site.js';
import { THEME_META } from './theme-meta.js';
import { applyTheme, currentTheme, mountThemeDock } from './theme.js';

const PREVIEW_W = 1440;
const PREVIEW_H = 980;

function card(t, i) {
  return `
    <article class="theme-card reveal d${Math.min(i, 4)}" data-theme-card="${t.id}">
      <div class="frame-wrap">
        <iframe src="index.html?theme=${t.id}" title="${esc(t.label)} preview"
                loading="lazy" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>
        <a class="frame-hit" href="index.html?theme=${t.id}" aria-label="Open the site in ${esc(t.label)}"></a>
      </div>
      <div class="theme-info">
        <div class="theme-info-head">
          <h3>${esc(t.label)}</h3>
          <span class="pill slate">${t.mode === 'dark' ? 'Dark' : 'Light'}</span>
        </div>
        <p>${esc(t.blurb)}</p>
        <div class="swatch-row" aria-hidden="true">
          ${t.swatch.map((c) => `<span class="swatch-dot" style="background:${c}"></span>`).join('')}
        </div>
        <div class="theme-actions">
          <a class="btn sm brass" href="index.html?theme=${t.id}">Open this style</a>
          <button class="btn sm ghost" data-use="${t.id}">Use it here</button>
        </div>
      </div>
    </article>`;
}

/** Scale each 1440px iframe down to whatever width its frame currently is. */
function fitFrames() {
  $$('.frame-wrap').forEach((wrap) => {
    const f = wrap.querySelector('iframe');
    if (!f) return;
    const s = wrap.clientWidth / PREVIEW_W;
    f.style.width = `${PREVIEW_W}px`;
    f.style.height = `${PREVIEW_H}px`;
    f.style.transform = `scale(${s})`;
    wrap.style.height = `${Math.round(PREVIEW_H * s)}px`;
  });
}

export function bootGallery() {
  const host = $('#themeGallery');
  if (!host) return;

  host.innerHTML = THEME_META.map(card).join('');

  host.addEventListener('click', (e) => {
    const use = e.target.closest('[data-use]');
    if (!use) return;
    e.preventDefault();
    applyTheme(use.dataset.use);
    host.querySelectorAll('.theme-card').forEach((c) => {
      c.classList.toggle('is-current', c.dataset.themeCard === use.dataset.use);
    });
  });

  const markCurrent = (id) => {
    host.querySelectorAll('.theme-card').forEach((c) => {
      c.classList.toggle('is-current', c.dataset.themeCard === id);
    });
  };
  markCurrent(currentTheme());

  fitFrames();
  addEventListener('resize', () => requestAnimationFrame(fitFrames));
  // re-fit once the iframes have actually painted
  addEventListener('load', () => requestAnimationFrame(fitFrames));
  [120, 400, 900].forEach((ms) => setTimeout(fitFrames, ms));

  $('#stageNote')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open]');
    if (!b) return;
    e.preventDefault();
    window.open(`index.html?theme=${b.dataset.open}`, '_blank', 'noopener');
  });

  // keep the "Use it here" state in sync when the dock is used
  document.addEventListener('click', (e) => {
    const sw = e.target.closest('.theme-dock [data-pick]');
    if (sw) markCurrent(sw.dataset.pick);
  });

  if (!THEME_META.length) toast('No themes found', `Run node tools/build-themes.mjs`, 'err');
}

if (document.body.dataset.page === 'themes') {
  mountChrome('themes.html');
  mountThemeDock();
  bootGallery();
}
