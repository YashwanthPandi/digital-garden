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

> [!tip] 🧠 Remember it
> **A framed photo 🖼️:** the photo is the **content**, the white mat around it is **padding**, the frame is the **border**, and the gap between it and the next frame on the wall is **margin**.
> Order inside-out: **"C-P-B-M": "Can People Be Mean?"**

## box-sizing

```css
.box { width: 200px; padding: 20px; border: 5px solid; }
```

- `content-box` (default): total width = 200 + 40 + 10 = **250px** 😕
- `border-box`: total width = **200px**; padding and border fit inside ✅

```css
*, *::before, *::after { box-sizing: border-box; }   /* put this in every project */
```

## Shorthand (clockwise from the top)

```css
margin: 10px;                 /* all four */
margin: 10px 20px;            /* top/bottom  left/right */
margin: 10px 20px 30px;       /* top  left/right  bottom */
margin: 10px 20px 30px 40px;  /* top right bottom left */
margin: 0 auto;               /* centre a block with a width */
```

🧠 **"TRouBLe": Top, Right, Bottom, Left** (clockwise like a clock from 12).

## Borders and corners

```css
border: 2px solid #333;       /* width style colour */
border-radius: 8px;           /* rounded corners; 50% = circle */
outline: 2px solid blue;      /* like border but takes no space (focus rings) */
box-shadow: 0 4px 12px rgb(0 0 0 / .15);  /* x y blur colour */
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
