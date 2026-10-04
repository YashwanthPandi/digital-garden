---
title: 1. Introduction and Document Structure
tags:
  - HTML
---

> [!summary] In one line
> HTML (HyperText Markup Language) describes **what each piece of content is** (heading, paragraph, link, image) using **tags**. It's not a programming language: it has no logic.

> [!tip] 🧠 Remember it
> **HTML = the skeleton 🦴, CSS = the skin and clothes 👕, JavaScript = the muscles 💪.**

## Tags, elements, attributes

```html
<a href="https://mdn.io" target="_blank">MDN</a>
```

- **Tag**: `<a>` (opening) and `</a>` (closing)
- **Element**: opening tag + content + closing tag
- **Attribute**: extra info inside the opening tag, `name="value"` (`href`, `target`)
- **Void (self-closing) elements** have no content or closing tag: `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`, `<link>`

🧠 **Tag = the label, element = the whole package, attribute = the sticker with extra details.**

## The boilerplate

In VS Code type `!` then Tab to generate it.

```html
<!DOCTYPE html>                 <!-- "this is HTML5", keeps the browser in standards mode -->
<html lang="en">                <!-- root; lang helps screen readers & SEO -->
  <head>                        <!-- info ABOUT the page (not shown) -->
    <meta charset="UTF-8">      <!-- supports all characters, emoji -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- mobile-friendly -->
    <title>My Page</title>      <!-- browser tab + search result title -->
    <link rel="stylesheet" href="style.css">
    <script src="app.js" defer></script>
  </head>
  <body>                        <!-- everything VISIBLE -->
    <h1>Hello, world!</h1>
  </body>
</html>
```

> [!tip] 🧠 Remember it
> **head = the brain (thinks, isn't seen), body = the body (what people see).**

## Nesting rules

Close tags in the reverse order you opened them, like boxes inside boxes:

```html
<p>This is <strong>correct</strong></p>
<p>This is <strong>wrong</p></strong>   <!-- ❌ -->
```

Parent / child / sibling: `<ul>` is the **parent** of its `<li>` **children**; the `<li>`s are **siblings**.

## Comments and whitespace

```html
<!-- comments are not displayed -->
```

Multiple spaces and newlines collapse into **one space**. Use CSS for spacing, not `&nbsp;` spam.

## What's new in HTML5?

- Short `<!DOCTYPE html>`
- **Semantic** tags: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` → [[06 HTML Semantic HTML|Semantic HTML]]
- Native `<audio>`, `<video>`, `<canvas>`, `<svg>` (no Flash) → [[07 HTML Media and Graphics|Media]]
- New input types (`email`, `date`, `range`…) and built-in validation → [[05 HTML Forms|Forms]]
- APIs: localStorage, geolocation, drag & drop, web workers → [[09 HTML5 APIs|HTML5 APIs]]

> [!question] Recall
> 1. Difference between a tag, an element and an attribute?
> 2. What goes in `<head>` vs `<body>`?
> 3. Why include the viewport meta tag?
