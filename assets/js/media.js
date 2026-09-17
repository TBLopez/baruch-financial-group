/* ==========================================================================
   media.js — Media tab (curated, read-only)
   A library of recorded sessions (YouTube embeds) with search, tag filters,
   sort, and an inline player + playlist. There is no upload: this is the
   group's own published library, not a place for visitors to add files.
   ========================================================================== */

import {
  ICONS, $, esc, fmtTime, fmtDate, debounce, initReveal, lockScroll, gradientPoster, mountChrome,
} from './site.js';
import { mountThemeDock } from './theme.js';
import { SAMPLE_MEDIA } from './data.js';

/* ================================================================ state == */
const ALL = 'All';
const state = { filtered: [], query: '', tag: 'All', sort: 'newest' };

/* ------------------------------------------------------------ media utils */
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const isYouTube = (m) => !!(m && m.platform === 'youtube' && m.youtubeId);
/* Thumbnail for a media card: YouTube gets its CDN image; anything else
   falls back to a provided `thumb`, then to a generated gradient poster. */
function thumbFor(m) {
  if (isYouTube(m)) return ytThumb(m.youtubeId);
  if (m.thumb) return m.thumb;
  return gradientPoster(m.title, m.kind || '');
}

/* The whole catalogue is the seeded set from data.js — nothing is added at
   runtime, so the library is identical for every visitor. */
function library() {
  return SAMPLE_MEDIA.map((s) => ({
    ...s,
    ts: new Date(s.published || Date.now()).getTime(),
  }));
}

function applyFilters() {
  const q = state.query.trim().toLowerCase();
  const list = library().filter((m) => {
    if (state.tag !== ALL && m.tag !== state.tag) return false;
    if (!q) return true;
    return `${m.title} ${m.desc || ''} ${m.tag} ${m.author || ''} ${m.kind || ''}`
      .toLowerCase().includes(q);
  });

  const by = {
    newest: (a, b) => b.ts - a.ts,
    oldest: (a, b) => a.ts - b.ts,
    title: (a, b) => a.title.localeCompare(b.title),
    longest: (a, b) => (b.duration || 0) - (a.duration || 0),
    shortest: (a, b) => (a.duration || 0) - (b.duration || 0),
  };
  list.sort(by[state.sort] || by.newest);
  state.filtered = list;
}

function tags() {
  const set = new Set(library().map((m) => m.tag).filter(Boolean));
  return [ALL, ...[...set].sort()];
}

