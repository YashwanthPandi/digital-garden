---
title: 10. Services and Dependency Injection
tags:
  - Angular
---

Most of our logic is implemented in services.

- **Service:** a TypeScript class containing reusable code (business logic) that can be shared across multiple components.
- **Dependency injection:** a mechanism to inject services into components, directives or other services.
- Create a service: `ng g s servicename`

![[role-of-service.jpg]]

_Analogy:_ developers are like components (they build the UI); departments (IT, security, testing) are like services: they support everyone and aren't duplicated per developer.

![[services-analogy.jpg]]

Typical service jobs: API calls, shared state, business rules, logging, auth.

```ts
// salary.ts
@Injectable({ providedIn: 'root' })   // one shared instance for the whole app
export class SalaryService {
  calculateSalary(base: number, bonus: number) {
    return base + bonus;
  }
}
```

## Without DI (not preferred)

Create the service manually inside a component: `const service = new MyService();`

## With DI

A design pattern where Angular automatically provides/injects the required services instead of you creating them manually.

```ts
constructor(private salaryService: SalaryService) {
  this.finalSalary = this.salaryService.calculateSalary(this.base, this.bonus);
}
```

Or with the `inject()` function (now preferred; works in functions too, e.g. guards and interceptors):

```ts
private salaryService = inject(SalaryService);
```

## Why DI over manual?

![[di-vs-new.jpg]]

Disadvantages of `new`:

- can create multiple service instances
- creates tight coupling between services & components
- makes testing more difficult

Advantages of DI:

- centralized object management (singleton with `providedIn: 'root'`)
- loose coupling between components and services
- easier testing and mocking

## Where a service is provided (scope)

| Provided in | Instance |
| --- | --- |
| `@Injectable({ providedIn: 'root' })` | one for the whole app (singleton), tree-shakable |
| `providers: [...]` in `app.config.ts` | app-wide |
| `providers: [...]` on a route | shared by that route and its children |
| `providers: [MyService]` in a `@Component` | **new instance per component**, shared with its children |

## Hierarchical injectors

When a component asks for a service, Angular looks up the tree: component's own injector → parent components → … → root (environment) injector. First match wins; not found = error (unless optional).

Modifiers (or `inject(X, { … })` options):

- `@Optional()` / `optional: true`: return `null` instead of throwing
- `@Self()` / `self: true`: only look in this component's injector
- `@SkipSelf()` / `skipSelf: true`: start at the parent
- `@Host()` / `host: true`: stop at the host component

## Provider types

```ts
providers: [
  { provide: Logger, useClass: ConsoleLogger },          // swap the implementation
  { provide: API_URL, useValue: 'https://api.example.com' },
  { provide: Cache, useFactory: () => new Cache(100) },
  { provide: OldLogger, useExisting: Logger },           // alias
]
```

**`InjectionToken`** lets you inject things that aren't classes (config objects, strings):

```ts
export const API_URL = new InjectionToken<string>('API_URL');
private apiUrl = inject(API_URL);
```
