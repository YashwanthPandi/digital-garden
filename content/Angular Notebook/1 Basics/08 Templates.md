---
title: 8. Templates
tags:
  - Angular
---

Extra template syntax that shows up everywhere once you go past basic binding.

## Template reference variables `#`

Give an element (or directive) a name you can use elsewhere in the template.

```html
<input #phone placeholder="phone" />
<button (click)="call(phone.value)">Call</button>
```

With a directive you choose what it refers to: `#f="ngForm"`, `#name="ngModel"` (see [[15 Forms|Forms]]). From TypeScript, read them with `@ViewChild` ([[20 ViewChild and Content Projection|ViewChild]]).

## `ng-template`

A block of HTML that is **not rendered** until something tells Angular to render it. Structural directives use it under the hood.

```html
<div *ngIf="loggedIn; else loginBlock">Welcome back!</div>

<ng-template #loginBlock>
  <button>Log in</button>
</ng-template>
```

### `ngTemplateOutlet`: render a template somewhere

```html
<ng-template #card let-title="title">
  <div class="card">{{ title }}</div>
</ng-template>

<ng-container *ngTemplateOutlet="card; context: { title: 'Angular' }"></ng-container>
```

Useful for reusable chunks and for components that let the parent pass a template in (via `@ContentChild(TemplateRef)` or `input<TemplateRef<any>>()`).

## `ng-container`

A grouping element that **doesn't add anything to the DOM**. Use it to apply a structural directive without an extra `<div>`, or to host `ngTemplateOutlet`.

```html
<ng-container *ngIf="items.length">
  <h3>Items</h3>
  <ul>…</ul>
</ng-container>
```

| | Renders by itself? | Adds a DOM element? |
| --- | --- | --- |
| `ng-template` | no | no |
| `ng-container` | yes | no |
| `ng-content` | content projected from parent | no (see [[20 ViewChild and Content Projection\|Content Projection]]) |

## `@let`: local template variables (v18.1+)

```html
@let user = user$ | async;
@let fullName = user.first + ' ' + user.last;
<h1>{{ fullName }}</h1>
```

## `@defer`: lazy-load part of a template (v17+)

Loads a chunk of the template (and the components inside it) only when needed, so the initial bundle is smaller.

```html
@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <p>Chart will load when visible</p>
} @loading (minimum 300ms) {
  <p>Loading…</p>
} @error {
  <p>Failed to load</p>
}
```

Triggers: `on idle` (default), `on viewport`, `on interaction`, `on hover`, `on immediate`, `on timer(2s)`, `when condition`. More in [[23 Change Detection and Performance|Performance]].

## Template expression rules

- Keep expressions simple: no assignments (except in event bindings), no `new`, no `++`.
- Don't call heavy methods in templates: they run on every change detection. Use pipes, `computed()` signals, or precomputed fields.
- `?.` (safe navigation) avoids errors on `null`/`undefined`; `!` (non-null assertion) tells the type checker "trust me".
