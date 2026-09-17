import { BRAND } from './data.js';

/* ==========================================================================
   pdf.js — dependency-free PDF writer
   Produces real, openable PDFs (Helvetica, multi-page, word-wrapped) from
   the program data. No libraries, no network — works from file://.
   ========================================================================== */

const PAGE_W = 612;      // US Letter, points
const PAGE_H = 792;
const M = 56;            // margin
const CONTENT_W = PAGE_W - M * 2;

const INK = [0.078, 0.129, 0.184];
const MUTED = [0.455, 0.518, 0.604];
const BRASS = [0.753, 0.588, 0.353];
const NAVY = [0.027, 0.102, 0.184];
const RULE = [0.86, 0.87, 0.89];

/* ASCII-only sanitiser: PDF strings here are written with WinAnsi literals. */
function ascii(s) {
  return String(s ?? '')
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[\u00B7\u2022]/g, '*')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ');
}

function pdfEscape(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/* Helvetica metric approximation — good enough for wrapping and layout. */
function textWidth(s, size, bold) {
  const k = bold ? 0.552 : 0.505;
  let w = 0;
  for (const ch of s) {
    if ('iljItfr.,;:!|\'`'.includes(ch)) w += size * 0.28;
    else if ('MWmw@'.includes(ch)) w += size * 0.85;
    else if (ch === ' ') w += size * 0.28;
    else w += size * k;
  }
  return w;
}

function wrapText(text, size, bold, maxWidth) {
  const words = ascii(text).split(' ').filter((w) => w.length);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (textWidth(test, size, bold) <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      if (textWidth(word, size, bold) > maxWidth) {
        // hard-break a very long token
        let chunk = '';
        for (const ch of word) {
          if (textWidth(chunk + ch, size, bold) > maxWidth) { lines.push(chunk); chunk = ch; }
          else chunk += ch;
        }
        line = chunk;
      } else {
        line = word;
      }
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

/**
 * Build a PDF.
 * @param {object} doc
 * @param {string} doc.title
 * @param {string} [doc.subtitle]
 * @param {string} [doc.footer]
 * @param {Array}  doc.blocks  — see BLOCK handling below
 * @returns {Blob}
 */
export function buildPdf(doc) {
  const pages = [];
  let ops = [];
  let y = 0;

  const color = (c) => `${c[0]} ${c[1]} ${c[2]} rg`;
  const text = (str, { size = 10.5, bold = false, c = INK, x = M, gap = 0 } = {}) => {
    if (str === '') { y -= size * 0.6; return; }
    ops.push(`BT ${color(c)} /${bold ? 'F2' : 'F1'} ${size} Tf ${x} ${y.toFixed(2)} Td (${pdfEscape(str)}) Tj ET`);
    y -= size * 1.32 + gap;
  };
  const rule = (c = RULE, h = 0.7, gapAfter = 12, x = M, w = CONTENT_W) => {
    ops.push(`${color(c)} ${x} ${(y - h).toFixed(2)} ${w} ${h} re f`);
    y -= h + gapAfter;
  };
  const rect = (x, yy, w, h, c) => ops.push(`${color(c)} ${x} ${yy} ${w} ${h} re f`);

  const startPage = () => {
    ops = [];
    y = PAGE_H - M;
    pages.push(ops);
  };

  const need = (h) => {
    if (y - h < M + 34) startPage();
  };

  /* ---------------------------------------------------------- page 1 head */
  startPage();
  // header band
  rect(0, PAGE_H - 104, PAGE_W, 104, NAVY);
  rect(0, PAGE_H - 108, PAGE_W, 4, BRASS);
  ops.push(`BT ${color([1, 1, 1])} /F2 9 Tf ${M} ${PAGE_H - 46} Td (${pdfEscape(ascii(doc.org || BRAND.org))}) Tj ET`);
  ops.push(`BT ${color(BRASS)} /F1 8 Tf ${M} ${PAGE_H - 60} Td (${pdfEscape(ascii(doc.kicker || 'PROGRAM FACT SHEET'))}) Tj ET`);
  {
    const lines = wrapText(doc.title, 20, true, CONTENT_W);
    let hy = PAGE_H - 84;
    lines.slice(0, 2).forEach((l) => {
      ops.push(`BT ${color([1, 1, 1])} /F2 20 Tf ${M} ${hy} Td (${pdfEscape(l)}) Tj ET`);
      hy -= 23;
    });
  }
  y = PAGE_H - 138;

  if (doc.subtitle) {
    wrapText(doc.subtitle, 11, false, CONTENT_W).forEach((l) => text(l, { size: 11, c: MUTED, gap: 1 }));
    y -= 8;
  }
  if (doc.metaLine) {
    text(doc.metaLine, { size: 8.8, c: MUTED, gap: 6 });
  }
  rule([0.88, 0.89, 0.90], 0.8, 20);

  /* -------------------------------------------------------------- blocks */
  for (const b of doc.blocks || []) {
    switch (b.type) {
      case 'h2': {
        need(56);
        y -= 8;
        text(ascii(b.text).toUpperCase(), { size: 9.2, bold: true, c: BRASS, gap: 3 });
        rule([0.90, 0.91, 0.92], 0.6, 12);
        break;
      }
      case 'p': {
        const lines = wrapText(b.text, 10.5, false, CONTENT_W);
        need(lines.length * 14 + 6);
        lines.forEach((l) => text(l, { size: 10.5, c: INK, gap: 2.6 }));
        y -= 4;
        break;
      }
      case 'bullet': {
        const lines = wrapText(b.text, 10.5, false, CONTENT_W - 16);
        need(lines.length * 14 + 2);
        ops.push(`${color(BRASS)} ${M + 1} ${(y + 1.6).toFixed(2)} 3.4 3.4 re f`);
        lines.forEach((l, i) => text(l, { size: 10.5, c: INK, x: M + 16, gap: i === lines.length - 1 ? 4.4 : 2.6 }));
        break;
      }
      case 'kv': {
        const pairs = b.items || [];
        const rows = [];
        pairs.forEach((p) => {
          const left = wrapText(p.k, 9.6, true, 150);
          const right = wrapText(p.v, 10.5, false, CONTENT_W - 172);
          rows.push({ left, right, h: Math.max(left.length, right.length) * 13.6 + 9 });
        });
        rows.forEach((r) => {
          need(r.h + 4);
          const top = y;
          r.left.forEach((l, i) => {
            ops.push(`BT ${color(MUTED)} /F2 9.6 Tf ${M} ${(top - i * 13.6).toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
          });
          r.right.forEach((l, i) => {
            ops.push(`BT ${color(INK)} /F1 10.5 Tf ${M + 172} ${(top - i * 13.6).toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
          });
          y = top - r.h;
          rule([0.93, 0.935, 0.94], 0.5, 6);
        });
        y -= 4;
        break;
      }
      case 'table': {
        const cols = b.columns || [];
        const widths = b.widths || cols.map(() => CONTENT_W / cols.length);
        need(24);
        let x = M;
        cols.forEach((c, i) => {
          ops.push(`BT ${color(MUTED)} /F2 8.6 Tf ${x} ${y.toFixed(2)} Td (${pdfEscape(ascii(c).toUpperCase())}) Tj ET`);
          x += widths[i];
        });
        y -= 6;
        rule([0.85, 0.86, 0.88], 0.7, 10);
        (b.rows || []).forEach((row) => {
          const cells = row.map((cell, i) => wrapText(cell, 10, false, widths[i] - 10));
          const h = Math.max(...cells.map((c) => c.length)) * 13.4 + 9;
          need(h);
          const top = y;
          x = M;
          cells.forEach((lines, i) => {
            lines.forEach((l, j) => {
              ops.push(`BT ${color(INK)} /F1 10 Tf ${x} ${(top - j * 13.4).toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
            });
            x += widths[i];
          });
          y = top - h;
          rule([0.92, 0.925, 0.93], 0.5, 0);
        });
        y -= 6;
        break;
      }
      case 'space':
        y -= b.h || 12;
        break;
      case 'note': {
        const lines = wrapText(b.text, 9.4, false, CONTENT_W - 24);
        const h = lines.length * 12.6 + 20;
        need(h);
        rect(M, y - h + 10, CONTENT_W, h, [0.972, 0.953, 0.902]);
        ops.push(`${color(BRASS)} ${M} ${(y - h + 10).toFixed(2)} 2.6 ${h.toFixed(2)} re f`);
        let ny = y - 2;
        lines.forEach((l) => {
          ops.push(`BT ${color([0.42, 0.32, 0.13])} /F1 9.4 Tf ${M + 14} ${ny.toFixed(2)} Td (${pdfEscape(l)}) Tj ET`);
          ny -= 12.6;
        });
        y = y - h - 4;
        break;
      }
      default:
        break;
    }
  }

  /* ------------------------------------------------------------ footers */
  const total = pages.length; // used for the “Page n of m” footer
  pages.forEach((pageOps, i) => {
    const foot = `${ascii(doc.footer || 'Illustrative sample content - not investment advice.')}`;
    pageOps.push(`BT ${color(MUTED)} /F1 7.6 Tf ${M} 42 Td (${pdfEscape(foot)}) Tj ET`);
    const pn = `Page ${i + 1} of ${total}`;
    const w = textWidth(pn, 7.6, false);
    pageOps.push(`BT ${color(MUTED)} /F1 7.6 Tf ${(PAGE_W - M - w).toFixed(2)} 42 Td (${pdfEscape(pn)}) Tj ET`);
    pageOps.push(`${color([0.88, 0.89, 0.90])} ${M} 54 ${CONTENT_W} 0.6 re f`);
    pageOps.push(`${color(NAVY)} ${M} 54 46 2 re f`);
    pageOps.push(`${color(BRASS)} ${M + 46} 54 ${(CONTENT_W - 46).toFixed(2)} 2 re f`);
  });

  /* ------------------------------------------------------ object assembly */
  const pageCount = pages.length;
  const F1 = 3, F2 = 4, firstPage = 5;
  const objs = [];
  objs[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  const kids = pages.map((_, i) => `${firstPage + i * 2} 0 R`).join(' ');
  objs[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pageCount} >>`;
  objs[F1] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`;
  objs[F2] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`;

  pages.forEach((pageOps, i) => {
    const pn = firstPage + i * 2;
    const cn = pn + 1;
    const stream = pageOps.join('\n');
    objs[pn] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /F1 ${F1} 0 R /F2 ${F2} 0 R >> >> /Contents ${cn} 0 R >>`;
    objs[cn] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  // Info dictionary is object N+1, written in the same pass so the xref stays valid.
  const infoNum = objs.length;
  objs[infoNum] = `<< /Title (${pdfEscape(ascii(doc.title))}) /Producer (Baruch College Financial Group prototype) >>`;
  const objCount = objs.length; // objects are numbered 1 .. objCount-1

  let out = `%PDF-1.4\n%\xE2\xE3\xCF\xD3\n`;
  const offsets = [];
  for (let i = 1; i < objCount; i++) {
    offsets[i] = out.length;
    out += `${i} 0 obj\n${objs[i]}\nendobj\n`;
  }
  const xrefStart = out.length;
  let xref = `xref\n0 ${objCount}\n0000000000 65535 f \n`;
  for (let i = 1; i < objCount; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  out += `${xref}trailer\n<< /Size ${objCount} /Root 1 0 R /Info ${infoNum} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  const bytes = new Uint8Array(out.length);
  for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: 'application/pdf' });
}

/* ------------------------------------------------------- fact-sheet build */
export function programFactSheet(program, org = BRAND.org) {
  const blocks = [
    { type: 'p', text: program.summary },
    { type: 'h2', text: 'At a glance' },
    {
      type: 'kv',
      items: [
        { k: 'Program category', v: program.category },
        { k: 'Designed for', v: program.audience },
        { k: 'Enrolment status', v: program.status },
        { k: 'Fee structure', v: program.fee },
        { k: 'Minimum', v: program.minimum },
        { k: 'Typical horizon', v: program.horizon },
      ],
    },
    { type: 'h2', text: 'What the programme covers' },
    ...program.highlights.map((h) => ({ type: 'bullet', text: h })),
    { type: 'h2', text: 'Delivery schedule' },
    { type: 'table', columns: ['Stage', 'What happens'], widths: [110, CONTENT_W - 110], rows: program.timeline.map((t) => [t.when, t.what]) },
    { type: 'h2', text: 'Frequently asked' },
    ...program.faqs.flatMap((f) => [
      { type: 'p', text: f.q },
      { type: 'p', text: f.a },
    ]),
    { type: 'space', h: 6 },
    {
      type: 'note',
      text:
        'Illustrative prototype content generated for evaluation only. Figures, fees and schedules are sample data and do not constitute an offer, advice, or a solicitation.',
    },
  ];

  return buildPdf({
    org,
    kicker: 'PROGRAM FACT SHEET',
    title: program.title,
    subtitle: `${program.category} · ${program.audience}`,
    metaLine: `Generated ${new Date().toLocaleString()}  ·  Reference ${program.id.toUpperCase()}`,
    footer: `${org}  ·  ${BRAND.contact}`,
    blocks,
  });
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* --------------------------------------------------- lightweight XLS/CSV */
export function buildCsv(rows, filename = 'export.csv') {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
  return new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
}
