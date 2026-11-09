---
title: 18. RxJS Operators In Depth
tags:
  - Angular
  - RxJS
---

> [!summary] In one line
> An Observable follows the **observer pattern**: it pushes values to subscribers over time, then completes or errors. **Operators** transform that stream and fall into families: creation, transformation, filtering, **rate limiting**, combination and error handling. **RxJS interop** converts between Observables and signals.

Basics first: [[Angular Notebook/5 RxJS and HTTP/17 Observables and RxJS|Observables and RxJS]] (Observable vs Promise, Subjects, async pipe, unsubscribing).

## The observable pattern

```ts
const temperature$ = new Observable<number>(subscriber => {
  subscriber.next(21);                                // push values
  const id = setInterval(() => subscriber.next(22), 1000);
  return () => clearInterval(id);                     // teardown: runs on unsubscribe/complete/error
});

const sub = temperature$.subscribe({
  next: t => console.log(t),
  error: e => console.error(e),
  complete: () => console.log('done'),
});
sub.unsubscribe();
```

**Producer** (the Observable) pushes; **observer** (the object with `next`/`error`/`complete`) reacts. Nothing runs until someone subscribes (cold), and each subscriber gets its own execution unless you share it (`share`, `shareReplay`, Subjects).

## Observable lifecycle

```
create → subscribe → next, next, next… → complete  OR  error → teardown
                                    └──────── unsubscribe ────┘
```

1. **Creation:** `new Observable`, `of`, `from`, `interval`, `HttpClient.get`, `fromEvent`.
2. **Subscription:** `subscribe()` starts it.
3. **Execution:** zero or more `next` values.
4. **Completion or error:** after `complete` or `error`, no more values arrive. An error ends the stream unless you catch it.
5. **Disposal:** unsubscribing (or completing) runs the teardown. Angular helpers: the `async` pipe and `takeUntilDestroyed()` unsubscribe for you.

## RxJS vs promises

| | Promise | Observable |
| --- | --- | --- |
| Values | one | zero to many |
| Starts | immediately (eager) | on subscribe (lazy) |
| Cancel | no (only via `AbortController`) | `unsubscribe()` |
| Operators | `then` / `catch` | 100+ operators |
| Used in Angular for | `async`/`await` code | HttpClient, router events, forms `valueChanges` |

`firstValueFrom(obs$)` turns an Observable into a Promise; `from(promise)` goes the other way.

## Operator families

### Transformation

```ts
map(u => u.name)                   // change each value
scan((total, n) => total + n, 0)   // running total (reduce that emits every step)
switchMap(q => api.search(q))      // map to a new Observable, cancel the previous one
mergeMap(id => api.load(id))       // run all in parallel
concatMap(item => api.save(item))  // one at a time, in order
exhaustMap(() => api.login())      // ignore new values while busy (double-click on submit)
```

> [!tip] Remember it
> **switch = cancel the old, merge = run them all, concat = wait in line, exhaust = ignore until finished.**

### Filtering

```ts
filter(n => n > 0)
take(1) / first()                  // first value then complete
takeUntil(destroy$) / takeUntilDestroyed()
distinctUntilChanged()             // skip repeats of the same value
skip(1)
```

### Rate limiting

```ts
debounceTime(300)     // wait for 300ms of silence, then emit the last value (search boxes)
throttleTime(1000)    // emit the first value, then ignore others for 1s (scroll, resize)
auditTime(1000)       // ignore for 1s, then emit the latest value
sampleTime(1000)      // emit the latest value every 1s
```

```ts
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  filter(q => q.length >= 2),
  switchMap(q => this.api.search(q)),
)
```

### Combination

```ts
combineLatest([user$, settings$])  // latest of each, whenever any emits (after all have emitted once)
forkJoin([a$, b$])                 // wait for all to complete, then emit their last values (parallel HTTP calls)
merge(clicks$, keys$)              // interleave several streams
concat(cache$, network$)           // one after another
withLatestFrom(user$)              // add the latest user to each value of the main stream
zip(a$, b$)                        // pair values by position
startWith(initial)
```

### Error handling and utility

```ts
catchError(err => of([]))          // replace an error with a fallback value
retry({ count: 3, delay: 1000 })   // try again
tap(v => console.log(v))           // side effects without changing the value
finalize(() => this.loading.set(false))
shareReplay({ bufferSize: 1, refCount: true })   // share one execution, replay the last value
```

## RxJS interop with signals

```ts
import { toSignal, toObservable, takeUntilDestroyed, rxResource } from '@angular/core/rxjs-interop';

users = toSignal(this.http.get<User[]>('/api/users'), { initialValue: [] });  // Observable → signal
query = signal('');
results$ = toObservable(this.query).pipe(debounceTime(300), switchMap(q => this.api.search(q)));  // signal → Observable

profile = rxResource({                                          // a resource whose loader returns an Observable
  params: () => ({ id: this.userId() }),
  stream: ({ params }) => this.api.getUser(params.id),
});
```

Use **signals** for state the template shows; use **RxJS** for event streams and async coordination (debouncing, cancelling, combining). → [[Angular Notebook/8 Reactivity and Performance/26 Signals|Signals]]

> [!question] Recall
> 1. Describe the lifecycle of an Observable. What runs the teardown?
> 2. Three differences between a Promise and an Observable?
> 3. `switchMap` vs `mergeMap` vs `concatMap` vs `exhaustMap`: give a use for each.
> 4. `debounceTime` vs `throttleTime`?
> 5. `combineLatest` vs `forkJoin`?
> 6. How do you turn an Observable into a signal, and a signal into an Observable?

Prev: [[17 Observables and RxJS|17. Observables and RxJS]] · Next: [[19 HttpClient|19. HttpClient]]
