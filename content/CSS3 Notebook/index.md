---
title: CSS3 Notebook
tags:
  - CSS
  - Notes
  - Revision
  - Skills
---

My CSS3 notes, written for a **complete beginner**. Learn after [[HTML Notebook/index|HTML]] and before (or alongside) [[JavaScript Notebook/index|JavaScript]].

Every page has a one-line summary, a memory trick, examples you can copy, and recall questions.

> [!tip] How to study
> Keep a tiny HTML page open with Live Server and **change one property at a time** to see what it does. Use DevTools (right-click → Inspect) to toggle styles on and off. Play the games: [Flexbox Froggy](https://flexboxfroggy.com), [Grid Garden](https://cssgridgarden.com), [CSS Diner](https://flukeout.github.io) (selectors).

## Learning roadmap

### 1. Foundations → [[CSS3 Notebook/1 Foundations/index|overview]]

1. [[01 CSS Introduction and Syntax|Introduction and Syntax]]: rules, cascade, inheritance
2. [[02 CSS Selectors and Specificity|Selectors and Specificity]]
3. [[03 CSS Box Model|Box Model]]: content, padding, border, margin

### 2. Styling Content → [[CSS3 Notebook/2 Styling Content/index|overview]]

4. [[04 CSS Colors Units and Typography|Colors, Units and Typography]]
5. [[05 CSS Text and Fonts|Text and Fonts]]: font stacks, web fonts, text styling, responsive typography
6. [[06 CSS Backgrounds Borders and Effects|Backgrounds, Borders and Effects]]: backgrounds, gradients, outlines, shadows, filters

### 3. Layout → [[CSS3 Notebook/3 Layout/index|overview]]

7. [[07 CSS Display and Positioning|Display and Positioning]]: block/inline, relative/absolute/fixed/sticky, z-index
8. [[08 CSS Flow Floats Columns Lists and Tables|Flow, Floats, Columns, Lists and Tables]]
9. [[09 CSS Flexbox|Flexbox]]: 1D layout
10. [[10 CSS Grid|Grid]]: 2D layout
11. [[11 CSS Responsive Design|Responsive Design]]: mobile-first, media and container queries

### 4. Motion and Modern CSS → [[CSS3 Notebook/4 Motion and Modern CSS/index|overview]]

12. [[12 CSS Transitions Transforms and Animations|Transitions, Transforms and Animations]]
13. [[13 CSS Variables and Modern CSS|Variables and Modern CSS]]: custom properties, nesting, `:has()`, BEM
14. [[14 CSS Architecture Tooling and Best Practices|Architecture, Tooling and Best Practices]]: BEM, `@layer`, Sass, PostCSS, CSS Modules, CSS-in-JS, performance, accessibility

### 5. Interview Prep → [[CSS3 Notebook/5 Interview Prep/index|overview]]

15. [[15 CSS Interview Cheat Sheet|Interview Cheat Sheet]]

## roadmap.sh coverage

Every topic on the [roadmap.sh CSS roadmap](https://roadmap.sh/css) (104 items), and where it's covered.

| Roadmap section | Topics | Notes |
| --- | --- | --- |
| Introduction | Introduction, Frontend development, HTML, CSS, JavaScript | [[CSS3 Notebook/1 Foundations/01 CSS Introduction and Syntax\|01]] |
| CSS basics | CSS Basics, Inline CSS, Internal CSS, External CSS, Cascading order, Comments | [[CSS3 Notebook/1 Foundations/01 CSS Introduction and Syntax\|01]] |
| Rules | Rules, Selector, Declaration, Properties & Values | [[CSS3 Notebook/1 Foundations/01 CSS Introduction and Syntax\|01]] |
| Simple selectors | Simple selectors, element, class, id, universal, grouping | [[CSS3 Notebook/1 Foundations/02 CSS Selectors and Specificity\|02]] |
| Combinator selectors | Combinator selectors, descendant, child, Next Sibling, Subsequent Sibling | [[CSS3 Notebook/1 Foundations/02 CSS Selectors and Specificity\|02]] |
| Attribute selectors | Attribute selectors | [[CSS3 Notebook/1 Foundations/02 CSS Selectors and Specificity\|02]] |
| Pseudo classes and elements | Pseudo Classes, Pseudo Elements | [[CSS3 Notebook/1 Foundations/02 CSS Selectors and Specificity\|02]], [[CSS3 Notebook/4 Motion and Modern CSS/13 CSS Variables and Modern CSS\|13]] |
| CSS specificity | CSS Specificity | [[CSS3 Notebook/1 Foundations/02 CSS Selectors and Specificity\|02]] |
| Fonts | Font families, Font Style, Font Size, Font Weight, Font Variant, Font Shorthand, Google Fonts | [[CSS3 Notebook/2 Styling Content/04 CSS Colors Units and Typography\|04]], [[CSS3 Notebook/2 Styling Content/05 CSS Text and Fonts\|05]] |
| Text styling | Text Styling, Color, Text Alignment, Text Decoration, Text Transform, Text Spacing, Line Height, Text Shadows, Direction | [[CSS3 Notebook/2 Styling Content/05 CSS Text and Fonts\|05]] |
| Colours | Named Colors, hex, rgb, hsl, rgba, hsla | [[CSS3 Notebook/2 Styling Content/04 CSS Colors Units and Typography\|04]], [[CSS3 Notebook/2 Styling Content/06 CSS Backgrounds Borders and Effects\|06]] |
| Background | Background, Background Color, Background Image, Background Gradient, Background Position, Background Attachment | [[CSS3 Notebook/2 Styling Content/06 CSS Backgrounds Borders and Effects\|06]] |
| Box model | Box Model, Padding, Margin, Width / Height, Border | [[CSS3 Notebook/1 Foundations/03 CSS Box Model\|03]] |
| Borders and effects | Outline, Box Shadows, Opacity, Images and Filters | [[CSS3 Notebook/2 Styling Content/06 CSS Backgrounds Borders and Effects\|06]] |
| Display | Display, inline, block, inline-block, none, visibility | [[CSS3 Notebook/3 Layout/07 CSS Display and Positioning\|07]] |
| Position | Position, Static, Relative, Absolute, Fixed, Sticky, Z-Index / Stacking Context | [[CSS3 Notebook/3 Layout/07 CSS Display and Positioning\|07]] |
| CSS units | CSS Units, Absolute vs Relative, Units with functions, CSS Functions | [[CSS3 Notebook/2 Styling Content/04 CSS Colors Units and Typography\|04]] |
| Layout | Flow Layout, Floating Elements, Multicolumn layout, Tables, Lists | [[CSS3 Notebook/3 Layout/08 CSS Flow Floats Columns Lists and Tables\|08]] |
| Flexbox and Grid | Flexbox, Grid | [[CSS3 Notebook/3 Layout/09 CSS Flexbox\|09]], [[CSS3 Notebook/3 Layout/10 CSS Grid\|10]] |
| Responsive design | Media Queries, Container Queries, Responsive typography | [[CSS3 Notebook/3 Layout/11 CSS Responsive Design\|11]], [[CSS3 Notebook/2 Styling Content/05 CSS Text and Fonts\|05]] |
| Transforms and animation | Transforms, Transitions, Keyframe Animations | [[CSS3 Notebook/4 Motion and Modern CSS/12 CSS Transitions Transforms and Animations\|12]] |
| CSS variables | CSS Variables | [[CSS3 Notebook/4 Motion and Modern CSS/13 CSS Variables and Modern CSS\|13]] |
| Architecture and tooling | Sass, PostCSS, BEM, CSS Modules, CSS-in-JS | [[CSS3 Notebook/4 Motion and Modern CSS/13 CSS Variables and Modern CSS\|13]], [[CSS3 Notebook/4 Motion and Modern CSS/14 CSS Architecture Tooling and Best Practices\|14]] |
| Performance and accessibility | Performance, Accessibility | [[CSS3 Notebook/4 Motion and Modern CSS/12 CSS Transitions Transforms and Animations\|12]], [[CSS3 Notebook/4 Motion and Modern CSS/14 CSS Architecture Tooling and Best Practices\|14]] |

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
| [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | **reference, accuracy** | The source of truth for every property. |
| [web.dev Learn CSS](https://web.dev/learn/css) | **learning in order** | Clear modern course with demos. |
| [CSS-Tricks guides](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) | Flexbox & Grid visual guides | The famous cheat-sheet posters. |
| [GeeksforGeeks](https://www.geeksforgeeks.org/css/) | interview questions | Many Q&A lists; verify against MDN. |
| [TutorialsPoint](https://www.tutorialspoint.com/css/) | property-by-property lookup | Simple, some dated techniques (floats for layout). |

_These notes are written in my own words, using the resources above as references._
