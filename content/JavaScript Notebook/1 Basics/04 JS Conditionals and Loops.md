---
title: 4. Conditionals and Loops
tags:
  - JavaScript
---

> [!summary] In one line
> **Conditionals** choose *which* code runs; **loops** choose *how many times* it runs.

## if / else if / else

```js
const marks = 72;
if (marks >= 90) console.log('A');
else if (marks >= 60) console.log('B');
else console.log('C');
```

Ternary for short choices: `const status = age >= 18 ? 'adult' : 'minor';`

## switch

```js
switch (day) {
  case 'sat':
  case 'sun':
    console.log('Weekend');
    break;              // forget break → falls through to the next case!
  default:
    console.log('Weekday');
}
```

`switch` compares with `===`.

## Loops

```js
for (let i = 0; i < 3; i++) { }      // classic counter
while (cond) { }                     // check first, may run 0 times
do { } while (cond);                 // runs at least once

for (const fruit of ['🍎', '🍌']) { }  // OF → values of an iterable (arrays, strings, Maps)
for (const key in { a: 1, b: 2 }) { } // IN → keys of an object
arr.forEach((item, i) => { });       // array method, can't break out
```

> [!tip] 🧠 Remember it
> **`for...of` → "of the values"; `for...in` → "in the keys"** (in = index/keys).
> Don't use `for...in` on arrays: it gives string indexes and can include inherited keys.

## break and continue

```js
for (const n of [1, 2, 3, 4]) {
  if (n === 2) continue;   // skip this one
  if (n === 4) break;      // stop the loop
  console.log(n);          // 1, 3
}
```

> [!warning] Common mistakes
> - Infinite `while` loops: make sure something changes the condition.
> - Using `var` in a loop with callbacks: every callback sees the final value. Use `let` (one binding per iteration).

> [!question] Recall
> 1. Difference between `for...of` and `for...in`?
> 2. What happens if you forget `break` in a `switch`?
> 3. Which loop always runs at least once?
