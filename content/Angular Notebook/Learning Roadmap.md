---
title: Learning Roadmap
tags:
  - Angular
  - Revision
---

**Overview:** Angular overview → Advantages of Angular

**JS essentials:** Basic syntax · Variables · Functions / Arrow functions · OOPs (classes, interfaces etc.)

**Angular:** NPM tools · `angular.json`, `main.ts`, `index.html` · JIT vs AOT compilation

## Level 2 – Architecture

- Components: structure & usage [?], selector and template, lifecycle hooks (`ngOnInit`, `ngOnDestroy`)
- Module: app module
- Angular app process: `index.html` → `app-root` → `main.ts` → bootstrap
- Directives: structural, attribute, component

## Level 3 – Data binding, Decorators and Pipes

- Data binding: property, event, two-way (`ngModel`)
- Decorators: `@Component`, `@Injectable`, `@Input`, `@Output`
- Pipes: built-in (DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe), custom pipe, chaining pipes (optional)

## Level 4

- Angular Services – Dependency injection (hierarchical DI, `@Injectable`)
- Component communication: parent–child (`@Input` and `@Output`), content projection (`ng-content`), ViewChild vs ViewChildren, ContentChild vs ContentChildren

## Level 5 – Routing, HTTP client & RxJS

- Routing: RouterModule, Routes, Router Outlet · Navigation · Route parameters · Route guards (CanActivate vs CanDeactivate)
- HTTP client
- Reactive programming & RxJS: operators (map, filter, mergeMap), Observables, Promise vs Observable

## Level 6 – Forms & Authentication

- Template-driven: setting up, validation & submission
- Reactive forms: FormGroup, FormControl, FormArray, form validation
- Authentication/Authorization: JWT auth, role-based control, Auth guard, HTTP interceptors

## Level 7 – Advanced topics

- Performance optimization: change detection strategies (Default vs OnPush), trackBy function
- Security: XSS, CSRF [?]
- Micro frontend architecture
- Testing: unit – Jasmine & Karma; E2E – Protractor
