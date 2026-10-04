---
title: 10. Variables and Modern CSS
tags:
  - CSS
---

> [!summary] In one line
> **Custom properties** (`--name`) let you reuse values and switch themes; modern CSS adds nesting, `:has()`, `clamp()` and more, often removing the need for Sass or JS.

## Custom properties (CSS variables)

```css
:root {                               /* global */
  --brand: #4f46e5;
  --radius: 8px;
  --space: 1rem;
}
.btn {
  background: var(--brand);
  border-radius: var(--radius);
  padding: var(--space) calc(var(--space) * 2);
  color: var(--btn-text, white);      /* fallback if not defined */
}
```

### Dark mode in 6 lines

```css
:root { --bg: #fff; --text: #111; }
@media (prefers-color-scheme: dark) { :root { --bg: #111; --text: #eee; } }
[data-theme="dark"] { --bg: #111; --text: #eee; }   /* manual toggle via JS */
body { background: var(--bg); color: var(--text); }
```

> [!tip] 🧠 Remember it
> **CSS variables are like a paint palette 🎨:** mix the colour once in `:root`, dip into it everywhere. Change the palette → the whole painting updates.
> Unlike Sass variables, they're **live**: JS can change them (`el.style.setProperty('--brand', 'red')`) and they cascade/inherit.

## Native nesting

```css
.card {
  padding: 1rem;
  & h2 { margin: 0; }
  &:hover { box-shadow: 0 4px 12px rgb(0 0 0 / .1); }
  @media (min-width: 640px) { padding: 2rem; }
}
```

## Modern selectors

```css
.card:has(img) { }                 /* parent selector: card containing an image */
form:has(:invalid) button { opacity: .5; }
:is(h1, h2, h3) a { }              /* group without repeating */
:where(ul, ol) { padding: 0; }     /* like :is but 0 specificity (good for resets) */
.btn:focus-visible { outline: 2px solid; }  /* focus ring only for keyboard users */
```

## Handy modern properties

```css
aspect-ratio: 16 / 9;              /* keep video/card proportions */
object-fit: cover;                 /* crop an image to fill its box */
inset: 0;                          /* top/right/bottom/left: 0 */
margin-inline: auto;               /* logical properties (work in RTL languages too) */
accent-color: var(--brand);        /* colours checkboxes, radios, range */
scroll-behavior: smooth;           /* smooth #anchor jumps */
scroll-snap-type: x mandatory;     /* carousels */
backdrop-filter: blur(8px);        /* frosted glass */
text-wrap: balance;                /* nicer headings */
```

## Organising CSS

- **Methodology**: BEM naming `.card`, `.card__title`, `.card--featured` → 🧠 **Block__Element--Modifier**
- **Frameworks**: Tailwind (utility classes), Bootstrap (ready components)
- **Preprocessors**: Sass (variables, mixins, nesting); much less needed now

> [!question] Recall
> 1. How do you define and use a CSS variable with a fallback?
> 2. What does `:has()` let you do that wasn't possible before?
> 3. What do the parts of a BEM class name mean?
