---
title: 10. Modern HTML Features
tags:
  - HTML
---

> [!summary] In one line
> Modals, pop-ups, accordions and "disable this whole area" used to need JavaScript libraries. Modern HTML has elements and attributes for them with keyboard, focus and screen-reader support built in.

| Need | Modern HTML |
| --- | --- |
| A modal window | `<dialog>` + `showModal()` |
| A menu, tooltip or toast that closes on outside click | `popover` attribute |
| Buttons that open and close things without JavaScript | `popovertarget`, `commandfor` + `command` |
| An accordion where only one item is open | `<details name="…">` |
| Make part of the page unclickable and unfocusable | `inert` |
| Collapsed text that browser find (Ctrl+F) can still reach | `hidden="until-found"` |
| Your own reusable elements | Web Components: custom elements, `<template>`, shadow DOM |

> [!tip] Remember it
> **Before reaching for a library, check whether HTML already has an element for it.** The built-in version handles focus, Esc and screen readers for you.

## `<dialog>`

```html
<button id="open">Delete account</button>

<dialog id="confirm" aria-labelledby="confirm-title">
  <h2 id="confirm-title">Delete your account?</h2>
  <p>This can't be undone.</p>
  <form method="dialog">              <!-- submitting closes the dialog -->
    <button value="cancel" autofocus>Cancel</button>
    <button value="delete">Delete</button>
  </form>
</dialog>

<script type="module">
  const dialog = document.getElementById('confirm');
  document.getElementById('open').addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('close', () => console.log(dialog.returnValue));   // 'cancel' or 'delete'
</script>
```

| | `showModal()` | `show()` |
| --- | --- | --- |
| Page behind | inert (can't click or tab to it) | still usable |
| Esc closes it | Yes | No |
| Backdrop | Yes, style with `dialog::backdrop` | No |
| Shown on top of everything (top layer) | Yes | No |

- `<form method="dialog">` closes the dialog and puts the clicked button's `value` in `dialog.returnValue`.
- Focus moves into the dialog when it opens and goes back to the button that opened it when it closes.
- Use a modal dialog for things that need an answer before the user continues (confirmations, sign-in).

```css
dialog::backdrop { background: rgb(0 0 0 / 0.5); }
```

## Popover

Any element with the `popover` attribute is hidden until opened. It shows on the **top layer** (above everything, no `z-index` fights), and a `popover="auto"` one closes when you click outside or press Esc.

```html
<button popovertarget="menu">Options</button>

<div id="menu" popover>
  <a href="/settings">Settings</a>
  <a href="/logout">Log out</a>
</div>
```

| Attribute | Does |
| --- | --- |
| `popover` (same as `popover="auto"`) | closes on outside click or Esc; opening one closes other auto popovers |
| `popover="manual"` | stays open until closed in code or by its button (toasts) |
| `popovertarget="id"` | a button that toggles the popover, no JavaScript |
| `popovertargetaction="show"` / `"hide"` | only open or only close |

In JavaScript: `el.showPopover()`, `el.hidePopover()`, `el.togglePopover()`. To place a popover next to its button, use CSS **anchor positioning** (newer: check support).

> [!tip] Remember it
> **Dialog = "stop and answer me" (blocks the page). Popover = "here's a little extra" (the page stays usable).**

## Invoker commands: `commandfor` and `command`

A newer, general way for a button to control another element without JavaScript. It works for dialogs as well as popovers.

```html
<button commandfor="confirm" command="show-modal">Delete account</button>
<dialog id="confirm">
  <p>Delete your account?</p>
  <button commandfor="confirm" command="close">Cancel</button>
</dialog>
```

Built-in commands: `show-modal`, `close`, `request-close` (dialogs), `toggle-popover`, `show-popover`, `hide-popover` (popovers). Custom commands start with `--` and fire a `command` event you handle in JavaScript. This is one of the newest features: check [Baseline](https://web.dev/baseline) before relying on it, and keep a JavaScript fallback for older browsers.

## Exclusive accordion

```html
<details name="faq" open>
  <summary>Shipping</summary>
  Free over ₹999.
</details>
<details name="faq">
  <summary>Returns</summary>
  30 days.
</details>
```

Several `<details>` with the same `name` act as one group: opening one closes the others. → [[HTML Notebook/2 Structure and Meaning/07 HTML Semantic HTML|Semantic HTML]]

## `inert`

```html
<main inert>…</main>     <!-- can't be clicked, focused, selected or read by screen readers -->
```

Use it for areas that shouldn't respond right now: the page behind a custom drawer, a form while it's submitting, slides that are off-screen. `showModal()` does this for you automatically.

## `hidden="until-found"`

```html
<div hidden="until-found">Long answer text…</div>
```

The content stays hidden but **Ctrl+F** (find in page) and links to `#fragment` can still find it. The browser then reveals it and fires a `beforematch` event. Useful for collapsed sections and tabs. Newer feature: check support.

## Web Components

Your own HTML elements, built with three standards. Frameworks like Angular can also output them (Angular Elements).

```html
<template id="badge-tpl">
  <style>span { padding: 2px 8px; border-radius: 999px; background: teal; color: white; }</style>
  <span><slot>New</slot></span>
</template>

<user-badge>Admin</user-badge>

<script type="module">
  class UserBadge extends HTMLElement {
    connectedCallback() {
      const tpl = document.getElementById('badge-tpl');
      this.attachShadow({ mode: 'open' }).append(tpl.content.cloneNode(true));
    }
  }
  customElements.define('user-badge', UserBadge);
</script>
```

| Piece | Does |
| --- | --- |
| **Custom elements** | define a new tag; the name must contain a hyphen (`user-badge`) |
| **`<template>`** | markup that isn't shown or run until you clone it |
| **Shadow DOM** | a private DOM: styles inside don't leak out, page styles don't leak in |
| **`<slot>`** | where the element's own children appear inside the shadow DOM |

**Declarative shadow DOM** writes the shadow root straight in HTML, so it works with server-side rendering and without JavaScript:

```html
<user-badge>
  <template shadowrootmode="open">
    <span><slot></slot></span>
  </template>
  Admin
</user-badge>
```

## Customizable `<select>`

New CSS (`appearance: base-select`) lets you fully style a native `<select>`, including putting images and rich content in its options, while it stays keyboard and screen-reader friendly. At the time of writing it's supported in Chromium browsers only. Others show a normal select, so it's safe to add as an enhancement.

> [!warning] New features and browser support
> `<dialog>`, `popover`, `<details name>`, `inert` and web components work in all current major browsers. `commandfor`/`command`, `hidden="until-found"`, anchor positioning and customizable `<select>` are newer: check [Baseline](https://web.dev/baseline) or [Can I use](https://caniuse.com) for your users' browsers.

> [!question] Recall
> 1. `showModal()` vs `show()`: what's different for the page behind?
> 2. How does `<form method="dialog">` work? Where does the clicked button's value end up?
> 3. Dialog vs popover: when do you use each?
> 4. How do you open a popover without JavaScript?
> 5. What does `inert` do, and when would you add it yourself?
> 6. Name the three standards behind Web Components. Why must a custom element's name contain a hyphen?

Prev: [[09 HTML Forms|9. Forms]] · Next: [[11 HTML Web APIs|11. Web APIs]]
