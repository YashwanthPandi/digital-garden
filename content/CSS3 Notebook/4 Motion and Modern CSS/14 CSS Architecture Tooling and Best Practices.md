---
title: 14. Architecture, Tooling and Best Practices
tags:
  - CSS
---

> [!summary] In one line
> As projects grow, CSS needs **structure** (BEM, cascade layers), **tools** (Sass, PostCSS), a way to **scope** styles to components (CSS Modules, CSS-in-JS, utility classes), and care for **performance** and **accessibility**.

## The problem at scale

All CSS is global: any rule can affect any element. In a big app that leads to name clashes, specificity wars and fear of deleting anything. Every tool below solves part of that.

## BEM naming

```css
.card { }                     /* Block: a standalone component */
.card__title { }              /* Element: a part of the block (two underscores) */
.card--featured { }           /* Modifier: a variation (two hyphens) */
```

```html
<article class="card card--featured">
  <h2 class="card__title">…</h2>
</article>
```

Every selector is one class, so specificity stays flat and names don't clash.

> [!tip] Remember it
> **Block__Element--Modifier: the double underscore "belongs to", the double hyphen "is a version of".**

## Cascade layers (`@layer`)

```css
@layer reset, base, components, utilities;      /* order: later layers win */

@layer reset      { *, *::before, *::after { box-sizing: border-box; } }
@layer components { .btn { background: navy; } }
@layer utilities  { .bg-red { background: red; } }   /* wins over .btn, whatever the specificity */
```

Layers decide priority **before** specificity, so a utility class beats a component style without `!important`. Styles not in any layer beat all layered styles. Put third-party CSS in an early layer to keep it easy to override.

## Sass (SCSS)

A **preprocessor**: you write `.scss`, a build step compiles it to plain CSS.

```scss
$brand: #4f46e5;                                  // compile-time variable
@mixin card-shadow($depth: 1) {                   // reusable block of declarations
  box-shadow: 0 #{$depth * 2}px #{$depth * 6}px rgb(0 0 0 / .15);
}
.card {
  @include card-shadow(2);
  &__title { color: $brand; }                     // nesting builds .card__title
}
@use "buttons";                                   // split into partial files
```

Native CSS now has variables, nesting, `color-mix()` and layers, so many projects no longer need Sass. It's still common in existing codebases (Angular's default style option is SCSS) and for mixins, loops and functions.

## PostCSS

A tool that runs **plugins** over your CSS after you write it:

| Plugin | Does |
| --- | --- |
| **Autoprefixer** | adds vendor prefixes (`-webkit-…`) for the browsers you support |
| **postcss-preset-env** | lets you use newer CSS and converts it for older browsers |
| **cssnano** | minifies the output |
| **Tailwind CSS** | generates utility classes (Tailwind v4 also ships its own engine) |

Most build tools (Vite, Angular CLI, Next.js) run PostCSS for you. Which browsers to target comes from a `browserslist` setting.

> [!tip] Remember it
> **Sass is a recipe you cook before serving (you write a different language). PostCSS is a kitchen assistant that tidies plain CSS after you write it.**

## Scoping styles to components

### CSS Modules

```css
/* Button.module.css */
.primary { background: navy; }
```

```js
import styles from './Button.module.css';
button.className = styles.primary;   // becomes a unique name like "Button_primary__x7f2a"
```

Class names are made unique at build time, so two components can both have `.primary` without clashing. Common in React, Vue and Next.js. Angular does the same thing by default with **view encapsulation**.

### CSS-in-JS

Styles written in JavaScript next to the component (styled-components, Emotion, vanilla-extract, Panda CSS).

```js
const Button = styled.button`
  background: ${props => props.primary ? 'navy' : 'white'};
`;
```

- **Pros:** scoped automatically, styles can use component props, dead styles are removed with the component.
- **Cons:** runtime libraries add JavaScript and slow rendering, and they work poorly with React Server Components. The trend is toward **zero-runtime** tools (vanilla-extract, Panda) that output static CSS at build time.

### Utility-first CSS

```html
<button class="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500">Save</button>
```

Tailwind CSS: small single-purpose classes in the HTML, unused ones removed at build time. Very popular for new projects; the trade-off is long class lists.

## Performance

- **CSS blocks rendering:** the page doesn't appear until the CSS in `<head>` has loaded. Keep it small, minified and cached; inline only the critical above-the-fold CSS if needed.
- Avoid `@import` inside CSS files: each one is another request the browser discovers late.
- Animate only `transform` and `opacity` → [[CSS3 Notebook/4 Motion and Modern CSS/12 CSS Transitions Transforms and Animations|Animations]]. Use `will-change` only on elements about to animate.
- `content-visibility: auto` skips rendering off-screen sections until they're needed.
- Use `contain: layout paint` on independent widgets so changes inside don't relayout the page.
- Give images and embeds dimensions or `aspect-ratio` to avoid layout shift (CLS).
- Prefer `font-display: swap` and few font files → [[CSS3 Notebook/2 Styling Content/05 CSS Text and Fonts|Text and Fonts]].
- Selector speed rarely matters today; the number of elements and how often styles change matter more.

## Accessibility

| Check | CSS |
| --- | --- |
| Visible keyboard focus | `:focus-visible { outline: 3px solid …; }`; never `outline: none` alone |
| Contrast at least 4.5:1 (3:1 for large text and UI parts) | check in DevTools' colour picker |
| Text can grow to 200% | `rem` sizes, no fixed heights on text containers |
| Respect motion settings | `@media (prefers-reduced-motion: reduce)` |
| Respect colour settings | `prefers-color-scheme`, and `forced-colors` (Windows High Contrast) |
| Content order | visual order (flex `order`, grid placement) should match the HTML order, which is what keyboards and screen readers follow |
| Hide content correctly | `display: none` hides from everyone; use a "visually hidden" class for screen-reader-only text |
| Click targets | at least 24 × 24 px |

```css
.visually-hidden {
  position: absolute; width: 1px; height: 1px; margin: -1px;
  overflow: hidden; clip-path: inset(50%); white-space: nowrap;
}
```

More in [[HTML Notebook/2 Structure and Meaning/08 HTML Accessibility|HTML Accessibility]].

> [!question] Recall
> 1. What problem do BEM, CSS Modules and CSS-in-JS each solve?
> 2. How do cascade layers change the cascade? Why don't you need `!important` for utility classes with layers?
> 3. Sass vs PostCSS?
> 4. Why is CSS "render-blocking", and what can you do about it?
> 5. Name five CSS accessibility checks.

Prev: [[13 CSS Variables and Modern CSS|13. Variables and Modern CSS]] · Next: [[15 CSS Interview Cheat Sheet|15. Interview Cheat Sheet]]
