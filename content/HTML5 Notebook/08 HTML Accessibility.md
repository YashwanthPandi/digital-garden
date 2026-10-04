---
title: 8. Accessibility
tags:
  - HTML
  - a11y
---

> [!summary] In one line
> Accessibility (**a11y**: a + 11 letters + y) means everyone can use your site, including people using screen readers, keyboards only, or zoom. Good HTML gets you 80% there for free.

> [!tip] 🧠 Remember it
> **"Use the right element first, ARIA last."** A real `<button>` gives you focus, Enter/Space and a role for free. A `<div onclick>` gives you nothing.

## The essentials checklist

- [ ] `<html lang="en">`
- [ ] One `<h1>`, headings in order (no skipping h2 → h4)
- [ ] Landmarks: `header`, `nav`, `main`, `footer` → [[06 HTML Semantic HTML|Semantic HTML]]
- [ ] Every image has `alt` (empty `alt=""` if decorative)
- [ ] Every input has a `<label>` → [[05 HTML Forms|Forms]]
- [ ] Links say where they go (no "click here")
- [ ] `<button>` for actions, `<a>` for navigation
- [ ] Everything works with **Tab / Shift+Tab / Enter / Space / Esc**
- [ ] Visible focus outline (don't `outline: none` without a replacement)
- [ ] Colour contrast at least **4.5:1** for normal text
- [ ] Don't rely on colour alone ("fields in red are required" → also add text/icon)
- [ ] Videos have captions

🧠 **Button vs link: does it *do* something (button) or *go* somewhere (link)?**

## ARIA basics

ARIA (Accessible Rich Internet Applications) attributes add meaning **only when HTML can't**.

```html
<button aria-label="Close dialog">✕</button>        <!-- icon-only button needs a name -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<div role="alert">Saved!</div>                      <!-- announced immediately -->
<span aria-hidden="true">★</span>                   <!-- hide decoration from screen readers -->
<input aria-describedby="pw-hint"> <p id="pw-hint">At least 8 characters</p>
```

> [!warning] First rule of ARIA
> No ARIA is better than bad ARIA. `role="button"` on a `div` still needs `tabindex="0"` and key handlers; just use `<button>`.

## tabindex

| Value | Meaning |
| --- | --- |
| `0` | focusable in normal order |
| `-1` | focusable by JS only (`el.focus()`) |
| `1+` | ❌ avoid: messes up the natural order |

## Test it

- Unplug the mouse and use only the keyboard.
- Lighthouse / axe DevTools in Chrome.
- Turn on a screen reader (VoiceOver: Cmd+F5 on Mac).

> [!question] Recall
> 1. What does a11y stand for?
> 2. What's the first rule of ARIA?
> 3. Name 5 items from the essentials checklist.
