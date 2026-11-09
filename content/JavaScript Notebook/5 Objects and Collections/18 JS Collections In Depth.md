---
title: 18. Collections In Depth
tags:
  - JavaScript
---

> [!summary] In one line
> **Indexed collections** store values by position (arrays, typed arrays). **Keyed collections** store values by key (`Map`, `Set`, `WeakMap`, `WeakSet`). **Structured data** (JSON) is how you send collections between programs.

Everyday methods first: [[16 JS Arrays|Arrays]] and [[21 JS ES6 Plus Features|ES6+ Features]].

## Indexed collections

### Arrays

An array is an object with numeric keys and a special `length`.

```js
const arr = [10, 20, 30];
arr.length = 1;        // [10]: setting length truncates
arr.length = 0;        // clears the array
const holes = [1, , 3];   // a "sparse" array with an empty slot
holes.length;          // 3
arr.at(-1);            // last item
Array.from({ length: 3 }, (_, i) => i * 2);   // [0, 2, 4]
```

### Typed arrays

**Fixed-length arrays of raw binary numbers**, all of the same type. Used for files, images, audio, WebGL, WebSockets and anything else that deals in bytes.

```js
const buffer = new ArrayBuffer(8);     // 8 raw bytes, can't be read directly
const bytes = new Uint8Array(buffer);  // a "view" that reads them as 0–255
bytes[0] = 255;
bytes[1] = 256;                        // wraps around to 0
const floats = new Float32Array([1.5, 2.5]);

const res = await fetch('/photo.png');
const data = new Uint8Array(await res.arrayBuffer());   // the file's bytes
```

| Type | Each item |
| --- | --- |
| `Int8Array` / `Uint8Array` | 8-bit signed / unsigned integer |
| `Uint8ClampedArray` | 0–255, clamps instead of wrapping (canvas pixels) |
| `Int16Array` / `Uint16Array`, `Int32Array` / `Uint32Array` | 16 / 32-bit integers |
| `Float16Array`, `Float32Array`, `Float64Array` | decimals (16-bit is new in ES2025) |
| `BigInt64Array` / `BigUint64Array` | 64-bit integers as BigInt |

Differences from normal arrays: fixed length (no `push`/`pop`), one number type only, much less memory, and fast. Most array methods (`map`, `filter`, `slice`, …) still work. Use `DataView` to read mixed types from one buffer.

> [!tip] Remember it
> **`ArrayBuffer` is the box of bytes; a typed array is the glasses you read it with.** Different glasses, same box.

## Keyed collections

### Map

A key → value store where **keys can be anything**, including objects and functions.

```js
const visits = new Map();
const user = { id: 1 };
visits.set(user, 3).set('home', 10);    // set returns the map: chainable
visits.get(user);       // 3
visits.has('home');     // true
visits.size;            // 2
visits.delete('home');
for (const [key, value] of visits) { }   // insertion order

new Map(Object.entries({ a: 1 }));      // object → Map
Object.fromEntries(visits);             // Map → object (keys become strings)
```

| | `Object` | `Map` |
| --- | --- | --- |
| Key types | strings and symbols | **anything** |
| Size | `Object.keys(o).length` | `map.size` |
| Order | mostly insertion (integer keys first) | always insertion |
| Iterate | `Object.entries(o)` | directly with `for...of` |
| Inherited keys | yes (`toString`, …) | none |
| Frequent add/delete | slower | optimised for it |
| JSON | Yes |  (stringifies to `{}`) |

Use an **object** for fixed-shape records (a user, a config). Use a **Map** for lookups that change at runtime or have non-string keys.

### Set

A collection of **unique values**.

```js
const tags = new Set(['js', 'css', 'js']);   // {'js', 'css'}
tags.add('html'); tags.has('css'); tags.delete('css'); tags.size;
const unique = [...new Set([1, 2, 2, 3])];   // [1, 2, 3]: removes duplicates

// ES2025 set maths
const a = new Set([1, 2, 3]), b = new Set([2, 3, 4]);
a.union(b);                // {1, 2, 3, 4}
a.intersection(b);         // {2, 3}
a.difference(b);           // {1}
a.symmetricDifference(b);  // {1, 4}
a.isSubsetOf(b);           // false
```

### WeakMap

Like a Map, but **keys must be objects** (or, since ES2023, symbols not made with `Symbol.for`) and are held **weakly**: if nothing else references the key object, it's garbage-collected and its entry disappears.

```js
const cache = new WeakMap();
function getSize(el) {
  if (!cache.has(el)) cache.set(el, el.getBoundingClientRect());
  return cache.get(el);
}
// When `el` is removed from the page and dropped, its cache entry goes too: no leak.
```

- Methods: `set`, `get`, `has`, `delete`. **No** `size`, `clear` or iteration, because the contents can change whenever the garbage collector runs.
- Uses: caching results per object, private data per instance, attaching metadata to DOM nodes you don't own.

### WeakSet

A Set of **objects only**, held weakly. Methods: `add`, `has`, `delete`.

```js
const seen = new WeakSet();
function processOnce(obj) {
  if (seen.has(obj)) return;
  seen.add(obj);
  // …work…
}
```

Uses: marking objects as "visited" or "already handled" without keeping them alive.

> [!tip] Remember it
> **Weak = "I don't own it."** A WeakMap/WeakSet never keeps an object alive. When the object goes, the entry goes. That's also why you can't count or loop over them.

## Structured data: JSON

**JSON** (JavaScript Object Notation) is a text format for data. Keys need double quotes. No functions, no `undefined`, no comments.

```js
const text = JSON.stringify({ name: 'Asha', tags: ['js'] });   // object → string
const back = JSON.parse(text);                                  // string → object

JSON.stringify(data, null, 2);                    // pretty-print, 2-space indent
JSON.stringify(user, ['name', 'email']);          // only these keys
JSON.parse(text, (key, value) =>                  // "reviver": revive dates
  key === 'createdAt' ? new Date(value) : value);
```

What doesn't survive `JSON.stringify`:

| Value | Becomes |
| --- | --- |
| `undefined`, functions, symbols in objects | property removed |
| …the same inside arrays | `null` |
| `NaN`, `Infinity` | `null` |
| `Date` | ISO string (and stays a string after `parse`) |
| `Map`, `Set` | `{}` |
| BigInt |  `TypeError` |
| circular references |  `TypeError` |

Give a class a `toJSON()` method to control how it's serialised.

**Deep copies:** `structuredClone(obj)` handles `Date`, `Map`, `Set`, typed arrays and circular references. It throws on functions and DOM nodes, and class instances come back as plain objects.

> [!question] Recall
> 1. What's the relationship between `ArrayBuffer` and `Uint8Array`? When would you use typed arrays?
> 2. Give three reasons to choose a `Map` over an object.
> 3. Why can't you loop over a WeakMap? Give one real use for it.
> 4. What happens to `undefined`, a `Date` and a `Map` when you `JSON.stringify` them?

Prev: [[17 JS Objects|17. Objects]] · Next: [[19 JS Prototypes and Classes|19. Prototypes and Classes]]
