---
title: 2. Selectors and Specificity
tags:
  - CSS
---

> [!summary] In one line
> Selectors pick **which elements** to style. When rules clash, the **more specific** selector wins.

## Basic selectors

```css
*            { }   /* universal: everything */
p            { }   /* type/element */
.card        { }   /* class (reusable) */
#header      { }   /* id (unique) */
a[target]    { }   /* attribute exists */
input[type="email"] { }
h1, h2       { }   /* group: both */
```

## Combinators (relationships)

```css
nav a        { }   /* descendant: any a inside nav (any depth) */
ul > li      { }   /* child: direct children only */
h2 + p       { }   /* adjacent sibling: the p right after h2 */
h2 ~ p       { }   /* general sibling: all p after h2 */
```

🧠 **space = anywhere inside, `>` = direct kid, `+` = next-door neighbour, `~` = all later neighbours.**

## Pseudo-classes (state) and pseudo-elements (part)

```css
a:hover, button:focus-visible { }
li:first-child, li:last-child, li:nth-child(2n) { }   /* 2n = even */
input:checked, input:disabled, input:invalid { }
p:not(.intro) { }
.card:has(img) { }   /* parent selector! card that contains an img */

p::first-line { }
.quote::before { content: '“'; }   /* inserts content */
::selection { background: yellow; }
```

> [!tip] 🧠 Remember it
> **One colon `:` = a *state* (hover, checked). Two colons `::` = a *part* (before, first-line).**

## Specificity

Count selectors as a score **(IDs, Classes, Elements)**. Compare left to right; bigger wins.

| Selector | Score |
| --- | --- |
| `p` | 0-0-1 |
| `.card` | 0-1-0 |
| `nav .link:hover` | 0-2-1 |
| `#main` | 1-0-0 |
| `#main .card p` | 1-1-1 |
| `style="..."` | beats all selectors |
| `!important` | beats everything (don't) |

Classes column also includes **attributes** and **pseudo-classes**; Elements column includes **pseudo-elements**. `*` scores 0.

> [!tip] 🧠 Remember it
> **"I-C-E": IDs, Classes, Elements.** One ID beats any number of classes; one class beats any number of elements.

```css
#nav a  { color: red; }    /* 1-0-1 → wins */
.menu a { color: blue; }   /* 0-1-1 */
```

**Best practice:** style with **classes**, keep specificity low and flat, avoid IDs and `!important` in CSS.

> [!question] Recall
> 1. `div p` vs `div > p`?
> 2. `:` vs `::`?
> 3. Which wins: `.a .b .c` or `#x`? Why?
