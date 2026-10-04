---
title: 6. Flexbox
tags:
  - CSS
---

> [!summary] In one line
> Flexbox lays items out in **one direction** (a row or a column) and handles spacing and alignment for you.

```css
.container {
  display: flex;
  flex-direction: row;            /* row | column | row-reverse | column-reverse */
  justify-content: space-between; /* along the MAIN axis */
  align-items: center;            /* along the CROSS axis */
  gap: 16px;                      /* space between items */
  flex-wrap: wrap;                /* let items go to the next line */
}
```

## The two axes

```
flex-direction: row
main axis ──────────────────────▶   justify-content
cross axis ▼                        align-items
 ┌────┐ ┌────┐ ┌────┐
 │ 1  │ │ 2  │ │ 3  │
 └────┘ └────┘ └────┘
```

With `flex-direction: column` the axes **swap**: main goes down, cross goes across.

> [!tip] 🧠 Remember it
> **justify = the main road, align = across the road.**
> Or: **J**ustify → **J**ourney direction. **A**lign → **A**cross.

## justify-content (main axis)

| Value | Picture |
| --- | --- |
| `flex-start` | `[1][2][3]______` |
| `center` | `___[1][2][3]___` |
| `flex-end` | `______[1][2][3]` |
| `space-between` | `[1]____[2]____[3]` |
| `space-around` | `_[1]__[2]__[3]_` |
| `space-evenly` | `__[1]__[2]__[3]__` |

## align-items (cross axis)

`stretch` (default, fill height) · `flex-start` · `center` · `flex-end` · `baseline` (line up text).

## Item properties

```css
.item {
  flex: 1;              /* grow to share free space equally */
  flex: 0 0 200px;      /* grow shrink basis: fixed 200px, no grow, no shrink */
  align-self: flex-end; /* override align-items for this one */
  order: -1;            /* move first visually (doesn't change DOM order) */
}
```

🧠 **flex: grow shrink basis = "how much I take extra, how much I give up, where I start."**

## Common patterns

```css
/* navbar: logo left, links right */
nav { display: flex; justify-content: space-between; align-items: center; }

/* push the last item to the right */
.spacer { margin-left: auto; }

/* sticky footer */
body { display: flex; flex-direction: column; min-height: 100dvh; }
main { flex: 1; }

/* responsive cards that wrap */
.cards { display: flex; flex-wrap: wrap; gap: 1rem; }
.cards > * { flex: 1 1 250px; }
```

🎮 Practice: [Flexbox Froggy](https://flexboxfroggy.com).

> [!question] Recall
> 1. Which property aligns along the main axis? Cross axis?
> 2. What happens to the axes in `flex-direction: column`?
> 3. What does `flex: 1` do?
