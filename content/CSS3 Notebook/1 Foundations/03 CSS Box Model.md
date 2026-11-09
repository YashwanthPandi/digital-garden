---
title: 3. Box Model
tags:
  - CSS
---

> [!summary] In one line
> Every element is a box made of **content → padding → border → margin**, from inside out.

```
┌──────────── margin (outside space, transparent) ──────────┐
│  ┌──────────── border ─────────────────────────────────┐  │
│  │  ┌──────── padding (inside space, has background) ┐ │  │
│  │  │          content (width × height)              │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

> [!tip] Remember it
> **A framed photo:** the photo is the **content**, the white mat around it is **padding**, the frame is the **border**, and the gap between it and the next frame on the wall is **margin**.
> Order inside-out: **"C-P-B-M": "Can People Be Mean?"**

## box-sizing

```css
.box { width: 200px; padding: 20px; border: 5px solid; }
```

- `content-box` (default): total width = 200 + 40 + 10 = **250px**
- `border-box`: total width = **200px**; padding and border fit inside

```css
*, *::before, *::after { box-sizing: border-box; }   /* put this in every project */
```

## Width and height

```css
.card {
  width: 100%;
  max-width: 600px;        /* never wider than 600px */
  min-height: 200px;       /* at least 200px tall, grows with content */
  height: auto;            /* default: as tall as the content */
}
```

- Prefer `max-width` and `min-height` over fixed `width` and `height`: fixed sizes overflow when the content or screen changes.
- Percentages are relative to the parent's width (for `width`) or height (for `height`, only if the parent has a set height).
- Inline elements ignore `width` and `height` → [[CSS3 Notebook/3 Layout/07 CSS Display and Positioning|Display]].

## Padding and margin

**Padding** is space **inside** the border (it shows the background). **Margin** is space **outside** the border (always transparent). Margins can be negative and `auto`; padding can't be either.

## Shorthand (clockwise from the top)

```css
margin: 10px;                 /* all four */
margin: 10px 20px;            /* top/bottom  left/right */
margin: 10px 20px 30px;       /* top  left/right  bottom */
margin: 10px 20px 30px 40px;  /* top right bottom left */
margin: 0 auto;               /* centre a block with a width */
```

**"TRouBLe": Top, Right, Bottom, Left** (clockwise like a clock from 12).

## Borders and corners

```css
border: 2px solid #333;       /* width style colour */
border-radius: 8px;           /* rounded corners; 50% = circle */
outline: 2px solid blue;      /* like border but takes no space (focus rings) */
box-shadow: 0 4px 12px rgb(0 0 0 / .15);  /* x y blur colour */
```

More on outlines and shadows: [[CSS3 Notebook/2 Styling Content/06 CSS Backgrounds Borders and Effects|Backgrounds, Borders and Effects]].

```css
```

## Margin collapse

Vertical margins of two **block** siblings don't add up: the **bigger one wins**. `margin-bottom: 20px` + `margin-top: 30px` = **30px** gap. (Doesn't happen in flex/grid.)

## Overflow

```css
overflow: visible | hidden | scroll | auto;  /* auto = scrollbars only when needed */
```

> [!question] Recall
> 1. Name the 4 layers from inside out.
> 2. Why use `box-sizing: border-box`?
> 3. What does `margin: 10px 20px` mean?

Prev: [[02 CSS Selectors and Specificity|2. Selectors and Specificity]] · Next: [[04 CSS Colors Units and Typography|4. Colors, Units and Typography]]
