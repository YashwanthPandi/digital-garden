---
title: Architecture
tags:
  - Angular
---

_(Pasted diagram: Modules (Component, Service, Value, Fn), Injector → Service, Template ⇄ Components with Property binding / Event binding, Directive, Metadata.)_

Group of components is called a module.

## Running Angular

`index.html` → `main.ts` (bootstraps the module) → `AppModule` (declaration, app root component selector) → `AppComponent`
