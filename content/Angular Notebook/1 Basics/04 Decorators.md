---
title: 4. Decorators
tags:
  - Angular
---

## Decorator basics

A decorator helps Angular know what kind of class it is (component, service, pipe, module). It is a special function that adds information (**metadata**) to the class. It is imported from Angular core, and information is passed to it.
Class decorators tell Angular what class it represents (or: a function that takes the class object as argument).

![[angular-decorators.jpg]]

| Decorator       | Used for                      |
| --------------- | ----------------------------- |
| `@Component()`  | Component – UI building block |
| `@NgModule()`   | Module                        |
| `@Injectable()` | Service                       |
| `@Directive()`  | Directive                     |
| `@Pipe()`       | Pipes                         |

We use `@` instead of a function call for cleaner code.

### `@Component`

A class decorator that defines a component:

```ts
@Component({
  selector: 'app-root',          // tag used in HTML
  imports: [RouterOutlet],       // what this template uses
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedTechnology = 'Angular';
}
```

## Advanced decorators

![[types-of-decorators.jpg]]

- **Class decorator:** `@Injectable`, `@Pipe`, `@NgModule`, `@Component`, `@Directive`
- **Method decorator:** `@HostListener` (listens to DOM events), see [[16 Custom Directives|Custom Directives]]
- **Property decorator:** `@Input`, `@Output`, `@ViewChild`, `@ContentChild` (also `@ViewChildren`, `@ContentChildren`, `@HostBinding`), see [[09 Component Communication|Component Communication]] and [[20 ViewChild and Content Projection|ViewChild and Content Projection]]
- **Parameter decorator:** `@Inject` (custom injection), `@Optional` (optional dependency), `@Self` (resolve from local injector only), `@SkipSelf` (skip the local injector)

Property decorators are used on class properties to define their behaviour and enable communication between components:

| Decorator | Does |
| --- | --- |
| `@Input()` | receives data from parent |
| `@Output()` | emits events to parent |
| `@ViewChild()` / `@ViewChildren()` | access element(s) from the component's own template |
| `@ContentChild()` / `@ContentChildren()` | access element(s) projected via `<ng-content>` |

> [!tip] Modern alternatives
> Most property decorators now have signal-based function versions: `input()`, `output()`, `model()`, `viewChild()`, `contentChild()`… See [[22 Signals|Signals]]. Parameter decorators are mostly replaced by `inject(Service, { optional: true, self: true })`.

## Modules

`@NgModule` groups components, directives, injectables, pipes. A module is a group of related components, directives, pipes or services.

```ts
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

In real life: modules were used heavily before Angular v19; from v19 they are not used much, we can use **standalone components**. See [[21 Standalone Architecture|Standalone Architecture]].
