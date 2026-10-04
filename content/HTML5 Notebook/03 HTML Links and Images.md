---
title: 3. Links and Images
tags:
  - HTML
---

> [!summary] In one line
> `<a href>` takes you somewhere; `<img src alt>` shows a picture. Always give images an `alt`.

## Links

```html
<a href="https://developer.mozilla.org">Absolute URL (other site)</a>
<a href="about.html">Relative URL (same site)</a>
<a href="../index.html">Up one folder</a>
<a href="#contact">Jump to id="contact" on this page</a>
<a href="mailto:me@example.com">Email me</a>
<a href="tel:+911234567890">Call</a>
<a href="report.pdf" download>Download</a>
<a href="https://x.com" target="_blank" rel="noopener noreferrer">New tab (safely)</a>
```

> [!tip] 🧠 Remember it
> **href = "Hypertext REFerence" = where to go.** `target="_blank"` = blank new tab.
> **Absolute = full street address; relative = "two doors down".**

Write link text that makes sense alone: ✅ "Read the pricing guide", ❌ "click here".

## Images

```html
<img src="cat.jpg" alt="Orange cat asleep on a laptop" width="400" height="300" loading="lazy">
```

- `alt`: read by screen readers and shown if the image fails. Decorative image → `alt=""`.
- `width`/`height`: reserve space so the page doesn't jump while loading.
- `loading="lazy"`: only load when near the screen.

🧠 **alt = "alternative text" = what you'd say to a friend on the phone describing the picture.**

### Figure with caption

```html
<figure>
  <img src="chart.png" alt="Sales doubled from 2024 to 2025">
  <figcaption>Fig 1. Yearly sales</figcaption>
</figure>
```

### Responsive images

```html
<!-- browser picks the best size -->
<img src="small.jpg"
     srcset="small.jpg 480w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, 1200px"
     alt="Mountain view">

<!-- different formats / art direction -->
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Mountain view">
</picture>
```

## Image formats

| Format | Use for |
| --- | --- |
| JPG | photos |
| PNG | transparency, screenshots |
| SVG | icons, logos (scales infinitely) |
| WebP / AVIF | modern, smaller photos |
| GIF | simple animations (prefer video) |

> [!question] Recall
> 1. Relative vs absolute URL?
> 2. Why is `alt` important, and when should it be empty?
> 3. What does `rel="noopener"` protect against? (the new tab controlling your page via `window.opener`)
