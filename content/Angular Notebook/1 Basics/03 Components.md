---
title: 3. Components
tags:
  - Angular
---

A component is a reusable building block for the UI. Every component has three parts:

![[app-component.jpg]]

| File | Contains |
| --- | --- |
| `component.ts` | class + logic (TypeScript) |
| `component.html` | template (view) |
| `component.css` | styles |

…plus metadata in the `@Component` decorator: `selector`, `templateUrl` (or inline `template`), `styleUrl` (or inline `styles`), `imports` (see [[04 Decorators|Decorators]]).

## App component

The **main (root) component**: the first component that loads when the app starts. Every other component is nested inside it. Its selector `app-root` is placed in `index.html` (see [[02 Architecture|Architecture]]).

## Creating a component

```bash
ng generate component first-component   # or: ng g c first-component
```

![[generate-component.jpg]]

Creates `src/app/first-component/` with the `.ts`, `.html`, `.css` (and spec) files.

To use it, add the class to the parent's `imports` array and put its selector in the parent template:

```ts
@Component({ selector: 'app-root', imports: [FirstComponent], template: `<app-first-component />` })
export class App {}
```

## Parent–child components

One component (parent) includes another (child) in its template, by **placing the child's selector in the parent's HTML**:

![[parent-child-components.jpg]]

`index.html` → `app.html` (root/parent) → `<app-my-component>` (child, and parent of its own children) → `<app-child1>`, `<app-child2>`

Passing data between them: [[09 Component Communication|Component Communication]].

## `import` and `export`

```ts
// app.ts
import { Component, signal } from '@angular/core';   // bring in from another file/library
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {                                    // make the class usable in other files
  protected readonly title = signal('my-first-app');
}
```

- **`import`**: brings a class/function from another file or Angular library into the current file.
- **`export`**: makes this class available to other files. Without it, nothing else can use it.

## Component styles and view encapsulation

Styles in a component's CSS only apply to **that component's template** by default. Angular adds unique attributes (`_ngcontent-xyz`) to scope them.

| `encapsulation` | Effect |
| --- | --- |
| `ViewEncapsulation.Emulated` (default) | styles scoped via attributes |
| `ViewEncapsulation.None` | styles become global |
| `ViewEncapsulation.ShadowDom` | uses the browser's real Shadow DOM |

Special selectors: `:host` (the component's own element), `::ng-deep` (pierce into children, deprecated, avoid). Global styles go in `src/styles.css`.
