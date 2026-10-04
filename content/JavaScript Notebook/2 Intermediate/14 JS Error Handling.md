---
title: 14. Error Handling
tags:
  - JavaScript
---

> [!summary] In one line
> `try` the risky code, `catch` the error if it breaks, `finally` clean up either way. `throw` raises your own errors.

```js
try {
  const data = JSON.parse(text);   // might throw
} catch (err) {
  console.error(err.name, err.message);
} finally {
  hideSpinner();                   // always runs
}
```

> [!tip] 🧠 Remember it
> **try = attempt, catch = safety net, finally = clean up the room no matter what.**

## Built-in error types

| Error | When |
| --- | --- |
| `ReferenceError` | variable doesn't exist (or is in the TDZ) |
| `TypeError` | wrong type, e.g. `null.foo`, calling a non-function |
| `SyntaxError` | invalid code / invalid JSON |
| `RangeError` | value out of range, e.g. `new Array(-1)`, too-deep recursion |

## Throwing and custom errors

```js
class ValidationError extends Error {
  constructor(message) { super(message); this.name = 'ValidationError'; }
}

function setAge(age) {
  if (age < 0) throw new ValidationError('Age cannot be negative');
}

try { setAge(-1); }
catch (e) {
  if (e instanceof ValidationError) showMessage(e.message);
  else throw e;                    // don't swallow errors you don't understand
}
```

Always `throw new Error(...)`, not a string: Error objects carry a **stack trace**.

## Async errors

```js
async function load() {
  try {
    const res = await fetch('/api');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) { console.error(e); }
}
promise.catch(err => console.error(err));  // promise style
```

`try/catch` only catches **async** errors if you `await` inside it.

## Debugging toolbox

- `console.log`, `console.table(arr)`, `console.error`, `console.time('x')`/`timeEnd('x')`
- `debugger;` statement pauses in DevTools
- DevTools **Sources** tab: breakpoints, step over/into, watch variables

> [!question] Recall
> 1. When does `finally` run?
> 2. `ReferenceError` vs `TypeError`?
> 3. Why throw `new Error()` instead of a string?
