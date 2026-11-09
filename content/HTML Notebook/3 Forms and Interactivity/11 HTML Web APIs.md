---
title: 11. Web APIs
aliases:
  - html5-notebook/09-html5-apis
tags:
  - HTML
  - JavaScript
---

> [!summary] In one line
> Browsers give JavaScript a set of built-in **Web APIs**: storage, location, background threads, observers, drag and drop and more. (Older tutorials call them "HTML5 APIs".)

| API | What it does | Example |
| --- | --- | --- |
| **Web Storage** | save small key/value strings | `localStorage.setItem('k','v')` → [[25 JS Browser Storage\|Browser Storage]] |
| **IndexedDB** | a real database in the browser (large data, offline apps) | → [[25 JS Browser Storage\|Browser Storage]] |
| **Fetch** | HTTP requests | → [[28 JS Fetch and JSON\|Fetch]] |
| **Geolocation** | user's location (asks permission) | `navigator.geolocation.getCurrentPosition(cb)` |
| **Drag and Drop** | drag elements around | `draggable="true"` + `dragstart`/`drop` events |
| **Web Workers** | run heavy JS on a background thread | `new Worker('worker.js', { type: 'module' })` |
| **Service Workers** | offline caching, push notifications (PWAs) | `navigator.serviceWorker.register('/sw.js')` |
| **WebSockets** | two-way real-time connection (chat) | `new WebSocket('wss://…')` |
| **History API** | change the URL without a reload (SPAs) | `history.pushState({}, '', '/page')` |
| **Intersection Observer** | know when an element scrolls into view | infinite scroll, animations on scroll |
| **Resize Observer** | know when an element changes size | responsive components |
| **Clipboard** | copy and paste | `await navigator.clipboard.writeText('x')` |
| **Web Share** | open the phone's share sheet | `navigator.share({ title, url })` |
| **Notifications** | system notifications (asks permission) | `new Notification('Hi')` |
| **Broadcast Channel** | message other tabs of the same site | sync logout across tabs |
| **Web Components** | your own reusable HTML elements | → [[HTML Notebook/3 Forms and Interactivity/10 HTML Modern Features\|Modern HTML Features]] |

## Secure contexts (HTTPS only)

Powerful APIs only work on **HTTPS** (and on `localhost` while developing): Geolocation, Service Workers, Clipboard, Notifications, Web Share, camera and microphone. On plain HTTP they're missing or throw an error.

Many of them also need a **user gesture** (a click or key press) before they work, for example copying to the clipboard, opening the share sheet or going fullscreen. This stops pages from doing these things on their own.

## Geolocation

```js
navigator.geolocation.getCurrentPosition(
  pos => console.log(pos.coords.latitude, pos.coords.longitude),
  err => console.error(err.message),
  { enableHighAccuracy: true, timeout: 10000 }
);
```

Ask for location only after the user clicks something that needs it ("Find stores near me"). A prompt on page load usually gets blocked or denied.

## Drag and drop

```html
<div id="card" draggable="true">Drag me</div>
<div id="box">Drop here</div>
<script type="module">
  const card = document.getElementById('card');
  const box = document.getElementById('box');

  card.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', card.id));
  box.addEventListener('dragover', e => e.preventDefault());   // allow dropping
  box.addEventListener('drop', e => {
    e.preventDefault();
    box.append(document.getElementById(e.dataTransfer.getData('text/plain')));
  });
</script>
```

> [!tip] Remember it
> **dragover must `preventDefault()`** or the drop zone says "no entry".

Native drag and drop doesn't work with a keyboard or on most touch screens. WCAG 2.2 requires a single-click alternative (for example "Move up" / "Move down" buttons). → [[HTML Notebook/2 Structure and Meaning/08 HTML Accessibility|Accessibility]]

## Intersection Observer

```js
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);         // run once per element
    }
  }
}, { rootMargin: '100px' });                    // start 100px before it appears

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

Much cheaper than listening to `scroll` events. For lazy-loading images, use `loading="lazy"` instead; no JavaScript needed.

## Web Worker vs Service Worker

| | Web Worker | Service Worker |
| --- | --- | --- |
| Purpose | heavy computation off the main thread | network proxy: offline, caching, push |
| Lifetime | while the page is open | lives beyond the page |
| DOM access | No | No |
| Needs HTTPS | No | Yes |

> [!tip] Remember it
> **Web Worker = a helper in the back room doing maths. Service Worker = a doorman who intercepts every network request.**

> [!question] Recall
> 1. Which APIs need HTTPS? Which also need a user gesture?
> 2. Web worker vs service worker?
> 3. Why must the drop target call `preventDefault()` on `dragover`? What do keyboard users need instead?
> 4. Why use Intersection Observer instead of a `scroll` listener?

Prev: [[10 HTML Modern Features|10. Modern HTML Features]] · Next: [[12 HTML Interview Cheat Sheet|12. Interview Cheat Sheet]]
