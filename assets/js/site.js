/* ==========================================================================
   site.js — shared chrome, helpers, motion
   ========================================================================== */

/* ------------------------------------------------------------------ icons */
export const ICONS = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.72-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1.2"/><rect x="14" y="4.5" width="4" height="15" rx="1.2"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 11l5 5 5-5M4 20h16"/></svg>',
  film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M3 12h18M3 8h4M3 16h4M17 8h4M17 16h4"/></svg>',
  expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5"/></svg>',
  compress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 20v-5h5M15 4v5h5M9 20v-5H4"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3h7l5 5v13H6z"/><path d="M13 3v5h5"/></svg>',
};

/* ---------------------------------------------------------------- helpers */
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return h
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`;
};

export const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export const debounce = (fn, ms = 220) => {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

export const prefersReduced = () => {
  try {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
  } catch {
    return false;
  }
};

/* ----------------------------------------------------------------- toasts */
export function toast(title, body = '', kind = 'ok') {
  let host = $('.toasts');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toasts';
    document.body.appendChild(host);
  }
  const ico = kind === 'err' ? ICONS.close : ICONS.check;
  const node = document.createElement('div');
  node.className = `toast ${kind === 'err' ? 'err' : ''}`;
  node.setAttribute('role', 'status');
  node.innerHTML = `${ico}<div><b>${esc(title)}</b>${body ? `<span>${esc(body)}</span>` : ''}</div>`;
  host.appendChild(node);
  setTimeout(() => {
    node.classList.add('out');
    setTimeout(() => node.remove(), 320);
  }, kind === 'err' ? 5200 : 3400);
}

/* ------------------------------------------------------------------ chrome */
import { FIRM } from './data.js';

const NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'events.html', label: 'Events' },
  { href: 'media.html', label: 'Media' },
  { href: 'resources.html', label: 'Resources' },
];

const LOGO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19V7.5L8.5 13 12 6l3.5 7L21 7.5V19"/><path d="M3 19h18"/></svg>`;

export function mountChrome(page, { overHero = false } = {}) {
  const links = NAV.map(
    (n) => `<a class="nav-link ${n.href === page ? 'active' : ''}" href="${n.href}">${n.label}</a>`
  ).join('');

  const header = document.createElement('header');
  header.className = `header ${overHero ? 'over-hero' : ''}`;
  header.innerHTML = `
    <div class="wrap header-inner">
      <a class="brand" href="index.html" aria-label="${esc(FIRM.name)} — home">
        <span class="brand-mark">${LOGO}</span>
        <span class="brand-text">
          <span class="brand-name">Baruch College</span>
          <span class="brand-sub">Financial Group</span>
        </span>
      </a>
      <nav class="nav" aria-label="Primary">${links}</nav>
      <div class="header-actions">
        <a class="btn sm ${overHero ? 'ghost-inv' : 'ghost'}" href="resources.html?id=analyst-training">Join the program</a>
        <button class="burger" aria-label="Menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div class="mobile-nav" id="mobileNav">
      ${NAV.map((n) => `<a href="${n.href}" class="${n.href === page ? 'active' : ''}">${n.label}</a>`).join('')}
      <a href="resources.html?id=analyst-training">Join the program</a>
    </div>`;

  document.body.prepend(header);

  const burger = $('.burger', header);
  const mnav = $('#mobileNav', header);
  burger.addEventListener('click', () => {
    const open = mnav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > (overHero ? 40 : 6));
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  renderFooter();
}

function renderFooter() {
  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-about">
          <a class="brand" href="index.html">
            <span class="brand-mark">${LOGO}</span>
            <span class="brand-text"><span class="brand-name">Baruch College</span><span class="brand-sub">Financial Group</span></span>
          </a>
          <p>A student-run financial organization at ${esc(FIRM.school)}. Open to every major, funded by alumni, and managing a real student-run fund.</p>
        </div>
        <div><h5>The group</h5><ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="index.html#approach">How we work</a></li>
          <li><a href="resources.html">All programs</a></li>
          <li><a href="resources.html?id=analyst-training">Join the program</a></li>
        </ul></div>
        <div><h5>Media</h5><ul>
          <li><a href="media.html">Video library</a></li>
          <li><a href="media.html?tag=Market+Update">Market recaps</a></li>
          <li><a href="media.html?tag=Workshop">Workshop recordings</a></li>
          <li><a href="media.html?tag=Speaker">Guest speakers</a></li>
        </ul></div>
        <div><h5>Contact</h5><ul>
          <li><a href="mailto:baruchfinancialgroup@gmail.com">baruchfinancialgroup@gmail.com</a></li>
          <li><a href="#">Tuesdays 7pm<br>NVC · 55 Lexington Ave</a></li>
          <li><a href="#">@baruchfinance · member portal</a></li>
        </ul></div>
      </div>
      <div class="footer-base">
        <span>© ${new Date().getFullYear()} ${esc(FIRM.name)}.</span>
        <span>Not investment advice · No member data collected</span>
      </div>
    </div>`;
  document.body.appendChild(f);
}

/* ------------------------------------------------------------ reveal/anim */
export function initReveal(root = document) {
  const items = $$('.reveal', root);
  if (!items.length) return;
  if (prefersReduced()) { items.forEach((i) => i.classList.add('in')); return; }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  items.forEach((i) => io.observe(i));
}

export function countUp(el, to, { dur = 1400, decimals = 0, prefix = '', suffix = '' } = {}) {
  if (prefersReduced()) {
    el.textContent = prefix + to.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    return;
  }
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = to * eased;
    el.textContent = prefix + v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initCounters(root = document) {
  const nodes = $$('[data-count]', root);
  if (!nodes.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      countUp(el, parseFloat(el.dataset.count), {
        decimals: parseInt(el.dataset.decimals || '0', 10),
        prefix: el.dataset.prefix || '',
        suffix: el.dataset.suffix || '',
      });
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  nodes.forEach((n) => io.observe(n));
}

/* --------------------------------------------------------------- generic */
/** Trap-based focus helper for overlays. */
export function lockScroll(on) {
  document.body.classList.toggle('no-scroll', on);
}

/** Deterministic gradient poster — fallback for media entries without a YouTube thumbnail. */
export function gradientPoster(seed, label = '') {
  let h = 0;
  for (let i = 0; i < String(seed).length; i++) h = (h * 31 + String(seed).charCodeAt(i)) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${h} 46% 22%)"/>
        <stop offset="1" stop-color="hsl(${(h + 42) % 360} 38% 9%)"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#g)"/>
    <g fill="none" stroke="rgba(255,255,255,.14)">
      ${Array.from({ length: 7 }, (_, i) => `<circle cx="360" cy="135" r="${28 + i * 30}"/>`).join('')}
    </g>
    <text x="30" y="238" font-family="Georgia,serif" font-size="30" fill="rgba(255,255,255,.30)">${String(label).slice(0, 22)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
