---
title: 20. Iterators and Generators
tags:
  - JavaScript
---

> [!summary] In one line
> An **iterator** is an object with a `next()` method that hands out values one at a time. An **iterable** is anything that can give you an iterator, which makes it work with `for...of` and `...`. A **generator** is the easy way to write one.

## The iteration protocol

```js
const it = ['a', 'b'][Symbol.iterator]();   // ask the array for an iterator
it.next();   // { value: 'a', done: false }
it.next();   // { value: 'b', done: false }
it.next();   // { value: undefined, done: true }
```

- **Iterable:** has a `[Symbol.iterator]()` method that returns an iterator.
- **Iterator:** has a `next()` method that returns `{ value, done }`.

**Built-in iterables:** `Array`, `String`, `Map`, `Set`, typed arrays, `arguments`, `NodeList`. **Plain objects are not iterable**: use `Object.entries(obj)`.

**What consumes iterables:** `for...of`, spread `[...x]`, array destructuring, `Array.from`, `new Map(x)` / `new Set(x)`, `Promise.all(x)`.

> [!tip] Remember it
> **An iterator is a Pez dispenser:** each `next()` pops out one candy, and `done: true` means it's empty.

## A custom iterable

```js
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next: () => current <= last
        ? { value: current++, done: false }
        : { value: undefined, done: true },
    };
  },
};

for (const n of range) console.log(n);   // 1 2 3
[...range];                               // [1, 2, 3]
```

## Generators

A generator function (`function*`) can **pause** at each `yield` and resume later. Calling it doesn't run the body. It returns a generator object, which is both an iterator and an iterable.

```js
function* countTo(n) {
  for (let i = 1; i <= n; i++) {
    yield i;                 // pause here and hand out i
  }
  return 'done';             // final value (ignored by for...of)
}

const gen = countTo(2);
gen.next();   // { value: 1, done: false }
gen.next();   // { value: 2, done: false }
gen.next();   // { value: 'done', done: true }

[...countTo(3)];   // [1, 2, 3]
```

The same `range` as above, written as a generator:

```js
const range = {
  from: 1, to: 3,
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) yield i;
  },
};
```

### Lazy and infinite sequences

Values are only made when someone asks for them, so "infinite" is fine:

```js
function* ids() {
  let id = 1;
  while (true) yield id++;
}
const nextId = ids();
nextId.next().value;  // 1
nextId.next().value;  // 2
```

### Two-way communication and delegation

```js
function* chat() {
  const name = yield 'What is your name?';   // receives the value passed to next()
  yield `Hello, ${name}!`;
}
const c = chat();
c.next().value;         // 'What is your name?'
c.next('Asha').value;   // 'Hello, Asha!'

function* both() {
  yield* [1, 2];        // yield* hands over to another iterable
  yield* countTo(2);
}
[...both()];            // [1, 2, 1, 2]
```

`gen.return(value)` stops a generator early. `gen.throw(err)` throws inside it at the paused `yield`.

## Iterator helpers (ES2025)

Array-style methods that work lazily on any iterator:

```js
ids()
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .take(3)
  .toArray();   // [20, 40, 60]: never builds an infinite array
```

Also: `drop`, `flatMap`, `reduce`, `some`, `every`, `find`, `forEach`, and `Iterator.from(x)`.

## Async iterators

For values that arrive over time (pages of an API, chunks of a stream). Use `async function*` to make them and `for await...of` to read them.

```js
async function* fetchPages(url) {
  while (url) {
    const res = await fetch(url);
    const page = await res.json();
    yield page.items;
    url = page.next;          // stop when there's no next page
  }
}

for await (const items of fetchPages('/api/posts?page=1')) {
  render(items);
}
```

> [!warning] Common mistakes
> - Using `for...of` on a plain object: `TypeError: obj is not iterable`.
> - Reusing a finished generator: once `done` is `true`, it stays empty. Call the function again for a fresh one.
> - Spreading an infinite generator: `[...ids()]` never finishes.

> [!question] Recall
> 1. What's the difference between an iterable and an iterator?
> 2. Make a plain object iterable using `Symbol.iterator`.
> 3. What does `yield` do? What does calling a generator function return?
> 4. When would you use `for await...of`?

Prev: [[19 JS Prototypes and Classes|19. Prototypes and Classes]] · Next: [[21 JS ES6 Plus Features|21. ES6+ Features]]
