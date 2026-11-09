---
title: 30. Memory Management
tags:
  - JavaScript
---

> [!summary] In one line
> JavaScript **allocates** memory when you create values and **frees** it automatically with a **garbage collector**, which removes anything that can no longer be **reached**. You don't free memory yourself. Your job is to not keep things reachable by accident (a **memory leak**).

## The memory lifecycle

Every language follows the same three steps:

1. **Allocate:** JS reserves memory when you create a value.
2. **Use:** read and write it.
3. **Release:** free it when it's no longer needed. In JS the garbage collector does this for you.

```js
const n = 42;                       // allocate a number
const user = { name: 'Asha' };      // allocate an object
const items = [1, 2, 3];            // allocate an array
const el = document.createElement('div');   // allocate a DOM node
user.name;                          // use
// release: automatic, once nothing can reach `user` any more
```

### Stack and heap (simplified)

| | Stack | Heap |
| --- | --- | --- |
| Holds | call frames: local variables, primitives, **references** | **objects**, arrays, functions, closures |
| Size | small, fixed | large, grows |
| Freed | automatically when the function returns | by the garbage collector |

```js
function make() {
  const count = 1;          // the value lives in make's frame on the stack
  const obj = { count };    // the object lives on the heap; the frame holds a reference to it
  return obj;               // the frame is gone, but the object survives: it's still referenced
}
```

## Garbage collection

### Reachability

A value stays alive as long as it can be **reached** from a **root**:

- global variables
- local variables and parameters of functions currently on the call stack
- variables captured by closures that are themselves reachable

Anything reachable from a reachable object (its properties, array items, and so on) is reachable too. Everything else is garbage.

```js
let user = { name: 'Asha' };   // reachable through `user`
let admin = user;              // two references now
user = null;                   // still reachable through `admin`
admin = null;                  // unreachable → will be collected
```

### Mark-and-sweep

The algorithm modern engines use:

1. **Mark:** start from the roots and mark everything they reach, then everything those reach, and so on.
2. **Sweep:** free everything that wasn't marked.

Because it starts from the roots, **circular references are fine**: two objects that point at each other but that nothing else reaches are both collected. The older **reference counting** approach (free an object when nothing points at it) can't handle cycles, which is why it's no longer used on its own.

**V8 extras:** memory is split into a *young generation* (new objects, collected often and quickly, since most die young) and an *old generation* (survivors, collected less often). Much of the work happens in small pieces or on background threads to avoid freezing the page. You can't trigger GC from normal JS code.

> [!tip] Remember it
> **The garbage collector is a cleaner who only keeps what's tied to the house.** Start at the front door (roots), follow every string, and bin whatever isn't attached.

## Memory leaks

A leak is memory that's no longer needed but **still reachable**, so it's never collected. In long-running pages (single-page apps, dashboards) it builds up until the tab slows down or crashes.

| Cause | Example | Fix |
| --- | --- | --- |
| Accidental globals | `total = 0` with no `let` (sloppy mode) | strict mode / modules; always declare |
| Forgotten timers | `setInterval` that's never cleared | `clearInterval` on cleanup |
| Listeners never removed | adding to `window` on every page view | `removeEventListener`, or `{ signal }` with `AbortController` |
| Detached DOM nodes | a removed element still stored in a variable or array | drop the reference (`el = null`) |
| Closures holding big data | a long-lived callback that captures a huge array | capture only what you need |
| Ever-growing caches | a `Map` that is added to but never cleared | limit the size (LRU) or use `WeakMap` |
| Console logging | logged objects stay alive while DevTools is open | remove debug logs |

```js
// One AbortController removes every listener at once
const controller = new AbortController();
window.addEventListener('resize', onResize, { signal: controller.signal });
document.addEventListener('keydown', onKey, { signal: controller.signal });

function cleanup() {
  controller.abort();          // both listeners removed
  clearInterval(pollTimer);
}
```

Frameworks give you a cleanup hook for exactly this: Angular `ngOnDestroy` / `DestroyRef`, React `useEffect` return functions.

**Advanced:** `WeakRef` and `FinalizationRegistry` (ES2021) let you hold an object without keeping it alive, or run code after it's collected. They're rarely needed and their timing isn't guaranteed. Prefer `WeakMap`/`WeakSet` (see [[18 JS Collections In Depth|Collections In Depth]]).

Finding leaks with DevTools: [[29 JS Debugging with DevTools|Debugging with DevTools]].

> [!question] Recall
> 1. What are the three steps of the memory lifecycle? Which one does JS automate?
> 2. What makes a value "reachable"? Name three kinds of root.
> 3. Why does mark-and-sweep handle circular references when reference counting doesn't?
> 4. Name four common causes of memory leaks in a web app and how to fix each.

Prev: [[29 JS Debugging with DevTools|29. Debugging with DevTools]] · Next: [[31 JS Interview Cheat Sheet|31. Interview Cheat Sheet]]
