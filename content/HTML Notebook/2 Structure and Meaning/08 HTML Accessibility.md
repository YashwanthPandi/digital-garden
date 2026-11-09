---
title: 8. Accessibility
aliases:
  - html5-notebook/08-html-accessibility
tags:
  - HTML
  - a11y
---

> [!summary] In one line
> Accessibility (**a11y**: a + 11 letters + y) means everyone can use your site, including people using screen readers, keyboards only, voice control or zoom. The right HTML elements do most of the work for free.

> [!tip] Remember it
> **"Use the right element first, ARIA last."** A real `<button>` gives you focus, Enter/Space and a role for free. A `<div onclick>` gives you none of them.

## The standard: WCAG 2.2

The **Web Content Accessibility Guidelines** (WCAG) are the rules most laws point to. The current version is **2.2** (2023), and most companies target **level AA**. Accessibility is a legal requirement in many places, for example the European Accessibility Act (in force since June 2025) and the ADA in the US.

WCAG has four principles, **POUR**:

| Principle | Means | Examples |
| --- | --- | --- |
| **P**erceivable | people can see or hear the content | `alt` text, captions, contrast |
| **O**perable | people can use it | keyboard access, no time traps, big enough targets |
| **U**nderstandable | people can follow it | clear labels and errors, consistent navigation |
| **R**obust | assistive technology can read it | valid HTML, correct roles and names |

## The essentials checklist

- [ ] `<html lang="en">` (and `lang` on parts in other languages)
- [ ] One `<h1>`, headings in order (no skipping h2 → h4)
- [ ] Landmarks: `header`, `nav`, `main`, `footer` → [[HTML Notebook/2 Structure and Meaning/07 HTML Semantic HTML|Semantic HTML]]
- [ ] Every image has `alt` (empty `alt=""` if decorative)
- [ ] Every input has a `<label>` and the right `autocomplete` → [[HTML Notebook/3 Forms and Interactivity/09 HTML Forms|Forms]]
- [ ] Error messages say what's wrong and how to fix it, in text
- [ ] Links say where they go (no "click here")
- [ ] `<button>` for actions, `<a>` for navigation
- [ ] Everything works with **Tab / Shift+Tab / Enter / Space / Esc**
- [ ] Visible focus indicator (don't remove `outline` without a replacement; style `:focus-visible`)
- [ ] Focused elements aren't hidden behind sticky headers or cookie banners (new in 2.2)
- [ ] Click targets at least **24 × 24 px**, or spaced apart (new in 2.2)
- [ ] Anything done by dragging also works with a single click (new in 2.2)
- [ ] Colour contrast at least **4.5:1** for normal text, **3:1** for large text and UI parts
- [ ] Don't rely on colour alone ("fields in red are required" → also add text or an icon)
- [ ] Videos have captions; nothing flashes more than 3 times a second
- [ ] Respect `prefers-reduced-motion` for animations (CSS)
- [ ] A "Skip to main content" link as the first focusable element on long pages

> [!tip] Remember it
> **Button vs link: does it *do* something (button) or *go* somewhere (link)?**

## ARIA basics

ARIA (Accessible Rich Internet Applications) attributes add meaning **only when HTML can't**. They change what screen readers announce; they don't add any behaviour.

```html
<button aria-label="Close dialog">✕</button>        <!-- icon-only button needs a name -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<p role="status">Saved</p>                          <!-- announced politely when its text changes -->
<p role="alert">Payment failed</p>                  <!-- announced immediately: errors only -->
<span aria-hidden="true">★</span>                   <!-- hide decoration from screen readers -->
<input id="pw" type="password" aria-describedby="pw-hint">
<p id="pw-hint">At least 8 characters</p>
<a href="/cart" aria-current="page">Cart</a>         <!-- the current page in a nav -->
```

| Attribute | Use for |
| --- | --- |
| `aria-label` / `aria-labelledby` | give an element a name when there's no visible text |
| `aria-describedby` | link extra help or error text |
| `aria-expanded` | whether a menu or section is open |
| `aria-current` | the current page or step |
| `aria-live` / `role="status"` / `role="alert"` | announce updates that appear without a page load |
| `aria-hidden="true"` | hide decorative content from assistive technology |

> [!warning] First rule of ARIA
> No ARIA is better than bad ARIA. `role="button"` on a `div` still needs `tabindex="0"` and key handlers; use `<button>`. Never put `aria-hidden="true"` on something that can be focused.

## Hiding content

| How | Hidden from sight | Hidden from screen readers | Can be focused |
| --- | --- | --- | --- |
| `hidden` attribute / `display: none` | Yes | Yes | No |
| `aria-hidden="true"` | No | Yes | Yes (a bug: avoid on focusable content) |
| `inert` attribute | No | Yes | No (also not clickable) |
| "visually hidden" CSS class | Yes | No | Yes |

`inert` is the modern way to disable a whole area, for example the page behind a custom modal. See [[HTML Notebook/3 Forms and Interactivity/10 HTML Modern Features|Modern HTML Features]].

## tabindex

| Value | Meaning |
| --- | --- |
| `0` | focusable in normal order |
| `-1` | focusable by JS only (`el.focus()`) |
| `1+` | avoid: messes up the natural order |

## Test it

- Put the mouse away and use only the keyboard.
- Zoom the page to 200% and 400%: nothing should be cut off.
- Automated checks: Lighthouse or axe DevTools in Chrome. They only catch some problems (they can't judge whether `alt` text makes sense), so test by hand too.
- Use a screen reader: VoiceOver (Cmd+F5 on Mac), NVDA (free, Windows), TalkBack (Android).

> [!question] Recall
> 1. What does a11y stand for? What are the four WCAG principles?
> 2. Which WCAG version and level do most teams target? Name two checks that are new in 2.2.
> 3. What's the first rule of ARIA?
> 4. `hidden` vs `aria-hidden` vs `inert`?
> 5. `role="status"` vs `role="alert"`?

Prev: [[07 HTML Semantic HTML|7. Semantic HTML]] · Next: [[09 HTML Forms|9. Forms]]
