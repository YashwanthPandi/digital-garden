---
title: 11. Interview Cheat Sheet
tags:
  - HTML
  - Interview
---

The most-asked HTML questions with answers short enough to say out loud.

| Question | Short answer |
| --- | --- |
| What is HTML? | Markup language that structures web content using elements. → [[01 HTML Introduction and Document Structure\|Intro]] |
| Tag vs element vs attribute? | Tag = `<p>`; element = tag + content + closing tag; attribute = extra info in the opening tag. |
| What does `<!DOCTYPE html>` do? | Tells the browser to use HTML5 standards mode. |
| What's new in HTML5? | Semantic tags, audio/video, canvas/SVG, new input types, storage and other APIs. |
| Void elements? | Elements with no content/closing tag: `img, br, hr, input, meta, link`. |
| Block vs inline? | Block takes a full row (`div`, `p`); inline flows in text (`span`, `a`). → [[02 HTML Text Elements\|Text]] |
| `div` vs `span`? | Generic block vs generic inline container. |
| `strong` vs `b`, `em` vs `i`? | `strong`/`em` carry meaning (importance/emphasis); `b`/`i` are only visual. |
| Semantic HTML? | Tags that describe meaning (`header`, `nav`, `main`, `article`); helps a11y and SEO. → [[06 HTML Semantic HTML\|Semantic]] |
| `article` vs `section`? | `article` stands alone; `section` is a themed part of something bigger. |
| Why `alt`? | Screen readers, failed loads, SEO. Empty for decorative images. → [[03 HTML Links and Images\|Images]] |
| `id` vs `class`? | `id` unique per page (one element); `class` reusable on many. |
| `data-*` attributes? | Custom data on elements, read in JS via `el.dataset`. |
| GET vs POST? | GET puts data in the URL (searches); POST in the body (sensitive/large). → [[05 HTML Forms\|Forms]] |
| Label `for`? | Links a label to an input's `id`; clicking it focuses the input and screen readers announce it. |
| Checkbox vs radio? | Many choices vs one choice (same `name`). |
| Form validation attributes? | `required, pattern, min, max, minlength, maxlength, type=email`. |
| Canvas vs SVG? | Pixel drawing via JS vs scalable vector shapes in the DOM. → [[07 HTML Media and Graphics\|Media]] |
| `defer` vs `async`? | Both download in parallel; `defer` runs after parsing in order, `async` runs ASAP in any order. → [[10 HTML Meta Tags and SEO\|Meta]] |
| localStorage vs sessionStorage vs cookie? | Persistent / per tab / small and sent to the server. |
| What is ARIA? | Attributes that add accessibility info when native HTML can't. → [[08 HTML Accessibility\|Accessibility]] |
| Web worker vs service worker? | Background computation vs network proxy for offline/caching. → [[09 HTML5 APIs\|APIs]] |
| `<iframe>`? | Embeds another page; use `title` and `sandbox` for safety. |
| Viewport meta? | Makes the page use device width on mobile instead of a zoomed-out desktop view. |
| Character entities? | Codes for reserved/special chars: `&lt; &gt; &amp; &nbsp; &copy;`. |
| How does the browser render a page? | HTML → DOM, CSS → CSSOM, combine into render tree → layout → paint → composite. |
