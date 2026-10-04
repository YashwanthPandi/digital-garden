---
title: 11. Interview Cheat Sheet
tags:
  - CSS
  - Interview
---

The most-asked CSS questions with answers short enough to say out loud.

| Question | Short answer |
| --- | --- |
| What does "cascading" mean? | Conflicts are resolved by importance, then specificity, then source order (last wins). → [[01 CSS Introduction and Syntax\|Intro]] |
| Ways to add CSS? | External (best), internal `<style>`, inline `style=""`. |
| Specificity? | Score of (IDs, Classes/attributes/pseudo-classes, Elements); higher wins. → [[02 CSS Selectors and Specificity\|Selectors]] |
| Class vs ID? | Class reusable, low specificity; ID unique, high specificity. Style with classes. |
| Pseudo-class vs pseudo-element? | `:hover` = state; `::before` = a part of the element. |
| Box model? | content + padding + border + margin. → [[03 CSS Box Model\|Box Model]] |
| `content-box` vs `border-box`? | width excludes vs includes padding and border. |
| Margin collapse? | Adjacent vertical block margins merge; the larger wins. |
| `em` vs `rem`? | Relative to parent's font size vs root font size. → [[04 CSS Colors Units and Typography\|Units]] |
| `display: none` vs `visibility: hidden`? | Removed from layout vs invisible but still takes space. → [[05 CSS Display and Positioning\|Display]] |
| `inline` vs `inline-block` vs `block`? | Inline ignores width/height; inline-block flows inline but accepts them; block takes a full row. |
| Position values? | static, relative (nudge), absolute (to positioned ancestor), fixed (to viewport), sticky (relative until a threshold, then fixed). |
| z-index not working? | Element isn't positioned, or it's trapped in a different stacking context. |
| How to centre a div? | `display: grid; place-items: center;` or flex with `justify-content` + `align-items: center`. |
| Flexbox vs Grid? | Flexbox 1D (row *or* column), content-first; Grid 2D (rows *and* columns), layout-first. → [[06 CSS Flexbox\|Flexbox]], [[07 CSS Grid\|Grid]] |
| `justify-content` vs `align-items`? | Main axis vs cross axis. |
| `flex: 1`? | Grow to fill free space equally (`1 1 0%`). |
| `fr` unit? | Fraction of free space in a grid. |
| `auto-fit` vs `auto-fill`? | Both make as many tracks as fit; `auto-fit` collapses empty ones so items stretch, `auto-fill` keeps empty tracks. |
| Responsive design? | Fluid layouts, flexible images, media queries, mobile-first. → [[08 CSS Responsive Design\|Responsive]] |
| Mobile-first? | Base styles for small screens, `min-width` queries add for bigger ones. |
| Transition vs animation? | Transition: between two states on a trigger; animation: `@keyframes`, multiple steps, can loop. → [[09 CSS Transitions Transforms and Animations\|Animations]] |
| What's cheap to animate? | `transform` and `opacity`. |
| CSS variables vs Sass variables? | CSS vars are live at runtime, cascade, and can be changed by JS; Sass vars compile away. → [[10 CSS Variables and Modern CSS\|Variables]] |
| What is BEM? | Naming convention `block__element--modifier`. |
| Reflow vs repaint? | Reflow recalculates layout (expensive: width, top); repaint redraws pixels (colour); compositing only (transform, opacity) is cheapest. |
| `!important`? | Overrides normal cascade; avoid, it causes specificity wars. |
| Critical rendering path? | HTML → DOM, CSS → CSSOM, render tree, layout, paint. CSS is render-blocking. |
