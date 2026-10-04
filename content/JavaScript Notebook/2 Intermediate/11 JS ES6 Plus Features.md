---
title: 11. ES6+ Features
tags:
  - JavaScript
---

> [!summary] In one line
> Modern JavaScript (ES2015 onward) added shortcuts that make code shorter and safer. These show up in every codebase and interview.

## Destructuring: unpack values

```js
const [first, second, ...others] = [1, 2, 3, 4];   // arrays by position
const { name, age = 18, address: { city } } = user; // objects by name, with default & nesting
const { name: userName } = user;                    // rename
function show({ name, age }) { }                    // in parameters
[a, b] = [b, a];                                    // swap
```

🧠 **Arrays unpack by *position*, objects unpack by *name*.**

## Spread vs rest (same `...`, opposite jobs)

```js
const merged = [...arr1, ...arr2];        // SPREAD: open the box, pour items out
const clone = { ...user, age: 30 };       // copy + override
Math.max(...[1, 5, 3]);                   // 5

function sum(...nums) { }                 // REST: collect leftovers into a box
const { id, ...rest } = user;
```

> [!tip] 🧠 Remember it
> **Spread spreads out, rest gathers the rest.** On the *right* of `=` or in a call → spread. On the *left* or in parameters → rest.

## Modules

```js
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { PI, add as plus } from './math.js';
```

```html
<script type="module" src="app.js"></script>
```

Named export → `{ curly }`, any number. Default export → no curlies, one per file.

## Map and Set

```js
const set = new Set([1, 2, 2, 3]);   // {1, 2, 3}: unique values
[...new Set(arr)];                   // remove duplicates 🔥
set.has(2); set.add(4); set.delete(1); set.size;

const map = new Map();               // keys can be ANY type
map.set(userObj, 'online');
map.get(userObj);
```

🧠 **Set = a guest list (no duplicates). Map = an object whose keys can be anything.**

## Other must-knows

- `let` / `const`, arrow functions, template literals, default params ([[05 JS Functions|Functions]])
- `class` syntax ([[15 JS Prototypes and Classes|Prototypes and Classes]])
- Promises, `async`/`await` ([[16 JS Asynchronous JavaScript|Asynchronous JavaScript]])
- Optional chaining `?.`, nullish coalescing `??` ([[03 JS Operators and Type Coercion|Operators]])
- `Array.prototype.includes`, `Object.entries`, `flat`, `at`, `structuredClone`

> [!question] Recall
> 1. How do you rename a property while destructuring?
> 2. Same syntax `...`: when is it spread and when is it rest?
> 3. Quickest way to remove duplicates from an array?
