---
title: 6. Semantic HTML
tags:
  - HTML
---

> [!summary] In one line
> Semantic tags say **what a section is** (`<nav>`, `<article>`), not just "a box" (`<div>`). Better for screen readers, SEO and your future self.

```html
<body>
  <header>
    <h1>My Blog</h1>
    <nav>
      <ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li></ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Learning HTML</h2>
      <p>Posted <time datetime="2026-10-03">3 Oct 2026</time></p>
      <section>
        <h3>Why semantics?</h3>
        <p>…</p>
      </section>
    </article>

    <aside>Related posts</aside>
  </main>

  <footer>&copy; 2026 Me</footer>
</body>
```

```
┌──────────── header ────────────┐
│   logo        nav              │
├────────────── main ────────────┤
│  article               │ aside │
│   └ section            │       │
├──────────── footer ────────────┤
```

| Tag | Use for | 🧠 |
| --- | --- | --- |
| `<header>` | intro area: logo, title, nav | top of the newspaper |
| `<nav>` | main navigation links | the map |
| `<main>` | the unique main content (one per page) | the main story |
| `<article>` | self-contained, makes sense on its own (post, card, comment) | could be **re-published** alone |
| `<section>` | a themed group with a heading | a chapter |
| `<aside>` | side content (sidebar, related links) | a side note |
| `<footer>` | bottom info: copyright, contacts | the fine print |
| `<figure>` / `<figcaption>` | image/diagram + caption | |
| `<time>` | dates/times (machine-readable) | |
| `<address>` | contact info | |
| `<details>` / `<summary>` | built-in collapsible | |

> [!tip] 🧠 Remember it
> **article vs section:** "Could I post this on another site and it still makes sense?" Yes → `article`. No, it's just part of something bigger → `section`.
> **div is the last resort**: only when nothing else fits (usually just for styling).

## Why it matters

1. **Accessibility**: screen-reader users jump between landmarks (`main`, `nav`) → [[08 HTML Accessibility|Accessibility]]
2. **SEO**: search engines understand the page structure
3. **Readable code**: `</nav>` beats `</div></div></div>`

### Built-in accordion, no JS

```html
<details>
  <summary>What is HTML?</summary>
  The structure of a web page.
</details>
```

> [!question] Recall
> 1. Name 6 semantic layout tags.
> 2. `article` vs `section`?
> 3. Give three reasons semantic HTML matters.
