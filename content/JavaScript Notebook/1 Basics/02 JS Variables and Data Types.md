---
title: 2. Variables and Data Types
tags:
  - JavaScript
---

> [!summary] In one line
> A variable is a **labelled box** that holds a value. Use `const` by default, `let` when the value must change, and never `var`.

## `let`, `const`, `var`

```js
const name = 'Asha';  // can't be reassigned
let age = 21;         // can be reassigned
age = 22;             // ✅
// name = 'Ravi';     // ❌ TypeError

var old = 'avoid';    // function-scoped, hoisted, leaks out of blocks
```

| | `var` | `let` | `const` |
| --- | --- | --- | --- |
| Scope | function | block `{}` | block `{}` |
| Re-assign | ✅ | ✅ | ❌ |
| Re-declare | ✅ | ❌ | ❌ |
| Hoisted | yes, as `undefined` | yes, but in the **TDZ** | yes, but in the **TDZ** |

> [!tip] 🧠 Remember it
> **"Const by default, let if it changes, var never."**
> `const` stops *re-assignment*, not *mutation*: `const arr = []; arr.push(1)` is fine.

**TDZ (Temporal Dead Zone):** the time between entering a block and the `let`/`const` line. Using the variable there throws `ReferenceError`.

## Data types

**7 primitives** (stored by value, immutable) + **objects** (stored by reference).

🧠 **"2 S, 2 B, 1 N + 2 nothings"**: **S**tring, **S**ymbol · **B**oolean, **B**igInt · **N**umber · `null`, `undefined`.

```js
'hello'            // string
42, 3.14, NaN      // number (one type for ints and floats)
10n                // bigint (huge integers)
true / false       // boolean
undefined          // declared but no value yet
null               // "intentionally empty"
Symbol('id')       // unique identifier
{ a: 1 }, [1, 2], function () {}   // objects (arrays & functions are objects too)
```

## `typeof`

```js
typeof 'hi'        // 'string'
typeof 42          // 'number'
typeof undefined   // 'undefined'
typeof null        // 'object'   ← famous bug from 1995, never fixed
typeof []          // 'object'   → use Array.isArray([])
typeof function(){}// 'function'
```

## `null` vs `undefined`

- `undefined` = **JavaScript** says "nothing assigned yet".
- `null` = **you** say "empty on purpose".

🧠 *undefined is an empty box nobody touched; null is a box you emptied yourself.*

## Value vs reference

```js
let a = 5; let b = a; b = 10;     // a is still 5 (copied value)

const o1 = { n: 1 };
const o2 = o1;                     // copies the *reference* (same object)
o2.n = 99;
console.log(o1.n);                 // 99 😮
```

> [!warning] Common mistakes
> - Thinking `const` objects can't change: they can, you just can't point the name at a new object.
> - Checking for arrays with `typeof`: use `Array.isArray()`.

> [!question] Recall
> 1. Name the 7 primitive types.
> 2. Why does `typeof null` return `'object'`?
> 3. What's the TDZ?
