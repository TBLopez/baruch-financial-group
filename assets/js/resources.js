/* ==========================================================================
   resources.js — Resources tab / program catalogue
   · Faceted filtering (category, audience, status) + search + sort
   · Expandable program detail: highlights, delivery schedule, documents, FAQ
   · Document downloads are GENERATED in the browser (real PDF / CSV / DOC)
   ========================================================================== */

import {
  ICONS, $, esc, debounce, toast, initReveal, lockScroll, mountChrome,
} from './site.js';
import { mountThemeDock } from './theme.js';
import { PROGRAMS, CATEGORIES, AUDIENCES, BRAND } from './data.js';
import { buildPdf, buildCsv, downloadBlob, programFactSheet } from './pdf.js';

const state = {
  q: '',
  cat: 'All',
  aud: 'All',
  status: 'All',
  sort: 'featured',
  open: new Set(),
};

const STATUSES = ['Open', 'Enrolling', 'Pilot'];

/* ------------------------------------------------------------- filtering */
function match(p) {
  if (state.cat !== 'All' && p.category !== state.cat) return false;
  if (state.aud !== 'All' && p.audience !== state.aud) return false;
  if (state.status !== 'All' && p.status !== state.status) return false;
  if (!state.q) return true;
  const q = state.q.toLowerCase();
  const hay = [
    p.title, p.summary, p.category, p.audience, p.status, p.fee, p.minimum, p.horizon,
    ...p.highlights, ...p.faqs.flatMap((f) => [f.q, f.a]),
    ...p.documents.map((d) => d.name),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

function currentList() {
  const list = PROGRAMS.filter(match);
  const sorters = {
    featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.title.localeCompare(b.title),
    title: (a, b) => a.title.localeCompare(b.title),
    fee: (a, b) => a.fee.localeCompare(b.fee),
    status: (a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status) || a.title.localeCompare(b.title),
  };
  return list.sort(sorters[state.sort] || sorters.featured);
}

const countBy = (key, value) => PROGRAMS.filter((p) => p[key] === value).length;

/* -------------------------------------------------------------- rail UI */
function renderRail() {
  const catHost = $('#catList');
  const audHost = $('#audList');
  const statusHost = $('#statusList');
  if (!catHost) return;

  const item = (key, value, count, isOn) => `
    <button class="rail-item ${isOn ? 'is-on' : ''}" data-${key}="${esc(value)}"
            aria-pressed="${isOn}">
      <span>${esc(value)}</span><span class="n">${count}</span>
    </button>`;

  catHost.innerHTML =
    item('cat', 'All', PROGRAMS.length, state.cat === 'All') +
    CATEGORIES.map((c) => item('cat', c, countBy('category', c), state.cat === c)).join('');

  audHost.innerHTML =
    item('aud', 'All', PROGRAMS.length, state.aud === 'All') +
    AUDIENCES.map((a) => item('aud', a, countBy('audience', a), state.aud === a)).join('');

  statusHost.innerHTML =
    item('status', 'All', PROGRAMS.length, state.status === 'All') +
    STATUSES.map((s) => item('status', s, countBy('status', s), state.status === s)).join('');
}

/* ------------------------------------------------------------ program UI */
const statusPill = (s) =>
  `<span class="pill ${s === 'Open' ? 'ok' : s === 'Enrolling' ? 'warn' : 'slate'}"><span class="dot"></span>${esc(s)}</span>`;

function faqHtml(p) {
  return p.faqs.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-q" aria-expanded="false">${esc(f.q)}${ICONS.plus}</button>
      <div class="faq-a"><div><p>${esc(f.a)}</p></div></div>
    </div>`).join('');
}

function programHtml(p) {
  const open = state.open.has(p.id);
  return `
    <article class="program ${open ? 'open' : ''}" data-pid="${esc(p.id)}" id="program-${esc(p.id)}">
      <button class="program-main" data-toggle-p="${esc(p.id)}" aria-expanded="${open}">
        <div style="min-width:0">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            ${statusPill(p.status)}
            <span class="pill slate">${esc(p.category)}</span>
            ${p.featured ? '<span class="pill">Most requested</span>' : ''}
          </div>
          <h3>${esc(p.title)}</h3>
          <p class="summary">${esc(p.summary)}</p>
          <div class="meta-row">
            <div class="meta-item"><span class="k">Fee</span><span class="v">${esc(p.fee)}</span></div>
            <div class="meta-item"><span class="k">Minimum</span><span class="v">${esc(p.minimum)}</span></div>
            <div class="meta-item"><span class="k">Horizon</span><span class="v">${esc(p.horizon)}</span></div>
            <div class="meta-item"><span class="k">Designed for</span><span class="v">${esc(p.audience)}</span></div>
          </div>
        </div>
        <div class="program-side">
          <span class="chev" aria-hidden="true">${ICONS.chevronDown}</span>
          <span class="tiny muted" style="white-space:nowrap">${p.documents.length} documents</span>
        </div>
      </button>

      <div class="program-detail">
        <div>
          <div class="detail-inner">
            <div class="detail-grid">
              <div>
                <div class="detail-block">
                  <h4>What the programme covers</h4>
                  <ul class="hl-list">
                    ${p.highlights.map((h) => `<li>${ICONS.check}<span>${esc(h)}</span></li>`).join('')}
                  </ul>
                </div>
                <div class="detail-block">
                  <h4>Delivery schedule</h4>
                  <ul class="timeline">
                    ${p.timeline.map((t) => `
                      <li><span class="dot"><i></i></span>
                        <span><strong>${esc(t.when)}</strong><span>${esc(t.what)}</span></span>
                      </li>`).join('')}
                  </ul>
                </div>
                <div class="detail-block">
                  <h4>Frequently asked</h4>
                  <div class="faq">${faqHtml(p)}</div>
                </div>
              </div>

              <div>
                <div class="detail-block">
                  <h4>Programme documents</h4>
                  <div class="doc-list">
                    ${p.documents.map((d, i) => `
                      <button class="doc" data-doc="${esc(p.id)}" data-i="${i}">
                        <span class="ft ft-${esc(d.type)}">${esc(d.type.toUpperCase())}</span>
                        <span style="min-width:0">
                          <span class="nm">${esc(d.name)}</span>
                          <span class="sz">Generated on download</span>
                        </span>
                        <span class="dl">${ICONS.download}</span>
                      </button>`).join('')}
                  </div>
                </div>

                <div class="detail-block">
                  <h4>Related media</h4>
                  <a class="doc" href="media.html?tag=${encodeURIComponent(p.video)}">
                    <span class="ft ft-doc">${ICONS.film}</span>
                    <span style="min-width:0">
                      <span class="nm">Watch: ${esc(p.video)} collection</span>
                      <span class="sz">Opens the media library, pre-filtered</span>
                    </span>
                    <span class="dl">${ICONS.arrowRight}</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="detail-cta">
              <button class="btn brass" data-factsheet="${esc(p.id)}">${ICONS.doc} Download fact sheet (PDF)</button>
              <button class="btn ghost" data-pack="${esc(p.id)}">${ICONS.download} Download all ${p.documents.length} documents</button>
              <button class="btn ghost" data-request="${esc(p.id)}">Request a call about this programme</button>
            </div>
          </div>
        </div>
      </div>
    </article>`;
}

function renderList() {
  const host = $('#programList');
  const count = $('#resultCount');
  if (!host) return;
  const list = currentList();
  if (count) {
    count.textContent = state.q || state.cat !== 'All' || state.aud !== 'All' || state.status !== 'All'
      ? `${list.length} of ${PROGRAMS.length} programmes shown`
      : `${PROGRAMS.length} programmes in the catalogue`;
  }

  if (!list.length) {
    host.innerHTML = `
      <div class="empty">
        <h3>No programmes match those filters</h3>
        <p>Loosen a filter or clear the search box to see the full catalogue.</p>
        <div style="margin-top:18px"><button class="btn ghost" data-reset>Reset all filters</button></div>
      </div>`;
    return;
  }
  host.innerHTML = list.map(programHtml).join('');
}

/* ------------------------------------------------------- document export */
function docAsText(p, doc) {
  return [
    `${p.title} — ${doc.name}`,
    '='.repeat(72),
    '',
    `Category:   ${p.category}`,
    `Audience:   ${p.audience}`,
    `Status:     ${p.status}`,
    `Fee:        ${p.fee}`,
    `Minimum:    ${p.minimum}`,
    `Horizon:    ${p.horizon}`,
    '',
    'OVERVIEW',
    p.summary,
    '',
    'HIGHLIGHTS',
    ...p.highlights.map((h, i) => `  ${i + 1}. ${h}`),
    '',
    'DELIVERY SCHEDULE',
    ...p.timeline.map((t) => `  ${t.when.padEnd(14)} ${t.what}`),
    '',
    'FREQUENTLY ASKED',
    ...p.faqs.flatMap((f) => [`  Q: ${f.q}`, `  A: ${f.a}`, '']),
    '',
    `Generated ${new Date().toLocaleString()} — illustrative sample content, not investment advice.`,
  ].join('\n');
}

function docAsPdf(p, doc) {
  const isSheet = /comparison|worksheet|matrix|modelling|tracker|checklist/i.test(doc.name);
  const blocks = [
    { type: 'p', text: `Document: ${doc.name}. Prepared for the ${p.title} programme (${p.category} · ${p.audience}).` },
    { type: 'h2', text: 'Purpose of this document' },
    {
      type: 'p',
      text: isSheet
        ? 'This working document is supplied as a structured worksheet. Populate it with client-specific figures before use; it is designed to sit alongside the programme fact sheet.'
        : 'This reference document summarises the programme terms, scope and delivery obligations of the engagement described above.',
    },
    { type: 'h2', text: 'Programme terms' },
    {
      type: 'kv',
      items: [
        { k: 'Fee', v: p.fee },
        { k: 'Minimum', v: p.minimum },
        { k: 'Horizon', v: p.horizon },
        { k: 'Status', v: p.status },
      ],
    },
    { type: 'h2', text: 'Scope' },
    ...p.highlights.map((h) => ({ type: 'bullet', text: h })),
    { type: 'h2', text: 'Schedule' },
    { type: 'table', columns: ['Stage', 'Activity'], widths: [110, 390], rows: p.timeline.map((t) => [t.when, t.what]) },
    { type: 'space', h: 8 },
    { type: 'note', text: 'Sample document auto-generated by the prototype site. Replace with approved compliance-reviewed collateral before any external use.' },
  ];
  return buildPdf({
    org: BRAND.org,
    kicker: 'PROGRAMME DOCUMENT',
    title: doc.name,
    subtitle: `${p.title} · ${p.status}`,
    metaLine: `Generated ${new Date().toLocaleString()}`,
    footer: `${BRAND.orgTitle} · ${BRAND.contact}`,
    blocks,
  });
}

function docAsCsv(p, doc) {
  const rows = [
    ['Programme', p.title],
    ['Document', doc.name],
    ['Category', p.category],
    ['Audience', p.audience],
    ['Status', p.status],
    ['Fee', p.fee],
    ['Minimum', p.minimum],
    ['Horizon', p.horizon],
    [],
    ['Stage', 'Activity'],
    ...p.timeline.map((t) => [t.when, t.what]),
    [],
    ['Highlight'],
    ...p.highlights.map((h) => [h]),
    [],
    ['Question', 'Answer'],
    ...p.faqs.map((f) => [f.q, f.a]),
  ];
  return buildCsv(rows);
}

function docAsWord(p, doc) {
  const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8">
    <title>${esc(doc.name)}</title></head><body style="font-family:Georgia,serif">
    <h1>${esc(doc.name)}</h1>
    <p><strong>${esc(p.title)}</strong> — ${esc(p.category)} · ${esc(p.audience)} · ${esc(p.status)}</p>
    <p>${esc(p.summary)}</p>
    <h2>Scope</h2><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
    <h2>Schedule</h2><table border="1" cellpadding="6" cellspacing="0">
      <tr><th align="left">Stage</th><th align="left">Activity</th></tr>
      ${p.timeline.map((t) => `<tr><td>${esc(t.when)}</td><td>${esc(t.what)}</td></tr>`).join('')}
    </table>
    <h2>Frequently asked</h2>
    ${p.faqs.map((f) => `<p><strong>${esc(f.q)}</strong><br>${esc(f.a)}</p>`).join('')}
    <p style="font-size:9pt;color:#666">Generated ${new Date().toLocaleString()} — illustrative sample content.</p>
    </body></html>`;
  return new Blob(['\uFEFF' + html], { type: 'application/msword' });
}

function fileBase(p, doc) {
  const clean = (s) => s.replace(/[^\w\s-]+/g, '').trim().replace(/\s+/g, '_');
  return `${clean(p.title)}_${clean(doc.name)}`;
}

function downloadDoc(p, i) {
  const doc = p.documents[i];
  if (!doc) return;
  const base = fileBase(p, doc);
  try {
    if (doc.type === 'pdf') downloadBlob(docAsPdf(p, doc), `${base}.pdf`);
    else if (doc.type === 'xls') downloadBlob(docAsCsv(p, doc), `${base}.csv`);
    else if (doc.type === 'doc') downloadBlob(docAsWord(p, doc), `${base}.doc`);
    // Fallback for an unrecognised doc.type — export as plain text rather than fail silently.
    else downloadBlob(new Blob([docAsText(p, doc)], { type: 'text/plain' }), `${base}.txt`);
    toast('Document generated', `${doc.name} — built in your browser.`);
  } catch (err) {
    console.error(err);
    toast('Could not generate that document', '', 'err');
  }
}

function downloadAll(p) {
  // One combined PDF: cover + each document as its own section.
  const blocks = [
    { type: 'p', text: p.summary },
    { type: 'h2', text: 'Documents in this pack' },
    ...p.documents.map((d, i) => ({ type: 'bullet', text: `${i + 1}. ${d.name} (${d.type.toUpperCase()})` })),
    { type: 'h2', text: 'Programme scope' },
    ...p.highlights.map((h) => ({ type: 'bullet', text: h })),
    { type: 'h2', text: 'Delivery schedule' },
    { type: 'table', columns: ['Stage', 'Activity'], widths: [110, 390], rows: p.timeline.map((t) => [t.when, t.what]) },
    { type: 'h2', text: 'Frequently asked' },
    ...p.faqs.flatMap((f) => [{ type: 'p', text: f.q }, { type: 'p', text: f.a }]),
    { type: 'note', text: 'Combined programme pack auto-generated by the prototype. Illustrative content only.' },
  ];
  const blob = buildPdf({
    org: BRAND.org,
    kicker: 'PROGRAMME PACK',
    title: p.title,
    subtitle: `${p.category} · ${p.audience} · ${p.status}`,
    metaLine: `Generated ${new Date().toLocaleString()} · Reference ${p.id.toUpperCase()}`,
    footer: `${BRAND.orgTitle} · ${BRAND.contact}`,
    blocks,
  });
  downloadBlob(blob, `${p.title.replace(/[^\w\s-]+/g, '').replace(/\s+/g, '_')}_pack.pdf`);
  toast('Programme pack generated', `${p.documents.length + 1} documents merged into one PDF.`);
}

/* --------------------------------------------------------------- request */
function requestModal(p) {
  const scrim = document.createElement('div');
  scrim.className = 'modal-scrim';
  scrim.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Request a call">
      <h3>Request a call</h3>
      <p>Tell us where to reach you and we will follow up about <strong>${esc(p.title)}</strong>. This prototype does not send anything anywhere — it just demonstrates the flow.</p>
      <div class="field"><label for="rqName">Name</label><input id="rqName" placeholder="Alex Morgan"></div>
      <div class="field"><label for="rqEmail">Email</label><input id="rqEmail" type="email" placeholder="alex@example.com"></div>
      <div class="field"><label for="rqWhen">Preferred time</label>
        <select id="rqWhen"><option>Mornings (8–11)</option><option>Midday (11–2)</option><option>Afternoons (2–5)</option></select>
      </div>
      <div class="modal-actions">
        <button class="btn ghost" data-x>Cancel</button>
        <button class="btn brass" data-ok>Request call</button>
      </div>
    </div>`;
  document.body.appendChild(scrim);
  requestAnimationFrame(() => scrim.classList.add('open'));
  lockScroll(true);

  const close = () => {
    scrim.classList.remove('open');
    lockScroll(false);
    setTimeout(() => scrim.remove(), 300);
    document.removeEventListener('keydown', onEsc);
  };
  const onEsc = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onEsc);
  scrim.addEventListener('click', (e) => { if (e.target === scrim) close(); });
  $('[data-x]', scrim).addEventListener('click', close);
  $('[data-ok]', scrim).addEventListener('click', () => {
    const email = $('#rqEmail', scrim).value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast('Enter a valid email', 'We need somewhere to send the confirmation.', 'err');
      return;
    }
    close();
    toast('Request noted (demo)', `No data left this machine. In production this would book a slot for ${p.title}.`);
  });
  setTimeout(() => $('#rqName', scrim)?.focus(), 60);
}

/* ---------------------------------------------------------------- wiring */
function wire() {
  $('#programList')?.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-toggle-p]');
    if (toggle) {
      const id = toggle.dataset.toggleP;
      const card = toggle.closest('.program');
      const open = card.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open) state.open.add(id); else state.open.delete(id);
      return;
    }

    const doc = e.target.closest('[data-doc]');
    if (doc) {
      const p = PROGRAMS.find((x) => x.id === doc.dataset.doc);
      if (p) downloadDoc(p, Number(doc.dataset.i));
      return;
    }

    const fact = e.target.closest('[data-factsheet]');
    if (fact) {
      const p = PROGRAMS.find((x) => x.id === fact.dataset.factsheet);
      if (p) {
        downloadBlob(programFactSheet(p), `${p.title.replace(/[^\w\s-]+/g, '').replace(/\s+/g, '_')}_fact_sheet.pdf`);
        toast('Fact sheet generated', 'A real PDF, written by the browser — no server involved.');
      }
      return;
    }

    const pack = e.target.closest('[data-pack]');
    if (pack) {
      const p = PROGRAMS.find((x) => x.id === pack.dataset.pack);
      if (p) downloadAll(p);
      return;
    }

    const req = e.target.closest('[data-request]');
    if (req) {
      const p = PROGRAMS.find((x) => x.id === req.dataset.request);
      if (p) requestModal(p);
      return;
    }

    const faqQ = e.target.closest('.faq-q');
    if (faqQ) {
      const item = faqQ.closest('.faq-item');
      const open = item.classList.toggle('open');
      faqQ.setAttribute('aria-expanded', String(open));
      return;
    }

    if (e.target.closest('[data-reset]')) resetFilters();
  });

  $('#catList')?.addEventListener('click', (e) => pick(e, 'cat'));
  $('#audList')?.addEventListener('click', (e) => pick(e, 'aud'));
  $('#statusList')?.addEventListener('click', (e) => pick(e, 'status'));

  $('#programSearch')?.addEventListener('input', debounce((e) => {
    state.q = e.target.value;
    renderList();
  }, 170));

  $('#programSort')?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderList();
  });

  $('#resetBtn')?.addEventListener('click', resetFilters);
}

function pick(e, key) {
  const b = e.target.closest(`[data-${key}]`);
  if (!b) return;
  state[key] = b.dataset[key];
  renderRail();
  renderList();
  syncUrl();
}

function resetFilters() {
  state.q = '';
  state.cat = 'All';
  state.aud = 'All';
  state.status = 'All';
  const s = $('#programSearch');
  if (s) s.value = '';
  renderRail();
  renderList();
  syncUrl();
}

function syncUrl() {
  const p = new URLSearchParams();
  if (state.cat !== 'All') p.set('cat', state.cat);
  if (state.aud !== 'All') p.set('aud', state.aud);
  if (state.status !== 'All') p.set('status', state.status);
  if (state.q) p.set('q', state.q);
  const qs = p.toString();
  try {
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  } catch { /* file:// or sandboxed contexts can refuse this — filters still work */ }
}

/* ------------------------------------------------------------------ boot */
export function bootResources() {
  mountChrome('resources.html');
  mountThemeDock();
  const params = new URLSearchParams(location.search);
  if (params.get('cat') && CATEGORIES.includes(params.get('cat'))) state.cat = params.get('cat');
  if (params.get('aud') && AUDIENCES.includes(params.get('aud'))) state.aud = params.get('aud');
  if (params.get('status') && STATUSES.includes(params.get('status'))) state.status = params.get('status');
  if (params.get('q')) {
    state.q = params.get('q');
    const s = $('#programSearch');
    if (s) s.value = state.q;
  }
  const openId = params.get('id');
  if (openId && PROGRAMS.some((p) => p.id === openId)) state.open.add(openId);

  renderRail();
  renderList();
  wire();
  initReveal();

  if (openId) {
    requestAnimationFrame(() => {
      document.getElementById(`program-${openId}`)?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
    });
  }
}

if (document.body.dataset.page === 'resources') bootResources();
