---
title: 4. Lists and Tables
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

<ol start="1" type="1">    <!-- Ordered: numbers, order matters (type: 1, A, a, I, i) -->
  <li>Preheat oven</li>
  <li>Bake</li>
</ol>

<dl>                       <!-- Description list: term + definition -->
  <dt>HTML</dt>
  <dd>Structure of a web page</dd>
</dl>
```

> [!tip] 🧠 Remember it
> **ul = Unordered (shopping list), ol = Ordered (recipe steps), dl = Dictionary.** Only `<li>` can be a direct child of `ul`/`ol`.

Nested list: put a new `<ul>` *inside* an `<li>`. Navigation menus are usually a `<ul>` of links inside `<nav>`.

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

| Tag | Means | 🧠 |
| --- | --- | --- |
| `<table>` | the table | |
| `<tr>` | table **row** | **t**able **r**ow |
| `<th>` | header cell (bold, centred) | **t**able **h**eader |
| `<td>` | data cell | **t**able **d**ata |
| `<thead> <tbody> <tfoot>` | head, body, foot groups | |
| `colspan` / `rowspan` | merge cells across columns / rows | |
| `<caption>` | table title (accessibility) | |

🧠 **A table is built row by row: `tr` first, cells inside.** Rows hold cells; there's no "column" tag for content.

> [!warning] Common mistakes
> - Using tables for page layout: use [[CSS3 Notebook/index|CSS]] Grid/Flexbox.
> - Missing `<th>` and `scope`: screen readers can't tell which header a cell belongs to.

> [!question] Recall
> 1. When do you use `ol` instead of `ul`?
> 2. What do `tr`, `th`, `td` stand for?
> 3. How do you make a cell span 3 columns?
