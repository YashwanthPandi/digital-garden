---
title: 13. Observables and RxJS
tags:
  - Angular
  - rxjs
---

## Synchronous vs asynchronous

![[sync-vs-async.jpg]]

- **Synchronous:** code runs one line at a time, in order. Each task must finish before the next starts (tasks of 10s + 7s + 5s + 6s = 28s).
- **Asynchronous:** tasks start and continue without waiting for others to finish (same tasks ≈ 10s, the longest one).

Use async for slow work: fetching API data, downloading/uploading files, animations, any time-consuming operation.

![[async-techniques.jpg]]

## RxJS and Observables

**RxJS** (Reactive Extensions for JavaScript) is a library for handling continuous data streams using Observables.

![[rxjs-youtube-analogy.jpg]]

_YouTube analogy:_ video server = **data source**, the stream of video chunks = **Observable**, the video player = **subscriber**.

- **Observable:** a stream of data that emits values over time.
- **Subscriber:** whoever calls `subscribe()` on the Observable and receives its values. A component that doesn't call `subscribe()` gets nothing.
- **Observer:** the object (`{ next, error, complete }`) the subscriber passes to `subscribe()`; the Observable pushes data into it with `observer.next()`.

![[observable-subscriber-flow.jpg]]

![[observer-flow.jpg]]

## Implementation

1. Create the Observable in a service and return it from a method
2. Inject the service in the component
3. Subscribe inside `ngOnInit()`
4. Observable sends data with `observer.next()`
5. Store it and display with `@for` / `*ngFor`

```ts
// service.ts
@Injectable({ providedIn: 'root' })
export class ObservableService {
  getNumber(): Observable<number> {
    return new Observable((observer) => {
      observer.next(10);
      observer.next(20);
      observer.next(30);
      observer.complete();
    });
  }
}

// component.ts
export class MyComponent implements OnInit {
  items: number[] = [];
  constructor(private service: ObservableService) {}

  ngOnInit() {
    this.service.getNumber().subscribe({
      next: (data) => this.items.push(data),
      error: (err) => console.error(err),
      complete: () => console.log('done'),
    });
  }
}
```

```html
@for (item of items; track item) { <li>{{ item }}</li> }
```

**Why `ngOnInit` and not the constructor?** The constructor runs when the class is created, before the component is initialized. Use it for injecting services. `ngOnInit` runs after Angular initializes the component (and its inputs), so it's the right place to subscribe / fetch data. See [[11 Lifecycle Hooks|Lifecycle Hooks]].

Quick creators: `of(1, 2, 3)`, `from([1, 2, 3])`, `interval(1000)`, `fromEvent(button, 'click')`, `timer(2000)`.

## Observable vs Promise

| Promise | Observable |
| --- | --- |
| single value | zero, one or **many** values over time |
| eager: runs immediately | **lazy**: runs only when subscribed |
| not cancellable | cancellable (`unsubscribe()`) |
| `.then()` | `.subscribe()` + operators via `pipe()` |

Cold vs hot: a **cold** Observable starts fresh for each subscriber (e.g. each HTTP subscribe = a new request); a **hot** one shares a single source (e.g. Subjects, DOM events).

## Subjects

A Subject is both an Observable **and** an observer: you can call `.next()` on it and subscribe to it. Used for multicasting and for sharing state through services.

| Type | New subscriber receives |
| --- | --- |
| `Subject` | only future values |
| `BehaviorSubject(initial)` | the **current** value immediately, then future ones (has `.value`) |
| `ReplaySubject(n)` | the last `n` values, then future ones |
| `AsyncSubject` | only the last value, on complete |

```ts
private cart = new BehaviorSubject<Item[]>([]);
cart$ = this.cart.asObservable();             // expose read-only
add(item: Item) { this.cart.next([...this.cart.value, item]); }
```

## Async pipe

Subscribes to an Observable **in the template** and gives the latest value. Convention: name Observable variables with `$`.

```ts
users$!: Observable<any[]>;
ngOnInit() { this.users$ = this.userService.getUsers(); }
```

```html
@for (u of users$ | async; track u.id) { <li>{{ u.name }}</li> }
```

Advantages over manual `subscribe()`:

1. No manual `subscribe()`
2. Cleaner, shorter code
3. **Automatically unsubscribes** when the component is destroyed, so no memory leaks

## Unsubscribing

Long-lived Observables (intervals, Subjects, router events, form `valueChanges`) keep running after the component is gone unless you unsubscribe. HTTP calls complete on their own.

1. `async` pipe (automatic)
2. `takeUntilDestroyed()` (modern, recommended):
   ```ts
   constructor() {
     interval(1000).pipe(takeUntilDestroyed()).subscribe(console.log);
   }
   ```
3. Store the `Subscription` and call `unsubscribe()` in `ngOnDestroy`
4. Convert to a signal with `toSignal()` (see [[22 Signals|Signals]])

## RxJS operators

Functions that act on emitted values and return a **new Observable**. Applied through **`pipe()`**.

![[rxjs-operators.jpg]]

| Operator | Does |
| --- | --- |
| `map()` | transforms each emitted value |
| `filter()` | lets an emitted value pass or blocks it |
| `tap()` | side effects (logging, storing) without changing the data |

![[rxjs-map.jpg]]

```ts
// RxJS map on the emitted array + JS array map on each user
getUsers() {
  return this.http.get<any[]>(url).pipe(
    map((users) => users.map((u) => ({ ...u, name: u.name.toUpperCase() })))
  );
}

// JS filter inside RxJS map: keep only some users
.pipe(map((users) => users.filter((u) => u.name.startsWith('C'))))

// RxJS filter: block the whole emission if the array is empty
.pipe(filter((users) => users.length > 0))

// tap: log without modifying
.pipe(tap((users) => console.log('Users:', users)))
```

![[rxjs-filter.jpg]]

> [!warning] Don't confuse
> **RxJS `map`/`filter`** work on each *emission* of the Observable. **JS array `map`/`filter`** work on each *element* of an array. An HTTP call emits the whole array once, so you often need both.

- **Spread operator `...`** expands an object's properties / array's elements (`{ ...u, name }` copies `u` and overrides `name`).

### More operators worth knowing

| Operator | Use |
| --- | --- |
| `debounceTime(300)` | wait for the user to stop typing |
| `distinctUntilChanged()` | skip repeated values |
| `take(1)`, `first()` | take one value then complete |
| `takeUntil(notifier$)` | stop when another Observable emits |
| `catchError(err => of(fallback))` | handle errors, keep the stream alive |
| `retry(3)` | retry failed source |
| `startWith(x)` | emit an initial value |
| `shareReplay(1)` | share one execution (cache) between subscribers |
| `combineLatest([a$, b$])` | latest value from each, whenever any emits |
| `forkJoin([a$, b$])` | wait for all to **complete**, emit once (parallel HTTP calls) |
| `merge(a$, b$)` | interleave emissions |

### Higher-order mapping (interview favourite)

Each maps a value to an **inner Observable** (e.g. an HTTP call); they differ in what happens when a new value arrives while the previous inner one is still running.

| Operator | Behaviour | Typical use |
| --- | --- | --- |
| `switchMap` | **cancels** the previous inner | search-as-you-type, route param → load |
| `mergeMap` | runs all **in parallel** | independent requests (e.g. delete many) |
| `concatMap` | queues, runs **one after another** in order | ordered saves |
| `exhaustMap` | **ignores** new values until the current one finishes | login/submit button double-click |

```ts
searchResults$ = this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((term) => this.api.search(term)),
);
```
