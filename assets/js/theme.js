/* ==========================================================================
   theme.js — the visual-style switcher
   Reads the saved choice, keeps <html data-theme> in sync, and renders a
   floating dock so a reviewer can flip between looks on any page.
   ========================================================================== */

import { $, esc, toast } from './site.js';
import { THEME_META } from './theme-meta.js';

const THEME_KEY = 'bcfg.theme';
const DEFAULT_THEME = THEME_META[0].id;

const isTheme = (id) => THEME_META.some((t) => t.id === id);

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

/** Floating swatch dock — removed. The site is locked to Ivory & Navy. */
export function mountThemeDock() {
  return;
}
