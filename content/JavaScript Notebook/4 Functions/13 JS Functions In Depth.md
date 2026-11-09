---
title: 13. Functions In Depth
tags:
  - JavaScript
---

> [!summary] In one line
> Every function call gets its own **frame on the call stack** with its own parameters and variables. Where the function was **written** decides which variables it can see (lexical scope). How it was **called** decides its `this`.

Builds on [[12 JS Functions|Functions]], [[14 JS Scope Hoisting and Closures|Scope, Hoisting and Closures]] and [[15 JS this call apply bind|this, call, apply, bind]].

## Function parameters

### Default parameters

```js
function greet(name = 'friend', greeting = `Hi ${name}`) {  // can use earlier params
  return greeting;
}
greet();             // 'Hi friend'
greet(undefined);    // 'Hi friend'  ← only undefined triggers the default
greet(null);         // 'Hi null'    ← null does not

function addItem(item, list = []) { list.push(item); return list; }
addItem(1);  // [1]
addItem(2);  // [2]  ← a fresh [] every call (unlike Python)
```

### Rest parameters

```js
function log(level, ...messages) {   // gathers the remaining args into a real array
  messages.forEach(m => console[level](m));
}
log('warn', 'a', 'b');
```

Only one rest parameter, and it must be last. `fn.length` counts the parameters before the first default or rest one.

### The `arguments` object

Every regular (non-arrow) function gets an array-**like** object holding all the arguments passed.

```js
function sum() {
  arguments.length;                      //  has length and indexes
  arguments.map;                         //  undefined: not a real array
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}
sum(1, 2, 3);  // 6

const arrow = () => arguments;   //  arrows don't have their own `arguments`
```

> [!tip] Remember it
> **`arguments` is the old way, rest `...args` is the new way.** Rest gives you a real array and works in arrows.

## Scope and the function stack

### Scopes recap

| Scope | Created by | Holds |
| --- | --- | --- |
| Global | the script | top-level `var`/`let`/`const`/functions |
| Module | each ES module file | its top-level variables (private to the file) |
| Function | every function call | parameters and everything declared inside |
| Block | `{ }` in `if`/`for`/… | `let`, `const`, `class` |

**Lexical scoping:** a function sees the variables of the place where it was **written**, not where it's called from.

```js
const name = 'global';
function show() { console.log(name); }
function run() { const name = 'run'; show(); }
run();   // 'global': show was written at the top level
```

The **global object** is `globalThis` (`window` in browsers, `global` in Node). A top-level `var` in a classic script becomes a property of `window`. `let` and `const` don't.

### The call stack

JS keeps a **stack** of the functions currently running. Calling a function **pushes** a frame (its local variables and where to return to). Returning **pops** it. Last in, first out.

```js
function a() { b(); }
function b() { c(); }
function c() { console.trace(); }   // prints: c ← b ← a ← (global)
a();
```

```
│ c() │  ← running now
│ b() │
│ a() │
│ global │
└────────┘
```

An error's stack trace is a snapshot of this stack. If it grows forever, you get **`RangeError: Maximum call stack size exceeded`** (a stack overflow).

## Recursion

A function that **calls itself**. It needs a **base case** that stops, and a **recursive case** that moves toward it.

```js
function factorial(n) {
  if (n <= 1) return 1;            // base case
  return n * factorial(n - 1);     // recursive case
}
factorial(5);  // 120

// Nested data
function sumAll(item) {
  return Array.isArray(item) ? item.reduce((t, x) => t + sumAll(x), 0) : item;
}
sumAll([1, [2, [3, [4]]]]);  // 10

// Memoise to avoid repeating work
const memo = new Map();
function fib(n) {
  if (n < 2) return n;
  if (!memo.has(n)) memo.set(n, fib(n - 1) + fib(n - 2));
  return memo.get(n);
}
```

Use recursion for **trees and nested structures** (folders, the DOM, JSON, menus). Use a loop for simple counting: very deep recursion (around 10,000 levels) can overflow the stack.

> [!tip] Remember it
> **Recursion is Russian dolls:** open a doll, find a smaller doll, repeat until the smallest one (the base case), then close them all back up.

## `this` in every context

| Where | `this` is |
| --- | --- |
| **Alone** (top level of a classic script) | `window` / `globalThis` |
| Alone in an **ES module** | `undefined` |
| Alone in a **Node CommonJS** file | `module.exports` (`{}`) |
| **In a function**, plain call, sloppy mode | `globalThis` |
| **In a function**, plain call, strict mode | `undefined` |
| **In a method** `obj.fn()` | `obj` |
| **In an arrow function** | `this` of the surrounding code |
| **In an event handler** (regular function) | the element the listener is on (`e.currentTarget`) |
| In an event handler (arrow function) | `this` of the surrounding code |
| With `new` | the new object |

```js
button.addEventListener('click', function () {
  this.classList.toggle('on');          // this === button
});
button.addEventListener('click', () => {
  this;                                 //  not the button: use e.currentTarget
});

class Counter {
  count = 0;
  increment() { this.count++; }
}
const c = new Counter();
button.addEventListener('click', c.increment);           //  this is the button
button.addEventListener('click', () => c.increment());   // OK
```

## Explicit binding

`call`, `apply` and `bind` set `this` yourself, overriding the "left of the dot" rule.

```js
function hello() { return `Hi, ${this.name}`; }
const asha = { name: 'Asha' };

hello.call(asha);            // 'Hi, Asha'
hello.apply(asha, []);       // same, args as an array
const bound = hello.bind(asha);
bound.call({ name: 'Ravi' }); // 'Hi, Asha' ← a bound function can't be re-bound
```

Arrow functions ignore all three: their `this` is fixed when they're written. `new` is the only thing that beats `bind`.

## Function borrowing

Using a method from one object on another, with `call`/`apply`/`bind`.

```js
const asha = { name: 'Asha', intro() { return `I'm ${this.name}`; } };
const ravi = { name: 'Ravi' };
asha.intro.call(ravi);                          // "I'm Ravi": borrowed

Array.prototype.map.call('abc', c => c.toUpperCase());   // ['A', 'B', 'C']
Array.prototype.slice.call(arguments);          // old way to turn arguments into an array
Math.max.apply(null, [3, 9, 2]);                // 9 (today: Math.max(...arr))
```

> [!tip] Remember it
> **Borrowing is like borrowing a friend's drill:** the tool is theirs, but you point it at your wall (`this`).

> [!question] Recall
> 1. When does a default parameter kick in: `undefined`, `null`, or both?
> 2. Name two differences between `arguments` and rest parameters.
> 3. What does the call stack hold, and what causes "Maximum call stack size exceeded"?
> 4. Write a recursive function that counts all files in a nested folder object.
> 5. What is `this` inside a regular-function event listener? Inside an arrow one?
> 6. Can you re-bind a function returned by `bind`?

Prev: [[12 JS Functions|12. Functions]] · Next: [[14 JS Scope Hoisting and Closures|14. Scope, Hoisting and Closures]]
