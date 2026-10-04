---
title: 3. Operators and Type Coercion
tags:
  - JavaScript
---

> [!summary] In one line
> Operators combine values. JavaScript will **silently convert types** (coercion) when you mix them, so prefer `===` and be explicit.

## Operator cheat sheet

| Kind | Operators |
| --- | --- |
| Arithmetic | `+ - * / % **` (`**` = power), `++ --` |
| Assignment | `= += -= *= /= ??= \|\|= &&=` |
| Comparison | `== != === !== > < >= <=` |
| Logical | `&&` (and), `\|\|` (or), `!` (not) |
| Nullish | `??` (default only for `null`/`undefined`) |
| Optional chaining | `?.` (stop if `null`/`undefined`) |
| Ternary | `cond ? a : b` |
| Spread / rest | `...` |

## `==` vs `===`

```js
5 == '5'     // true   (converts '5' to 5 first)
5 === '5'    // false  (different types, no conversion)
null == undefined   // true
null === undefined  // false
NaN === NaN  // false! use Number.isNaN(x)
```

> [!tip] 🧠 Remember it
> **Three equals = three checks: same type, same value, no tricks.** Always use `===`.

## Truthy and falsy

Only **8 falsy** values. Everything else (including `'0'`, `[]`, `{}`, `'false'`) is truthy.

🧠 **"0, -0, 0n, '', null, undefined, NaN, false"** → *"zeroes, empty string, the two nothings, NaN, and false."*

```js
if ([]) console.log('runs!');   // empty array is truthy
```

## Coercion gotchas

```js
'5' + 2    // '52'  (+ with a string → string concatenation)
'5' - 2    // 3     (- only works on numbers → converts)
'5' * '2'  // 10
true + 1   // 2
[] + []    // ''
```

🧠 **"Plus loves strings; every other maths operator loves numbers."**

## `||` vs `??`

```js
const count = 0;
count || 10   // 10  (0 is falsy, so it's replaced 😬)
count ?? 10   // 0   (only replaces null/undefined ✅)
```

## Short-circuiting and optional chaining

```js
isLoggedIn && showDashboard();     // run only if true
const city = user?.address?.city;  // undefined instead of crashing
```

> [!question] Recall
> 1. List all falsy values.
> 2. What is `'3' + 4`? And `'3' - 4`?
> 3. When would `??` give a different result from `||`?
