---
title: "22. Modules: CommonJS and ESM"
tags:
  - JavaScript
---

> [!summary] In one line
> A **module** is a file with its own private scope that chooses what to share. **ESM** (`import`/`export`) is the official standard, used in browsers and modern Node. **CommonJS** (`require`/`module.exports`) is Node's older system, still common in npm packages.

## Why modules?

Before modules, every `<script>` shared one global scope: name clashes, a fixed load order, and no way to keep things private. People used IIFEs as a workaround (see [[12 JS Functions|Functions]]). Modules fix this. Each file has its own scope, and it gets **only** what it imports.

## ESM (ECMAScript Modules)

```js
// math.js
export const PI = 3.14;                     // named export
export function area(r) { return PI * r * r; }
export default class Circle { }             // one default export per file

// app.js
import Circle, { area, PI as pi } from './math.js';   // default + named (renamed)
import * as math from './math.js';                     // everything as one object
export { area } from './math.js';                      // re-export (barrel files)

// Load on demand: returns a promise
const { area: lazyArea } = await import('./math.js');
```

**How to use it:**
- Browser: `<script type="module" src="app.js"></script>`. Paths need the extension (`./math.js`).
- Node: name the file `.mjs`, or set `"type": "module"` in `package.json`.

**Properties:**
- `import`/`export` must be at the **top level** (except `import()`). This lets tools check them before running and **tree-shake** (remove unused exports).
- Always **strict mode**. Top-level `this` is `undefined`.
- **Top-level `await`** is allowed.
- Imports are **live bindings**: if the exporting module changes the value, importers see the change. They are also read-only.
- Each module runs **once**, however many files import it.

## CommonJS (CJS)

```js
// math.js
const PI = 3.14;
function area(r) { return PI * r * r; }
module.exports = { PI, area };     // or: exports.area = area;

// app.js
const { area } = require('./math');          // extension optional
const fs = require('node:fs');
if (needed) { const big = require('./big'); } // require can go anywhere, even in an if
```

- `require` is **synchronous**: it loads, runs and returns the file's exports right then.
- You get a **copy** of exported primitives at the time of `require`, not a live binding.
- Has `__dirname`, `__filename` and `module` (in ESM use `import.meta.dirname` / `import.meta.url`).
- Node's default for `.js` and `.cjs` files when `package.json` has no `"type": "module"`.

> [!warning] `exports = …` doesn't work
> `exports` is just a shortcut variable pointing at `module.exports`. Reassigning it cuts the link. Either add properties (`exports.x = …`) or replace `module.exports` itself.

## ESM vs CommonJS

| | ESM | CommonJS |
| --- | --- | --- |
| Syntax | `import` / `export` | `require()` / `module.exports` |
| Standard | official ECMAScript | Node convention |
| Runs in | browsers, Node, Deno, Bun | Node, bundlers |
| Loading | asynchronous, analysed before running | synchronous, at runtime |
| Where | top level (plus `import()`) | anywhere |
| Bindings | live, read-only | copied values |
| Top-level `await` | Yes | No |
| Tree-shaking |  easy |  hard |
| Strict mode | always | only if you opt in |

**Mixing them:** ESM can `import` a CommonJS file (you get `module.exports` as the default export). CommonJS can load ESM with `await import()`, and recent Node versions also allow `require()` of an ES module as long as it doesn't use top-level `await`.

> [!tip] Remember it
> **CommonJS = "require it now"** (synchronous, anywhere). **ESM = "declare it up front"** (static, top of the file). New code: use ESM.

> [!question] Recall
> 1. What problems do modules solve compared with plain `<script>` tags?
> 2. Difference between a named export and a default export? How do you import each?
> 3. Give three differences between ESM and CommonJS.
> 4. How do you tell Node a `.js` file is an ES module?
> 5. Why does `exports = { a }` fail to export anything?

Prev: [[21 JS ES6 Plus Features|21. ES6+ Features]] · Next: [[23 JS DOM Manipulation|23. DOM Manipulation]]
