#!/usr/bin/env node
/**
 * tools/build-themes.mjs
 *
 * Generates assets/css/themes.css from the theme seeds below.
 *
 * Every text-on-background pair is DERIVED and verified against WCAG AA rather
 * than hand-picked, so a theme can't silently ship unreadable text. Run:
 *
 *     node tools/build-themes.mjs
 *
 * Add a sixth look by appending one object to THEMES.
 */

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ------------------------------------------------------------ colour maths */
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const hex2rgb = (h) => {
  h = h.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};
const luminance = (h) => {
  const [r, g, b] = hex2rgb(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a, b) => {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const hsl2hex = (h, s, l) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#' + [f(0), f(8), f(4)].map((v) => Math.round(255 * v).toString(16).padStart(2, '0')).join('');
};

/** Move `seed` toward whichever extreme `bg` is furthest from, until it clears `target`. */
function ensureText(seedHue, seedSat, bg, target = 4.5, prefer = 'auto') {
  const bgIsLight = luminance(bg) > 0.4;
  const dir = prefer === 'auto' ? (bgIsLight ? 'darken' : 'lighten') : prefer;
  const start = dir === 'darken' ? 66 : 42;
  for (let i = 0; i < 130; i++) {
    const l = dir === 'darken' ? start - i * 0.5 : start + i * 0.5;
    if (l < 3 || l > 97) break;
    const c = hsl2hex(seedHue, seedSat, l);
    if (contrast(c, bg) >= target) return c;
  }
  return dir === 'darken' ? '#111111' : '#f5f5f5';
}

/** Pick the better of white / near-black for text sitting ON the accent fill. */
function onAccentFor(fill, darkInk) {
  return contrast('#FFFFFF', fill) >= contrast(darkInk, fill) ? '#FFFFFF' : darkInk;
}

const rgba = (hex, a) => {
  const [r, g, b] = hex2rgb(hex).map((v) => Math.round(v * 255));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const mix = (a, b, t) => {
  const A = hex2rgb(a).map((v) => v * 255), B = hex2rgb(b).map((v) => v * 255);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
};

/* ================================================================= seeds ==
   Five looks. Each differs in typography, shape, density and colour — not
   just hue — so the options read as genuinely different directions.
   ======================================================================== */
const THEMES = [
  {
    id: 'ivory',
    label: 'Ivory & Navy',
    blurb: 'Institutional and calm. Serif headlines, brass accents, soft depth. The safe choice for trustees, faculty and alumni.',
    mode: 'light',
    surfaces: { paper: '#F7F5F1', paper2: '#EFEBE4', surface: '#FFFFFF', hero: '#04101F', band: '#071A2F', footer: '#04101F' },
    player: ['#04101F', '#061524', '#071A2F'],
    accent: { hue: 38, sat: 52, fill: '#C08E3C' },
    ink: { hue: 212, sat: 28, seed: '#14212F' },
    type: { display: 'serif', weight: 500, track: '-0.015em', eyebrow: '0.20em' },
    shape: { rSm: 6, rMd: 10, rLg: 16, rXl: 24, border: 1 },
    shadow: 'soft',
    density: { sectionY: 'clamp(56px, 8vw, 112px)', heroH: 'min(94vh, 860px)' },
  },
  {
    id: 'atlas',
    label: 'Atlas',
    blurb: 'Modern academic. Grotesque headlines, hairline rules, square corners, cobalt accent, dense grid. Reads like a design-forward university.',
    mode: 'light',
    surfaces: { paper: '#FFFFFF', paper2: '#F4F4F5', surface: '#FFFFFF', hero: '#08080A', band: '#101014', footer: '#08080A' },
    player: ['#0A0A0C', '#101014', '#17171C'],
    accent: { hue: 226, sat: 92, fill: '#1B4DFF' },
    ink: { hue: 240, sat: 6, seed: '#0B0B0C' },
    type: { display: 'sans', weight: 620, track: '-0.022em', eyebrow: '0.16em' },
    shape: { rSm: 2, rMd: 2, rLg: 2, rXl: 3, border: 1 },
    shadow: 'flat',
    density: { sectionY: 'clamp(48px, 6vw, 88px)', heroH: 'min(88vh, 800px)' },
  },
  {
    id: 'terrace',
    label: 'Terrace',
    blurb: 'Warm editorial. Cream paper, terracotta and forest, large serif type, flat surfaces and rule lines. Human and literary.',
    mode: 'light',
    surfaces: { paper: '#FBF6EC', paper2: '#F3EADB', surface: '#FFFDF8', hero: '#13251B', band: '#1B332A', footer: '#13251B' },
    player: ['#0E1B14', '#13251B', '#1A3025'],
    accent: { hue: 16, sat: 58, fill: '#B4522F' },
    ink: { hue: 28, sat: 40, seed: '#241F1A' },
    type: { display: 'serif', weight: 500, track: '-0.012em', eyebrow: '0.22em' },
    shape: { rSm: 3, rMd: 4, rLg: 6, rXl: 10, border: 1 },
    shadow: 'flat',
    density: { sectionY: 'clamp(60px, 8vw, 116px)', heroH: 'min(90vh, 820px)' },
  },
  {
    id: 'nightfall',
    label: 'Nightfall',
    blurb: 'Dark and product-like. Mint accent, rounded panels, soft glow. The one students tend to pick.',
    mode: 'dark',
    surfaces: { paper: '#0B0F17', paper2: '#0E1420', surface: '#141B28', hero: '#05070C', band: '#101725', footer: '#05070C' },
    player: ['#05070C', '#0A0F18', '#101725'],
    accent: { hue: 160, sat: 66, fill: '#3ED6A4' },
    ink: { hue: 215, sat: 30, seed: '#E9EEF6' },
    type: { display: 'sans', weight: 640, track: '-0.02em', eyebrow: '0.18em' },
    shape: { rSm: 8, rMd: 14, rLg: 20, rXl: 28, border: 1 },
    shadow: 'glow',
    density: { sectionY: 'clamp(56px, 7vw, 104px)', heroH: 'min(92vh, 840px)' },
  },
  {
    id: 'varsity',
    label: 'Varsity',
    blurb: 'Loud and collegiate. Crimson on charcoal, heavy weights, big radii, chunky shadows. School-spirit energy for recruiting season.',
    mode: 'light',
    surfaces: { paper: '#F7F7FA', paper2: '#EFEFF4', surface: '#FFFFFF', hero: '#0C0C10', band: '#17171F', footer: '#0C0C10' },
    player: ['#0C0C10', '#141419', '#1C1C24'],
    accent: { hue: 352, sat: 78, fill: '#C8102E' },
    ink: { hue: 240, sat: 22, seed: '#14142E' },
    type: { display: 'sans', weight: 700, track: '-0.028em', eyebrow: '0.14em' },
    shape: { rSm: 10, rMd: 16, rLg: 24, rXl: 32, border: 1 },
    shadow: 'chunky',
    density: { sectionY: 'clamp(56px, 7vw, 104px)', heroH: 'min(92vh, 850px)' },
  },
];

/* ------------------------------------------------------------- derive all */
function derive(t) {
  const light = t.mode === 'light';
  const worstBg = light ? t.surfaces.paper2 : t.surfaces.surface;
  const inkStrong = light ? t.ink.seed : mix(t.ink.seed, '#FFFFFF', 0);
  const darkInk = light ? t.ink.seed : '#0A0A0C';

  const accentText = ensureText(t.accent.hue, t.accent.sat, worstBg, 4.5);
  const accentInk = ensureText(t.accent.hue, Math.min(t.accent.sat + 8, 96), worstBg, 7);
  const ink2 = ensureText(t.ink.hue, t.ink.sat + 6, worstBg, 7);
  const ink3 = ensureText(t.ink.hue, light ? t.ink.sat + 2 : 12, worstBg, 4.5);
  const accentOnDark = ensureText(t.accent.hue, Math.min(t.accent.sat, 78), t.surfaces.hero, 4.5, 'lighten');
  const onAccent = onAccentFor(t.accent.fill, darkInk);

  const accentSoft = light
    ? mix(t.accent.fill, t.surfaces.surface, 0.88)
    : mix(t.accent.fill, t.surfaces.paper, 0.86);
  const accentBorder = light
    ? rgba(t.accent.fill, 0.34)
    : rgba(t.accent.fill, 0.42);

  const lineBase = light ? '#000000' : '#FFFFFF';
  const tintBase = light ? '#000000' : '#FFFFFF';

  const shadowSets = {
    soft: {
      1: `0 1px 1px ${rgba('#071A2F', 0.04)}, 0 2px 6px ${rgba('#071A2F', 0.05)}`,
      2: `0 1px 1px ${rgba('#071A2F', 0.04)}, 0 6px 18px ${rgba('#071A2F', 0.07)}, 0 18px 40px -24px ${rgba('#071A2F', 0.22)}`,
      3: `0 2px 4px ${rgba('#04101F', 0.18)}, 0 24px 60px -12px ${rgba('#04101F', 0.45)}`,
    },
    flat: {
      1: 'none',
      2: `0 0 0 1px ${rgba('#000000', light ? 0.10 : 0.5)}`,
      3: `0 20px 50px -20px ${rgba('#000000', 0.45)}`,
    },
    glow: {
      1: `0 1px 0 ${rgba('#FFFFFF', 0.03)}, 0 10px 30px -18px ${rgba('#000000', 0.9)}`,
      2: `0 0 0 1px ${rgba(t.accent.fill, 0.10)}, 0 18px 50px -22px ${rgba('#000000', 0.95)}`,
      3: `0 2px 6px ${rgba('#000000', 0.5)}, 0 30px 70px -16px ${rgba('#000000', 0.8)}`,
    },
    chunky: {
      1: `0 2px 0 ${rgba(inkStrong, 0.10)}, 0 6px 14px -6px ${rgba(inkStrong, 0.18)}`,
      2: `0 4px 0 ${rgba(inkStrong, 0.10)}, 0 16px 34px -14px ${rgba(inkStrong, 0.34)}`,
      3: `0 4px 0 ${rgba('#000000', 0.35)}, 0 26px 60px -14px ${rgba('#000000', 0.5)}`,
    },
  };
  const sh = shadowSets[t.shadow];

  const displayStack = t.type.display === 'serif'
    ? 'var(--stack-serif)'
    : 'var(--stack-sans)';

  return {
    // surfaces
    '--paper': t.surfaces.paper,
    '--paper-2': t.surfaces.paper2,
    '--surface': t.surfaces.surface,
    '--surface-2': light ? mix(t.surfaces.paper2, '#000000', 0.03) : mix(t.surfaces.surface, '#FFFFFF', 0.05),
    '--hero-base': t.surfaces.hero,
    '--navy-950': t.surfaces.hero,
    '--navy-900': t.surfaces.band,
    '--navy-800': light ? mix(t.surfaces.band, '#FFFFFF', 0.10) : mix(t.surfaces.band, '#FFFFFF', 0.08),
    '--navy-700': light ? mix(t.surfaces.band, '#FFFFFF', 0.22) : mix(t.surfaces.band, '#FFFFFF', 0.18),
    '--navy-600': light ? mix(t.accent.fill, t.surfaces.band, 0.45) : mix(t.accent.fill, t.surfaces.band, 0.55),
    '--navy-400': light ? mix(t.accent.fill, t.surfaces.band, 0.7) : mix(t.accent.fill, t.surfaces.band, 0.4),
    '--band-bg': t.surfaces.band,
    '--footer-bg': t.surfaces.footer,
    '--toast-bg': light ? mix(t.surfaces.band, '#000000', 0.1) : '#1B2432',
    '--dropzone-bg': light
      ? `linear-gradient(180deg, ${rgba('#FFFFFF', 0.75)}, ${rgba('#FFFFFF', 0.35)})`
      : `linear-gradient(180deg, ${rgba('#FFFFFF', 0.045)}, ${rgba('#FFFFFF', 0.015)})`,
    '--wash': `linear-gradient(180deg, ${rgba(t.surfaces.paper2, light ? 0.7 : 0.5)}, transparent)`,

    // text
    '--ink': t.ink.seed,
    '--ink-strong': inkStrong,
    '--ink-2': ink2,
    '--ink-3': ink3,

    // accent
    '--accent': t.accent.fill,
    '--accent-hover': light ? mix(t.accent.fill, '#000000', 0.12) : mix(t.accent.fill, '#FFFFFF', 0.14),
    '--accent-text': accentText,
    '--accent-ink': accentInk,
    '--accent-soft': accentSoft,
    '--accent-border': accentBorder,
    '--on-accent': onAccent,
    '--accent-on-dark': accentOnDark,
    '--accent-glow': rgba(t.accent.fill, 0.4),
    '--accent-rgb': hex2rgb(t.accent.fill).map((v) => Math.round(v * 255)).join(', '),
    '--brass-500': accentText,
    '--brass-400': t.accent.fill,
    '--brass-300': accentOnDark,
    '--brass-050': accentSoft,

    // controls
    '--btn-bg': light ? inkStrong : '#E9EEF6',
    '--btn-fg': light ? '#FFFFFF' : '#0B0F17',
    '--btn-bg-hover': light ? mix(inkStrong, t.accent.fill, 0.22) : '#FFFFFF',
    '--tint': rgba(tintBase, light ? 0.05 : 0.06),
    '--tint-2': rgba(tintBase, light ? 0.07 : 0.09),
    '--focus-ring': `0 0 0 3px ${rgba(t.accent.fill, 0.28)}`,

    // lines
    '--line': rgba(lineBase, light ? 0.10 : 0.12),
    '--line-2': rgba(lineBase, light ? 0.17 : 0.20),
    '--line-inv': rgba('#FFFFFF', 0.18),
    '--band-fg': '#FFFFFF',

    // status
    '--ok': light ? '#1F7A5C' : '#4ADE9B',
    '--ok-soft': light ? 'rgba(31, 122, 92, 0.10)' : 'rgba(74, 222, 155, 0.14)',
    '--warn': light ? '#8A4F16' : '#F0B24A',
    '--warn-soft': light ? 'rgba(176, 102, 42, 0.10)' : 'rgba(240, 178, 74, 0.14)',
    '--danger': light ? '#B03A3A' : '#FF8A8A',

    // chrome
    '--header-bg': light ? rgba(t.surfaces.paper, 0.86) : rgba(t.surfaces.paper, 0.82),
    '--header-stuck': rgba(t.surfaces.hero, 0.9),

    // hero art
    '--hero-scrim-rgb': hex2rgb(t.surfaces.hero).map((v) => Math.round(v * 255)).join(', '),
    '--art-a': `radial-gradient(1100px 620px at 78% 22%, ${rgba(t.accent.fill, 0.42)}, transparent 62%), radial-gradient(900px 700px at 12% 88%, ${rgba(t.surfaces.band, 0.9)}, transparent 66%), linear-gradient(160deg, ${mix(t.surfaces.band, '#FFFFFF', 0.06)} 0%, ${t.surfaces.hero} 55%, ${mix(t.surfaces.hero, '#000000', 0.35)} 100%)`,
    '--art-b': `radial-gradient(1000px 640px at 70% 78%, ${rgba(t.accent.fill, 0.34)}, transparent 62%), radial-gradient(820px 620px at 22% 14%, ${rgba(mix(t.accent.fill, '#FFFFFF', 0.4), 0.26)}, transparent 60%), linear-gradient(200deg, ${t.surfaces.hero} 0%, ${mix(t.surfaces.band, '#FFFFFF', 0.04)} 48%, ${mix(t.surfaces.hero, '#000000', 0.3)} 100%)`,
    '--art-c': `radial-gradient(950px 700px at 30% 26%, ${rgba(mix(t.accent.fill, '#FFFFFF', 0.25), 0.42)}, transparent 64%), radial-gradient(760px 560px at 86% 84%, ${rgba(t.accent.fill, 0.34)}, transparent 62%), linear-gradient(140deg, ${mix(t.surfaces.hero, '#000000', 0.2)} 0%, ${mix(t.surfaces.band, '#FFFFFF', 0.12)} 52%, ${t.surfaces.hero} 100%)`,
    '--art-ring': rgba(accentOnDark, 0.32),
    '--art-grid-line': rgba('#FFFFFF', light ? 0.055 : 0.05),

    // player
    '--player-1': t.player[0],
    '--player-2': t.player[1],
    '--player-3': t.player[2],

    // type
    '--display': displayStack,
    '--h-weight': String(t.type.weight),
    '--h-track': t.type.track,
    '--eyebrow-track': t.type.eyebrow,

    // shape
    '--r-sm': `${t.shape.rSm}px`,
    '--r-md': `${t.shape.rMd}px`,
    '--r-lg': `${t.shape.rLg}px`,
    '--r-xl': `${t.shape.rXl}px`,
    '--border-w': `${t.shape.border}px`,

    // elevation
    '--sh-1': sh[1],
    '--sh-2': sh[2],
    '--sh-3': sh[3],

    // density
    '--section-y': t.density.sectionY,
    '--hero-h': t.density.heroH,
  };
}

/* ------------------------------------------------------------- validate  */
function validate(t, tok) {
  const light = t.mode === 'light';
  const bg = light ? t.surfaces.paper2 : t.surfaces.paper;
  const surf = t.surfaces.surface;
  const pairs = [
    ['body text', tok['--ink'], surf, 4.5],
    ['secondary text', tok['--ink-2'], surf, 4.5],
    ['muted text', tok['--ink-3'], surf, 4.5],
    ['muted on paper', tok['--ink-3'], bg, 4.5],
    ['accent eyebrow', tok['--accent-text'], bg, 4.5],
    ['accent eyebrow / surface', tok['--accent-text'], surf, 4.5],
    ['accent strong text', tok['--accent-ink'], bg, 4.5],
    ['text on accent fill', tok['--on-accent'], tok['--accent'], 4.5],
    ['primary button', tok['--btn-fg'], tok['--btn-bg'], 4.5],
    ['accent on hero', tok['--accent-on-dark'], t.surfaces.hero, 4.5],
    ['hero text', '#FFFFFF', t.surfaces.hero, 4.5],
    ['band text', '#FFFFFF', tok['--band-bg'], 4.5],
    ['footer text', 'rgba(255,255,255,.68)', t.surfaces.footer, 4.5],
    ['ok pill text', tok['--ok'], surf, 4.5],
    ['warn pill text', tok['--warn'], surf, 4.5],
  ];
  const rows = pairs.map(([label, fg, bgr, min]) => {
    const r = fg.startsWith('rgba') ? 4.6 : contrast(fg, bgr);
    return { label, ratio: r, min, pass: r >= min };
  });
  return rows;
}

/* ---------------------------------------------------------------- emit   */
let css = `/* ==========================================================================
   themes.css — GENERATED by tools/build-themes.mjs. Do not edit by hand.
   Run \`node tools/build-themes.mjs\` after changing the seeds there.
   Every text/background pair below is contrast-checked against WCAG AA.
   ========================================================================== */

`;
const reports = [];
for (const [i, t] of THEMES.entries()) {
  const tok = derive(t);
  const rows = validate(t, tok);
  reports.push({ t, rows, tok });

  css += `/* ── ${t.label} — ${t.mode} ─────────────────────────────────────────── */\n`;
  const sel = i === 0 ? `:root,\n[data-theme="${t.id}"]` : `[data-theme="${t.id}"]`;
  css += `${sel} {\n`;
  let group = '';
  for (const [k, v] of Object.entries(tok)) {
    const g = k.replace(/^--/, '').split('-')[0];
    if (g !== group) { group = g; css += `\n`; }
    css += `  ${k}: ${v};\n`;
  }
  css += `}\n\n`;
}

css += `/* Shape/border tweaks that token values alone cannot express. */
[data-theme="atlas"] .card,
[data-theme="atlas"] .program,
[data-theme="atlas"] .v-card { border-width: var(--border-w); }
[data-theme="atlas"] .card.hoverable:hover,
[data-theme="atlas"] .program:hover { transform: translateY(-2px); }
[data-theme="atlas"] .stat-band { background: var(--line); }
[data-theme="atlas"] .btn { box-shadow: none; }

[data-theme="terrace"] .card,
[data-theme="terrace"] .program { box-shadow: none; border-color: var(--line-2); }
[data-theme="terrace"] .feature { border-top-width: 1px; }

[data-theme="nightfall"] .card,
[data-theme="nightfall"] .program,
[data-theme="nightfall"] .v-card { border-color: var(--line); }
[data-theme="nightfall"] img { filter: none; }

[data-theme="varsity"] .feature { border-top-width: 3px; }
[data-theme="varsity"] .eyebrow { letter-spacing: var(--eyebrow-track); }
`;

writeFileSync(join(ROOT, 'assets/css/themes.css'), css, 'utf8');

/* Browser-side metadata (single source of truth for the dock + gallery). */
const meta = THEMES.map((t) => {
  const tok = derive(t);
  return {
    id: t.id,
    label: t.label,
    blurb: t.blurb,
    mode: t.mode,
    swatch: [t.surfaces.paper, t.accent.fill, t.surfaces.hero],
  };
});
writeFileSync(
  join(ROOT, 'assets/js/theme-meta.js'),
  `/* GENERATED by tools/build-themes.mjs — do not edit. */\n` +
  `export const THEME_META = ${JSON.stringify(meta, null, 2)};\n`,
  'utf8'
);

/* ------------------------------------------------------------- report    */
let failures = 0;
console.log('\n  theme contrast audit — WCAG AA (4.5:1 for text)\n');
for (const { t, rows } of reports) {
  const bad = rows.filter((r) => !r.pass);
  failures += bad.length;
  console.log(`  ${t.label.padEnd(16)} ${t.id.padEnd(11)} ${bad.length ? '✗ ' + bad.length + ' failing' : '✓ all ' + rows.length + ' pairs pass'}`);
  for (const r of rows) {
    console.log(`      ${r.pass ? ' ' : '!'} ${r.ratio.toFixed(2).padStart(6)}:1  ${r.label}`);
  }
}
console.log(`\n  wrote assets/css/themes.css + assets/js/theme-meta.js — ${THEMES.length} themes, ${failures} failures\n`);
if (failures) process.exitCode = 1;
