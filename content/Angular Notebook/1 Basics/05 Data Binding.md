---
title: 5. Data Binding
tags:
  - Angular
---

1-way data binding · 2-way data binding

Data binding is how the component's TypeScript code and its HTML view talk to each other.

![[types-of-data-binding.jpg]]

| Type | Syntax | Direction |
| --- | --- | --- |
| Interpolation | `{{ data }}` | TS → view |
| Property binding | `[property]="data"` | TS → view |
| Event binding | `(event)="expression"` | view → TS |
| Two-way binding | `[(ngModel)]="data"` | both |

## Interpolation

One-way, component → template.

```ts
export class Interpolation {
  appName = 'Interview Happy';
  user = { firstName: 'Happy' };
}
```

```html
<p>{{ appName }}</p>
<p>{{ user.firstName }}</p>
<p>{{ user?.address?.city }}</p>   <!-- ?. safe navigation: no error if null -->
```

## Property binding

One-way, component → an **HTML element property**, using `[ ]`.

```html
<img [src]="imageUrl" alt="Angular Logo" width="120" />
<button [disabled]="isSaving">Save</button>
```

### Attribute, class and style bindings

Some things aren't DOM properties, so there are special forms:

```html
<td [attr.colspan]="span"></td>          <!-- HTML attribute (aria-*, colspan…) -->
<div [class.active]="isActive"></div>     <!-- toggle one class -->
<div [style.width.px]="width"></div>      <!-- one style, with unit -->
```

> [!note] Property vs attribute
> Attributes initialize DOM properties and then don't change; properties hold the current value. `[value]` binds the property, `[attr.value]` the attribute.

## Event binding

One-way, view → component, using `( )`. Listens to events like `click`, `input`, `keyup`, `change`.

```html
<button (click)="showMessage()">Click Me</button>
<input (input)="onType($event)" />          <!-- $event = the DOM event -->
<input (keyup.enter)="search()" />          <!-- key filtering -->
```

```ts
showMessage() { alert('Button clicked!'); }
onType(e: Event) { this.text = (e.target as HTMLInputElement).value; }
```

## Two-way binding

Keeps view and component in sync automatically: **two-way = property binding + event binding** ("banana in a box" `[( )]`). `ngModel` needs `FormsModule` in the component's `imports`.

![[two-way-binding.jpg]]

```html
<input type="text" [(ngModel)]="username" />
<p>Live preview: Hello, {{ username }}</p>
```

```ts
username = 'Happy';
```

`[(ngModel)]` is sugar for `[ngModel]="username" (ngModelChange)="username = $event"`. Your own components support `[(x)]` with an input `x` + output `xChange`, or simply `model()` (see [[22 Signals|Signals]]).
