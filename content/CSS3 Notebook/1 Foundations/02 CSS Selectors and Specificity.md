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
h1, h2       { }   /* grouping: the same rules for both */
```

## Combinators (relationships)

```css
nav a        { }   /* descendant: any a inside nav (any depth) */
ul > li      { }   /* child: direct children only */
h2 + p       { }   /* next-sibling: the p right after h2 */
h2 ~ p       { }   /* subsequent-sibling: every p after h2 (same parent) */
```

**space = anywhere inside, `>` = direct kid, `+` = next-door neighbour, `~` = all later neighbours.**

The spec now calls `+` the **next-sibling** combinator and `~` the **subsequent-sibling** combinator. Older tutorials say "adjacent sibling" and "general sibling".

## Attribute selectors

```css
a[target]               { }   /* has the attribute */
input[type="email"]     { }   /* exact value */
a[href^="https"]        { }   /* starts with */
a[href$=".pdf"]         { }   /* ends with */
img[alt*="logo"]        { }   /* contains */
[class~="card"]         { }   /* one word in a space-separated list */
[lang|="en"]            { }   /* "en" or starts with "en-" */
a[href$=".PDF" i]       { }   /* i = case-insensitive */
```

> [!tip] Remember it
> **`^` = starts (like regex), `$` = ends (like regex), `*` = anywhere.**

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

> [!tip] Remember it
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

> [!tip] Remember it
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

Prev: [[01 CSS Introduction and Syntax|1. Introduction and Syntax]] · Next: [[03 CSS Box Model|3. Box Model]]
