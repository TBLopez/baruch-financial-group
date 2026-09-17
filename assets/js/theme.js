/* ==========================================================================
   theme.js — the visual-style switcher
   Reads the saved choice, keeps <html data-theme> in sync, and renders a
   floating dock so a reviewer can flip between looks on any page.
   ========================================================================== */

import { $, esc, toast } from './site.js';
import { THEME_META } from './theme-meta.js';

export const THEME_KEY = 'bcfg.theme';
export const DEFAULT_THEME = THEME_META[0].id;

export const isTheme = (id) => THEME_META.some((t) => t.id === id);

/** Head-script logic, factored out so it can be unit-checked. */
export function resolveTheme(search, stored) {
  try {
    const q = new URLSearchParams(search || '').get('theme');
    if (q && isTheme(q)) return q;
    if (stored && isTheme(stored)) return stored;
  } catch { /* private mode / file:// */ }
  return DEFAULT_THEME;
}

export function currentTheme() {
  const id = document.documentElement.dataset.theme;
  return isTheme(id) ? id : DEFAULT_THEME;
}

export function applyTheme(id, { persist = true, silent = false } = {}) {
  if (!isTheme(id)) return;
  document.documentElement.dataset.theme = id;
  try { if (persist) localStorage.setItem(THEME_KEY, id); } catch { /* ignore */ }

  // keep ?theme= in the URL so a style can be linked or shared
  try {
    const url = new URL(location.href);
    if (url.searchParams.get('theme') !== id) {
      url.searchParams.set('theme', id);
      history.replaceState(null, '', url);
    }
  } catch { /* ignore */ }

  try {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const hero = getComputedStyle(document.documentElement).getPropertyValue('--hero-base').trim();
      if (hero) meta.setAttribute('content', hero);
    }
  } catch { /* ignore */ }

  document.querySelectorAll('[data-pick]').forEach((el) => {
    const on = el.dataset.pick === id;
    el.setAttribute('aria-checked', String(on));
    el.classList.toggle('is-on', on);
  });

  if (!silent) {
    const meta = THEME_META.find((t) => t.id === id);
    toast(meta.label, 'Style applied across the whole site.');
  }
}

/** Floating swatch dock. */
export function mountThemeDock() {
  if ($('.theme-dock')) return;

  const active = currentTheme();
  const dock = document.createElement('div');
  dock.className = 'theme-dock';
  dock.innerHTML = `
    <span class="dock-label">Style</span>
    <div class="dock-swatches" role="radiogroup" aria-label="Visual style">
      ${THEME_META.map((t) => `
        <button class="sw" role="radio" data-pick="${t.id}"
                aria-checked="${t.id === active}" title="${esc(t.label)} — ${esc(t.blurb)}"
                aria-label="${esc(t.label)}">
          <span class="sw-chip" aria-hidden="true"
                style="background:linear-gradient(135deg, ${t.swatch[0]} 0 46%, ${t.swatch[1]} 46% 72%, ${t.swatch[2]} 72% 100%)"></span>
          <span class="sw-name">${esc(t.label.split(' ')[0])}</span>
        </button>`).join('')}
    </div>
    <a class="dock-link" href="themes.html">Compare all</a>`;

  document.body.appendChild(dock);

  dock.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick]');
    if (!b) return;
    applyTheme(b.dataset.pick);
  });

  // arrow-key navigation inside the radio group
  dock.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const btns = [...dock.querySelectorAll('[data-pick]')];
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const next = btns[(i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length];
    next.focus();
    applyTheme(next.dataset.pick);
  });
}
