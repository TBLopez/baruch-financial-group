/* ==========================================================================
   events.js — Events tab (calendar)
   A chronological event list that reuses the Resources layout: a filter rail
   (category + upcoming/past), a search box, a sort control, and a card list.
   ========================================================================== */

import { $, esc, debounce, initReveal, mountChrome } from './site.js';
import { mountThemeDock } from './theme.js';
import { EVENTS, EVENT_CATEGORIES } from './data.js';

const ALL = 'All';
const state = { q: '', cat: 'All', when: 'upcoming', sort: 'soonest' };

/* ------------------------------------------------------------ date utils */
const todayIso = () => new Date().toISOString().slice(0, 10);
const isPast = (e) => e.date < todayIso();
const dayNum = (iso) => iso.slice(8, 10);
const monthLabel = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

/* Filter + sort the catalog from data.js. "Soonest" puts future events
   first; "latest" inverts it. The past/upcoming split derives from the date. */
function applyFilters() {
  const q = state.q.trim().toLowerCase();
  const list = EVENTS.filter((e) => {
    if (state.cat !== ALL && e.category !== state.cat) return false;
    if (state.when === 'upcoming' && isPast(e)) return false;
    if (state.when === 'past' && !isPast(e)) return false;
    if (!q) return true;
    return `${e.title} ${e.desc} ${e.category} ${e.location} ${e.audience}`
      .toLowerCase().includes(q);
  });
  const dir = state.sort === 'soonest' ? 1 : -1;
  return list.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0) * dir);
}

/* -------------------------------------------------------------- rail UI */
function renderRail() {
  const catHost = $('#evCatList');
  const whenHost = $('#evWhenList');
  if (!catHost) return;

  const countCat = (c) => EVENTS.filter((e) => e.category === c).length;
  const upcoming = EVENTS.filter((e) => !isPast(e)).length;
  const past = EVENTS.filter((e) => isPast(e)).length;

  const item = (key, value, label, count, isOn) => `
    <button class="rail-item ${isOn ? 'is-on' : ''}" data-${key}="${esc(value)}" aria-pressed="${isOn}">
      <span>${esc(label)}</span><span class="n">${count}</span>
    </button>`;

  catHost.innerHTML =
    item('cat', ALL, 'All categories', EVENTS.length, state.cat === ALL) +
    EVENT_CATEGORIES.map((c) => item('cat', c, c, countCat(c), state.cat === c)).join('');

  whenHost.innerHTML =
    item('when', 'upcoming', 'Upcoming', upcoming, state.when === 'upcoming') +
    item('when', 'past', 'Past', past, state.when === 'past') +
    item('when', 'all', 'All', EVENTS.length, state.when === 'all');
}

/* ----------------------------------------------------------- event card */
function cardHtml(e) {
  const past = isPast(e);
  return `
    <article class="card event-card">
      <div class="event-date" aria-hidden="true">
        <span class="event-day">${dayNum(e.date)}</span>
        <span class="event-month">${monthLabel(e.date)}</span>
      </div>
      <div class="event-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="pill slate">${esc(e.category)}</span>
          <span class="pill ${past ? 'warn' : 'ok'}">${past ? 'Past' : 'Upcoming'}</span>
        </div>
        <h3>${esc(e.title)}</h3>
        <p class="event-meta">
          <span>${esc(e.time)}</span><span>·</span><span>${esc(e.location)}</span><span>·</span><span>${esc(e.audience)}</span>
        </p>
        <p class="event-desc">${esc(e.desc)}</p>
      </div>
    </article>`;
}

function renderList() {
  const host = $('#eventList');
  const count = $('#evCount');
  if (!host) return;
  const list = applyFilters();
  if (count) count.textContent = `${list.length} of ${EVENTS.length} events`;
  if (!list.length) {
    host.innerHTML = `
      <div class="empty">
        <h3>No events match those filters</h3>
        <p>Loosen a filter or clear the search box to see the full calendar.</p>
        <div style="margin-top:18px"><button class="btn ghost" data-reset>Reset all filters</button></div>
      </div>`;
    return;
  }
  host.innerHTML = list.map(cardHtml).join('');
}

/* --------------------------------------------------------------- wiring */
function pick(e, key) {
  const b = e.target.closest(`[data-${key}]`);
  if (!b) return;
  state[key] = b.dataset[key];
  renderRail();
  renderList();
}

function resetFilters() {
  state.q = '';
  state.cat = ALL;
  state.when = 'upcoming';
  const s = $('#evSearch');
  if (s) s.value = '';
  renderRail();
  renderList();
}

function wire() {
  $('#evSearch')?.addEventListener('input', debounce((e) => {
    state.q = e.target.value;
    renderList();
  }, 170));

  $('#evCatList')?.addEventListener('click', (e) => pick(e, 'cat'));
  $('#evWhenList')?.addEventListener('click', (e) => pick(e, 'when'));

  $('#evSort')?.addEventListener('change', (e) => { state.sort = e.target.value; renderList(); });

  $('#eventList')?.addEventListener('click', (e) => {
    if (e.target.closest('[data-reset]')) resetFilters();
  });

  $('#evReset')?.addEventListener('click', resetFilters);
}

/* ------------------------------------------------------------------- boot */
export function bootEvents() {
  mountChrome('events.html');
  mountThemeDock();
  renderRail();
  renderList();
  wire();
  initReveal();
}

if (document.body.dataset.page === 'events') bootEvents();
