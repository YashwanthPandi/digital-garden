---
title: Decorators
tags:
  - Angular
---

## Decorator basics

A decorator helps Angular know what kind of class it is (component, service, pipe, module). It is a special function that adds information (**metadata**) to the class. It is imported from Angular core, and information is passed to it.
Class decorators tell Angular what class it represents (or: a function that takes the class object as argument).

| Decorator       | Used for                      |
| --------------- | ----------------------------- |
| `@Component()`  | Component – UI building block |
| `@NgModule()`   | Module                        |
| `@Injectable()` | Service                       |
| `@Directive()`  | Directive                     |
| `@Pipe()`       | Pipes                         |

We use `@` instead of a function call for cleaner code.

## Advanced decorators

- **Class decorator:** `@Injectable`, `@Pipe`, `@NgModule`, `@Component`
- **Method decorator:** `@HostListener`
- **Property decorator:** `@Input`, `@Output`, `@ViewChild`, `@ContentChild` (also `@ViewChildren`, `@ContentChildren`), see [[Component Communication]]
- **Parameter decorator:** `@Inject`, `@Optional`, `@Self`, `@SkipSelf`

## Modules

`@NgModule` groups components, directives, injectables, pipes. A module is a group of related components, directives, pipes or services.

In real life: modules were used heavily before Angular v19; from v19 they are not used much, we can use **standalone components**.
