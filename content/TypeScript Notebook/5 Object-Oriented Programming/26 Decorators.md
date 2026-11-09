---
title: 26. Decorators
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> A **decorator** is a function you attach with `@name` to a class or class member to add behaviour or metadata. TypeScript 5 supports **standard** (ECMAScript) decorators; Angular still uses the older **experimental** decorators.

## Q. What is a decorator?

```ts
function logged(method: Function, context: ClassMethodDecoratorContext) {
  const name = String(context.name);
  return function (this: unknown, ...args: unknown[]) {
    console.log(`→ ${name}`, args);
    const result = method.apply(this, args);
    console.log(`← ${name}`, result);
    return result;
  };
}

class Calculator {
  @logged
  add(a: number, b: number) { return a + b; }
}

new Calculator().add(2, 3);   // → add [2, 3]   ← add 5
```

A decorator receives the thing it decorates (here the method) plus a **context** object, and can return a replacement. Uses: logging, timing, caching, validation, registering classes, dependency injection.

> [!tip] Remember it
> **A decorator is gift wrap:** the present (method or class) is the same inside, but the wrapping adds something on the way in or out.

## Q. What can you decorate?

| Target | Standard decorator receives |
| --- | --- |
| Class | the class + `ClassDecoratorContext` |
| Method | the method + `ClassMethodDecoratorContext` |
| Getter / setter | the accessor + its context |
| Field | `undefined` + `ClassFieldDecoratorContext` (return a function that sets the initial value) |
| `accessor` field | auto-accessor `{ get, set }` + context |

Decorators run when the **class is defined**, not when an instance is created. Several decorators on one target apply from the bottom up.

**Decorator factories** take options and return the decorator:

```ts
function retry(times: number) {
  return function (method: Function, context: ClassMethodDecoratorContext) {
    return async function (this: unknown, ...args: unknown[]) {
      for (let i = 0; ; i++) {
        try { return await method.apply(this, args); }
        catch (e) { if (i >= times) throw e; }
      }
    };
  };
}

class Api {
  @retry(3)
  async fetchUsers() { /* … */ }
}
```

## Q. Standard vs experimental decorators?

| | Standard (TS 5.0+) | Experimental (legacy) |
| --- | --- | --- |
| Turn on | nothing: on by default | `"experimentalDecorators": true` |
| Spec | TC39 decorators proposal (stage 3) | an older proposal TypeScript adopted early |
| Parameter decorators | No | Yes (`constructor(@Inject(TOKEN) x)`) |
| Metadata | `context.metadata` | `"emitDecoratorMetadata"` + `reflect-metadata` |
| Used by | new libraries | **Angular**, NestJS, TypeORM, older MobX |

Angular's `@Component`, `@Injectable`, `@Input` and `@HostListener` are experimental-style decorators that Angular's compiler reads → [[Angular Notebook/2 Components and Templates/06 Decorators|Angular Decorators]]. You don't mix the two styles in one project.

> [!question] Recall
> - What is a decorator, and when does it run?
> - Write a method decorator that logs how long a method takes.
> - What is a decorator factory?
> - Standard vs experimental decorators: which one does Angular use, and what can only the experimental one do?

Prev: [[25 Abstract Classes and Interfaces|25. Abstract Classes and Interfaces]]
