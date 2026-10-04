---
title: 2. Architecture
tags:
  - Angular
---

_(Pasted diagram: Modules (Component, Service, Value, Fn), Injector → Service, Template ⇄ Components with Property binding / Event binding, Directive, Metadata.)_

Group of components is called a module.

Building blocks: **components** (UI) with **templates**, **directives** and **pipes** used inside templates, **services** injected by the **injector** (DI), and **metadata** from decorators that tells Angular what each class is. Components talk to their templates through **data binding**.

## Running Angular

`index.html` → `main.ts` (bootstraps the module) → `AppModule` (declaration, app root component selector) → `AppComponent`

That's the older module-based flow. In standalone apps (default today, see [[21 Standalone Architecture|Standalone Architecture]]) there is no `AppModule`:

`index.html` (`<app-root>`) → `main.ts` (`bootstrapApplication`) → `app.ts` → `app.html` / `app.css` → rendered back into `index.html`

![[app-loading-flow.jpg]]

The root `App` component then contains Component 1, 2, 3…

Before vs after Angular 20:

![[loading-before-after-v20.jpg]]

## `index.html`

The main HTML file. It loads first in the browser and is the **single page** the whole app runs in.

`<app-root></app-root>` is just a placeholder. When the app starts, Angular finds the component with selector `app-root` and replaces the tag with that component's HTML.

`<base href="/">` tells the router the base URL for relative links.

## `main.ts`

The **entry point**. It tells Angular which component to load first and starts the app.

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

`bootstrapApplication()` starts the app by loading the root component.

## `app.config.ts`

Registers global providers and app-level settings before the app starts (router, HttpClient, interceptors…).

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

New projects since v21 are **zoneless** (no Zone.js); older ones have `provideZoneChangeDetection({ eventCoalescing: true })` here. See [[23 Change Detection and Performance|Change Detection]].

## `angular.json`

Config file that tells Angular how to **build, run and structure** the project. See [[01 Fundamentals and Setup|Fundamentals and Setup]].
