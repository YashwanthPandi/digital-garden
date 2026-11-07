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

Two ways to attach styles, like templates:

```ts
@Component({
  styleUrl: './card.css',                     // a file (styleUrls: [...] for several)
  styles: [`div { background: lime; }`],      // inline
})
```

> [!warning] Old webpack setups sometimes loaded styles with `styles: [require('./card.css')]`. That worked in development but the styles disappeared in production builds. Use `styleUrl` / `styles`.

## Setting the page title

The browser tab title lives in `<head>`, outside every component. Angular's `Title` service changes it:

```ts
export class ProductPage {
  private title = inject(Title);   // from @angular/platform-browser

  ngOnInit() {
    this.title.setTitle('Running shoes | My Shop');
  }
}
```

For titles per route, the `title` property in the route config is simpler (see [[12 Routing|Routing]]). The `Meta` service does the same for `<meta>` tags (description, social previews).

## Example: image picker with preview

A reusable component that shows the chosen picture before it's uploaded, and tells the parent which file was picked:

```ts
@Component({
  selector: 'app-image-preview',
  template: `
    <input type="file" accept="image/*" (change)="onPick($event)" />
    @if (source()) { <img [src]="source()" alt="Preview" /> }
  `,
})
export class ImagePreview {
  picked = output<File>();
  source = signal('');

  onPick(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.source.set(reader.result as string);   // data: URL the <img> can show
      this.picked.emit(file);
    };
    reader.readAsDataURL(file);
  }
}
```

```html
<!-- parent -->
<form (ngSubmit)="upload()">
  <app-image-preview (picked)="file = $event" />
  <button type="submit">Upload</button>
</form>
```

It combines event binding, a signal for state, and an output for the parent (see [[09 Component Communication|Component Communication]]).
