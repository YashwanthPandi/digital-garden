---
title: 1. Introduction and Document Structure
aliases:
  - html5-notebook/01-html-introduction-and-document-structure
tags:
  - HTML
---

> [!summary] In one line
> HTML (HyperText Markup Language) describes **what each piece of content is** (heading, paragraph, link, image) using **tags**. It's not a programming language: it has no logic.

> [!tip] Remember it
> **HTML = the skeleton, CSS = the skin and clothes, JavaScript = the muscles.**

## Markup languages and frontend development

A **markup language** wraps content in labels (tags) that describe it. It has no variables, loops or logic. HTML is a markup language; so are XML (data files), SVG (graphics) and Markdown (these notes).

**Frontend development** is building the part of a website that runs in the browser: HTML for structure, CSS for looks, JavaScript for behaviour. The **backend** runs on a server: databases, logins, business rules.

## How the web works

```
You type example.com
   │
   ▼
1. DNS: "example.com" → 203.0.113.10    (the domain name becomes an IP address)
2. The browser connects to that server (HTTPS: encrypted)
3. HTTP request:   GET /index.html
4. HTTP response:  200 OK + the HTML file
5. The browser reads the HTML, then fetches the CSS, JavaScript and images it links to
6. It builds the page: DOM + CSSOM → layout → paint
```

| Term | Means |
| --- | --- |
| **Browser** | the app that fetches and draws pages (Chrome, Firefox, Safari, Edge) using a rendering engine (Blink, Gecko, WebKit) |
| **HTTP / HTTPS** | the request/response rules browsers and servers use; HTTPS adds encryption (TLS) |
| **Domain name** | a human-friendly name (`example.com`) you rent from a registrar |
| **DNS** | the Domain Name System: the internet's phone book that turns names into IP addresses |
| **IP address** | the number that identifies a server (`203.0.113.10`) |
| **Hosting** | a computer that stores your files and answers requests: static hosts (GitHub Pages, Netlify, Vercel, Cloudflare Pages) or full servers |
| **HTML / CSS / JavaScript** | structure / presentation / behaviour |
| **SEO** | search engine optimisation: helping search engines understand and rank pages → [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO\|Meta Tags and SEO]] |

> [!tip] Remember it
> **Domain = the shop's name, DNS = the directory that gives you its street address (IP), hosting = the shop building, HTTP = the conversation at the counter.**

## Tags, elements, attributes

```html
<a href="https://developer.mozilla.org" target="_blank">MDN</a>
```

- **Tag**: `<a>` (opening) and `</a>` (closing)
- **Element**: opening tag + content + closing tag
- **Attribute**: extra info inside the opening tag, `name="value"` (`href`, `target`)
- **Boolean attributes** are on when present: `<input required>`, `<video controls>`. Don't write `required="false"`: it's still on.
- **Void elements** have no content or closing tag: `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`, `<link>`, `<source>`. The trailing slash in `<img />` is allowed but does nothing in HTML. Pick one style and stay consistent.

> [!tip] Remember it
> **Tag = the label, element = the whole package, attribute = the sticker with extra details.**

### Case insensitivity

HTML tag and attribute names are **case-insensitive**: `<P CLASS="x">` works the same as `<p class="x">`. Write them in **lowercase**: it's the universal convention and required in XHTML and SVG-in-XML. Attribute **values** can be case-sensitive (`class="Card"` and `class="card"` are different classes; ids and file names too).

### Global attributes

These work on (almost) every element:

| Attribute | Does |
| --- | --- |
| `id` | a unique name for one element (links `#id`, labels, JavaScript) |
| `class` | one or more reusable names for CSS and JavaScript (`class="card featured"`) |
| `style` | inline CSS for this element only (avoid: hard to maintain) |
| `data-*` | your own data, read in JavaScript with `el.dataset` (`data-user-id="42"` → `el.dataset.userId`) |
| `lang` | the language of the content |
| `title` | extra advisory text, shown as a tooltip (not reliable for touch or screen readers) |
| `hidden` | hide the element |
| `tabindex` | change keyboard focus behaviour → [[HTML Notebook/2 Structure and Meaning/08 HTML Accessibility\|Accessibility]] |
| `inert`, `popover` | → [[HTML Notebook/3 Forms and Interactivity/10 HTML Modern Features\|Modern HTML Features]] |
| `contenteditable`, `draggable`, `spellcheck`, `translate`, `dir` | editing, drag and drop, spell check, translation tools, text direction |

```html
<article id="post-42" class="card featured" data-category="html" lang="en">…</article>
```

## The boilerplate

In VS Code type `!` then Tab to generate it.

