#!/usr/bin/env node
/**
 * build.js — concatenates the ES modules in assets/js into one classic script
 * (assets/js/bundle.js) so the prototype also runs straight from file://
 * without a local web server.
 *
 *   node build.js
 *
 * Source of truth stays the ES modules. Only named imports/exports are used,
 * which keeps this transform simple and predictable.
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'assets', 'js');
const ORDER = ['data', 'theme-meta', 'site', 'theme', 'pdf', 'home', 'media', 'resources', 'gallery'];

function transform(name, src) {
  const exports = new Set();

  // 1. strip `import { … } from './x.js';` (single or multi-line) → __req
  let code = src.replace(
    /^import\s*\{([\s\S]*?)\}\s*from\s*'\.\/([\w.-]+)\.js';\s*$/gm,
    (_, names, mod) => `const {${names.replace(/\s+/g, ' ').trim().replace(/,$/, '')}} = __req('${mod}');`
  );

  // 2. drop alias-only re-exports (not used by the app)
  code = code.replace(/^export\s*\{[^}]*\};\s*$/gm, '');

  // 3. unwrap `export` from declarations, remembering the public names
  code = code.replace(
    /^export\s+(?:async\s+)?(?:function|const|let|var|class)\s+([A-Za-z0-9_$]+)/gm,
    (m, declName) => {
      exports.add(declName);
      return m.replace(/^export\s+/, '');
    }
  );

  const leftover = code.match(/^\s*(import|export)\s/m);
  if (leftover) {
    throw new Error(
      `[${name}] unsupported ${leftover[1]} statement remains — the bundler only handles named import/export.`
    );
  }

  return `__def(${JSON.stringify(name)}, function () {\n${code}\nreturn { ${[...exports].join(', ')} };\n});`;
}

const parts = [];
for (const name of ORDER) {
  const file = path.join(DIR, `${name}.js`);
  if (!fs.existsSync(file)) throw new Error(`missing module: ${file}`);
  parts.push(transform(name, fs.readFileSync(file, 'utf8')));
}

const out = `/* ------------------------------------------------------------------
   AUTO-GENERATED FILE — do not edit.
   Source: assets/js/*.js   Rebuild: node build.js
   ------------------------------------------------------------------ */
(function () {
'use strict';
var __mods = {};
function __def(name, factory) { __mods[name] = factory(); }
function __req(name) {
  if (!__mods[name]) throw new Error('module not loaded: ' + name);
  return __mods[name];
}
${parts.join('\n\n')}
})();
`;

const target = path.join(DIR, 'bundle.js');
fs.writeFileSync(target, out, 'utf8');
console.log(`wrote ${path.relative(process.cwd(), target)}  (${(out.length / 1024).toFixed(1)} kB, ${ORDER.length} modules)`);
