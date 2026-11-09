---
title: 3. Text Elements
aliases:
  - html5-notebook/02-html-text-elements
tags:
  - HTML
---

> [!summary] In one line
> Pick the element for what the text **means**, not how it looks. Looks are CSS's job.

## Headings

```html
<h1>Page title</h1>     <!-- one per page -->
<h2>Section</h2>
<h3>Sub-section</h3>    <!-- … down to h6 -->
```

> [!tip] Remember it
> **Headings are a book's table of contents:** h1 = book title, h2 = chapters, h3 = sub-chapters. Don't skip levels to get smaller text; change the size with CSS.

Screen-reader users jump between headings to scan a page, so the levels must match the structure. Nesting a heading inside `<section>` or `<article>` does **not** change its level: an `<h1>` inside a section is still announced as level 1 (the old "document outline" idea was removed from the standard). Use one `<h1>` and step down in order.

For a heading with a subtitle, group them with `<hgroup>`:

```html
<hgroup>
  <h1>Learning HTML</h1>
  <p>Notes from zero to interview ready</p>
</hgroup>
```

## Paragraphs and breaks

```html
<p>A paragraph of text.</p>
Line one<br>Line two      <!-- line break inside a paragraph (addresses, poems) -->
<hr>                      <!-- thematic break (topic change) -->
```

## Text-level elements: meaning, not looks

The standard gives every one of these a meaning. `<b>` and `<i>` are not "wrong", they mean something different from `<strong>` and `<em>`.

| Element | Means | Example |
| --- | --- | --- |
| `<strong>` | strong **importance**, seriousness, urgency | `<strong>Don't</strong> unplug during updates` |
| `<em>` | **stress** that changes the meaning of the sentence | `I <em>did</em> lock the door` |
| `<b>` | draw attention **without** extra importance | keywords, product names, the lead sentence |
| `<i>` | a different voice or mood | technical terms, foreign words, ship names, thoughts |
| `<mark>` | highlighted because it's relevant right now | search matches |
| `<s>` | no longer accurate | an old price |
| `<del>` / `<ins>` | removed from / added to the document (edits) | tracked changes |
| `<small>` | side comment, fine print | legal text, copyright |
| `<u>` | an unarticulated annotation | marking a spelling mistake (rare: it looks like a link) |
| `<code>`, `<kbd>`, `<samp>`, `<var>` | code, keyboard input, program output, variable | `<kbd>Ctrl</kbd> + <kbd>C</kbd>` |
| `<pre>` | preformatted text, whitespace kept | code blocks, ASCII art |
| `<sub>` / `<sup>` | subscript / superscript | H₂O, x², footnote marks |
| `<dfn>` | the term being **defined** right here | `<p><dfn>HTML</dfn> is the markup language of the web.</p>` |
| `<abbr title="…">` | abbreviation | `<abbr title="HyperText Markup Language">HTML</abbr>` |
| `<blockquote>`, `<q>`, `<cite>` | long quote, inline quote, title of a work | quotes and sources |
| `<time datetime="…">` | a date or time machines can read | `<time datetime="2026-11-08">8 Nov</time>` |
| `<data value="…">` | content with a machine-readable value | product IDs |

> [!tip] Remember it
> **strong = "this matters", em = "say it differently", b = "look here", i = "said in another voice".**
> If you only want bold or italic for style, use CSS (`font-weight`, `font-style`) on a `<span>`.

## Grouping text: `div` and `span`

```html
<div class="card">            <!-- block: groups a chunk of content -->
  <p>Price: <span class="price">₹499</span></p>   <!-- inline: wraps a few words -->
</div>
```

Both exist only to hang a `class` (for CSS) or an `id` (for JavaScript) on. They add no meaning.

## Block vs inline

| Block | Inline |
| --- | --- |
| starts on a new line, takes full width | flows inside text, only as wide as content |
| `div, p, h1–h6, ul, li, section, form, table` | `span, a, strong, em, img, code, input` |

> [!tip] Remember it
> **Block = a brick (own row), inline = a word in a sentence.**

"Block" and "inline" are CSS `display` values; HTML only sets the default. CSS can change any element's display. `<div>` (block) and `<span>` (inline) are **generic containers** with no meaning: use them only when no semantic element fits.

## Character references (entities)

With `<meta charset="utf-8">` you can type ©, é, ₹ or emoji characters directly. You only **need** references for characters HTML would otherwise read as markup:

| Write | To show | When |
| --- | --- | --- |
| `&lt;` | < | always in text, or the browser sees a tag |
| `&amp;` | & | when it could start a reference (`&copy` …) |
| `&quot;` | " | inside a `"…"` attribute value |
| `&nbsp;` | non-breaking space | keep "10 kg" on one line |

> [!question] Recall
> 1. `<strong>` vs `<b>`? `<em>` vs `<i>`? Give a correct use for each.
> 2. Does an `<h1>` inside a `<section>` become a level-2 heading?
> 3. Name 3 block and 3 inline elements. Who decides that an element is block or inline?
> 4. Which characters still need entities in a UTF-8 page?

Prev: [[02 HTML Meta Tags and SEO|2. Meta Tags and SEO]] · Next: [[04 HTML Links and Images|4. Links and Images]]
