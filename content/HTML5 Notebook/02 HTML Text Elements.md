---
title: 2. Text Elements
tags:
  - HTML
---

> [!summary] In one line
> Pick the tag for what the text **means**, not how it looks. Looks are CSS's job.

## Headings

```html
<h1>Page title</h1>     <!-- one per page -->
<h2>Section</h2>
<h3>Sub-section</h3>    <!-- … down to h6 -->
```

🧠 **Headings are a book's table of contents:** h1 = book title, h2 = chapters, h3 = sub-chapters. Don't skip levels just to get smaller text.

## Paragraphs and breaks

```html
<p>A paragraph of text.</p>
Line one<br>Line two      <!-- line break inside a paragraph (addresses, poems) -->
<hr>                      <!-- thematic break (topic change) -->
```

## Inline formatting: meaning vs looks

| Meaning (use these ✅) | Just looks (avoid) | Shows as |
| --- | --- | --- |
| `<strong>` important | `<b>` bold | **bold** |
| `<em>` stressed emphasis | `<i>` italic | *italic* |
| `<mark>` highlighted | | highlight |
| `<del>` / `<ins>` removed / added | `<s>` | ~~strike~~ |
| `<small>` side comment / fine print | | small |
| `<code>`, `<kbd>`, `<pre>` | | code, keyboard key, preformatted |
| `<sub>` / `<sup>` | | H₂O / x² |
| `<abbr title="…">` | | abbreviation with tooltip |
| `<blockquote>`, `<q>`, `<cite>` | | quotes and sources |

> [!tip] 🧠 Remember it
> **strong & em speak (screen readers stress them); b & i only dress.**

## Block vs inline

| Block | Inline |
| --- | --- |
| starts on a new line, takes full width | flows inside text, only as wide as content |
| `div, p, h1–h6, ul, li, section, form, table` | `span, a, strong, em, img, code, input` |

🧠 **Block = a brick (own row), inline = a word in a sentence.**

`<div>` (block) and `<span>` (inline) are **generic containers** with no meaning; use them only when no semantic tag fits.

## Entities

| Write | To show |
| --- | --- |
| `&lt;` `&gt;` | < > |
| `&amp;` | & |
| `&nbsp;` | non-breaking space |
| `&copy;` | © |

> [!question] Recall
> 1. `<strong>` vs `<b>`?
> 2. Name 3 block and 3 inline elements.
> 3. How many `<h1>`s should a page have?
