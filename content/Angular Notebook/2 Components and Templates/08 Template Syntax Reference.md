---
title: 8. Template Syntax Reference
tags:
  - Angular
---

> [!summary] In one line
> One page with every piece of template syntax: interpolation, template statements, property/attribute/class/style/event/two-way binding, pipes and their precedence, control flow blocks, `@let`, `@defer`, template reference variables and dynamic components.

Chapters with more detail: [[Angular Notebook/2 Components and Templates/09 Data Binding|Data Binding]], [[Angular Notebook/2 Components and Templates/10 Directives|Directives]], [[Angular Notebook/2 Components and Templates/12 Pipes|Pipes]], [[Angular Notebook/2 Components and Templates/07 Templates|Templates]].

## Bindings

```html
<h1>{{ title() }}</h1>                                 <!-- interpolation: value → text -->
<img [src]="user().avatar" [alt]="user().name">       <!-- property binding: value → DOM property -->
<td [attr.colspan]="span">…</td>                      <!-- attribute binding: when there's no DOM property -->
<button [attr.aria-expanded]="open()">Menu</button>
<li [class.active]="isActive()">…</li>                <!-- one class on/off -->
<div [class]="{ card: true, featured: featured() }">  <!-- several classes -->
<div [style.width.px]="width()">                      <!-- one style, with a unit -->
<button (click)="save()">Save</button>                <!-- event binding: DOM event → statement -->
<input [(ngModel)]="name">                             <!-- two-way binding (FormsModule) -->
<app-rating [(value)]="stars">                         <!-- two-way with your own model() -->
```

| Syntax | Direction | Name |
| --- | --- | --- |
| `{{ x }}` | class → view | interpolation |
| `[prop]="x"` | class → view | property binding |
| `[attr.name]="x"` | class → view | attribute binding (ARIA, `colspan`, SVG) |
| `[class.x]` / `[style.x]` | class → view | class and style binding |
| `(event)="handler()"` | view → class | event binding |
| `[(x)]="y"` | both | two-way binding ("banana in a box") |

> [!tip] Remember it
> **Square brackets send data in, round brackets let events out, banana-in-a-box `[()]` does both.**

**Property vs attribute:** HTML attributes set the **initial** value; DOM properties hold the **current** value. Angular binds to properties. Use `[attr.x]` only when there's no matching property (ARIA attributes, `colspan`, custom attributes).

## Template statements

The code inside `(event)="…"` is a **template statement**: it runs in response to an event.

```html
<button (click)="count.set(count() + 1)">+1</button>
<input (keyup.enter)="search($any($event.target).value)">   <!-- key filter + $event -->
<form (ngSubmit)="submit(); reset()">                        <!-- several statements with ; -->
```

- `$event` is the DOM event (or the value an `output()` emitted).
- Allowed: method calls, assignments (`=`), `;` to chain. Not allowed: `new`, `++`/`--`, `+=`, bitwise operators, or globals like `window` and `console` (only the component's members).
- Keep them short: call a method instead of writing logic in the template.

## Pipes and precedence

```html
{{ price | currency:'INR':'symbol':'1.0-0' }}            <!-- parameters after colons -->
{{ name | lowercase | titlecase }}                       <!-- chaining: left to right -->
{{ isVip ? 'gold' : ('standard' | uppercase) }}          <!-- brackets needed -->
{{ (user$ | async)?.name }}                              <!-- brackets before ?. -->
```

**Pipe precedence:** the `|` operator binds **more tightly than the ternary** `?:` but **less tightly than** most other expressions. `cond ? a : b | uppercase` means `cond ? a : (b | uppercase)`, so the pipe only applies to `b`. Add brackets to make the intent clear.

## Control flow

```html
@if (user(); as u) {
  <p>Hi {{ u.name }}</p>
} @else if (loading()) {
  <app-spinner />
} @else {
  <a routerLink="/login">Log in</a>
}

@for (item of items(); track item.id; let i = $index, last = $last) {
  <li [class.last]="last">{{ i + 1 }}. {{ item.name }}</li>
} @empty {
  <li>No items yet</li>
}

@switch (status()) {
  @case ('active') { <span>Active</span> }
  @case ('banned') { <span>Banned</span> }
  @default { <span>Unknown</span> }
}

@let total = subtotal() + tax();                 <!-- a local template variable -->
<p>Total: {{ total | currency }}</p>
```

`@for` requires `track` (use a unique id). Context variables: `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`. The older `*ngIf`, `*ngFor`, `[ngSwitch]` still work but new code uses blocks.

## `@defer` (deferrable views)

```html
@defer (on viewport; prefetch on idle) {
  <app-comments [postId]="id()" />
} @placeholder (minimum 500ms) {
  <p>Comments</p>
} @loading (after 100ms; minimum 1s) {
  <app-spinner />
} @error {
  <p>Couldn't load comments.</p>
}
```

Triggers: `on idle` (default), `on viewport`, `on interaction`, `on hover`, `on immediate`, `on timer(2s)`, `when condition()`. Components inside must be standalone and not used elsewhere eagerly, so they can go into a separate bundle. → [[Angular Notebook/8 Reactivity and Performance/27 Change Detection and Performance|Performance]]

## Template reference variables

```html
<input #query placeholder="Search">
<button (click)="search(query.value)">Go</button>     <!-- #query = the input element -->

<form #f="ngForm" (ngSubmit)="save(f.value)">          <!-- = the directive instance -->
<ng-template #empty><p>Nothing here</p></ng-template>  <!-- = a TemplateRef -->
```

A `#name` on an element refers to the element, on a component to the component instance, and with `="exportAsName"` to a directive. Read them in the class with `viewChild('query')`.

## Structural and attribute directives

| Kind | Changes | Examples |
| --- | --- | --- |
| Structural | the DOM structure (adds/removes elements) | `@if`/`*ngIf`, `@for`/`*ngFor`, `*ngTemplateOutlet`, your own `*appIfRole` |
| Attribute | how an existing element looks or behaves | `[ngClass]`, `[ngStyle]`, `[ngModel]`, your own `[appHighlight]` |
| Component | a directive with its own template | every component |

→ [[Angular Notebook/2 Components and Templates/11 Custom Directives|Custom Directives]]

## Dynamic components

Create components from code, when you don't know which one until runtime (dialogs, dashboards with widgets from config):

```html
<ng-container *ngComponentOutlet="widget(); inputs: { data: data() }" />
```

```ts
export class HostComponent {
  private vcr = inject(ViewContainerRef);
  open() {
    const ref = this.vcr.createComponent(AlertComponent);
    ref.setInput('message', 'Saved');
    ref.instance.closed.subscribe(() => ref.destroy());
  }
}
```

> [!question] Recall
> 1. When do you need `[attr.x]` instead of `[x]`?
> 2. What isn't allowed in a template statement? What is `$event`?
> 3. In `cond ? a : b | uppercase`, which part gets uppercased?
> 4. Write an `@for` with `track`, `$index` and `@empty`.
> 5. Name four `@defer` triggers. What are `@placeholder` and `@loading` for?
> 6. What can a template reference variable point to?
> 7. Two ways to create a component dynamically?

Prev: [[07 Templates|7. Templates]] · Next: [[09 Data Binding|9. Data Binding]]
