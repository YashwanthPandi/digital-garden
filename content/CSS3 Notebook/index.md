---
title: CSS3 Notebook
tags:
  - CSS
  - Notes
  - Revision
  - Skills
---

My CSS3 notes, written for a **complete beginner**. Learn after [[HTML5 Notebook/index|HTML5]] and before (or alongside) [[JavaScript Notebook/index|JavaScript]].

Every page has a one-line summary, a 🧠 memory trick, examples you can copy, and recall questions.

> [!tip] How to study
> Keep a tiny HTML page open with Live Server and **change one property at a time** to see what it does. Use DevTools (right-click → Inspect) to toggle styles on and off. Play the games: [Flexbox Froggy](https://flexboxfroggy.com), [Grid Garden](https://cssgridgarden.com), [CSS Diner](https://flukeout.github.io) (selectors).

## Learning roadmap

### Foundations

1. [[01 CSS Introduction and Syntax|Introduction and Syntax]]: rules, cascade, inheritance
2. [[02 CSS Selectors and Specificity|Selectors and Specificity]]
3. [[03 CSS Box Model|Box Model]]: content, padding, border, margin
4. [[04 CSS Colors Units and Typography|Colors, Units and Typography]]

### Layout

5. [[05 CSS Display and Positioning|Display and Positioning]]: block/inline, relative/absolute/fixed/sticky, z-index
6. [[06 CSS Flexbox|Flexbox]]: 1D layout
7. [[07 CSS Grid|Grid]]: 2D layout
8. [[08 CSS Responsive Design|Responsive Design]]: mobile-first, media and container queries

### Polish and modern CSS

9. [[09 CSS Transitions Transforms and Animations|Transitions, Transforms and Animations]]
10. [[10 CSS Variables and Modern CSS|Variables and Modern CSS]]: custom properties, nesting, `:has()`, BEM
11. [[11 CSS Interview Cheat Sheet|Interview Cheat Sheet]]

## Practice projects

- [ ] Style your HTML profile page (colours, fonts, box model)
- [ ] Responsive navbar (Flexbox + media query)
- [ ] Card gallery (Grid `auto-fit`)
- [ ] Landing page with a hero, features and footer (Grid areas)
- [ ] Dark mode toggle (CSS variables + a little JS)
- [ ] Loading spinner and hover effects (animations)

## Quick revision sheet

| Concept | One-liner |
| --- | --- |
| Rule | select, then decorate |
| Cascade | importance → specificity → last wins |
| Inheritance | kids get the text style, not the box |
| Specificity | I-C-E: IDs, Classes, Elements |
| `:` / `::` | state / part |
| Box model | content, padding, border, margin (framed photo) |
| `border-box` | width includes padding and border |
| Shorthand order | TRouBLe: top, right, bottom, left |
| `rem` / `em` | root size / parent size |
| HSL | hue, saturation, lightness |
| `absolute` | pinned to nearest positioned parent |
| `sticky` | scrolls, then sticks |
| Flexbox | one line (1D); justify = main, align = across |
| Grid | chessboard (2D); `repeat(auto-fit, minmax(250px, 1fr))` |
| Mobile-first | base for phones, `min-width` adds |
| Transition / animation | dimmer switch / disco light |
| Smooth animation | only `transform` and `opacity` |
| CSS variables | paint palette in `:root` |

## Resources compared

| Resource | Best for | Notes |
| --- | --- | --- |
| [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | ⭐ **reference, accuracy** | The source of truth for every property. |
| [web.dev Learn CSS](https://web.dev/learn/css) | ⭐ **learning in order** | Clear modern course with demos. |
| [CSS-Tricks guides](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) | ⭐ Flexbox & Grid visual guides | The famous cheat-sheet posters. |
| [GeeksforGeeks](https://www.geeksforgeeks.org/css/) | interview questions | Many Q&A lists; verify against MDN. |
| [TutorialsPoint](https://www.tutorialspoint.com/css/) | property-by-property lookup | Simple, some dated techniques (floats for layout). |

_These notes are written in my own words, using the resources above as references._
