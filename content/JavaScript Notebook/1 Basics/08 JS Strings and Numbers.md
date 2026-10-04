---
title: 8. Strings and Numbers
tags:
  - JavaScript
---

> [!summary] In one line
> Strings are **immutable** text (methods return new strings). Numbers are all 64-bit floats, which is why `0.1 + 0.2 !== 0.3`.

## Strings

```js
const s = 'JavaScript';
s.length;               // 10
s[0];                   // 'J'
s.toUpperCase();        // 'JAVASCRIPT'
s.includes('Script');   // true
s.startsWith('Java');   // true
s.indexOf('a');         // 1
s.slice(0, 4);          // 'Java'
'  hi  '.trim();        // 'hi'
'a,b,c'.split(',');     // ['a','b','c']
'ha'.repeat(3);         // 'hahaha'
'cat'.replace('c', 'b');// 'bat' (first match; replaceAll for all)
'5'.padStart(3, '0');   // '005'
```

### Template literals (backticks)

```js
const name = 'Asha';
`Hello ${name}, 2 + 2 = ${2 + 2}`;   // expressions inside ${}
`multi
line`;                               // newlines kept
```

> [!tip] 🧠 Remember it
> **Strings never change; methods give you a new string.** `s.toUpperCase()` alone does nothing; you need `s = s.toUpperCase()`.

## Numbers

```js
Number('42');        // 42
Number('42px');      // NaN
parseInt('42px');    // 42   (reads until it hits a non-digit)
parseFloat('3.5kg'); // 3.5
(3.14159).toFixed(2);// '3.14' (a string!)
Math.round(4.5);     // 5
Math.floor(4.9);     // 4   (down)
Math.ceil(4.1);      // 5   (up)
Math.max(1, 9, 3);   // 9
Math.random();       // 0 ≤ x < 1
Math.floor(Math.random() * 6) + 1;  // dice roll 1–6
```

🧠 **floor = floor is down 👇, ceil = ceiling is up 👆.**

### NaN and Infinity

```js
0 / 0              // NaN ("Not a Number", but typeof NaN === 'number' 🙃)
1 / 0              // Infinity
Number.isNaN(x)    // the reliable NaN check
Number.isInteger(5)// true
```

### Floating point

```js
0.1 + 0.2                    // 0.30000000000000004
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON  // true: compare with tolerance
```

For money, store **paise/cents as integers**.

> [!question] Recall
> 1. Why does `s.toUpperCase()` on its own not change `s`?
> 2. `Number('12px')` vs `parseInt('12px')`?
> 3. Why is `0.1 + 0.2` not exactly `0.3`?
