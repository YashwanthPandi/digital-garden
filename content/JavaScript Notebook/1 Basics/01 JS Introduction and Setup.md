---
title: 1. Introduction and Setup
tags:
  - JavaScript
---

> [!summary] In one line
> JavaScript is the programming language of the web: HTML is the **structure**, CSS is the **look**, JavaScript is the **behaviour**.

> [!tip] 🧠 Remember it
> Think of a house: **HTML = walls**, **CSS = paint**, **JS = electricity** (things that *do* something when you flip a switch).

## What JavaScript is

- A **high-level, interpreted (JIT-compiled), dynamically typed** language.
- **Single-threaded**: it does one thing at a time, but handles waiting (timers, network) without freezing, thanks to the event loop (see [[16 JS Asynchronous JavaScript|Asynchronous JavaScript]]).
- Runs in **browsers** (Chrome's V8, Firefox's SpiderMonkey) and on **servers** with **Node.js**.
- Standardised as **ECMAScript** (ES). "ES6" (2015) was the big modern update: `let`/`const`, arrows, classes, promises, modules.
- **JavaScript ≠ Java.** The name was marketing. 🧠 *"Java is to JavaScript what car is to carpet."*

## Where to write it

```html
<!-- 1. Inline in HTML (fine for tiny demos) -->
<script>
  console.log('Hello from the page');
</script>

<!-- 2. External file (the normal way) -->
<script src="app.js" defer></script>
```

`defer` = download in parallel, run **after** the HTML is parsed. Put scripts in `<head>` with `defer` and you never get "element is null" errors.

## Your first program

```js
console.log('Hello, world!');   // prints to the browser console (F12 → Console)
alert('Hi!');                   // popup (avoid in real apps)
```

Run it in Node: save as `hello.js`, then `node hello.js`.

## Setup checklist

- **VS Code** + **Live Server** extension (auto-refreshing page)
- **Node.js** (LTS) for running JS outside the browser
- Browser **DevTools** (F12): Console, Elements, Sources (debugger), Network

## Comments and statements

```js
// single-line comment
/* multi-line
   comment */
let x = 5;   // semicolons are optional (ASI) but recommended
```

> [!question] Recall
> 1. What are the three layers of a web page?
> 2. What does `defer` do on a `<script>` tag?
> 3. Is JavaScript the same as ECMAScript? (ECMAScript is the **spec**, JS is an **implementation**.)
