---
title: 1. Introduction and Syntax
tags:
  - CSS
---

> [!summary] In one line
> CSS (Cascading Style Sheets) **styles** HTML: colours, spacing, layout, animation. A rule = **who** (selector) + **what** (property) + **how** (value).

## Anatomy of a rule

```css
h1 {                  /* selector: WHO */
  color: navy;        /* property: value;  ← a declaration */
  font-size: 32px;
}
```

> [!tip] 🧠 Remember it
> **"Select, then decorate."** Pick the element, then list what to change. Every declaration ends with `;`.

## Three ways to add CSS

```html
<!-- 1. External file ✅ best: reusable, cached -->
<link rel="stylesheet" href="style.css">

<!-- 2. Internal, in <head> -->
<style> p { color: gray; } </style>

<!-- 3. Inline ❌ avoid: hard to maintain, beats almost everything -->
<p style="color: red;">Hi</p>
```

## What "cascading" means

When several rules target the same element, the browser decides the winner by:

1. **Importance**: `!important` (avoid!)
2. **Specificity**: more specific selector wins → [[02 CSS Selectors and Specificity|Specificity]]
3. **Source order**: same specificity → **last one wins**

🧠 **Cascade = a waterfall: styles flow down, and later/more specific rules land on top.**

## Inheritance

Some properties pass from parent to children automatically: **text stuff** (`color`, `font-*`, `line-height`, `text-align`). **Box stuff** (`margin`, `padding`, `border`, `width`, `background`) does not.

```css
body { font-family: system-ui, sans-serif; color: #222; }  /* every child gets these */
```

🧠 **Kids inherit the family's accent (text), not the house (box).**

## Comments

```css
/* only this style of comment exists in CSS */
```

## A good starter reset

```css
*, *::before, *::after { box-sizing: border-box; }  /* see Box Model */
body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.5; }
img { max-width: 100%; display: block; }
```

> [!question] Recall
> 1. Name the three parts of a CSS rule.
> 2. Which way of adding CSS is best and why?
> 3. Which properties inherit by default?
