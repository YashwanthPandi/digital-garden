---
title: 9. Scope, Hoisting and Closures
tags:
  - JavaScript
---

> [!summary] In one line
> **Scope** = where a variable can be seen. **Hoisting** = declarations are set up before code runs. **Closure** = a function remembers the variables around where it was *created*.

## Scope

```js
const global = 'everywhere';          // global scope

function outer() {
  const fnScoped = 'inside outer';    // function scope
  if (true) {
    let blockScoped = 'inside if';    // block scope (let/const)
    var leaky = 'whole function';     // var ignores blocks!
  }
  // blockScoped ❌ not visible here; leaky ✅ visible
}
```

**Scope chain:** if JS can't find a variable in the current scope, it looks **outward**, one level at a time, up to global. Never inward.

> [!tip] 🧠 Remember it
> **Scope is a one-way mirror: inner functions can see out, outer code can't see in.**

**Lexical scope** = scope is decided by where code is **written**, not where it's called.

## Hoisting

Before running, JS scans the code and registers declarations.

```js
sayHi();                 // ✅ works: function declarations are fully hoisted
function sayHi() { console.log('hi'); }

console.log(a);          // undefined (var hoisted, value not)
var a = 1;

console.log(b);          // ❌ ReferenceError (TDZ)
let b = 2;
```

| Declaration | Hoisted as |
| --- | --- |
| `function f(){}` | the whole function ✅ |
| `var x` | `undefined` |
| `let` / `const` / `class` | uninitialised (TDZ) |
| `const f = () => {}` | follows `const` rules |

## Closures

```js
function makeCounter() {
  let count = 0;                 // private!
  return () => ++count;          // inner function "closes over" count
}
const counter = makeCounter();
counter(); // 1
counter(); // 2   ← count survived after makeCounter finished
```

> [!tip] 🧠 Remember it
> **A closure is a function with a backpack 🎒.** When it's created it packs up the variables around it and carries them wherever it goes.

**Uses:** private data, function factories, memoisation, event handlers, `debounce`/`throttle`.

### Classic interview question

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));  // 3 3 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i));  // 0 1 2
```

`var` → one shared `i`. `let` → a new `i` per iteration, each callback's backpack holds its own.

> [!question] Recall
> 1. What's the difference between function scope and block scope?
> 2. Why does `var` print `undefined` before its line but `let` throws?
> 3. Explain a closure in one sentence and give one real use.
