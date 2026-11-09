---
title: 29. Debugging with DevTools
tags:
  - JavaScript
---

> [!summary] In one line
> Browser **DevTools** let you pause code and inspect it line by line (**Sources**), watch requests (**Network**), find slow code (**Performance**) and find leaks (**Memory**). Use them instead of guessing with `console.log`.

Quick intro first: [[11 JS Error Handling|Error Handling]] (debugging toolbox).

## Opening DevTools

`F12`, or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Opt+I` (macOS). You can also right-click an element → **Inspect**. These notes follow Chrome. Firefox and Safari have the same panels under slightly different names.

| Panel | Use it to |
| --- | --- |
| **Elements** | inspect and edit HTML/CSS live, see event listeners on an element |
| **Console** | run JS, read logs and errors |
| **Sources** | read code, set breakpoints, step through it |
| **Network** | see every request, its status, headers, payload and timing |
| **Performance** | record and analyse what the page spends time on |
| **Memory** | take heap snapshots and track down leaks |
| **Application** | inspect localStorage, sessionStorage, cookies, IndexedDB, service workers |
| **Lighthouse** | automated audits: performance, accessibility, SEO |

## Debugging issues

### Console, beyond `console.log`

```js
console.table(users);                 // arrays of objects as a table
console.dir(element);                 // an element as a JS object, not HTML
console.group('Checkout'); console.log('step 1'); console.groupEnd();
console.time('load'); await load(); console.timeEnd('load');   // load: 231ms
console.count('render');              // render: 1, render: 2, …
console.assert(total > 0, 'total should be positive');   // logs only if false
console.trace();                      // print the call stack right here
console.warn('…'); console.error('…');   // filterable by level
```

Console-only helpers: `$0` (the element selected in Elements), `$('css')` and `$$('css')` (`querySelector` / `querySelectorAll`), `copy(obj)` (copy to the clipboard).

### Breakpoints: pause and look around

```js
function applyDiscount(cart) {
  debugger;                // pauses here whenever DevTools is open
  return cart.total * 0.9;
}
```

| Breakpoint type | How | When |
| --- | --- | --- |
| Line | click a line number in Sources | most bugs |
| Conditional | right-click line → *Add conditional breakpoint* (`i === 99`) | the bug only happens sometimes |
| Logpoint | right-click line → *Add logpoint* | log without editing code |
| DOM | Elements → right-click → *Break on* → subtree/attribute change, node removal | "who changed this element?" |
| XHR/fetch | Sources → *XHR/fetch Breakpoints* (URL contains …) | "who sent this request?" |
| Event listener | Sources → *Event Listener Breakpoints* → e.g. `click` | "what runs when I click?" |
| Exceptions | Sources → *Pause on exceptions* (include caught exceptions) | errors that get swallowed |

**When paused:**
- **Step over** (`F10`): run this line. **Step into** (`F11`): go inside the function. **Step out** (`Shift+F11`): finish this function. **Resume** (`F8`).
- **Scope** pane: every variable's current value (local, closure, global).
- **Watch** pane: expressions to re-evaluate at every step.
- **Call Stack** pane: how you got here. Click a frame to jump to it.
- Hover over any variable to see its value, or type in the Console: it runs in the paused scope.

**Tips:** pretty-print minified files with `{}`. Turn on source maps so you debug your original TypeScript/Angular code. Use **Ignore list** to skip framework code while stepping.

> [!tip] Remember it
> **`console.log` is asking someone what happened. A breakpoint is freezing time and walking around the scene.**

**Debugging Node:** `node --inspect app.js` (or `--inspect-brk` to pause on the first line), then open `chrome://inspect`. VS Code's debugger does the same with breakpoints in the editor.

## Debugging memory leaks

**Signs:** the page gets slower the longer it's open, and **JS heap size** keeps climbing even after you leave a view.

1. Open the **Performance monitor** (`Cmd/Ctrl+Shift+P` → "Show Performance monitor") and watch *JS heap size* while you use the page.
2. **Memory** panel → **Heap snapshot** → take a baseline.
3. Do the suspect action several times (open and close a modal 10×), then click the **Collect garbage** icon.
4. Take a second snapshot. Switch the view to **Comparison** against the first and sort by *# Delta*: anything that grew by about 10 (once per repeat) is suspicious.
5. Type **`Detached`** in the class filter to find DOM nodes removed from the page but still held in memory.
6. Select an object and read its **Retainers** pane: the chain of references keeping it alive. That chain leads you to the bug.

**Allocation instrumentation on timeline** (also in Memory) records allocations over time. Blue bars that never turn grey are objects that were never freed.

Causes and fixes: [[30 JS Memory Management|Memory Management]].

## Debugging performance

**Measure first:**

```js
const t0 = performance.now();
heavyWork();
console.log(`took ${performance.now() - t0}ms`);

performance.mark('start'); render(); performance.mark('end');
performance.measure('render', 'start', 'end');   // shows up in the Performance panel
```

**Performance panel:**
1. Click **Record**, do the slow action, stop. Throttle the CPU (4× slowdown) to see what slower phones experience.
2. Look for **long tasks** in the *Main* track (red corner, longer than **50ms**). They block clicks and typing.
3. Zoom into the **flame chart**: wide bars are the functions that take the most time. *Bottom-Up* sorts functions by their own time.
4. Purple = layout/style recalculation, green = painting, yellow = scripting.

**Common culprits and fixes:**

| Problem | Fix |
| --- | --- |
| Layout thrashing (reading `offsetHeight` after every style change in a loop) | batch all reads first, then all writes |
| Heavy work on every `scroll`/`input` event | [[24 JS Events\|debounce or throttle]] |
| One huge synchronous task | split it up (`await` between chunks, `scheduler.yield()` where supported) or move it to a **Web Worker** |
| Rendering thousands of rows | pagination or virtual scrolling |
| Large JS bundles | code-split with dynamic `import()`, lazy load |
| Slow requests | Network panel: check the waterfall, sizes and caching |

**Lighthouse** and the **Core Web Vitals** give you a score to track: **LCP** (loading, aim for under 2.5s), **INP** (responsiveness, under 200ms) and **CLS** (visual stability, under 0.1).

> [!question] Recall
> 1. Which DevTools panel would you use to find out who sent a request? Who changed an element?
> 2. What's the difference between step over, step into and step out?
> 3. Describe the heap-snapshot comparison process for finding a memory leak. What does "Detached" mean?
> 4. What is a long task, and why does it matter for users?
> 5. What is layout thrashing, and how do you avoid it?

Prev: [[28 JS Fetch and JSON|28. Fetch and JSON]] · Next: [[30 JS Memory Management|30. Memory Management]]
