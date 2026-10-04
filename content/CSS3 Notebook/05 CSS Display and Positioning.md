---
title: 5. Display and Positioning
tags:
  - CSS
---

> [!summary] In one line
> `display` decides **how a box flows** with others; `position` lets you **move it out** of the normal flow.

## display

| Value | Behaviour |
| --- | --- |
| `block` | new line, full width, width/height work |
| `inline` | flows in text, **width/height/vertical margin ignored** |
| `inline-block` | flows in text **but** width/height work (buttons, badges) |
| `none` | removed completely (no space) |
| `flex` | children laid out in a row/column → [[06 CSS Flexbox\|Flexbox]] |
| `grid` | children laid out in rows *and* columns → [[07 CSS Grid\|Grid]] |

🧠 **inline-block = "inline on the outside, block on the inside".**

### Hiding things

| | Takes space? | Clickable / read by screen reader? |
| --- | --- | --- |
| `display: none` | no | no |
| `visibility: hidden` | **yes** (empty gap) | no |
| `opacity: 0` | yes | **yes** (still clickable!) |

## position

```css
.static   { position: static; }    /* default, normal flow; top/left do nothing */
.relative { position: relative; top: 10px; }  /* nudged from its normal spot; space kept */
.absolute { position: absolute; top: 0; right: 0; }  /* removed from flow, placed in nearest positioned ancestor */
.fixed    { position: fixed; bottom: 20px; right: 20px; }  /* stuck to the screen (chat button) */
.sticky   { position: sticky; top: 0; }  /* normal until you scroll to it, then sticks (table headers, navbars) */
```

> [!tip] 🧠 Remember it
> - **relative** = "move me a bit from where I'd normally be."
> - **absolute** = "pin me inside my nearest positioned parent." → give the parent `position: relative`.
> - **fixed** = "glue me to the screen glass."
> - **sticky** = "scroll with the page until I hit the top, then stick like a magnet."

### Classic pattern: badge in a corner

```css
.card  { position: relative; }               /* the anchor */
.badge { position: absolute; top: 8px; right: 8px; }
```

## z-index

Higher `z-index` = closer to you. Only works on **positioned** elements (or flex/grid children). Elements with `opacity < 1`, `transform`, etc. create a new **stacking context**, so a child can't escape above an outer sibling no matter how big its z-index.

🧠 **z-index = floors of a building; but you can only compare floors within the same building (stacking context).**

## Centering cheat sheet

```css
.center-text  { text-align: center; }                 /* inline content */
.center-block { width: 300px; margin: 0 auto; }       /* block with width */
.center-any   { display: grid; place-items: center; } /* anything, both axes ✅ */
.center-flex  { display: flex; justify-content: center; align-items: center; }
```

> [!question] Recall
> 1. Why don't `width` and `height` work on a `<span>`?
> 2. `display: none` vs `visibility: hidden`?
> 3. What is an absolutely positioned element positioned relative to?
