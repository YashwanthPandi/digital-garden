---
title: 4. Colors, Units and Typography
tags:
  - CSS
---

> [!summary] In one line
> Colours in **hex / rgb / hsl**, sizes in **rem** for text and **%/vw/fr** for layout, and readable text with good `line-height`.

## Colours

```css
color: tomato;                 /* named */
color: #ff6347;                /* hex: #RRGGBB */
color: #ff634780;              /* hex with alpha (50%) */
color: rgb(255 99 71);         /* red green blue 0–255 */
color: rgb(255 99 71 / 0.5);   /* with transparency */
color: hsl(9 100% 64%);        /* hue° saturation lightness */
background: linear-gradient(to right, #6a11cb, #2575fc);
```

> [!tip] 🧠 Remember it
> **HSL is how humans think:** Hue = which colour on the wheel (0 red, 120 green, 240 blue), Saturation = how vivid, Lightness = how bright. Make a darker shade? Just lower the L.

## Units

| Unit | Relative to | Use for |
| --- | --- | --- |
| `px` | fixed pixels | borders, small details |
| `rem` | **root** (`html`) font size, usually 16px | font sizes, spacing ✅ |
| `em` | **parent's** font size (compounds!) | padding that scales with its own text |
| `%` | parent's size | widths |
| `vw` / `vh` | 1% of viewport width / height | full-screen sections |
| `dvh` | dynamic viewport height (mobile-safe) | `min-height: 100dvh` |
| `fr` | share of free space in Grid | grid columns |
| `ch` | width of "0" | `max-width: 65ch` for readable text |

🧠 **rem = Root EM** (always the same base), **em = whatever my parent says** (can snowball).

```css
html { font-size: 100%; }       /* respects user's browser setting */
h1   { font-size: 2rem; }       /* 32px */
```

### Responsive sizing functions

```css
width: min(100%, 800px);                 /* the smaller of the two */
font-size: clamp(1rem, 2.5vw, 2rem);     /* min, preferred, max */
height: calc(100vh - 60px);              /* maths with mixed units */
```

## Typography

```css
body {
  font-family: 'Inter', system-ui, sans-serif;  /* fallbacks after the first */
  font-size: 1rem;
  font-weight: 400;          /* 400 normal, 700 bold */
  line-height: 1.6;          /* unitless ✅ */
  letter-spacing: 0.01em;
}
h1 { text-transform: uppercase; text-align: center; }
a  { text-decoration: none; }
.clip { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }   /* "Long te…" */
```

Google Fonts: add the `<link>` they give you in `<head>`, then use the family name.

> [!question] Recall
> 1. `rem` vs `em`?
> 2. What do H, S, L stand for?
> 3. What does `clamp(1rem, 2.5vw, 2rem)` do?
