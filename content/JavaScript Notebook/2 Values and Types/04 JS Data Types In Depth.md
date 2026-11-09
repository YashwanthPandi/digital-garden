---
title: 4. Data Types In Depth
tags:
  - JavaScript
---

> [!summary] In one line
> JavaScript has **7 primitive types** (copied by value, can't be changed) and **1 object type** (shared by reference). Everything that isn't a primitive is an object: arrays, functions, dates, maps.

Basics first: [[03 JS Variables and Data Types|Variables and Data Types]].

## The 8 types

| Type | Example | `typeof` |
| --- | --- | --- |
| String | `'hi'`, `` `hi ${x}` `` | `'string'` |
| Number | `42`, `3.14`, `NaN`, `Infinity` | `'number'` |
| BigInt | `9007199254740993n` | `'bigint'` |
| Boolean | `true`, `false` | `'boolean'` |
| Undefined | `undefined` | `'undefined'` |
| Null | `null` | `'object'` (a bug from 1995, kept for compatibility) |
| Symbol | `Symbol('id')` | `'symbol'` |
| **Object** | `{}`, `[]`, `function(){}`, `new Date()` | `'object'` (functions: `'function'`) |

> [!tip] Remember it
> **"7 primitives, 1 object":** **S**ome **N**ew **B**ig **B**ooks **U**se **N**ull **S**ymbols: String, Number, BigInt, Boolean, Undefined, Null, Symbol.

**Primitives are immutable.** String methods return a *new* string; the original never changes.

```js
let s = 'cat';
s.toUpperCase();   // 'CAT'
s;                 // 'cat'  ← unchanged
s[0] = 'b';        // silently ignored (TypeError in strict mode)
```

## The `typeof` operator

```js
typeof 'a'          // 'string'
typeof 1            // 'number'
typeof NaN          // 'number' (NaN is a number!)
typeof 1n           // 'bigint'
typeof undefined    // 'undefined'
typeof notDeclared  // 'undefined' (no error, so it's used for feature checks)
typeof null         // 'object'
typeof []           // 'object'  → use Array.isArray([])
typeof function(){} // 'function'
typeof class {}     // 'function' (classes are functions)
typeof Symbol()     // 'symbol'
```

Reliable checks: `x === null`, `Array.isArray(x)`, `x instanceof Date`, `Number.isNaN(x)`.

## Number

- One type for integers and decimals: **64-bit floating point** (IEEE 754).
- Safe integers only up to `Number.MAX_SAFE_INTEGER` = `2^53 - 1` = `9007199254740991`.
- `0.1 + 0.2 !== 0.3`. Compare with a tolerance: `Math.abs(a - b) < Number.EPSILON`.
- Special values: `NaN` (not equal to anything, even itself), `Infinity`, `-Infinity`, `-0`.
- Helpers: `Number.isInteger`, `Number.isSafeInteger`, `toFixed(2)` (returns a **string**).

## BigInt

Whole numbers of **any size**. Add `n` to the end or call `BigInt()`.

```js
2 ** 53 + 1          // 9007199254740992   wrong, precision lost
2n ** 53n + 1n       // 9007199254740993n
BigInt('123')        // 123n
BigInt(1.5)          //  RangeError: only whole numbers
5n / 2n              // 2n   (division truncates, no decimals)
1n + 1               //  TypeError: can't mix BigInt and Number
1n + BigInt(1)       // 2n
1n == 1              // true (comparisons are allowed)
2n > 1               // true
```

Use it for big IDs (e.g. from databases), money in the smallest unit, and cryptography. `Math.*` and `JSON.stringify` don't accept BigInt.

## Symbol

A **guaranteed-unique** value, mostly used as an object key that can't clash with other keys.

```js
const id = Symbol('id');           // 'id' is only a description for debugging
Symbol('id') === Symbol('id');     // false: every Symbol is unique
const user = { name: 'Asha', [id]: 42 };

Object.keys(user);                 // ['name']  ← symbol keys are hidden
JSON.stringify(user);              // '{"name":"Asha"}'
user[id];                          // 42

Symbol.for('app.id') === Symbol.for('app.id');   // true: global registry
```

**Well-known symbols** let you hook into the language: `Symbol.iterator` (makes objects work with `for...of`, see [[20 JS Iterators and Generators|Iterators and Generators]]), `Symbol.toPrimitive`, `Symbol.asyncIterator`.

## `undefined` vs `null`

- `undefined`: **JS** says "nothing has been assigned yet" (missing variable value, missing property, missing argument, function with no `return`).
- `null`: **you** say "intentionally empty".
- `null == undefined` is `true`, `null === undefined` is `false`. `x == null` checks for both at once.

## Object, the prototype and prototypal inheritance

Every object has a hidden link, `[[Prototype]]`, to another object. A missing property is looked up along this **prototype chain**.

```js
const animal = { eats: true };
const rabbit = Object.create(animal);    // rabbit's prototype is animal
rabbit.jumps = true;

rabbit.eats;                             // true (found on the prototype)
Object.getPrototypeOf(rabbit) === animal;   // true
Object.hasOwn(rabbit, 'eats');           // false: it's inherited

// The chain: rabbit → animal → Object.prototype → null
```

`Object.prototype` is the end of almost every chain. That's why every object has `toString`, `hasOwnProperty`, and so on. Classes are another syntax for the same mechanism: see [[19 JS Prototypes and Classes|Prototypes and Classes]].

## Built-in objects

Ready-made objects and constructors that come with the language:

| Group | Built-ins |
| --- | --- |
| Fundamental | `Object`, `Function`, `Boolean`, `Symbol` |
| Errors | `Error`, `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError` |
| Numbers and dates | `Number`, `BigInt`, `Math`, `Date` |
| Text | `String`, `RegExp` |
| Collections | `Array`, typed arrays, `Map`, `Set`, `WeakMap`, `WeakSet` |
| Structured data | `JSON`, `ArrayBuffer`, `DataView` |
| Control | `Promise`, generators, `Proxy`, `Reflect` |
| Internationalisation | `Intl` (number, date and list formatting) |

```js
Math.round(4.5); Math.max(1, 5, 3); Math.floor(Math.random() * 10);  // 0–9
new Date().toISOString();                                  // '2026-11-08T…Z'
new Intl.NumberFormat('en-IN').format(1234567);            // '12,34,567'
```

**Wrapper objects:** `'abc'.length` works because JS briefly wraps the primitive in a `String` object. Never create them yourself: `new String('a')` is an object, so `new String('a') === 'a'` is `false`.

## Built-in (global) functions

| Function | Does |
| --- | --- |
| `parseInt(str, radix)` / `parseFloat(str)` | read a number from the start of a string |
| `isNaN(x)` / `Number.isNaN(x)` | NaN check (use the `Number.` one: no coercion) |
| `isFinite(x)` / `Number.isFinite(x)` | not NaN or ±Infinity |
| `encodeURIComponent` / `decodeURIComponent` | make text safe for URLs |
| `structuredClone(obj)` | deep copy |
| `setTimeout`, `setInterval`, `queueMicrotask` | scheduling (from the host, not the language) |
| `console.*`, `fetch`, `alert` | also provided by the host (browser or Node) |

```js
isNaN('hello');          // true  (coerces 'hello' → NaN first)
Number.isNaN('hello');   // false (it's a string, not NaN)
```

> [!warning] Common mistakes
> - Using `typeof x === 'object'` to detect objects: `null` passes too.
> - Mixing BigInt and Number in arithmetic.
> - Expecting `toFixed` to return a number.

> [!question] Recall
> 1. List the 7 primitive types. Why does `typeof null` return `'object'`?
> 2. When do you need BigInt? What happens with `1n + 1`?
> 3. Why are symbol keys useful? Do they show up in `Object.keys`?
> 4. Walk through the prototype chain of an object made with `Object.create(animal)`.

Prev: [[03 JS Variables and Data Types|3. Variables and Data Types]] · Next: [[05 JS Strings and Numbers|5. Strings and Numbers]]
