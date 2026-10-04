---
title: 8. Responsive Design
tags:
  - CSS
---

> [!summary] In one line
> One site that adapts to every screen: **fluid layouts**, **flexible images** and **media queries**, designed **mobile-first**.

## Step 0: the viewport meta tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without it, phones pretend to be 980px wide and zoom out.

## Media queries

```css
/* Mobile-first: base styles are for small screens… */
.cards { display: grid; gap: 1rem; }

/* …then ADD styles as the screen grows */
@media (min-width: 640px)  { .cards { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .cards { grid-template-columns: repeat(3, 1fr); } }
```

> [!tip] 🧠 Remember it
> **Mobile-first = `min-width` = start small and add.** Like packing: start with the essentials (phone), add more as the suitcase gets bigger (desktop).
> Desktop-first uses `max-width` and takes things away.

Common breakpoints: **640px** (large phone), **768px** (tablet), **1024px** (laptop), **1280px** (desktop). Pick breakpoints where *your content* breaks, not for specific devices.

### Other media features

```css
@media (prefers-color-scheme: dark) { :root { --bg: #111; --text: #eee; } }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
@media (hover: hover) { .btn:hover { } }    /* only devices with a real mouse */
@media print { nav { display: none; } }
@media (orientation: landscape) { }
```

## Fluid everything

```css
img, video { max-width: 100%; height: auto; }      /* never overflow the screen */
.container { width: min(100% - 2rem, 1100px); margin-inline: auto; }  /* gutter + max width */
h1 { font-size: clamp(1.75rem, 4vw + 1rem, 3rem); } /* fluid type */
```

## Container queries (modern)

Respond to the **component's** width, not the screen's. Great for reusable cards.

```css
.card-wrapper { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: flex; }
}
```

🧠 **Media query = "how big is the room?" Container query = "how big is my box?"**

## Checklist

- [ ] Viewport meta tag
- [ ] Mobile-first base styles, `min-width` queries
- [ ] Flexbox/Grid with `wrap`, `auto-fit`, `fr`
- [ ] `max-width: 100%` images
- [ ] `rem` / `clamp()` for text
- [ ] Tap targets at least ~44×44px
- [ ] Test in DevTools device mode (Cmd+Shift+M)

> [!question] Recall
> 1. What does mobile-first mean, and which media feature does it use?
> 2. Why is the viewport meta tag needed?
> 3. Media query vs container query?
