---
title: 6. Backgrounds, Borders and Effects
tags:
  - CSS
---

> [!summary] In one line
> Backgrounds can be a colour, images and gradients, positioned and sized like wallpaper. Borders, outlines and shadows frame a box. Opacity, filters and `object-fit` change how boxes and images look without editing the files.

Builds on [[CSS3 Notebook/1 Foundations/03 CSS Box Model|Box Model]] and [[CSS3 Notebook/2 Styling Content/04 CSS Colors Units and Typography|Colors]].

## Colours recap

| Syntax | Example |
| --- | --- |
| Named colour | `tomato`, `rebeccapurple`, `transparent` (148 names) |
| Hex | `#ff6347`, short `#f63`, with alpha `#ff634780` |
| `rgb()` | `rgb(255 99 71)`, with alpha `rgb(255 99 71 / 0.5)` |
| `rgba()` / `hsla()` | older comma syntax: `rgba(255, 99, 71, 0.5)` |
| `hsl()` | `hsl(9 100% 64%)` |

## Backgrounds

```css
.hero {
  background-color: #1e293b;                       /* shows while the image loads, and behind transparent parts */
  background-image: url("hero.webp");
  background-repeat: no-repeat;                    /* repeat | repeat-x | repeat-y | no-repeat | space | round */
  background-position: center top;                 /* keywords, % or lengths: 50% 0 */
  background-size: cover;                          /* cover = fill and crop, contain = fit whole image */
  background-attachment: scroll;                   /* scroll | fixed (parallax-like) | local */
  background-origin: padding-box;
  background-clip: border-box;                     /* text = clip to the letters (gradient text) */
}

/* Shorthand (put size after position with a slash) */
.hero { background: #1e293b url("hero.webp") center top / cover no-repeat; }
```

| Property | Means |
| --- | --- |
| `background-color` | fill colour |
| `background-image` | one or more images or gradients (comma-separated, first is on top) |
| `background-position` | where the image starts |
| `background-size` | `cover`, `contain`, or a size |
| `background-repeat` | tile it or not |
| `background-attachment` | `fixed` keeps it still while the page scrolls (expensive and ignored on most phones) |

> [!tip] Remember it
> **`cover` = fill the wall, crop the edges. `contain` = show the whole poster, leave gaps.**

`background-image` is for decoration. If the image carries meaning, use `<img alt>` in HTML: CSS backgrounds are invisible to screen readers.

### Gradients

```css
.a { background: linear-gradient(to right, #6a11cb, #2575fc); }
.b { background: linear-gradient(135deg, tomato 0%, gold 50%, teal 100%); }  /* colour stops */
.c { background: radial-gradient(circle at top left, #fff, #ddd); }
.d { background: conic-gradient(red 0 25%, gold 0 50%, teal 0); }             /* pie chart */
.e { background: repeating-linear-gradient(45deg, #eee 0 10px, #fff 10px 20px); }  /* stripes */

/* Darken a photo so text on it is readable */
.hero { background: linear-gradient(rgb(0 0 0 / .5), rgb(0 0 0 / .5)), url("hero.webp") center / cover; }
```

Gradients are **images**, so they go in `background-image` (or the `background` shorthand), not `background-color`.

## Border

```css
.card {
  border: 1px solid #ddd;                   /* width style colour */
  border-bottom: 3px dashed tomato;          /* one side */
  border-radius: 12px;                       /* rounded corners; 50% on a square = circle */
  border-radius: 12px 12px 0 0;              /* each corner, clockwise from top-left */
}
```

Styles: `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, `none`.

## Outline

```css
button:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;                       /* gap between the element and the ring */
}
```

An outline is drawn **outside** the border and takes **no space** (it never moves the layout). It follows `border-radius` in all current browsers. Its main job is the **keyboard focus ring**: never remove it without a visible replacement.

## Box shadows

```css
.card   { box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }           /* x y blur colour */
.lifted { box-shadow: 0 1px 2px rgb(0 0 0 / .1), 0 8px 24px rgb(0 0 0 / .12); }  /* layered = realistic */
.inner  { box-shadow: inset 0 2px 4px rgb(0 0 0 / .2); }         /* inside the box */
.ring   { box-shadow: 0 0 0 3px #2563eb; }                       /* spread only: a solid ring */
```

Full syntax: `box-shadow: [inset] x-offset y-offset blur spread colour;`

> [!tip] Remember it
> **Shadows read "X, Y, Blur, Spread": "Xtra Yummy Blueberry Scones".** Light comes from above, so use a positive Y.

## Opacity

```css
.faded { opacity: 0.5; }                     /* the whole element AND its children */
.glass { background: rgb(255 255 255 / 0.5); }   /* only the background is see-through */
```

`opacity` affects children too, and any value below 1 creates a new **stacking context** → [[CSS3 Notebook/3 Layout/07 CSS Display and Positioning|z-index]]. To fade only the background, use a colour with alpha.

## Images and filters

```css
img       { max-width: 100%; height: auto; display: block; }   /* responsive images */
.avatar   { width: 96px; aspect-ratio: 1; object-fit: cover; border-radius: 50%; }
.thumb    { object-fit: cover; object-position: top; }          /* crop, keep the top */

.gray     { filter: grayscale(100%); }
.photo    { filter: brightness(1.1) contrast(1.1) saturate(1.2); }
.blur     { filter: blur(4px); }
.icon     { filter: drop-shadow(0 2px 4px rgb(0 0 0 / .3)); }   /* follows transparent shapes, unlike box-shadow */
.frosted  { backdrop-filter: blur(12px); background: rgb(255 255 255 / .6); }  /* blurs what's behind */
.cutout   { mix-blend-mode: multiply; }
```

| Property | Does |
| --- | --- |
| `object-fit` | how an `<img>`/`<video>` fills its box: `cover`, `contain`, `fill`, `none`, `scale-down` |
| `object-position` | which part stays visible when cropped |
| `aspect-ratio` | keep a shape: `16 / 9`, `1` |
| `filter` | `blur`, `brightness`, `contrast`, `grayscale`, `sepia`, `saturate`, `hue-rotate`, `invert`, `drop-shadow` |
| `backdrop-filter` | the same filters on whatever is behind the element |
| `clip-path` | cut the element into a shape: `circle(50%)`, `polygon(…)` |

> [!question] Recall
> 1. `background-size: cover` vs `contain`?
> 2. Why do gradients go in `background-image`? How do you put text over a photo and keep it readable?
> 3. Outline vs border? Why must focus outlines stay?
> 4. What do the four numbers in `box-shadow` mean? What does `inset` do?
> 5. `opacity: 0.5` vs a background colour with alpha?
> 6. `object-fit: cover` vs `contain`? `filter` vs `backdrop-filter`?

Prev: [[05 CSS Text and Fonts|5. Text and Fonts]] · Next: [[07 CSS Display and Positioning|7. Display and Positioning]]
