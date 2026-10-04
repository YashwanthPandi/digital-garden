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
