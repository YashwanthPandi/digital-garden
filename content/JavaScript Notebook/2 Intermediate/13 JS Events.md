---
title: 13. Events
tags:
  - JavaScript
---

> [!summary] In one line
> Events are **things that happen** (click, keypress, submit). You **listen** for them and run a function (the *handler*).

```js
const btn = document.querySelector('#save');
btn.addEventListener('click', (event) => {
  console.log('clicked', event.target);
});
```

Common events: `click`, `dblclick`, `input`, `change`, `submit`, `keydown`, `mouseover`, `focus`, `blur`, `scroll`, `load`, `DOMContentLoaded`.

## The event object

```js
form.addEventListener('submit', (e) => {
  e.preventDefault();      // stop the default action (page reload)
  e.stopPropagation();     // stop bubbling up
  e.target;                // element that was actually clicked
  e.currentTarget;         // element the listener is on
});
```

## Bubbling and capturing

When you click a `<button>` inside a `<div>`, the event travels:

1. **Capture**: down from `window` → `div` → `button`
2. **Target**: at the `button`
3. **Bubble**: back up `button` → `div` → `window` (default listening phase)

> [!tip] 🧠 Remember it
> **Events are bubbles in water 🫧: they start at the bottom (the clicked element) and float up to the top.**

## Event delegation

Instead of 100 listeners on 100 `<li>`s, put **one** on the parent and check `e.target`.

```js
list.addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (item) item.classList.toggle('done');
});
```

✅ Works for items added later. ✅ Less memory.

## Removing listeners

```js
function onScroll() { }
window.addEventListener('scroll', onScroll);
window.removeEventListener('scroll', onScroll);  // must be the SAME function reference
btn.addEventListener('click', fn, { once: true }); // auto-removes after first run
```

## Debounce and throttle (interview favourites)

- **Debounce**: wait until the user *stops* (search box: run 300 ms after last key).
- **Throttle**: run *at most once every* X ms (scroll, resize).

```js
function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}
```

🧠 **Debounce = lift door waits until people stop entering. Throttle = a tap that drips once per second.**

> [!question] Recall
> 1. `e.target` vs `e.currentTarget`?
> 2. What is event delegation and why use it?
> 3. Debounce vs throttle?
