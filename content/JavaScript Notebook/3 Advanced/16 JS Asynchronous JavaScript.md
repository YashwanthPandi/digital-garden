---
title: 16. Asynchronous JavaScript
tags:
  - JavaScript
---

> [!summary] In one line
> JS has **one thread**, so slow work (timers, network) is handed off and its result comes back later through **callbacks → promises → async/await**, coordinated by the **event loop**.

## Why async?

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 1, 3, 2: the timer callback waits its turn even at 0 ms
```

> [!tip] 🧠 Remember it
> **A restaurant with one waiter.** The waiter (JS thread) takes your order, hands it to the kitchen (browser APIs), and serves other tables. When food is ready it goes on the counter (queue) and the waiter brings it when free.

## 1. Callbacks

```js
getUser(1, user => {
  getOrders(user, orders => {
    getDetails(orders[0], details => { /* 😵 */ });
  });
});
```

Nesting grows sideways: **callback hell / pyramid of doom**.

## 2. Promises

A Promise is an **IOU for a future value**. States: **pending → fulfilled** or **pending → rejected** (settled once, never changes again).

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

p.then(v => console.log(v))
 .catch(err => console.error(err))
 .finally(() => console.log('cleanup'));
```

### Combinators

| Method | Resolves when | 🧠 |
| --- | --- | --- |
| `Promise.all` | **all** succeed (fails fast on first error) | all or nothing |
| `Promise.allSettled` | all finish, success or fail | report card for everyone |
| `Promise.race` | the **first** to settle | first past the post |
| `Promise.any` | the first to **succeed** | any winner will do |

## 3. async / await

Same promises, reads like normal code.

```js
async function showUser(id) {
  try {
    const user = await getUser(id);       // pause here until resolved
    const orders = await getOrders(user);
    return orders;                        // async functions always return a Promise
  } catch (e) {
    console.error(e);
  }
}

// run in parallel, not one after another:
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

## The event loop

1. Run all **synchronous** code (call stack).
2. Run **all microtasks** (promise `.then`, `await` continuations, `queueMicrotask`).
3. Run **one macrotask** (`setTimeout`, `setInterval`, events), then back to step 2.

```js
console.log('A');
setTimeout(() => console.log('B'));          // macrotask
Promise.resolve().then(() => console.log('C')); // microtask
console.log('D');
// A D C B
```

> [!tip] 🧠 Remember it
> **Sync first, then promises, then timers.** Microtasks are the VIP queue: they cut in before the next timer.

> [!question] Recall
> 1. Three states of a promise?
> 2. `Promise.all` vs `Promise.allSettled`?
> 3. Predict the output order: `log`, `setTimeout`, `Promise.then`, `log`.
