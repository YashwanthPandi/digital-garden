---
title: 31. Interview Cheat Sheet
tags:
  - JavaScript
  - Interview
---

The questions that come up again and again, with answers short enough to say out loud. Each links to the full note.

## Fundamentals

| Question | Short answer |
| --- | --- |
| `var` vs `let` vs `const`? | `var` function-scoped and hoisted as `undefined`; `let`/`const` block-scoped with TDZ; `const` can't be reassigned. → [[03 JS Variables and Data Types\|Variables]] |
| Primitive types? | string, number, bigint, boolean, undefined, null, symbol |
| `==` vs `===`? | `==` converts types first; `===` checks type and value. Use `===`. → [[07 JS Operators and Type Coercion\|Operators]] |
| Falsy values? | `false, 0, -0, 0n, '', null, undefined, NaN` |
| `null` vs `undefined`? | `undefined` = not assigned; `null` = intentionally empty |
| `typeof null`? | `'object'` (historic bug) |
| Hoisting? | Declarations are registered before code runs; functions fully, `var` as `undefined`, `let`/`const` in TDZ. → [[14 JS Scope Hoisting and Closures\|Scope]] |
| Closure? | A function that remembers variables from where it was created, even after that scope finished. |
| `this`? | Set by how the function is called (left of the dot); arrows inherit it. → [[15 JS this call apply bind\|this]] |
| call / apply / bind? | call: args with commas; apply: args as array; bind: returns new function. |

## Functions and objects

| Question | Short answer |
| --- | --- |
| Arrow vs regular function? | Arrow: no own `this`/`arguments`, can't be `new`ed, shorter. → [[12 JS Functions\|Functions]] |
| Higher-order function? | Takes or returns a function (`map`, `filter`, `setTimeout`). |
| Pure function? | Same input → same output, no side effects. |
| Shallow vs deep copy? | Shallow (`{...o}`) shares nested objects; deep (`structuredClone`) copies everything. → [[17 JS Objects\|Objects]] |
| Prototype chain? | Lookup path from object → its prototype → … → `null`. → [[19 JS Prototypes and Classes\|Prototypes]] |
| What does `new` do? | Create object, link prototype, run constructor, return it. |
| `map` vs `forEach`? | `map` returns a new array; `forEach` returns `undefined`. → [[16 JS Arrays\|Arrays]] |
| Spread vs rest? | Spread expands, rest collects. → [[21 JS ES6 Plus Features\|ES6+]] |

## Async and browser

| Question | Short answer |
| --- | --- |
| Event loop? | Run sync code, then all microtasks (promises), then one macrotask (timers), repeat. → [[26 JS Asynchronous JavaScript\|Async]] |
| Promise states? | pending, fulfilled, rejected |
| `Promise.all` vs `allSettled`? | `all` fails fast on first rejection; `allSettled` waits for all and reports each. |
| async/await? | Syntax over promises; `await` pauses the function until the promise settles. |
| Does fetch reject on 404? | No; check `res.ok`. → [[28 JS Fetch and JSON\|Fetch]] |
| Event bubbling? | Event goes from target up through ancestors. → [[24 JS Events\|Events]] |
| Event delegation? | One listener on a parent handles events from its children via `e.target`. |
| Debounce vs throttle? | Debounce waits for a pause; throttle limits to once per interval. |
| localStorage vs sessionStorage vs cookies? | Forever / per tab / sent to server, 4 KB. → [[25 JS Browser Storage\|Storage]] |
| `defer` vs `async` scripts? | `defer` runs after parsing, in order; `async` runs as soon as downloaded, any order. |

## Predict the output

```js
console.log([] == false);        // true  ([] → '' → 0, false → 0)
console.log(0.1 + 0.2 === 0.3);  // false
console.log('5' + 3, '5' - 3);   // '53' 2
console.log(typeof NaN);         // 'number'
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3 3 3
console.log(1); setTimeout(() => console.log(2)); Promise.resolve().then(() => console.log(3)); console.log(4); // 1 4 3 2
```

## Code it yourself

Common "write a function" tasks: reverse a string, check palindrome, remove duplicates (`[...new Set(arr)]`), flatten an array, count characters, `debounce`, deep clone, FizzBuzz, find the max/second max, `Promise.all` polyfill.

Prev: [[30 JS Memory Management|30. Memory Management]]
