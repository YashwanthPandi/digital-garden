---
title: Angular Notebook
tags:
  - Angular
  - Notes
  - Revision
  - Skills
---

My Angular study notes, organised as a roadmap **from zero to interview ready**. Work through the levels in order: each page builds on the ones before it. For the language itself, see [[TypeScript Notebook/index|TypeScript Notebook]].

![[angular-roadmap.jpg]]

## Learning roadmap

### Level 0 – Prerequisites

Before Angular, be comfortable with:

- **JS essentials:** basic syntax, variables, functions and arrow functions, arrays/objects, promises and `async`/`await`
- **TypeScript:** types, interfaces, classes, generics, OOP → [[TypeScript Notebook/index|TypeScript Notebook]]
- **HTML & CSS** basics

### Level 1 – Basics (foundation)

Setup, how an app boots, and the template toolbox. → [[Angular Notebook/1 Basics/index|Basics overview]]

1. [[01 Fundamentals and Setup|Fundamentals and Setup]]: what Angular is, advantages, SPA, npm, CLI, project files (`angular.json`, `package.json`), JIT vs AOT
2. [[02 Architecture|Architecture]]: app process `index.html` → `app-root` → `main.ts` → bootstrap; `app.config.ts`
3. [[03 Components|Components]]: structure, selector and template, parent/child, view encapsulation
4. [[04 Decorators|Decorators]]: `@Component`, `@Injectable`, `@Input`, `@Output`; class, property, method, parameter decorators; NgModule
5. [[05 Data Binding|Data Binding]]: interpolation, property, event, two-way (`ngModel`)
6. [[06 Directives|Directives]]: structural (`*ngIf`/`@if`, `*ngFor`/`@for`, `@switch`), attribute (`ngClass`, `ngStyle`), component
7. [[07 Pipes|Pipes]]: built-in (date, uppercase, lowercase, currency…), custom, chaining, pure vs impure, stateful pipes, why there's no `orderBy`
8. [[08 Templates|Templates]]: template reference variables, `ng-template`, `ng-container`, `@let`, `@defer`

### Level 2 – Intermediate (real world)

Building real features. → [[Angular Notebook/2 Intermediate/index|Intermediate overview]]

9. [[09 Component Communication|Component Communication]]: parent–child with `@Input` and `@Output`, shared services
10. [[10 Services and Dependency Injection|Services and Dependency Injection]]: `@Injectable`, `inject()`, provider scopes, hierarchical DI
11. [[11 Lifecycle Hooks|Lifecycle Hooks]]: `ngOnChanges`, `ngOnInit`, `ngOnDestroy`, `ngAfterViewInit`, `ngAfterContentInit`
12. [[12 Routing|Routing]]: routes, router outlet, navigation, route parameters, child routes, lazy loading, resolvers, `forRoot` vs `forChild`, `Location`
13. [[13 Observables and RxJS|Observables and RxJS]]: async programming, Observables, Promise vs Observable, Subjects, operators (`map`, `filter`, `mergeMap`, `switchMap`…)
14. [[14 HttpClient|HttpClient]]: GET/POST/PUT/DELETE, typed responses, error handling, in-memory fake backend
15. [[15 Forms|Forms]]: template-driven (setup, validation, submission), reactive (FormGroup, FormControl, FormArray, validators), typed forms
16. [[16 Custom Directives|Custom Directives]]: `@HostListener`, `@HostBinding`, custom structural directives

### Level 3 – Advanced (interview ready)

Authentication, modern Angular, and what senior interviews ask. → [[Angular Notebook/3 Advanced/index|Advanced overview]]

17. [[17 JWT Authentication|JWT Authentication]]: authentication vs authorization, JWT flow and parts, role-based access
18. [[18 Route Guards|Route Guards]]: `CanActivate` vs `CanDeactivate`, `CanMatch`, auth guard
19. [[19 HTTP Interceptors|HTTP Interceptors]]: attach tokens, global error handling
20. [[20 ViewChild and Content Projection|ViewChild and Content Projection]]: ViewChild vs ViewChildren, `ng-content`, ContentChild vs ContentChildren
21. [[21 Standalone Architecture|Standalone Architecture]]: modules vs standalone, Angular 20+ project changes, working with NgModules, barrel files
22. [[22 Signals|Signals]]: `signal`, `computed`, `effect`, signal inputs, resources
23. [[23 Change Detection and Performance|Change Detection and Performance]]: Default vs OnPush, zoneless, `track`/`trackBy`, lazy loading, `@defer`
24. [[24 State Management|State Management]]: services + signals, NgRx
25. [[25 SSR and Hydration|SSR and Hydration]]
26. [[26 Testing|Testing]]: unit (Vitest, Jasmine & Karma), TestBed, mocking, pipes/directives/forms, mock store, code coverage, E2E (Playwright/Cypress)
27. [[27 Security|Security]]: XSS, CSRF, token storage, bypassing sanitization safely
28. [[28 Animations|Animations]]: `animate.enter` / `animate.leave`, triggers, states, `:enter` / `:leave`
29. [[29 PWA and Service Workers|PWA and Service Workers]]: `ng add @angular/pwa`, `ngsw-config.json`, offline, updates
30. [[30 Third-Party Libraries and Packages|Third-Party Libraries and Packages]]: jQuery, `@types`, wrapper libraries, web components, publishing a library, SPA fallback on the server

