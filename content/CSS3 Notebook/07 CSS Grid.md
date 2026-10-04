---
title: 7. Grid
tags:
  - CSS
---

> [!summary] In one line
> Grid lays out items in **two dimensions**, rows *and* columns at once. Perfect for page layouts and card galleries.

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;   /* 3 columns: fixed + two equal shares */
  grid-template-rows: auto 1fr auto;
  gap: 1rem;                               /* row-gap & column-gap */
}
```

**`fr`** = fraction of the free space. `1fr 2fr` → second column is twice as wide.

> [!tip] 🧠 Remember it
> **Flexbox = one line of people (1D). Grid = a chessboard (2D).**
> Use **Flexbox for components** (navbars, buttons in a row), **Grid for layouts** (the page, galleries). They work great together.

## repeat, minmax, auto-fit

```css
grid-template-columns: repeat(3, 1fr);               /* 3 equal columns */

/* ⭐ responsive cards with NO media queries */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

🧠 **"Fit as many 250px+ columns as you can, then stretch them to fill."** Memorise this line; it's used everywhere.

## Placing items with lines

Lines are numbered from 1 at the left/top edge.

```css
.hero { grid-column: 1 / -1; }      /* span from first line to last line (full width) */
.side { grid-row: 2 / 4; }          /* from row line 2 to 4 */
.wide { grid-column: span 2; }      /* take 2 columns */
```

## Named areas (the readable way)

```css
.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100dvh;
}
header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }

@media (max-width: 700px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main" "sidebar" "footer";
  }
}
```

🧠 **grid-template-areas is drawing the layout in ASCII art.**

## Alignment

| Property | Aligns |
| --- | --- |
| `justify-items` / `align-items` | items inside their cells (row axis / column axis) |
| `justify-content` / `align-content` | the whole grid inside the container |
| `place-items: center` | shorthand for both → perfect centring |

🎮 Practice: [Grid Garden](https://cssgridgarden.com).

> [!question] Recall
> 1. When to use Grid vs Flexbox?
> 2. What does `1fr` mean?
> 3. Write the one-liner for responsive auto-wrapping cards.
