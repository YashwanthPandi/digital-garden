---
title: 4. Links and Images
aliases:
  - html5-notebook/03-html-links-and-images
tags:
  - HTML
---

> [!summary] In one line
> `<a href>` takes you somewhere; `<img src alt>` shows a picture. Always give images an `alt`, a size, and the right loading behaviour.

## Links

```html
<a href="https://developer.mozilla.org">Absolute URL (other site)</a>
<a href="/about">Root-relative URL (from the site root)</a>
<a href="about.html">Relative URL (from the current folder)</a>
<a href="../index.html">Up one folder</a>
<a href="#contact">Jump to id="contact" on this page</a>
<a href="mailto:me@example.com">Email me</a>
<a href="tel:+911234567890">Call</a>
<a href="report.pdf" download>Download</a>
<a href="https://example.com" target="_blank">Opens in a new tab</a>
```

> [!tip] Remember it
> **href = "Hypertext REFerence" = where to go.** `target="_blank"` = a blank new tab.
> **Absolute = full street address; relative = "two doors down".**

### `target="_blank"` and `rel`

Modern browsers treat every `target="_blank"` link as `rel="noopener"`: the new tab can't control your page through `window.opener`. You no longer have to add it yourself, though it's harmless to keep for old browsers.

| `rel` value | Use it to |
| --- | --- |
| `noreferrer` | hide which page the visitor came from (also implies `noopener`) |
| `nofollow` | tell search engines not to pass ranking to the link |
| `sponsored` / `ugc` | mark paid links / user-generated links (comments, forums) |

Open new tabs only when there's a reason (a PDF, a link that would interrupt a form). Users can open a new tab themselves.

Write link text that makes sense alone: "Read the pricing guide", not "click here".

## Images

```html
<img src="cat.jpg" alt="Orange cat asleep on a laptop"
     width="800" height="600" loading="lazy" decoding="async">
```

- `alt`: read by screen readers and shown if the image fails. Decorative image → `alt=""` (screen readers skip it). Never leave `alt` out.
- `width` / `height`: let the browser reserve space so the page doesn't jump while loading (layout shift). Set them to the image's real pixel size; CSS can still resize it (`max-width: 100%; height: auto`).
- `loading="lazy"`: load only when the image is near the screen. Use it for images **below the fold**.
- `decoding="async"`: decode off the main thread so it doesn't block other work.

> [!tip] Remember it
> **alt = "alternative text" = what you'd say to a friend on the phone describing the picture.**

### The main (hero) image and Priority Hints

**Priority Hints** is the name of the `fetchpriority` attribute: it tells the browser which resources matter most. The biggest image at the top of the page usually decides your **LCP** score (Largest Contentful Paint, see [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO|Meta Tags and SEO]]). Load it **early**, not lazily:

```html
<img src="hero.avif" alt="Team working at a whiteboard"
     width="1600" height="900" fetchpriority="high">
```

| Attribute | Use on |
| --- | --- |
| `loading="lazy"` | images and iframes further down the page |
| `loading="eager"` (default) | images visible on first load |
| `fetchpriority="high"` | the one most important image (usually the hero) |
| `fetchpriority="low"` | images that matter less (carousel slides 2, 3, …) |

> [!warning] Don't lazy-load the hero
> `loading="lazy"` on the top image makes it load **later**, which hurts LCP.

### `img` vs `figure`

`<img>` is the image itself. `<figure>` wraps self-contained content that's referred to from the main text (an image, chart, code sample or quote) together with its `<figcaption>`. Use plain `<img>` for logos, avatars and decoration; use `<figure>` when the image needs a caption.

### Figure with caption

```html
<figure>
  <img src="chart.png" alt="Sales doubled from 2024 to 2025">
  <figcaption>Fig 1. Yearly sales</figcaption>
</figure>
```

### Responsive images

```html
<!-- Same picture, different sizes: the browser picks the best file -->
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 960w, large.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="Mountain view" width="1600" height="900">

<!-- Different formats or crops: the browser uses the first <source> it supports -->
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <source media="(max-width: 600px)" srcset="photo-square.jpg">
  <img src="photo.jpg" alt="Mountain view" width="1600" height="900">
</picture>
```

- `srcset` with `w` lists each file's real width. `sizes` tells the browser how wide the image will be shown, so it can pick a file before the CSS loads.
- `<picture>` is for **format fallbacks** (AVIF → WebP → JPEG) and **art direction** (a different crop on phones). The `<img>` inside is required: it carries the `alt` and is the fallback.

## Image formats

| Format | Use for |
| --- | --- |
| AVIF | photos, smallest files (supported by all major browsers) |
| WebP | photos and transparency, small files, universal support |
| JPEG | photo fallback |
| PNG | lossless images, screenshots, transparency when WebP isn't an option |
| SVG | icons, logos, diagrams (scales without blur) |
| GIF | avoid: use a muted, looping `<video>` for animations (much smaller) |

> [!question] Recall
> 1. Relative vs root-relative vs absolute URL?
> 2. Why is `alt` important, and when should it be empty?
> 3. Do you still need `rel="noopener"` on `target="_blank"` links? What does `noreferrer` add?
> 4. Which image should get `fetchpriority="high"`, and which images should be lazy?
> 5. When do you need `<picture>` instead of `srcset`?

Prev: [[03 HTML Text Elements|3. Text Elements]] · Next: [[05 HTML Lists and Tables|5. Lists and Tables]]