/* ============================================================== rendering */
function renderChips() {
  const host = $('#tagChips');
  if (!host) return;
  host.innerHTML = tags()
    .map((t) => `<button class="chip ${t === state.tag ? 'is-on' : ''}" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join('');
}

function cardHtml(m, i) {
  const poster = thumbFor(m);
  const when = m.published ? fmtDate(new Date(m.published).getTime()) : '';
  return `
    <article class="v-card" style="animation-delay:${Math.min(i * 45, 320)}ms">
      <button class="v-thumb" data-play="${esc(m.id)}" aria-label="Play ${esc(m.title)}">
        <img src="${esc(poster)}" alt="" loading="lazy" onerror="this.style.display='none'">
        <span class="fallback" aria-hidden="true">${esc((m.kind || 'M')[0])}</span>
        <span class="scrim"></span>
        <span class="v-badge yt">YouTube</span>
        <span class="v-dur">${m.duration ? fmtTime(m.duration) : '—:—'}</span>
        <span class="v-play"><span class="ring">${ICONS.play}</span></span>
      </button>
      <div class="v-body">
        <h3>${esc(m.title)}</h3>
        <div class="v-meta">
          <span class="pill slate">${esc(m.tag || 'General')}</span>
          ${when ? `<span>${esc(when)}</span>` : ''}
          ${m.author ? `<span>· ${esc(m.author)}</span>` : ''}
        </div>
        <p class="v-desc">${esc(m.desc || 'No description provided.')}</p>
      </div>
    </article>`;
}

function renderGrid() {
  const host = $('#mediaGrid');
  const countLbl = $('#mediaCount');
  if (!host) return;
  applyFilters();
  if (countLbl) countLbl.textContent = `${state.filtered.length} session${state.filtered.length === 1 ? '' : 's'}`;

  if (!state.filtered.length) {
    host.innerHTML = `
      <div class="empty">
        <h3>No sessions match that filter</h3>
        <p>Try clearing the search box or choosing another tag.</p>
      </div>`;
    return;
  }
  host.innerHTML = state.filtered.map(cardHtml).join('');
}

/* ================================================================= player ==
   YouTube-only: the stage is a YouTube iframe; the custom scrub/controls are
   not needed because YouTube supplies its own player chrome.               */
const player = { el: null, list: [], index: 0 };

function ensurePlayer() {
  if (player.el) return player.el;

  const el = document.createElement('div');
  el.className = 'player-overlay';
  el.innerHTML = `
    <div class="player-shell" role="dialog" aria-modal="true" aria-label="Video player">
      <div class="player-main">
        <div class="player-stage">
          <iframe class="yt-frame" title="YouTube player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
        </div>
        <div class="player-titlebar">
          <div style="min-width:0">
            <h2 data-t>—</h2>
            <div class="v-meta" data-m></div>
          </div>
          <div style="margin-left:auto;display:flex;align-items:center;gap:10px;flex:none">
            <a class="btn sm ghost-inv" data-watch target="_blank" rel="noopener">Watch on YouTube
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
            </a>
            <button class="pbtn" data-a="full" title="Fullscreen (F)" aria-label="Fullscreen">${ICONS.expand}</button>
            <button class="pbtn" data-a="close" title="Close (Esc)" aria-label="Close">${ICONS.close}</button>
          </div>
        </div>
      </div>
      <aside class="player-side">
        <header><h3>Up next</h3><span data-upnext>0</span></header>
        <div class="playlist"></div>
      </aside>
    </div>`;
  document.body.appendChild(el);
  player.el = el;
  wirePlayer();
  return el;
}

function wirePlayer() {
  const el = player.el;

  el.addEventListener('click', (e) => {
    const a = e.target.closest('[data-a]');
    if (a) {
      if (a.dataset.a === 'close') closePlayer();
      else if (a.dataset.a === 'full') toggleFull();
      return;
    }
    if (e.target.closest('.pl-item')) {
      load(Number(e.target.closest('.pl-item').dataset.i), true);
    }
  });

  document.addEventListener('fullscreenchange', () => {
    $('[data-a="full"]', el).innerHTML = document.fullscreenElement ? ICONS.compress : ICONS.expand;
  });

  document.addEventListener('keydown', (e) => {
    if (!el.classList.contains('open')) return;
    if (e.key === 'Escape') { if (!document.fullscreenElement) closePlayer(); return; }
    if (e.key === 'ArrowRight') load((player.index + 1) % player.list.length, true);
    if (e.key === 'ArrowLeft') load((player.index - 1 + player.list.length) % player.list.length, true);
  });
}

const noop = () => {};

function toggleFull() {
  const el = player.el;
  if (!document.fullscreenElement) {
    (el.requestFullscreen?.() || el.webkitRequestFullscreen?.())?.catch?.(noop);
  } else {
    document.exitFullscreen?.();
  }
}

function load(i, autoplay = false) {
  player.index = i;
  const m = player.list[i];
  if (!m) return;

  const yt = $('.yt-frame', player.el);
  yt.src = `https://www.youtube-nocookie.com/embed/${m.youtubeId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`;

  $('[data-t]', player.el).textContent = m.title;
  $('[data-m]', player.el).innerHTML = [
    '<span class="pill ok"><span class="dot"></span>YouTube</span>',
    `<span>${esc(m.tag || 'General')}</span>`,
    m.duration ? `<span>· ${fmtTime(m.duration)}</span>` : '',
    m.published ? `<span>· ${esc(fmtDate(new Date(m.published).getTime()))}</span>` : '',
    m.author ? `<span>· ${esc(m.author)}</span>` : '',
  ].join(' ');

  const watch = $('[data-watch]', player.el);
  if (watch) watch.href = `https://www.youtube.com/watch?v=${m.youtubeId}`;

  paintPlaylist();
}

function paintPlaylist() {
  const host = $('.playlist', player.el);
  if (!host) return;
  $('[data-upnext]', player.el).textContent = `${player.list.length} session${player.list.length === 1 ? '' : 's'}`;
  host.innerHTML = player.list.map((m, i) => `
    <button class="pl-item ${i === player.index ? 'is-current' : ''}" data-i="${i}">
      <span class="pt">
        <img src="${esc(thumbFor(m))}" alt="" loading="lazy" onerror="this.style.display='none'">
        <span class="fallback" aria-hidden="true">${esc((m.kind || 'M')[0])}</span>
      </span>
      <span style="min-width:0">
        <h4>${esc(m.title)}</h4>
        <span class="s">${m.duration ? fmtTime(m.duration) : '—'} · ${esc(m.tag || 'General')}</span>
      </span>
    </button>`).join('');
  const cur = host.querySelector('.is-current');
  cur?.scrollIntoView?.({ block: 'nearest' });
}

function openPlayer(id) {
  ensurePlayer();
  player.list = state.filtered.length ? state.filtered : library();
  const i = Math.max(0, player.list.findIndex((m) => m.id === id));
  player.el.classList.add('open');
  lockScroll(true);
  load(i, true);
}

function closePlayer() {
  if (!player.el) return;
  const yt = $('.yt-frame', player.el);
  if (yt) yt.removeAttribute('src');
  player.el.classList.remove('open');
  lockScroll(false);
}

/* ================================================================= wiring */
function wire() {
  $('#mediaSearch')?.addEventListener('input', debounce((e) => {
    state.query = e.target.value;
    renderGrid();
  }, 180));

  $('#tagChips')?.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tag]');
    if (!b) return;
    state.tag = b.dataset.tag;
    renderChips();
    renderGrid();
  });

  $('#sortBy')?.addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });

  $('#mediaGrid')?.addEventListener('click', (e) => {
    const play = e.target.closest('[data-play]');
    if (play) openPlayer(play.dataset.play);
  });
}

/* =================================================================== boot */
export function bootMedia() {
  mountChrome('media.html');
  mountThemeDock();

  const params = new URLSearchParams(location.search);
  if (params.get('tag')) state.tag = params.get('tag');
  if (params.get('q')) {
    state.query = params.get('q');
    const s = $('#mediaSearch');
    if (s) s.value = state.query;
  }

  renderChips();
  renderGrid();
  wire();
  initReveal();
}

if (document.body.dataset.page === 'media') bootMedia();
