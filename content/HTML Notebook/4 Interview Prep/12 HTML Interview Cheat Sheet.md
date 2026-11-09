---
title: 12. Interview Cheat Sheet
aliases:
  - html5-notebook/11-html-interview-cheat-sheet
tags:
  - HTML
  - Interview
---

The most-asked HTML questions with answers short enough to say out loud.

| Question | Short answer |
| --- | --- |
| What is HTML? | Markup language that structures web content using elements. → [[HTML Notebook/1 Content/01 HTML Introduction and Document Structure\|Intro]] |
| What is HTML5? Is there an HTML6? | HTML5 (2014) was the last numbered version. Since 2019 there's one **HTML Living Standard** (WHATWG), updated continuously, so no HTML6. |
| Tag vs element vs attribute? | Tag = `<p>`; element = tag + content + closing tag; attribute = extra info in the opening tag. |
| What does `<!doctype html>` do? | Puts the browser in standards mode instead of quirks mode. It doesn't name a version. |
| Void elements? | Elements with no content or closing tag: `img, br, hr, input, meta, link, source`. |
| Block vs inline? | Block takes a full row (`div`, `p`); inline flows in text (`span`, `a`). CSS `display` can change either. → [[HTML Notebook/1 Content/03 HTML Text Elements\|Text]] |
| `div` vs `span`? | Generic block vs generic inline container, with no meaning. |
| `strong` vs `b`, `em` vs `i`? | `strong` = importance, `em` = stress. `b` = draw attention without importance (keywords), `i` = another voice (terms, foreign words). All four have meaning. |
| Semantic HTML? | Elements that describe meaning (`header`, `nav`, `main`, `article`, `search`); helps accessibility, SEO and built-in behaviour. → [[HTML Notebook/2 Structure and Meaning/07 HTML Semantic HTML\|Semantic]] |
| `article` vs `section`? | `article` stands alone; `section` is a themed part of something bigger, with a heading. |
| Why `alt`? | Screen readers, failed loads, SEO. Empty `alt=""` for decorative images. → [[HTML Notebook/1 Content/04 HTML Links and Images\|Images]] |
| `srcset` / `sizes` vs `<picture>`? | `srcset` + `sizes`: same image, different sizes. `<picture>`: different formats (AVIF/WebP) or crops. |
| `loading="lazy"` and `fetchpriority`? | Lazy = load images and iframes when near the screen. `fetchpriority="high"` = load the hero image first. Never lazy-load the hero. |
| Do you need `rel="noopener"`? | No longer: browsers apply it to `target="_blank"` by default. `noreferrer` also hides the referrer. |
| `id` vs `class`? | `id` unique per page (one element); `class` reusable on many. |
| `data-*` attributes? | Custom data on elements, read in JS via `el.dataset`. |
| GET vs POST? | GET puts data in the URL (searches); POST in the body (sensitive or large data, changes). → [[HTML Notebook/3 Forms and Interactivity/09 HTML Forms\|Forms]] |
| Label `for`? | Links a label to an input's `id`; clicking it focuses the input and screen readers announce it. |
| `autocomplete` and `inputmode`? | `autocomplete` says which saved value fits (`email`, `new-password`, `one-time-code`); `inputmode` picks the phone keyboard. |
| Checkbox vs radio? | Many choices vs one choice (same `name`). |
| Form validation attributes? | `required, pattern, min, max, minlength, maxlength, type=email`. Style with `:user-invalid`. Always validate on the server too. |
| Canvas vs SVG? | Pixel drawing via JS vs scalable vector shapes in the DOM. → [[HTML Notebook/1 Content/06 HTML Media and Graphics\|Media]] |
| `defer` vs `async`? | Both download in parallel; `defer` runs after parsing in order, `async` runs as soon as it's ready in any order. Modules are deferred by default. → [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO\|Meta]] |
| localStorage vs sessionStorage vs cookie? | Persistent / per tab / small and sent to the server with every request. |
| What is ARIA? When do you use it? | Attributes that add accessibility info when native HTML can't. Right element first, ARIA last. → [[HTML Notebook/2 Structure and Meaning/08 HTML Accessibility\|Accessibility]] |
| What is WCAG? | The accessibility guidelines most laws use. Current version 2.2; teams usually target level AA. |
| `hidden` vs `aria-hidden` vs `inert`? | `hidden`: gone for everyone. `aria-hidden`: visible but hidden from screen readers. `inert`: visible but can't be focused, clicked or read. |
| `<dialog>` vs popover? | `showModal()` dialog blocks the page and needs an answer; a popover is a light overlay that closes on outside click. → [[HTML Notebook/3 Forms and Interactivity/10 HTML Modern Features\|Modern HTML]] |
| What are Web Components? | Custom elements + `<template>`/`<slot>` + shadow DOM: reusable elements with private styles. |
| Web worker vs service worker? | Background computation vs network proxy for offline and caching. → [[HTML Notebook/3 Forms and Interactivity/11 HTML Web APIs\|Web APIs]] |
| `<iframe>` safety? | Add `title`, use `sandbox` for untrusted content and `allow` to limit features. |
| Viewport meta? | Makes the page use the device width on mobile instead of a zoomed-out desktop view. |
| Core Web Vitals? | LCP (loading), INP (responsiveness), CLS (layout shift). Image sizes and `fetchpriority` help. |
| Character entities? | Codes for reserved characters: `&lt; &amp; &quot; &nbsp;`. With UTF-8 you can type other symbols directly. |
| How does the browser render a page? | HTML → DOM, CSS → CSSOM, combine into render tree → layout → paint → composite. |

Prev: [[11 HTML Web APIs|11. Web APIs]]
