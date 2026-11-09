---
title: 5. Text and Fonts
tags:
  - CSS
---

> [!summary] In one line
> Fonts are chosen with `font-family` and a **fallback stack**, sized in `rem`, and styled with weight, style and variants. Text properties control colour, alignment, decoration, case, spacing, line height and shadows.

Basics first: [[CSS3 Notebook/2 Styling Content/04 CSS Colors Units and Typography|Colors, Units and Typography]].

## Font families

```css
body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
code { font-family: ui-monospace, "SF Mono", Consolas, monospace; }
```

- The browser uses the **first font it has**, so list fallbacks and end with a **generic family**: `serif`, `sans-serif`, `monospace`, `cursive`, `system-ui`.
- Quote names with spaces: `"Segoe UI"`.
- `system-ui` uses the operating system's own font: fast (nothing to download) and familiar.

> [!tip] Remember it
> **A font stack is a guest list with backups:** if the first guest can't come, the next one takes the seat. Always end with a generic family that's sure to be there.

## Web fonts and Google Fonts

```html
<!-- Google Fonts: copy the tags they give you into <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">
```

```css
/* Self-hosting (faster, more private): download the .woff2 files and declare them */
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-variable.woff2") format("woff2");
  font-weight: 100 900;          /* a variable font: every weight in one file */
  font-display: swap;            /* show fallback text first, swap when loaded */
}
```

- Use **WOFF2** only: every current browser supports it and it's the smallest.
- `font-display: swap` avoids invisible text while the font downloads.
- Load only the weights you use. **Variable fonts** put all weights (and sometimes widths) in one file.

## Font properties

```css
.title {
  font-size: 2rem;
  font-weight: 700;                 /* 100–900; 400 = normal, 700 = bold */
  font-style: italic;               /* normal | italic | oblique */
  font-variant: small-caps;         /* SMALL CAPITAL letters */
  font-variant-numeric: tabular-nums;  /* digits of equal width: tables, prices, timers */
}

/* Shorthand: style variant weight size/line-height family (size and family are required) */
.title { font: italic small-caps 700 2rem/1.2 "Inter", sans-serif; }
```

> [!warning] The `font` shorthand resets everything
> Properties you leave out go back to their defaults (for example `line-height` becomes `normal`). Use it in one base rule, or set properties one by one.

## Text styling

```css
p {
  color: #222;
  text-align: left;                 /* left | right | center | justify | start | end */
  line-height: 1.6;                 /* unitless: scales with the font size */
  letter-spacing: 0.02em;           /* space between letters */
  word-spacing: 0.1em;              /* space between words */
  text-indent: 2em;                 /* first line */
  max-width: 65ch;                  /* readable line length: 45–75 characters */
}

a       { text-decoration: underline dotted 2px; text-underline-offset: 3px; }
del     { text-decoration: line-through; }
.label  { text-transform: uppercase; }      /* uppercase | lowercase | capitalize */
h1      { text-shadow: 0 2px 4px rgb(0 0 0 / 0.3); }   /* x y blur colour */
h1, h2  { text-wrap: balance; }             /* even line lengths in headings */
p       { text-wrap: pretty; }              /* avoids a single word on the last line */
```

| Property | Controls |
| --- | --- |
| `color` | text colour |
| `text-align` | horizontal alignment of inline content |
| `text-decoration` | underline, overline, line-through (+ style, colour, thickness) |
| `text-transform` | upper/lower/capitalised case, without changing the HTML |
| `letter-spacing`, `word-spacing` | text spacing |
| `line-height` | height of each line |
| `text-shadow` | shadows behind the letters (several allowed, comma-separated) |
| `white-space`, `overflow-wrap`, `hyphens` | wrapping long words and lines |

> [!tip] Remember it
> **Unitless `line-height` is a multiplier:** `1.5` means "1.5 × my own font size", so every child gets the right spacing. `24px` would be copied as-is to small and big text alike.

## Direction and writing modes

```css
[dir="rtl"] { direction: rtl; }      /* better: set dir="rtl" in the HTML */
.vertical   { writing-mode: vertical-rl; }   /* Japanese, vertical labels */
.box        { margin-inline-start: 1rem; padding-block: 2rem; }   /* logical properties */
```

**Logical properties** (`inline` = the reading direction, `block` = the stacking direction) flip automatically for right-to-left languages like Arabic and Hebrew. Prefer them over `left`/`right` in new code.

## Responsive typography

```css
html { font-size: 100%; }                         /* respect the user's browser setting */
h1   { font-size: clamp(1.75rem, 1rem + 3vw, 3rem); }   /* fluid: grows with the screen, within limits */
p    { font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); }
```

- Use `rem` (not `px`) so text grows when users raise their default font size.
- Mix `rem` into the middle value of `clamp()` (`1rem + 3vw`): pure `vw` text doesn't scale when users zoom, which fails WCAG.
- Fluid type replaces most font-size media queries.

> [!question] Recall
> 1. Why end a font stack with a generic family?
> 2. What does `font-display: swap` do? Why prefer WOFF2 and variable fonts?
> 3. Write the `font` shorthand for bold 18px text with 1.5 line height in Inter. What does the shorthand reset?
> 4. Why is unitless `line-height` better?
> 5. What are logical properties, and why use them?
> 6. Why should a fluid `clamp()` font size include `rem`, not only `vw`?

Prev: [[04 CSS Colors Units and Typography|4. Colors, Units and Typography]] · Next: [[06 CSS Backgrounds Borders and Effects|6. Backgrounds, Borders and Effects]]
