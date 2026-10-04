---
title: 10. this, call, apply, bind
tags:
  - JavaScript
---

> [!summary] In one line
> `this` is **who called the function**, decided at *call time* (except arrow functions, which take `this` from where they were written).

## The rules (in priority order)

| How it's called | `this` is |
| --- | --- |
| `new Fn()` | the new object |
| `fn.call(obj)` / `apply` / `bind` | `obj` (explicit) |
| `obj.fn()` | `obj` (the thing **left of the dot**) |
| `fn()` plain call | `undefined` in strict mode / modules, `window` otherwise |
| arrow function | `this` of the surrounding code (never changes) |

> [!tip] 🧠 Remember it
> **"Look left of the dot."** `user.greet()` → `this` is `user`. No dot → no owner → `undefined`.

```js
const user = {
  name: 'Asha',
  regular() { return this.name; },
  arrow: () => this?.name,          // ❌ arrow: `this` is outer scope, not user
};
user.regular();  // 'Asha'
user.arrow();    // undefined

const fn = user.regular;
fn();            // ❌ undefined: lost the "left of the dot"
```

### Arrows fix callbacks

```js
const timer = {
  seconds: 0,
  start() {
    setInterval(() => this.seconds++, 1000);  // arrow keeps timer as `this` ✅
  },
};
```

## call, apply, bind

All three set `this` manually.

```js
function intro(city, country) { return `${this.name} from ${city}, ${country}`; }
const p = { name: 'Ravi' };

intro.call(p, 'Chennai', 'IN');      // call now, args one by one
intro.apply(p, ['Chennai', 'IN']);   // call now, args as an Array
const bound = intro.bind(p, 'Chennai');  // returns a NEW function for later
bound('IN');
```

> [!tip] 🧠 Remember it
> **C**all = **C**ommas, **A**pply = **A**rray, **B**ind = **B**ack later.

> [!question] Recall
> 1. What is `this` inside `obj.method()`? Inside a plain `fn()` call?
> 2. Why do arrow functions make bad object methods but good callbacks?
> 3. Difference between `call`, `apply` and `bind`?
