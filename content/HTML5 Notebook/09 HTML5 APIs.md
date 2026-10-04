---
title: 9. HTML5 APIs
tags:
  - HTML
  - JavaScript
---

> [!summary] In one line
> HTML5 came with browser **APIs** you use from JavaScript: storage, location, drag and drop, background threads and more.

| API | What it does | Example |
| --- | --- | --- |
| **Web Storage** | save key/value data in the browser | `localStorage.setItem('k','v')` → [[18 JS Browser Storage\|Browser Storage]] |
| **Geolocation** | user's location (asks permission) | `navigator.geolocation.getCurrentPosition(cb)` |
| **Drag and Drop** | drag elements around | `draggable="true"` + `dragstart`/`drop` events |
| **Canvas** | draw pixels | → [[07 HTML Media and Graphics\|Media]] |
| **Web Workers** | run heavy JS on a background thread | `new Worker('worker.js')` |
| **Service Workers** | offline caching, push notifications (PWAs) | `navigator.serviceWorker.register('/sw.js')` |
| **WebSockets** | two-way real-time connection (chat) | `new WebSocket('wss://…')` |
| **History API** | change URL without reload (SPAs) | `history.pushState({}, '', '/page')` |
| **Fetch** | HTTP requests | → [[17 JS Fetch and JSON\|Fetch]] |
| **Notifications** | system notifications | `new Notification('Hi')` |
| **Intersection Observer** | know when an element scrolls into view | lazy loading, infinite scroll |
| **Clipboard** | copy/paste | `navigator.clipboard.writeText('x')` |

## Geolocation

```js
navigator.geolocation.getCurrentPosition(
  pos => console.log(pos.coords.latitude, pos.coords.longitude),
  err => console.error(err.message)
);
```

Only works on **HTTPS** (and localhost).

## Drag and drop

```html
<div id="card" draggable="true">Drag me</div>
<div id="box">Drop here</div>
<script>
  card.addEventListener('dragstart', e => e.dataTransfer.setData('text', e.target.id));
  box.addEventListener('dragover', e => e.preventDefault());   // allow dropping
  box.addEventListener('drop', e => {
    e.preventDefault();
    box.append(document.getElementById(e.dataTransfer.getData('text')));
  });
</script>
```

🧠 **dragover must `preventDefault()`** or the drop zone says "no entry".

## Web Worker vs Service Worker

| | Web Worker | Service Worker |
| --- | --- | --- |
| Purpose | heavy computation off the main thread | network proxy: offline, caching, push |
| Lifetime | while the page is open | lives beyond the page |
| DOM access | ❌ | ❌ |

> [!tip] 🧠 Remember it
> **Web Worker = a helper in the back room doing maths. Service Worker = a doorman who intercepts every network request.**

> [!question] Recall
> 1. Which APIs need HTTPS?
> 2. Web worker vs service worker?
> 3. Why must the drop target call `preventDefault()` on `dragover`?
