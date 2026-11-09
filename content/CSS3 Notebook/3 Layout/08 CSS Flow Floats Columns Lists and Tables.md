---
title: 8. Flow, Floats, Columns, Lists and Tables
tags:
  - CSS
---

> [!summary] In one line
> **Normal flow** is how boxes lay out before you add any layout CSS. **Floats** wrap text around images, **multi-column** splits text into newspaper columns, and lists and tables have their own properties for markers, borders and spacing.

## Flow layout (normal flow)

Without `display: flex`, `grid` or `position`, the browser uses **flow layout**:

- **Block** boxes stack top to bottom, each on its own line, full width.
- **Inline** boxes sit side by side in lines of text and wrap at the edge.
- Vertical margins between blocks **collapse** → [[CSS3 Notebook/1 Foundations/03 CSS Box Model|Box Model]].

```
┌───────── block: <h1> ─────────┐
├───────── block: <p> ──────────┤
│ inline <a> inline <strong>    │
│ text wraps to the next line…  │
└───────────────────────────────┘
```

Things that take an element **out of flow**: `float`, `position: absolute` / `fixed`. Flex and grid change how their **children** are laid out.

> [!tip] Remember it
> **Flow layout is how water fills a glass:** blocks settle one on top of the other, inline text pours along each line. Layout CSS is the ice cubes you drop in.

**A new block formatting context** (`display: flow-root`, or flex/grid, or `overflow` other than `visible`) contains floats and stops margins from collapsing through its edge.

## Floating elements

```css
.article img.left {
  float: left;                 /* left | right | none | inline-start | inline-end */
  margin: 0 1rem 1rem 0;
  width: 40%;
}
.clear { clear: both; }        /* start below any floats */
.container { display: flow-root; }   /* the modern "clearfix": contains its floated children */
```

Floats were made for **wrapping text around an image**, like a magazine. They used to be used for whole page layouts, which needed hacks (clearfix). **Use Flexbox or Grid for layout today**; keep `float` for text wrap.

`shape-outside: circle(50%)` makes text follow the shape of a round floated image.

## Multi-column layout

```css
.article {
  columns: 3 250px;            /* up to 3 columns, each at least 250px wide */
  column-gap: 2rem;
  column-rule: 1px solid #ddd; /* a line between columns */
}
.article h2 { column-span: all; }       /* a heading across every column */
.article figure { break-inside: avoid; } /* don't split a figure between columns */
```

Content flows down the first column, then into the next. Good for long text, link lists, and masonry-style card walls. Avoid it for long articles on screens: readers have to scroll back up for each column.

## Lists

```css
ul { list-style: square inside; }          /* type position image */
ol { list-style-type: upper-roman; }       /* decimal, lower-alpha, upper-roman, … */
.nav { list-style: none; margin: 0; padding: 0; display: flex; gap: 1rem; }   /* nav menu */

li::marker { color: tomato; font-weight: 700; }   /* style the bullet or number */
ol { counter-reset: step; }
ol li { counter-increment: step; }
ol li::before { content: "Step " counter(step) ": "; }   /* custom numbering */
```

| Property | Does |
| --- | --- |
| `list-style-type` | `disc`, `circle`, `square`, `decimal`, `lower-alpha`, `upper-roman`, `none`, or a string `"→ "` |
| `list-style-position` | `outside` (default, marker hangs left) / `inside` (marker inside the text box) |
| `list-style-image` | an image as the bullet (`::marker` or `::before` give more control) |
| `::marker` | style the bullet or number itself |

> [!warning] `list-style: none` in Safari
> VoiceOver in Safari stops announcing a list as a list when its markers are removed with CSS. If the "list" meaning matters (a nav menu), add `role="list"` to the `<ul>`.

## Tables

```css
table {
  border-collapse: collapse;   /* single shared borders instead of double */
  width: 100%;
  table-layout: fixed;         /* column widths from the first row: faster, predictable */
}
th, td {
  border: 1px solid #ddd;
  padding: 0.5rem 0.75rem;
  text-align: left;
}
thead th { background: #f4f4f5; position: sticky; top: 0; }   /* header stays while scrolling */
tbody tr:nth-child(even) { background: #fafafa; }               /* zebra stripes */
td.amount { text-align: right; font-variant-numeric: tabular-nums; }   /* line up numbers */
caption { caption-side: bottom; font-size: 0.875rem; }
```

| Property | Does |
| --- | --- |
| `border-collapse` | `collapse` (shared borders) / `separate` (gaps between cells) |
| `border-spacing` | gap between cells when `separate` |
| `table-layout` | `auto` (sized by content) / `fixed` (sized by the first row and `width`) |
| `caption-side` | caption above or below |
| `vertical-align` | top / middle / bottom of a cell |

For wide tables on phones, wrap them in a scrolling container → [[HTML Notebook/1 Content/05 HTML Lists and Tables|HTML Lists and Tables]].

> [!question] Recall
> 1. What is normal flow? What takes an element out of it?
> 2. What are floats for today? How do you make a container wrap around its floated children?
> 3. Write CSS for three newspaper columns with a line between them.
> 4. How do you remove bullets from a nav list, and what accessibility problem can that cause?
> 5. What does `border-collapse: collapse` change? How do you make a table header stay visible while scrolling?

Prev: [[07 CSS Display and Positioning|7. Display and Positioning]] · Next: [[09 CSS Flexbox|9. Flexbox]]
