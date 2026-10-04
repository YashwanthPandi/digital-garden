---
title: 9. Transitions, Transforms and Animations
tags:
  - CSS
---

> [!summary] In one line
> **Transform** moves/rotates/scales a box, **transition** smoothly animates between two states (e.g. on hover), **animation** runs multi-step `@keyframes` on its own.

## Transforms

```css
transform: translate(20px, -10px);  /* move */
transform: scale(1.1);              /* grow 10% */
transform: rotate(45deg);
transform: skew(10deg);
transform: translateY(-4px) scale(1.02);   /* combine (applied right to left) */
transform-origin: top left;         /* the pivot point */
```

Transforms don't affect layout (neighbours don't move) and are GPU-friendly.

## Transitions: A → B

```css
.btn {
  background: royalblue;
  transition: background 0.3s ease, transform 0.2s ease-out;
}
.btn:hover {
  background: navy;
  transform: translateY(-2px);
}
```

`transition: property duration timing-function delay;`

> [!tip] 🧠 Remember it
> **Transition = a dimmer switch** (smoothly between two settings when something triggers it).
> **Animation = a disco light** (runs its own programme of many steps, can loop).

Timing functions: `linear` (robot), `ease` (default), `ease-in` (slow start), `ease-out` (slow end, feels natural for entering), `ease-in-out`, `cubic-bezier(...)`.

## Animations: keyframes

```css
@keyframes pulse {
  0%   { transform: scale(1);    opacity: 1; }
  50%  { transform: scale(1.1);  opacity: .7; }
  100% { transform: scale(1);    opacity: 1; }
}

.dot {
  animation: pulse 1.5s ease-in-out infinite;
  /* name duration timing iteration-count (+ delay direction fill-mode) */
}

@keyframes spin { to { transform: rotate(360deg); } }
.loader { animation: spin 1s linear infinite; }
```

| Property | Meaning |
| --- | --- |
| `animation-iteration-count` | `3`, `infinite` |
| `animation-direction` | `alternate` = play forward then backward |
| `animation-fill-mode` | `forwards` = keep the last frame after finishing |
| `animation-play-state` | `paused` / `running` |

## Performance and accessibility

- Animate only **`transform`** and **`opacity`** (cheap). Animating `width`, `top`, `margin` causes layout recalculation (janky).
- Respect users who get motion-sick:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

🧠 **"Transform and opacity: the only two that dance smoothly."**

> [!question] Recall
> 1. Transition vs animation?
> 2. Which two properties are cheapest to animate?
> 3. What does `animation-fill-mode: forwards` do?
