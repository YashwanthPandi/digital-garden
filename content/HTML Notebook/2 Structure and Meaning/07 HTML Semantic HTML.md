---
title: 7. Semantic HTML
aliases:
  - html5-notebook/06-html-semantic-html
tags:
  - HTML
---

> [!summary] In one line
> Semantic elements say **what a section is** (`<nav>`, `<article>`); a `<div>` only says "a box". Screen readers, search engines and other developers all rely on that meaning.

```html
<body>
  <header>
    <a href="/">My Blog</a>
    <nav aria-label="Main">
      <ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li></ul>
    </nav>
    <search>
      <form action="/search"><input type="search" name="q" aria-label="Search posts"></form>
    </search>
  </header>

  <main>
    <article>
      <h1>Learning HTML</h1>
      <p>Posted <time datetime="2026-10-03">3 Oct 2026</time></p>
      <section>
        <h2>Why semantics?</h2>
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
│   logo      nav      search    │
├────────────── main ────────────┤
│  article               │ aside │
│   └ section            │       │
├──────────── footer ────────────┤
```

| Element | Use for | Memory trick |
| --- | --- | --- |
| `<header>` | intro area: logo, title, nav | top of the newspaper |
| `<nav>` | major navigation blocks | the map |
| `<search>` | the search or filter area of the page | the information desk |
| `<main>` | the main content (one visible per page) | the main story |
| `<article>` | self-contained, makes sense on its own (post, product card, comment) | could be **re-published** alone |
| `<section>` | a themed group that has its own heading | a chapter |
| `<aside>` | related but separate content (sidebar, pull quote) | a side note |
| `<footer>` | closing info: copyright, contacts, related links | the fine print |
| `<figure>` / `<figcaption>` | image, diagram or code + caption | a captioned photo |
| `<time>` | dates and times in a machine-readable form | a calendar entry |
| `<address>` | contact info **for the page or article's author** (not any postal address) | the author's business card |
| `<details>` / `<summary>` | built-in disclosure (show/hide) | a folded note |
| `<dialog>` | a dialog box or modal → [[HTML Notebook/3 Forms and Interactivity/10 HTML Modern Features\|Modern HTML Features]] | a pop-up window |

> [!tip] Remember it
> **article vs section:** "Could I post this on another site and it still makes sense?" Yes → `article`. No, it's part of something bigger → `section`.
> **div is the last resort**: only when nothing else fits (usually for styling or layout).

## Landmarks

Screen readers list these elements as **landmarks** so users can jump straight to them:

| Element | Landmark | Notes |
| --- | --- | --- |
| `<header>` (directly in `<body>`) | banner | inside an `<article>` it's not a landmark |
| `<nav>` | navigation | label several navs: `aria-label="Main"`, `aria-label="Footer"` |
| `<search>` | search | new element; before it, people wrote `<form role="search">` |
| `<main>` | main | |
| `<aside>` | complementary | |
| `<footer>` (directly in `<body>`) | contentinfo | |
| `<section>` | region | **only** when it has an accessible name (`aria-labelledby`) |
| `<form>` | form | only when it has an accessible name |

## Why it matters

1. **Accessibility**: screen-reader users jump between landmarks and headings → [[HTML Notebook/2 Structure and Meaning/08 HTML Accessibility|Accessibility]]
2. **SEO and AI tools**: search engines and assistants understand the page structure and find the main content
3. **Built-in behaviour**: `<details>`, `<dialog>`, `<button>` work without JavaScript
4. **Readable code**: `</nav>` beats `</div></div></div>`

### Built-in accordion, no JavaScript

```html
<details name="faq" open>
  <summary>What is HTML?</summary>
  The structure of a web page.
</details>
<details name="faq">
  <summary>What is CSS?</summary>
  The styling of a web page.
</details>
```

`open` starts it expanded. Giving several `<details>` the **same `name`** makes an **exclusive accordion**: opening one closes the others.

> [!question] Recall
> 1. Name 6 semantic layout elements.
> 2. `article` vs `section`? When does a `<section>` become a landmark?
> 3. What is `<search>` for, and what did people write before it existed?
> 4. Give three reasons semantic HTML matters.
> 5. How do you make an accordion where only one item can be open?

Prev: [[06 HTML Media and Graphics|6. Media and Graphics]] · Next: [[08 HTML Accessibility|8. Accessibility]]