```html
<!doctype html>                 <!-- standards mode (without it: "quirks mode") -->
<html lang="en">                <!-- root; lang helps screen readers, translation and SEO -->
  <head>                        <!-- info ABOUT the page (not shown) -->
    <meta charset="utf-8">      <!-- first in <head>: every language and symbol works -->
    <meta name="viewport" content="width=device-width, initial-scale=1">  <!-- mobile-friendly -->
    <title>My Page</title>      <!-- browser tab + search result title -->
    <meta name="description" content="One sentence about this page.">
    <link rel="icon" href="/favicon.svg">
    <link rel="stylesheet" href="style.css">
    <script type="module" src="app.js"></script>   <!-- modules are deferred automatically -->
  </head>
  <body>                        <!-- everything VISIBLE -->
    <h1>Hello, world</h1>
  </body>
</html>
```

The doctype is case-insensitive: `<!doctype html>` and `<!DOCTYPE html>` are the same. It doesn't name a version any more. Its only job is to keep the browser out of quirks mode (an old compatibility mode with different layout rules).

> [!tip] Remember it
> **head = the brain (thinks, isn't seen), body = the body (what people see).**

## Adding CSS and JavaScript

```html
<!-- External CSS: a separate file, shared by every page (use this) -->
<link rel="stylesheet" href="style.css">

<!-- Internal CSS: a <style> block in <head>, for this page only -->
<style>
  h1 { color: teal; }
</style>

<!-- Inline CSS: the style attribute, for one element (avoid) -->
<p style="color: red;">Warning</p>

<!-- JavaScript: external file, in <head> with defer or type="module" -->
<script src="app.js" defer></script>
<script type="module" src="main.js"></script>

<!-- Inline script (small snippets only) -->
<script>console.log('hello');</script>
```

| Way | Pros | Cons |
| --- | --- | --- |
| External | reusable, cached by the browser, clean HTML | one more request |
| Internal | no extra file | not shared between pages |
| Inline | quick test | can't reuse, overrides almost everything, mixes content and style |

Put scripts in `<head>` with `defer` (or `type="module"`) so they download early but run after the HTML is parsed. The old advice "put scripts at the end of `<body>`" was for browsers without `defer`. More in [[CSS3 Notebook/1 Foundations/01 CSS Introduction and Syntax|CSS Introduction]] and [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO|Meta Tags and SEO]].

## Nesting rules

Close tags in the reverse order you opened them, like boxes inside boxes:

```html
<p>This is <strong>correct</strong></p>
<p>This is <strong>wrong</p></strong>   <!-- wrong -->
```

Parent / child / sibling: `<ul>` is the **parent** of its `<li>` **children**; the `<li>`s are **siblings**.

Some content can't go inside other content. A `<p>` can't contain a `<div>` or another `<p>`, and an `<a>` can't contain another `<a>` or a `<button>`. Check your markup with the [W3C validator](https://validator.w3.org/nu/).

## Comments and whitespace

```html
<!-- comments are not displayed, but anyone can read them in View Source -->
```

Multiple spaces and newlines collapse into **one space**. Use CSS for spacing, not repeated `&nbsp;`.

## HTML today: the Living Standard

"HTML5" (2014) was the last numbered version. Since 2019 there's one specification, the **HTML Living Standard** by WHATWG, which browser makers update continuously. When you read "HTML5" in a job ad, it means modern HTML.

What modern HTML gives you, by chapter:

- **Semantic** elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<search>`, `<footer>` → [[HTML Notebook/2 Structure and Meaning/07 HTML Semantic HTML|Semantic HTML]]
- Native `<audio>`, `<video>`, `<canvas>`, `<svg>` → [[HTML Notebook/1 Content/06 HTML Media and Graphics|Media]]
- Input types (`email`, `date`, `range`…), `autocomplete` and built-in validation → [[HTML Notebook/3 Forms and Interactivity/09 HTML Forms|Forms]]
- Lazy loading and loading priority for images and iframes → [[HTML Notebook/1 Content/04 HTML Links and Images|Links and Images]]
- Browser APIs: storage, workers, observers, drag and drop → [[HTML Notebook/3 Forms and Interactivity/11 HTML Web APIs|Web APIs]]
- Interactive elements that used to need JavaScript: `<dialog>`, popovers, exclusive accordions, `inert` → [[HTML Notebook/3 Forms and Interactivity/10 HTML Modern Features|Modern HTML Features]]

Check browser support on [Baseline](https://web.dev/baseline) or [Can I use](https://caniuse.com) before relying on a brand-new feature.

> [!question] Recall
> 1. What happens between typing a domain name and seeing the page? What do DNS and hosting do?
> 2. Difference between a tag, an element and an attribute?
> 3. What goes in `<head>` vs `<body>`? Why should `<meta charset>` come first?
> 4. Are HTML tags case-sensitive? Are attribute values?
> 5. External vs internal vs inline CSS: which do you use and why?
> 6. What does the doctype do today? What is the HTML Living Standard?

Next: [[02 HTML Meta Tags and SEO|2. Meta Tags and SEO]]
