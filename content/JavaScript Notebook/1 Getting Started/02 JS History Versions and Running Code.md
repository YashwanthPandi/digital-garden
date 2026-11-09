---
title: 2. History, Versions and Running Code
tags:
  - JavaScript
---

> [!summary] In one line
> JavaScript was built in 10 days in 1995, is standardised as **ECMAScript** by a committee called **TC39**, gets a new version every June, and runs anywhere there's an engine: browsers, Node, Deno, Bun.

## What JavaScript is

- A **high-level, dynamically typed, single-threaded** language with first-class functions.
- **Multi-paradigm**: you can write procedural, object-oriented (prototypes and classes) or functional code.
- **JIT-compiled** by an engine: V8 (Chrome, Edge, Node, Deno), SpiderMonkey (Firefox), JavaScriptCore (Safari, Bun).
- Not related to Java. The name was a 1995 marketing decision.

## A short history

| Year | What happened |
| --- | --- |
| 1995 | Brendan Eich writes it at Netscape in ~10 days. Named Mocha → LiveScript → **JavaScript**. |
| 1996 | Microsoft ships its own copy, JScript, in Internet Explorer. |
| 1997 | Standardised by Ecma International as **ECMAScript** (spec ECMA-262). |
| 1999 | **ES3**: regular expressions, `try`/`catch`. The baseline for a decade. |
| 2008 | ES4 is abandoned (too big). Chrome and the V8 engine arrive. |
| 2009 | **ES5**: strict mode, `JSON`, `Array.prototype.forEach/map/filter`. Node.js is released. |
| 2015 | **ES2015 (ES6)**: the largest update so far. `let`/`const`, arrows, classes, modules, promises. |
| 2016 → | One release **every year**, named by year (ES2016, ES2017, …). |

> [!tip] Remember it
> **JavaScript is the brand, ECMAScript is the rulebook.** Browsers implement the rulebook.

## Versions: what came when

| Version | Headline features |
| --- | --- |
| ES5 (2009) | `"use strict"`, `JSON`, array methods, `Object.keys`, getters/setters |
| ES2015 / ES6 | `let`/`const`, arrows, classes, template literals, destructuring, spread/rest, default params, `Promise`, `Map`/`Set`, `Symbol`, modules, iterators, generators |
| ES2016 | `**`, `Array.prototype.includes` |
| ES2017 | `async`/`await`, `Object.entries`/`values`, string padding |
| ES2018 | object rest/spread, `Promise.prototype.finally`, async iteration |
| ES2019 | `flat`/`flatMap`, `Object.fromEntries`, optional `catch` binding |
| ES2020 | `BigInt`, `??`, `?.`, `Promise.allSettled`, `globalThis`, dynamic `import()` |
| ES2021 | `??=` `\|\|=` `&&=`, `replaceAll`, `Promise.any`, numeric separators `1_000` |
| ES2022 | class fields and `#private`, top-level `await`, `.at()`, `Object.hasOwn`, error `cause` |
| ES2023 | `toSorted`/`toReversed`/`toSpliced`/`with`, `findLast` |
| ES2024 | `Object.groupBy`, `Promise.withResolvers` |
| ES2025 | iterator helpers, new `Set` methods (`union`, `intersection`, …), `Promise.try`, JSON modules |

**How a feature gets in:** anyone can propose it to **TC39**. It moves through **stages 0 → 4**. Stage 4 means it ships in the next yearly edition. Check [caniuse.com](https://caniuse.com) before relying on something new in browsers.

## How to run JavaScript

```html
<!-- 1. In a web page: inline or (better) an external file -->
<script src="app.js" defer></script>
<script type="module" src="main.js"></script>   <!-- ES modules, deferred automatically -->
```

```bash
# 2. On your machine with Node.js
node app.js
node            # opens a REPL: type JS line by line
```

3. **Browser console**: `F12` (or `Cmd+Opt+J` on macOS) → Console tab. Fastest way to test a snippet.
4. **Online playgrounds**: CodePen, JSFiddle, StackBlitz. Good for sharing.

> [!warning] `defer` vs `async`
> `defer` downloads in parallel and runs **in order after the HTML is parsed**. Use it by default.
> `async` runs **as soon as it downloads**, in any order. Use it only for independent scripts like analytics.

## Variable naming rules

```js
let userName, _private, $el, café, item2;   //  valid
let 2item, user-name, let, class;           //  SyntaxError
```

- Must start with a **letter, `_` or `$`**. Later characters can also be digits.
- **Case-sensitive**: `age` and `Age` are different variables.
- Can't be a **reserved word** (`let`, `class`, `return`, `if`, `function`, `new`, …).
- Conventions: `camelCase` for variables and functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for fixed constants, `isX`/`hasX` for booleans.

## Strict mode

Turns silent mistakes into errors and removes some bad old features.

```js
'use strict';             // first line of a file or a function
undeclared = 5;           //  ReferenceError (sloppy mode would create a global!)
```

| Sloppy mode | Strict mode |
| --- | --- |
| Assigning an undeclared variable creates a global | `ReferenceError` |
| `this` in a plain function call is `window` | `this` is `undefined` |
| Writing to a read-only property fails silently | `TypeError` |
| Duplicate parameter names allowed | `SyntaxError` |
| `with`, octal literals like `010` allowed | `SyntaxError` |

**ES modules and `class` bodies are always strict.** You don't need the directive there.

> [!tip] Remember it
> **Strict mode is a strict teacher:** it stops letting small mistakes slide and makes you fix them.

> [!question] Recall
> 1. What's the difference between JavaScript and ECMAScript? What is TC39?
> 2. Name three features from ES2015 and two from ES2020.
> 3. Why does `undeclared = 5` behave differently in strict mode?
> 4. When would you use `async` instead of `defer` on a script tag?

Prev: [[01 JS Introduction and Setup|1. Introduction and Setup]] · Next: [[03 JS Variables and Data Types|3. Variables and Data Types]]
