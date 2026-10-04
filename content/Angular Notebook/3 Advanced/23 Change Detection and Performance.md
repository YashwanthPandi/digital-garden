---
title: 23. Change Detection and Performance
tags:
  - Angular
  - performance
---

## Change detection

**Change detection (CD)** = Angular checking component data and updating the DOM when it changed.

### Classic: Zone.js

Zone.js patches browser async APIs (clicks, `setTimeout`, HTTP, promises). After any of them finishes, Angular runs CD over the **whole component tree, top to bottom**, comparing every binding. Simple but wasteful in large apps.

### `OnPush` strategy

```ts
@Component({ changeDetection: ChangeDetectionStrategy.OnPush, … })
```

An `OnPush` component is only checked when:

1. an `@Input` gets a **new reference** (mutating an object won't trigger it)
2. an event fires inside the component (click, etc.)
3. an `async` pipe in its template emits
4. a **signal** read in its template changes
5. you call `ChangeDetectorRef.markForCheck()`

This skips whole subtrees, which is the main CD optimization. Pair it with **immutable updates** (`this.items = [...this.items, x]`).

`ChangeDetectorRef` methods: `markForCheck()` (schedule this + ancestors), `detectChanges()` (check now), `detach()` / `reattach()`.

### Zoneless (default since v21)

No Zone.js. Angular re-renders only when it is told something changed: **signal updates**, template events, `async` pipe, `markForCheck()`. Benefits: smaller bundle, fewer unnecessary checks, cleaner stack traces.

```ts
providers: [provideZonelessChangeDetection()]   // explicit in v20; default in new v21+ projects
```

Rule of thumb for zoneless: keep UI state in **signals** (or use the async pipe); plain fields changed inside a `setTimeout` won't refresh the view.

### `ExpressionChangedAfterItHasBeenCheckedError`

Dev-mode error: a binding's value changed *after* Angular checked it in the same cycle (e.g. setting a field in `ngAfterViewInit`). Fix by computing the value earlier, using a signal/`computed`, or deferring the change.

## Performance checklist

| Technique | Why |
| --- | --- |
| `OnPush` / zoneless + signals | fewer change detection checks |
| `track` in `@for` (`trackBy` in `*ngFor`) | reuse DOM nodes instead of re-creating the list |
| Lazy loading routes (`loadComponent`, `loadChildren`) | smaller initial bundle ([[12 Routing#Lazy loading\|Routing]]) |
| `@defer` blocks | lazy-load heavy parts of a page ([[08 Templates\|Templates]]) |
| Pure pipes / `computed()` instead of template method calls | avoid recomputing on every CD |
| `async` pipe / `takeUntilDestroyed` | no memory leaks from forgotten subscriptions |
| `NgOptimizedImage` (`<img ngSrc>`) | lazy images, priority hints, correct sizes |
| Virtual scrolling (`@angular/cdk/scrolling`) | render only visible rows of huge lists |
| `shareReplay` / caching | avoid duplicate HTTP calls |
| SSR + hydration | faster first paint ([[25 SSR and Hydration\|SSR]]) |
| Production build (`ng build`), bundle budgets in `angular.json` | AOT, minification, tree-shaking, size alerts |
| `runOutsideAngular()` (Zone apps) | high-frequency events (scroll, mousemove) without triggering CD |

Measure first: Angular DevTools (profiler shows CD cycles per component), Chrome Lighthouse, `ng build --stats-json` with a bundle analyzer.
