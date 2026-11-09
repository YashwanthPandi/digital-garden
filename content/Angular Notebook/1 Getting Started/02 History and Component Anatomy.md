---
title: 2. History and Component Anatomy
tags:
  - Angular
---

> [!summary] In one line
> Angular (2016) is a full rewrite of AngularJS (2010), released as a new major version every six months. Every component is a TypeScript class plus metadata in `@Component`: selector, template, styles, imports, providers, encapsulation and change detection.

## Angular and its history

| Year | Version | What changed |
| --- | --- | --- |
| 2010 | **AngularJS** (1.x) | JavaScript, controllers and `$scope`, two-way binding everywhere. Support ended in December 2021. |
| 2016 | **Angular 2** | complete rewrite in TypeScript: components, DI, RxJS. Not compatible with AngularJS. |
| 2017 | v4 | version 3 skipped to line up the router package's numbering; semantic versioning from here on |
| 2020 | v9 | **Ivy** compiler and renderer become the default (smaller bundles, faster builds) |
| 2022–23 | v14–v16 | typed forms, **standalone** components, **signals** (developer preview) |
| 2023 | v17 | new **control flow** (`@if`, `@for`), `@defer`, esbuild builds, new docs at angular.dev |
| 2024–25 | v18–v21 | signal inputs/queries/`model()`, zoneless, standalone by default, Vitest by default, experimental Signal Forms |

**Release cycle:** a major version roughly every **6 months**, minor releases monthly. Each major gets 18 months of support (6 active + 12 LTS). `ng update` migrates code between versions with automatic schematics → [[Angular Notebook/11 Tooling and Ecosystem/34 CLI Tooling Libraries and Deployment|CLI and Tooling]].

> [!tip] Remember it
> **AngularJS = "Angular 1", the old JavaScript framework. Angular = "Angular 2+", the TypeScript rewrite.** Same name, different frameworks.

## Component anatomy

A component = **class** (data and logic) + **template** (HTML) + **styles** + **metadata** (how Angular should treat it).

```ts
import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-card',                  // the HTML tag: <app-user-card>
  imports: [DatePipe, AvatarComponent],       // components, directives, pipes the template uses
  templateUrl: './user-card.component.html',  // or template: `…`
  styleUrl: './user-card.component.css',      // or styles: `…`
  providers: [UserCardStore],                 // services created for this component (and its children)
  viewProviders: [FormatService],             // like providers, but hidden from projected content
  encapsulation: ViewEncapsulation.Emulated,  // default
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card', '[class.selected]': 'selected()', '(click)': 'select()' },
})
export class UserCardComponent {
  user = input.required<User>();
  selected = input(false);
  picked = output<User>();
  select() { this.picked.emit(this.user()); }
}
```

| Metadata | Does |
| --- | --- |
| `selector` | how the component is used in HTML: element (`app-x`), attribute (`[appX]`) or class (`.x`) |
| `template` / `templateUrl` | the HTML |
| `styles` / `styleUrl` / `styleUrls` | the CSS (scoped to this component by default) |
| `imports` | what the template may use. Standalone components (the default since v19) import what they need directly |
| `providers` | services created per component instance; visible to its view **and** its projected content |
| `viewProviders` | services visible to the component's own view only, **not** to content projected with `<ng-content>` |
| `encapsulation` | `Emulated` (default: CSS scoped via generated attributes), `ShadowDom` (real shadow DOM), `None` (global CSS) |
| `changeDetection` | `Default` or `OnPush` → [[Angular Notebook/8 Reactivity and Performance/27 Change Detection and Performance\|Change Detection]] |
| `host` | classes, attributes, bindings and listeners on the component's own element (preferred over `@HostBinding`/`@HostListener`) |

> [!tip] Remember it
> **`providers` = shared with the whole house, guests included. `viewProviders` = family only: projected content (guests) can't use it.**

### Creating a component

```bash
ng generate component user-card     # or: ng g c user-card
```

Creates the `.ts`, `.html`, `.css` and `.spec.ts` files. → [[Angular Notebook/2 Components and Templates/05 Components|Components]]

## Parent–child interaction

| Direction | Tool | Chapter |
| --- | --- | --- |
| parent → child | `input()` / `@Input()` | [[Angular Notebook/3 Component Interaction/13 Component Communication\|Component Communication]] |
| child → parent | `output()` / `@Output()` + `EventEmitter` | same |
| both ways | `model()` | [[Angular Notebook/8 Reactivity and Performance/26 Signals\|Signals]] |
| parent reads child | `viewChild()` / `@ViewChild` | [[Angular Notebook/3 Component Interaction/15 ViewChild and Content Projection\|ViewChild]] |
| parent reads projected content | `contentChild()` / `@ContentChild` | same |
| unrelated components | a shared service | [[Angular Notebook/4 Services and DI/16 Services and Dependency Injection\|Services]] |

> [!question] Recall
> 1. What's the difference between AngularJS and Angular? Why was version 3 skipped?
> 2. How often does Angular release a major version, and how long is each supported?
> 3. Name eight properties you can put in `@Component`.
> 4. `providers` vs `viewProviders`?
> 5. What are the three `ViewEncapsulation` modes?

Prev: [[01 Fundamentals and Setup|1. Fundamentals and Setup]] · Next: [[03 Architecture|3. Architecture]]
