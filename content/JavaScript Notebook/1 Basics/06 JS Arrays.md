---
title: 6. Arrays
tags:
  - JavaScript
---

> [!summary] In one line
> An array is an **ordered list** (index starts at `0`). Master `map`, `filter`, `reduce` and you'll rarely need a loop.

```js
const nums = [10, 20, 30];
nums[0];          // 10
nums.length;      // 3
nums.at(-1);      // 30 (last item)
```

## Add / remove

| Method | Does | 🧠 |
| --- | --- | --- |
| `push(x)` / `pop()` | add/remove at **end** | push & pop = the top of a stack |
| `unshift(x)` / `shift()` | add/remove at **start** | *un*shift = put in front |
| `splice(i, n, ...items)` | remove/insert anywhere (**mutates**) | spl**ice** = surgery |
| `slice(a, b)` | copy part `a` to `b-1` (**no mutation**) | sl**ice** = a slice of cake, cake stays |

## The big three

```js
const prices = [100, 250, 40];

prices.map(p => p * 2);              // [200, 500, 80]   transform each
prices.filter(p => p > 50);          // [100, 250]       keep some
prices.reduce((sum, p) => sum + p, 0); // 390            boil down to one value
```

> [!tip] 🧠 Remember it
> **map = transform, filter = select, reduce = combine.**
> 🍎🍎🍎 → map(slice) → 🍰🍰🍰 → filter(no bruise) → 🍰🍰 → reduce(eat) → 😋

## Searching and checking

```js
[1, 2, 3].includes(2);          // true
[1, 2, 3].indexOf(3);           // 2  (-1 if missing)
users.find(u => u.id === 7);    // first match or undefined
users.findIndex(u => u.id === 7);
nums.some(n => n > 25);         // at least one?
nums.every(n => n > 5);         // all?
```

## Other everyday methods

```js
['b', 'a'].sort();                 // ['a','b'] (mutates! sorts as strings)
[10, 1, 5].sort((a, b) => a - b);  // numeric sort: [1, 5, 10]
[1, 2].concat([3]);                // [1,2,3]
['a', 'b'].join('-');              // 'a-b'
[[1, 2], [3]].flat();              // [1,2,3]
[3, 1, 2].toSorted();              // non-mutating sort (ES2023)
Array.from('hi');                  // ['h','i']
const copy = [...nums];            // shallow copy with spread
```

> [!warning] Common mistakes
> - `sort()` without a compare function sorts numbers as text: `[10, 9, 1] → [1, 10, 9]`.
> - Forgetting `return` inside `map(x => { x * 2 })` → array of `undefined`. Braces need `return`.
> - Using `forEach` when you want a new array → use `map`.

> [!question] Recall
> 1. `slice` vs `splice`?
> 2. What does `reduce`'s second argument do?
> 3. How do you sort numbers correctly?
