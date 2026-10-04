---
title: 11. Lifecycle Hooks
tags:
  - Angular
---

Lifecycle hooks are methods Angular calls at different stages of a component's life: **created → initialized → updated (repeats) → destroyed**.

![[lifecycle-hooks.jpg]]

Order:

1. `constructor()`: object creation (not a hook, but runs first)
2. `ngOnChanges()`: when `@Input` values change (before `ngOnInit` too, if there are inputs)
3. `ngOnInit()`: once, component initialized
4. `ngDoCheck()`: custom change detection, every cycle
5. `ngAfterContentInit()`: once, projected content ready
6. `ngAfterContentChecked()`: after every check of projected content
7. `ngAfterViewInit()`: once, view + child elements ready
8. `ngAfterViewChecked()`: after every check of the view
9. `ngOnDestroy()`: cleanup before removal

To use one, implement its interface (`OnInit`, `OnDestroy`, `AfterViewInit`…) and add the method.

## `ngOnChanges`

Runs whenever an `@Input` reference changes; receives a `SimpleChanges` object with previous and current values.

```ts
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    console.log(changes['userId'].previousValue, '→', changes['userId'].currentValue);
  }
}
```

## `ngOnInit` vs constructor

| constructor | `ngOnInit()` |
| --- | --- |
| runs when the class is created (TypeScript feature) | runs once after the component is initialized (Angular hook) |
| `@Input` values not set yet | inputs available |
| inject services | subscribe to Observables, fetch API data |

## `ngOnDestroy`

Called just before the component is removed from the screen. Used to **clean up**: unsubscribe, clear timers, detach listeners.

```ts
export class MyComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.service.getUsers().subscribe((d) => (this.users = d));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();   // avoid memory leaks
  }
}
```

Modern alternatives: `takeUntilDestroyed()` or `inject(DestroyRef).onDestroy(() => …)`, see [[13 Observables and RxJS#Unsubscribing|Unsubscribing]].

## `ngAfterViewInit`

Runs once after the component's view and child elements are fully initialized. Use it to safely access `@ViewChild` / `@ViewChildren`: in the constructor (and often `ngOnInit`) they're still `undefined`.

```ts
export class App implements AfterViewInit {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }
}
```

> [!warning] Changing bound data inside `ngAfterViewInit` can throw `ExpressionChangedAfterItHasBeenCheckedError` (dev mode), because the view was already checked.

## `ngAfterContentInit`

Runs once after content from the parent has been projected via `<ng-content>`. Use it to safely access `@ContentChild` / `@ContentChildren`.

Details for both: [[20 ViewChild and Content Projection|ViewChild and Content Projection]].

## `afterNextRender` / `afterEveryRender`

Newer functions that run after the browser has rendered (and never on the server). Use them for direct DOM work, e.g. initializing a chart library.

```ts
constructor() {
  afterNextRender(() => this.chart = new Chart(this.canvas().nativeElement));
}
```