### Interview questions

283 questions and answers to test yourself once you've finished the levels. → [[Angular Notebook/4 Interview Questions/index|Interview Questions overview]]

- [[Interview Questions 001-050|Questions 1–50]]: framework basics, components, directives, DI, lifecycle, pipes, HttpClient, RxJS
- [[Interview Questions 051-100|Questions 51–100]]: Angular elements, dynamic components, router, JIT vs AOT, metadata, zones
- [[Interview Questions 101-150|Questions 101–150]]: animations, service workers, Ivy, language service, web workers, Bazel, lazy loading, upgrading
- [[Interview Questions 151-200|Questions 151–200]]: change detection, schematics, security and sanitization, interceptors, i18n, libraries
- [[Interview Questions 201-250|Questions 201–250]]: template syntax, entry/bootstrapped components, NgModules, providers, NgZone
- [[Interview Questions 251-283|Questions 251–283]]: forms and validators, content projection, standalone, hydration, signals, NgRx

### Level 4 – Beyond (not written yet)

- [ ] Micro frontend architecture (Module Federation, Native Federation)
- [ ] Angular Material / CDK
- [ ] Internationalization (i18n)
- [x] PWA and service workers → [[29 PWA and Service Workers|PWA and Service Workers]]
- [ ] Monorepos with Nx
- [ ] Accessibility (Angular ARIA)

## To revise

- `@Input`, `@Output` (concepts + implementation): [[09 Component Communication|Component Communication]]
- Dependency injection: [[10 Services and Dependency Injection|Services and Dependency Injection]]
- Higher-order operators (`switchMap`, `mergeMap`, `concatMap`, `exhaustMap`): [[13 Observables and RxJS|Observables and RxJS]]
- Change detection, OnPush, zoneless: [[23 Change Detection and Performance|Change Detection]]

## Quick revision sheet

| Concept | One-liner |
| --- | --- |
| Angular | front-end framework for SPAs |
| TypeScript | strongly typed language Angular uses |
| Components | building blocks of the UI |
| Decorators | add metadata to classes |
| Data binding | connect component data with the UI |
| Directives | change DOM structure or behaviour |
| Pipes | transform data in templates |
| Services | share logic/data across components |
| DI | inject dependencies automatically |
| Routing | navigate between views |
| Observable | handle async data streams |
| RxJS | reactive library for Observables |
| HttpClient | call REST APIs |
| Lifecycle hooks | run logic at component lifecycle stages |
| Template-driven forms | simple forms with `ngModel` |
| Reactive forms | scalable, structured forms |
| JWT auth | token-based authentication |
| Route guards | control route access |
| Interceptor | modify HTTP requests/responses globally |
| Signals | reactive state |
| Standalone | apps without NgModules |
| OnPush / zoneless | check only what changed |
| `@defer` / lazy loading | load code only when needed |
| NgRx | global store: actions, reducers, selectors, effects |
| SSR + hydration | server-rendered HTML made interactive |
| `forRoot` / `forChild` | root module registers providers once; feature modules only routes |
| Animations | `animate.enter`/`leave` + CSS, or `trigger`/`state`/`transition` |
| Service worker | caches the app so it loads fast and works offline |
| SPA fallback | server returns `index.html` for unknown paths so deep links work |

---

_Pages 94–105 not yet transcribed._

_Diagrams and some material adapted from the "Angular Interview Handbook" by Interview Happy. Topics 8, 16 and 23–27 and extra sections elsewhere come from the official [Angular docs](https://angular.dev) and other online sources. Interview questions are from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)._

_Examples, topics 28–30 and the setup, service worker and code coverage screenshots are adapted from [Angular 2+ Notes for Professionals](https://goalkicker.com/Angular2Book/) (GoalKicker.com), compiled from Stack Overflow Documentation contributors and released under [CC BY-SA](https://creativecommons.org/licenses/by-sa/3.0/). Its examples date from Angular 2–6 and have been rewritten for current Angular; old syntax is kept in "Old syntax" notes where you might still meet it._
