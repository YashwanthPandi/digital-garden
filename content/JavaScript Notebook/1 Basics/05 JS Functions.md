---
title: 5. Functions
tags:
  - JavaScript
---

> [!summary] In one line
> A function is a **reusable recipe**: give it ingredients (parameters), it does the steps and can hand back a result (`return`).

## Three ways to write one

```js
// 1. Declaration: hoisted (callable before this line)
function add(a, b) { return a + b; }

// 2. Expression: not hoisted
const sub = function (a, b) { return a - b; };

// 3. Arrow: short, no own `this`
const mul = (a, b) => a * b;          // implicit return
const square = n => n * n;            // one param → no brackets needed
const makeUser = () => ({ name: 'A' }); // returning an object → wrap in ()
```

> [!tip] 🧠 Remember it
> **Arrow functions are "borrowers":** they borrow `this` and `arguments` from where they were *written*. Great for callbacks, bad for object methods.

## Parameters

```js
function greet(name = 'friend') { return `Hi ${name}`; }  // default
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); } // rest
sum(1, 2, 3); // 6
```

**Parameter** = name in the definition. **Argument** = actual value passed in. 🧠 *Parameter = Placeholder, Argument = Actual.*

## Functions are values ("first-class")

You can store them in variables, pass them in, and return them.

```js
const shout = s => s.toUpperCase();
function apply(fn, value) { return fn(value); }   // higher-order function
apply(shout, 'hey');  // 'HEY'
```

- **Callback**: a function passed to another function to be called later.
- **Higher-order function**: takes or returns a function (`map`, `filter`, `setTimeout`).

## IIFE (Immediately Invoked Function Expression)

```js
(function () { console.log('runs once, right now'); })();
```

Used (pre-modules) to create a private scope.

## Pure functions

Same input → same output, no side effects. Easy to test and reason about.

```js
const pureAdd = (a, b) => a + b;     // ✅ pure
let total = 0;
const impureAdd = n => (total += n); // ❌ changes outside state
```

> [!question] Recall
> 1. Which function style is hoisted?
> 2. Why shouldn't you use an arrow function as an object method?
> 3. What's a higher-order function? Give two built-in examples.
