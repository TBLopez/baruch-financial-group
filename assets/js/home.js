/* ==========================================================================
   home.js — front-page carousel (3 sections), AUM band, insights rail
   ========================================================================== */

import {
  ICONS, $, $$, esc, prefersReduced, initReveal, initCounters, countUp, mountChrome,
} from './site.js';
import { SLIDES, AUM_BREAKDOWN, FIRM, INSIGHTS, PROGRAMS } from './data.js';
import { mountThemeDock } from './theme.js';

const DURATION = 8500; // ms per slide

/* ------------------------------------------------------------ hero markup */
function heroMarkup() {
  const slides = SLIDES.map((s, i) => `
    <div class="hero-slide ${i === 0 ? 'is-active' : ''}" data-slide="${i}" role="group"
         aria-roledescription="slide" aria-label="${esc(s.nav)} — slide ${i + 1} of ${SLIDES.length}"
         ${i === 0 ? '' : 'aria-hidden="true"'}>
      <div class="hero-art ${s.art}">
        <div class="art-layer art-grid"></div>
        <div class="art-layer">
          <svg class="art-rings" viewBox="0 0 600 600" aria-hidden="true">
            ${Array.from({ length: 9 }, (_, k) =>
              `<circle cx="300" cy="300" r="${52 + k * 30}" stroke-opacity="${(0.55 - k * 0.05).toFixed(2)}"/>`).join('')}
          </svg>
        </div>
      </div>
    </div>`).join('');

  const copies = SLIDES.map((s, i) => `
    <div class="hero-slide ${i === 0 ? 'is-active' : ''}" data-copy="${i}">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="eyebrow on-dark h-anim">${esc(s.eyebrow)}</p>
          <h1 class="h-anim">${s.title}</h1>
          <p class="hero-lede h-anim">${esc(s.lede)}</p>
          <div class="hero-cta h-anim">
            ${s.ctas.map((c) => `<a class="btn ${c.style}" href="${c.href}">${esc(c.label)}${ICONS.arrowRight}</a>`).join('')}
          </div>
        </div>
        <aside class="hero-card" aria-label="${esc(s.nav)} key figures">
          <p class="hero-card-title">${esc(s.nav)} — at a glance</p>
          <div class="kpis">
            ${s.cards.map((k) => `
              <div class="kpi">
                <span class="kpi-label">${esc(k.label)}</span>
                <span class="kpi-val" data-val="${esc(k.value)}" data-suffix="${esc(k.suffix)}">0${esc(k.suffix)}</span>
              </div>`).join('')}
          </div>
          <p class="hero-card-foot">${esc(s.cardFoot)}</p>
        </aside>
      </div>
    </div>`).join('');

  const tabs = SLIDES.map((s, i) => `
    <button class="hero-tab ${i === 0 ? 'is-active' : ''}" data-tab="${i}" role="tab"
            aria-selected="${i === 0}" aria-controls="slide-${i}">
      <span class="hero-tab-num">0${i + 1}</span>
      <span class="hero-tab-label">${esc(s.nav)}</span>
      <span class="hero-tab-sub">${esc(s.navSub)}</span>
      <span class="bar" aria-hidden="true"><i></i></span>
    </button>`).join('');

  return `
    <div class="hero-slides" aria-hidden="true">${slides}</div>
    <div class="hero-copies">${copies}</div>
    <div class="hero-tabs">
      <div class="hero-tabs-inner">
        <div style="display:contents" role="tablist" aria-label="Homepage sections">${tabs}</div>
        <div class="hero-nav">
          <button class="hero-arrow" data-dir="-1" aria-label="Previous section">${ICONS.arrowLeft}</button>
          <button class="hero-arrow" data-dir="1" aria-label="Next section">${ICONS.arrowRight}</button>
          <button class="hero-toggle" data-toggle aria-label="Pause carousel">${ICONS.pause}</button>
        </div>
      </div>
    </div>`;
}

