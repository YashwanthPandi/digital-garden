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

### 1. Getting Started → [[Angular Notebook/1 Getting Started/index|overview]]

1. [[01 Fundamentals and Setup|Fundamentals and Setup]]: what Angular is, advantages, SPA, npm, CLI, project files (`angular.json`, `package.json`), JIT vs AOT
2. [[02 History and Component Anatomy|History and Component Anatomy]]
3. [[03 Architecture|Architecture]]: app process `index.html` → `app-root` → `main.ts` → bootstrap; `app.config.ts`
4. [[04 Standalone Architecture|Standalone Architecture]]: modules vs standalone, Angular 20+ project changes

Interview questions: [[Getting Started Interview Questions|Getting Started Interview Questions]]

### 2. Components and Templates → [[Angular Notebook/2 Components and Templates/index|overview]]

5. [[05 Components|Components]]: structure, selector and template, parent/child, view encapsulation
6. [[06 Decorators|Decorators]]: `@Component`, `@Injectable`, `@Input`, `@Output`; class, property, method, parameter decorators; NgModule
7. [[07 Templates|Templates]]: template reference variables, `ng-template`, `ng-container`, `@let`, `@defer`
8. [[08 Template Syntax Reference|Template Syntax Reference]]
9. [[09 Data Binding|Data Binding]]: interpolation, property, event, two-way (`ngModel`)
10. [[10 Directives|Directives]]: structural (`*ngIf`/`@if`, `*ngFor`/`@for`, `@switch`), attribute (`ngClass`, `ngStyle`), component
11. [[11 Custom Directives|Custom Directives]]: `@HostListener`, `@HostBinding`, custom structural directives
12. [[12 Pipes|Pipes]]: built-in (date, uppercase, lowercase, currency…), custom, chaining, pure vs impure

Interview questions: [[Components and Templates Interview Questions|Components and Templates Interview Questions]]

### 3. Component Interaction → [[Angular Notebook/3 Component Interaction/index|overview]]

13. [[13 Component Communication|Component Communication]]: parent–child with `@Input` and `@Output`, shared services
14. [[14 Lifecycle Hooks|Lifecycle Hooks]]: `ngOnChanges`, `ngOnInit`, `ngOnDestroy`, `ngAfterViewInit`, `ngAfterContentInit`
15. [[15 ViewChild and Content Projection|ViewChild and Content Projection]]: ViewChild vs ViewChildren, `ng-content`, ContentChild vs ContentChildren

Interview questions: [[Component Interaction Interview Questions|Component Interaction Interview Questions]]

### 4. Services and Dependency Injection → [[Angular Notebook/4 Services and DI/index|overview]]

16. [[16 Services and Dependency Injection|Services and Dependency Injection]]: `@Injectable`, `inject()`, provider scopes, hierarchical DI

Interview questions: [[Services and Dependency Injection Interview Questions|Services and Dependency Injection Interview Questions]]

### 5. RxJS and HTTP → [[Angular Notebook/5 RxJS and HTTP/index|overview]]

17. [[17 Observables and RxJS|Observables and RxJS]]: async programming, Observables, Promise vs Observable, Subjects, operators (`map`, `filter`, `mergeMap`, `switchMap`…)
18. [[18 RxJS Operators In Depth|RxJS Operators In Depth]]
19. [[19 HttpClient|HttpClient]]: GET/POST/PUT/DELETE, typed responses, error handling
20. [[20 HTTP Interceptors|HTTP Interceptors]]: attach tokens, global error handling

Interview questions: [[RxJS and HTTP Interview Questions|RxJS and HTTP Interview Questions]]

### 6. Routing → [[Angular Notebook/6 Routing/index|overview]]

21. [[21 Routing|Routing]]: routes, router outlet, navigation, route parameters, child routes, lazy loading, resolvers
22. [[22 Router In Depth|Router In Depth]]
23. [[23 Route Guards|Route Guards]]: `CanActivate` vs `CanDeactivate`, `CanMatch`, auth guard

Interview questions: [[Routing Interview Questions|Routing Interview Questions]]

### 7. Forms → [[Angular Notebook/7 Forms/index|overview]]

24. [[24 Forms|Forms]]: template-driven (setup, validation, submission), reactive (FormGroup, FormControl, FormArray, validators), typed forms
25. [[25 Advanced Forms|Advanced Forms]]

Interview questions: [[Forms Interview Questions|Forms Interview Questions]]

### 8. Reactivity and Performance → [[Angular Notebook/8 Reactivity and Performance/index|overview]]

26. [[26 Signals|Signals]]: `signal`, `computed`, `effect`, signal inputs, resources
27. [[27 Change Detection and Performance|Change Detection and Performance]]: Default vs OnPush, zoneless, `track`/`trackBy`, lazy loading, `@defer`
28. [[28 State Management|State Management]]: services + signals, NgRx
29. [[29 SSR and Hydration|SSR and Hydration]]

Interview questions: [[Reactivity and Performance Interview Questions|Reactivity and Performance Interview Questions]]

### 9. Security and Testing → [[Angular Notebook/9 Security and Testing/index|overview]]

30. [[30 JWT Authentication|JWT Authentication]]: authentication vs authorization, JWT flow and parts, role-based access
31. [[31 Security|Security]]: XSS, CSRF, token storage
32. [[32 Testing|Testing]]: unit (Vitest, Jasmine & Karma), TestBed, mocking, E2E (Playwright/Cypress)

Interview questions: [[Security and Testing Interview Questions|Security and Testing Interview Questions]]

### 10. NgModules and Compilation → [[Angular Notebook/10 Modules and Compilation/index|overview]]

33. [[33 NgModules|NgModules]]

Interview questions: [[NgModules and Compilation Interview Questions|NgModules and Compilation Interview Questions]]

### 11. Tooling and Ecosystem → [[Angular Notebook/11 Tooling and Ecosystem/index|overview]]

34. [[34 CLI Tooling Libraries and Deployment|CLI, Tooling, Libraries and Deployment]]

Interview questions: [[Tooling and Ecosystem Interview Questions|Tooling and Ecosystem Interview Questions]]

### 12. Animations, i18n and Elements → [[Angular Notebook/12 Animations i18n and Elements/index|overview]]


Interview questions: [[Animations i18n and Elements Interview Questions|Animations i18n and Elements Interview Questions]]

### Not written yet

- [ ] Micro frontend architecture (Module Federation, Native Federation)
- [ ] Angular Material / CDK
- [ ] Internationalization (i18n)
- [ ] PWA and service workers
- [ ] Monorepos with Nx
- [ ] Accessibility (Angular ARIA)

## To revise

- `@Input`, `@Output` (concepts + implementation): [[13 Component Communication|Component Communication]]
- Dependency injection: [[16 Services and Dependency Injection|Services and Dependency Injection]]
- Higher-order operators (`switchMap`, `mergeMap`, `concatMap`, `exhaustMap`): [[17 Observables and RxJS|Observables and RxJS]]
- Change detection, OnPush, zoneless: [[27 Change Detection and Performance|Change Detection]]

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

---

_Pages 94–105 not yet transcribed._

_Diagrams and some material adapted from the "Angular Interview Handbook" by Interview Happy. Topics 8, 16 and 23–27 and extra sections elsewhere come from the official [Angular docs](https://angular.dev) and other online sources. Interview questions are from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)._
