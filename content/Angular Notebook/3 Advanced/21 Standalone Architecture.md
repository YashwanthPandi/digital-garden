---
title: 21. Standalone Architecture
tags:
  - Angular
---

## Module-based vs standalone

![[module-architecture.jpg]]

- **Module-based:** the app is structured around `@NgModule`s. `main.ts` bootstraps `AppModule` → `AppComponent`; components are only usable through the module that declares them (feature modules A, B, C…).

![[standalone-architecture.jpg]]

- **Standalone:** components work **independently, without modules**. `main.ts` bootstraps the root component directly; each component `imports` what it needs.

Advantages: less boilerplate (no module code), simpler structure (fewer files), faster development, easier lazy loading (`loadComponent`), better tree-shaking.

```ts
// before: main.ts bootstraps a module
platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));

// now: main.ts bootstraps a component
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

**Standalone APIs** = the features that make this possible: `standalone: true` (the default since v19, so you can omit it), `bootstrapApplication()`, `provideRouter()`, `provideHttpClient()`, `app.config.ts`.

Timeline: standalone introduced in v14 (preview) → stable v15 → default for new projects v17 → `standalone: true` implicit v19.

## Migrating

`ng generate @angular/core:standalone` converts an existing module-based app step by step. Modules and standalone components can coexist: a standalone component can import an NgModule, and a module can import a standalone component.

## What changed in new projects (Angular 20+)

![[project-files-before-after-v20.jpg]]

| Before | Now |
| --- | --- |
| `app.module.ts` (root NgModule) | removed |
| `app-routing.module.ts` | `app.routes.ts` + `provideRouter` in `app.config.ts` |
| `app.component.ts/.html/.css` | `app.ts`, `app.html`, `app.css` (shorter file names, new style guide) |
| `src/assets/` | `public/` |
| `main.ts` bootstraps `AppModule` | `main.ts` uses `bootstrapApplication(App, appConfig)` |
| Zone.js change detection | **zoneless** by default (v21) |
| Karma + Jasmine tests | **Vitest** by default (v21) |

Load flow: before, `index.html` → `main.ts` → `app.module.ts` → `app.component.ts` → template. Now, `index.html` → `main.ts` → `app.ts` → `app.html`. See [[02 Architecture|Architecture]].

## Working with NgModules (older apps)

Plenty of jobs still mean maintaining a module-based app, so know what each `@NgModule` property does:

```ts
@NgModule({
  declarations: [ProductList, ProductCard, PricePipe],  // components/directives/pipes this module OWNS
  imports: [CommonModule, FormsModule, SharedModule],   // other modules whose exports we use
  exports: [ProductList],                               // what modules importing us may use
  providers: [ProductService],                          // services for DI
  bootstrap: [AppComponent],                            // root module only: the first component
})
export class ProductsModule {}
```

| Property | Holds | Rule |
| --- | --- | --- |
| `declarations` | components, directives, pipes | each one declared in **exactly one** module (`ng g c` adds it for you) |
| `imports` | **modules** only | gives this module's templates access to their exports |
| `exports` | declarations or modules | private by default; export to share |
| `providers` | services | app-wide when the module is eagerly loaded |
| `bootstrap` | root component | only in `AppModule` |

`BrowserModule` goes only in the root module; feature modules import `CommonModule` (which gives `*ngIf`, `*ngFor`, pipes).

Common ways teams split modules:

- **Feature module** (`ProductsModule`, `AdminModule`): one area of the app, often lazy-loaded (see [[12 Routing#Lazy loading|Lazy loading]]).
- **Shared module**: reusable components/pipes/directives, declared and **exported** once and imported wherever needed.
- **Core module**: app-wide singletons (header, auth service), imported once in `AppModule`.

```ts
// main.ts in a module-based app
platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));
```

### Barrel files

A barrel is an `index.ts` that re-exports a folder's public pieces, so imports get shorter:

```ts
// heroes/index.ts
export * from './hero.model';
export * from './hero.service';
export { HeroComponent } from './hero.component';
```

```ts
import { Hero, HeroService } from '../heroes';   // instead of three separate imports
```

Libraries use the same idea for their public API (`public-api.ts`). Inside an app, don't overdo them: big barrels can create circular imports and make it harder for the build to drop unused code.
