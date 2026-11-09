---
title: 9. Equality Comparisons
tags:
  - JavaScript
---

> [!summary] In one line
> JavaScript has **four** ways to decide whether two values are equal. They differ only in **type conversion**, **`NaN`** and **`+0` vs `-0`**.

| Algorithm (spec name) | Used by | Converts types? | `NaN` equals `NaN`? | `+0` equals `-0`? |
| --- | --- | --- | --- | --- |
| **IsLooselyEqual** | `==` |  yes | No | Yes |
| **IsStrictlyEqual** | `===`, `indexOf`, `switch` | No | No | Yes |
| **SameValueZero** | `includes`, `Map` keys, `Set` values | No | Yes | Yes |
| **SameValue** | `Object.is` | No | Yes | No |

> [!tip] Remember it
> Each step down the table fixes one more surprise:
> `==` (converts) → `===` (no converting) → **SameValueZero** (`NaN` finally equals itself) → `Object.is` (even `+0` and `-0` are told apart).

## `==` (IsLooselyEqual)

If the types are the same, it behaves like `===`. Otherwise it converts, roughly in this order:

1. `null == undefined` → **true**. Either of them against anything else → **false**.
2. Number vs string → the string becomes a number.
3. BigInt vs string → the string becomes a BigInt.
4. Boolean vs anything → the boolean becomes a number (`true` → 1, `false` → 0) first.
5. Object vs primitive → the object becomes a primitive (`valueOf`/`toString`), then try again.
6. BigInt vs number → compared by mathematical value.

```js
'' == 0            // true   ('' → 0)
'0' == false       // true   (false → 0, '0' → 0)
'' == '0'          // false  (both strings: compared as text)
[] == false        // true   ([] → '' → 0)
[] == ![]          // true   (![] is false, then as above)
null == 0          // false  (rule 1)
null == undefined  // true
NaN == NaN         // false
1n == 1            // true
```

> [!warning] `==` isn't transitive
> `'' == 0` and `0 == '0'`, but `'' == '0'` is `false`. That's why most style guides ban `==`.
> The one accepted use: `x == null` is a short way to check `x === null || x === undefined`.

## `===` (IsStrictlyEqual)

Different types → `false`. Same type → compare the values. Objects are equal only if they're the **same reference**.

```js
1 === 1            // true
1 === '1'          // false
NaN === NaN        // false
+0 === -0          // true
{} === {}          // false (two different objects)
const a = {}; a === a;   // true (same reference)
```

## SameValueZero

Like `===`, but `NaN` equals `NaN`. You can't call it directly. It's what these use:

```js
[NaN].includes(NaN);   // true   ← SameValueZero
[NaN].indexOf(NaN);    // -1     ← === can't find NaN!

new Set([NaN, NaN]).size;      // 1
new Map([[NaN, 'x']]).get(NaN); // 'x'
```

## `Object.is` (SameValue)

The most "exact" comparison. Like `===`, but `NaN` equals `NaN` **and** `+0` doesn't equal `-0`.

```js
Object.is(NaN, NaN);   // true
Object.is(+0, -0);     // false
Object.is('a', 'a');   // true
Object.is({}, {});     // false (still reference comparison)
```

Used when the difference matters: React compares state with `Object.is` to decide whether to re-render.

## Comparing objects by content

None of the four look inside objects. For a shallow check, compare keys yourself. For data-only objects, a quick (order-sensitive) trick is `JSON.stringify(a) === JSON.stringify(b)`. For real deep equality, use a utility like `node:util`'s `isDeepStrictEqual` or a library.

> [!question] Recall
> 1. Name the four equality algorithms and one thing that uses each.
> 2. Why is `[NaN].includes(NaN)` true but `[NaN].indexOf(NaN)` is `-1`?
> 3. What's the only common, accepted use of `==`?
> 4. When does `Object.is` give a different answer from `===`?

Prev: [[08 JS Operators In Depth|8. Operators In Depth]] · Next: [[10 JS Conditionals and Loops|10. Conditionals and Loops]]
