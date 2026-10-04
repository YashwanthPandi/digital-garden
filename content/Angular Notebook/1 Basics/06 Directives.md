---
title: 6. Directives
tags:
  - Angular
---

_(Don't get confused.)_

Directives are special Angular classes used to modify the behaviour, appearance & structure of HTML DOM elements (hide/unhide, change colour, move position).

![[what-are-directives.jpg]]

- **Components**
- **Structural:** `*ngIf`, `*ngFor`, `*ngSwitch` (`*ngSwitchCase`, `*ngSwitchDefault`)
- **Attribute:** `[ngClass]`, `[ngStyle]`

![[types-of-directives.jpg]]

_Sticky:_ for `*ngFor`, `*ngIf`, `*ngSwitch` we need `CommonModule` imported into the component.

```html
<p *ngFor="let item of items">{{ item }}</p>
```

`[ngClass]` → for CSS classes (mostly used) · `[ngStyle]` → inline CSS

> [!tip] Modern control flow
> Since Angular 17 there are built-in `@if`, `@for`, `@switch` blocks. They replace `*ngIf`, `*ngFor`, `*ngSwitch`, need **no** import, and are faster. The old directives are deprecated (v20). Know both for interviews.

Writing your own directives: [[16 Custom Directives|Custom Directives]].

## Structural directives

Change the **structure** of the DOM by adding or removing elements. The `*` is shorthand: `<p *ngIf="x">` becomes `<ng-template [ngIf]="x"><p>…</p></ng-template>` (see [[08 Templates|Templates]]).

### `*ngIf` / `@if`

Adds or removes an element based on a boolean condition (removed = not in the DOM at all, not just hidden; use `[hidden]` to only hide it).

```html
<p *ngIf="showMessage">Interview Happy</p>
<button (click)="toggleMessage()">Show / Hide</button>
```

```ts
showMessage = true;
toggleMessage() { this.showMessage = !this.showMessage; }
```

Same thing with `@if`, which also supports `@else if`, `@else`, and aliasing with `as`:

```html
@if (user(); as u) {
  <p>Hello {{ u.name }}</p>
} @else if (loading) {
  <p>Loading…</p>
} @else {
  <p>Please log in</p>
}
```

### `*ngFor` / `@for`

Loops through an array and creates one element per item.

```html
<li *ngFor="let language of languages; let i = index">{{ i }}: {{ language }}</li>

@for (language of languages; track language; let i = $index, last = $last) {
  <li>{{ i }}: {{ language }}</li>
} @empty {
  <li>No languages</li>
}
```

`track` tells Angular how to uniquely identify each item, so it only updates the DOM elements that changed instead of re-creating the whole list (it's mandatory in `@for`; use `track item.id` for objects; older `*ngFor` used `trackBy`).

Implicit variables: `$index`, `$count`, `$first`, `$last`, `$even`, `$odd`. `@empty` renders when the list is empty.

### `ngSwitch` / `@switch`

Shows **one element among many** based on a matching value.

```html
<div [ngSwitch]="selectedTechnology">
  <p *ngSwitchCase="'Java'">You selected Java</p>
  <p *ngSwitchCase="'Angular'">You selected Angular</p>
  <p *ngSwitchDefault>Unknown Technology</p>
</div>

@switch (selectedTechnology) {
  @case ('Java') { <p>You selected Java</p> }
  @case ('Angular') { <p>You selected Angular</p> }
  @default { <p>Unknown Technology</p> }
}
```

Note: `[ngSwitch]` itself is an attribute directive; `*ngSwitchCase` / `*ngSwitchDefault` are structural.

## Attribute directives

Change how an element **looks or behaves** but don't add/remove elements.

### `[ngClass]`

Adds/removes CSS classes dynamically. `[ngClass]` = property binding + `class`.

```html
<p [ngClass]="status">Interview Happy</p>                 <!-- status = 'success' -->
<p [ngClass]="{ success: isOk, error: !isOk }">…</p>     <!-- object form -->
<p [class]="{ success: isOk, error: !isOk }">…</p>       <!-- plain [class] does the same, no import -->
```

### `[ngStyle]`

Applies inline styles dynamically.

```html
<p [ngStyle]="{ color: status === 'success' ? 'green' : 'red' }">Interview Happy</p>
```

Other built-in attribute directive: `ngModel` (see [[15 Forms|Forms]]).

## Component directive

A directive with its own template (and optional CSS). **Every component is a component directive**.
