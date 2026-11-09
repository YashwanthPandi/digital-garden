---
title: 5. Lists and Tables
aliases:
  - html5-notebook/04-html-lists-and-tables
tags:
  - HTML
---

> [!summary] In one line
> **Lists** for groups of items; **tables** only for data with rows and columns (never for page layout).

## Lists

```html
<ul>                       <!-- Unordered: bullets, order doesn't matter -->
  <li>Milk</li>
  <li>Bread</li>
</ul>

<ol>                       <!-- Ordered: numbers, order matters -->
  <li>Preheat oven</li>
  <li>Bake</li>
</ol>

<dl>                       <!-- Description list: term + definition -->
  <dt>HTML</dt>
  <dd>Structure of a web page</dd>
</dl>
```

> [!tip] Remember it
> **ul = Unordered (shopping list), ol = Ordered (recipe steps), dl = Dictionary.** Only `<li>` can be a direct child of `ul`/`ol`.

Nested list: put a new `<ul>` *inside* an `<li>`. Navigation menus are usually a `<ul>` of links inside `<nav>`.

Useful `<ol>` attributes: `start="5"` (begin at 5), `reversed` (count down, e.g. a top-10 list), and `type="a"` / `"A"` / `"i"` / `"I"` when the marker style is part of the meaning (legal clauses). For purely visual changes, use CSS `list-style-type`.

## Tables

```html
<table>
  <caption>Monthly expenses</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>₹5,000</td>
    </tr>
    <tr>
      <td colspan="2">Merged across 2 columns</td>
    </tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Total</th><td>₹5,000</td></tr>
  </tfoot>
</table>
```

| Tag | Means | Memory trick |
| --- | --- | --- |
| `<table>` | the table | |
| `<tr>` | table **row** | **t**able **r**ow |
| `<th>` | header cell (bold and centred by default) | **t**able **h**eader |
| `<td>` | data cell | **t**able **d**ata |
| `<thead> <tbody> <tfoot>` | head, body, foot groups | |
| `colspan` / `rowspan` | merge cells across columns / rows | |
| `<caption>` | table title (accessibility) | |

> [!tip] Remember it
> **A table is built row by row: `tr` first, cells inside.** Rows hold cells; there's no "column" element for content.

**Wide tables on phones:** wrap the table in a scrollable container instead of shrinking it.

```html
<div class="table-scroll" tabindex="0" role="region" aria-labelledby="expenses-caption">
  <table>
    <caption id="expenses-caption">Monthly expenses</caption>
    …
  </table>
</div>
```

```css
.table-scroll { overflow-x: auto; }
```

`tabindex="0"` lets keyboard users focus the box and scroll it with the arrow keys; `role="region"` and the label tell screen readers what it is.

> [!warning] Common mistakes
> - Using tables for page layout: use [[CSS3 Notebook/index|CSS]] Grid/Flexbox.
> - Missing `<th>` and `scope`: screen readers can't tell which header a cell belongs to.
> - Leaving out `<caption>`: it names the table for everyone, including screen-reader users.

> [!question] Recall
> 1. When do you use `ol` instead of `ul`?
> 2. What do `tr`, `th`, `td` stand for?
> 3. How do you make a cell span 3 columns?

Prev: [[04 HTML Links and Images|4. Links and Images]] · Next: [[06 HTML Media and Graphics|6. Media and Graphics]]