/* -------------------------------------------------------------- carousel */
function initCarousel(root) {
  const artSlides = $$('.hero-slide[data-slide]', root);
  const copySlides = $$('.hero-slide[data-copy]', root);
  const tabs = $$('.hero-tab', root);
  const toggle = $('[data-toggle]', root);
  const progressWrap = root;

  let index = 0;
  let playing = !prefersReduced();
  let timer = null;
  let visible = true;

  const animateValues = (i) => {
    $$('.kpi-val', copySlides[i]).forEach((el) => {
      const raw = el.dataset.val;
      const suffix = el.dataset.suffix || '';
      const num = parseFloat(String(raw).replace(/,/g, ''));
      if (isNaN(num)) { el.textContent = raw + suffix; return; }
      const decimals = (String(raw).split('.')[1] || '').length;
      countUp(el, num, { dur: 1100, decimals, suffix });
    });
  };

  const restartBar = () => {
    root.classList.remove('is-running');
    void root.offsetWidth; // force reflow so the CSS animation replays
    if (playing) root.classList.add('is-running');
  };

  function go(next, { user = false } = {}) {
    const n = (next + SLIDES.length) % SLIDES.length;
    if (n === index && user) restartBar();
    artSlides.forEach((el, i) => {
      const on = i === n;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-hidden', String(!on));
    });
    copySlides.forEach((el, i) => el.classList.toggle('is-active', i === n));
    tabs.forEach((el, i) => {
      const on = i === n;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', String(on));
    });
    index = n;
    animateValues(n);
    restartBar();
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (!playing || !visible) return;
    timer = setTimeout(() => go(index + 1), DURATION + 60);
  }

  root.style.setProperty('--slide-duration', `${DURATION}ms`);

  tabs.forEach((t) =>
    t.addEventListener('click', () => { go(Number(t.dataset.tab), { user: true }); }
  ));
  $$('[data-dir]', root).forEach((b) =>
    b.addEventListener('click', () => go(index + Number(b.dataset.dir), { user: true }))
  );

  toggle?.addEventListener('click', () => {
    playing = !playing;
    root.classList.toggle('is-paused', !playing);
    toggle.innerHTML = playing ? ICONS.pause : ICONS.play;
    toggle.setAttribute('aria-label', playing ? 'Pause carousel' : 'Play carousel');
    if (playing) { restartBar(); schedule(); }
    else { clearTimeout(timer); root.classList.remove('is-running'); }
  });

  // pause on hover (mouse only — touch pointers fire enter/leave on tap)
  root.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    root.classList.add('is-paused');
    clearTimeout(timer);
  });
  root.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'mouse') return;
    root.classList.remove('is-paused');
    if (playing) { restartBar(); schedule(); }
  });

  // pause while the hero is off-screen or the tab is hidden
  const section = root.closest('.hero');
  if ('IntersectionObserver' in window && section) {
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) { clearTimeout(timer); root.classList.remove('is-running'); }
      else if (playing) { restartBar(); schedule(); }
    }, { threshold: 0.2 }).observe(section);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(timer); root.classList.remove('is-running'); }
    else if (playing) { restartBar(); schedule(); }
  });

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.player-overlay.open')) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowRight') go(index + 1, { user: true });
    if (e.key === 'ArrowLeft') go(index - 1, { user: true });
  });

  // touch swipe
  let sx = 0, sy = 0, tracking = false;
  root.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    sx = t.clientX; sy = t.clientY; tracking = true;
  }, { passive: true });
  root.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1), { user: true });
  }, { passive: true });

  animateValues(0);
  restartBar();
  schedule();
}

/* ------------------------------------------------------------- sections */
function renderAumBand() {
  const host = $('#aumBand');
  if (!host) return;
  host.innerHTML = `
    <div class="wrap">
      <div class="stat-band reveal">
        <div class="stat-cell">
          <div class="count">$<span data-count="${FIRM.fund}" data-decimals="1">0</span><span class="suffix">M</span></div>
          <div class="lbl">Student-managed fund<br><span class="tiny">Allocation from the ${esc(FIRM.school)} endowment · ${esc(FIRM.fundAsOf)}</span></div>
        </div>
        ${AUM_BREAKDOWN.map((a) => `
          <div class="stat-cell">
            <div class="count">$${a.unit === 'K' ? '<span data-count="' + a.value + '">0</span>' : '<span data-count="' + a.value + '" data-decimals="1">0</span>'}<span class="suffix">${a.unit}</span></div>
            <div class="lbl">${esc(a.label)}<br><span class="tiny">${esc(a.note)}</span></div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderInsights() {
  const host = $('#insightRail');
  if (!host) return;
  host.innerHTML = INSIGHTS.map((it, i) => `
    <a class="card hoverable card-pad reveal d${i + 1}" href="media.html?tag=${encodeURIComponent(it.tag)}">
      <span class="pill">${esc(it.kicker)}</span>
      <h3 style="margin-top:16px">${esc(it.title)}</h3>
      <p>${esc(it.blurb)}</p>
      <div class="v-meta" style="margin-top:18px">
        ${ICONS.film}<span>Recording · ${esc(it.read)}</span>
      </div>
      <div style="margin-top:16px" class="link-arrow">Open in media library ${ICONS.arrowRight}</div>
    </a>`).join('');
}

function renderFeaturedPrograms() {
  const host = $('#featuredPrograms');
  if (!host) return;
  const list = PROGRAMS.filter((p) => p.featured).slice(0, 3);
  host.innerHTML = list.map((p, i) => `
    <a class="card hoverable card-pad reveal d${i + 1}" href="resources.html?id=${encodeURIComponent(p.id)}">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <span class="pill ${p.status === 'Open' ? 'ok' : 'warn'}"><span class="dot"></span>${esc(p.status)}</span>
        <span class="pill slate">${esc(p.category)}</span>
      </div>
      <h3 style="margin-top:16px">${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <div class="meta-row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px">
        <span class="meta-item"><span class="k">Fee</span><span class="v">${esc(p.fee)}</span></span>
        <span class="meta-item"><span class="k">Minimum</span><span class="v">${esc(p.minimum)}</span></span>
      </div>
      <div style="margin-top:18px" class="link-arrow">Programme detail ${ICONS.arrowRight}</div>
    </a>`).join('');
}

/* ------------------------------------------------------------------- boot */
export function bootHome() {
  mountChrome('index.html', { overHero: true });
  mountThemeDock();
  const hero = $('#heroCarousel');
  if (hero) {
    hero.className = 'hero';
    hero.innerHTML = heroMarkup();
    initCarousel(hero);
  }
  renderAumBand();
  renderInsights();
  renderFeaturedPrograms();
  initReveal();
  initCounters();
}

if (document.body.dataset.page === 'home') bootHome();
