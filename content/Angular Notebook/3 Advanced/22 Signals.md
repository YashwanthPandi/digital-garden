---
title: 22. Signals
tags:
  - Angular
---

**Change detection** is how Angular checks the app for data changes and updates the UI. Classic (Zone.js) change detection checks many bindings, even ones that didn't change.

A **signal** is a reactive value: Angular knows exactly who reads it, so when it changes only the parts of the UI that depend on it update.

![[signals-vs-change-detection.jpg]]

## Without signals

```ts
count = 0;
increment() { this.count++; }
```

```html
<p>{{ count }}</p>
```

## With signals

```ts
count = signal(0);                       // create with an initial value

increment() {
  this.count.set(this.count() + 1);      // set a new value
  // or: this.count.update((c) => c + 1);
}
```

```html
<p>{{ count() }}</p>   <!-- read by calling it like a function -->
```

- `signal(initial)`: creates a writable signal
- `count()`: reads it
- `.set(value)`: replaces the value
- `.update(fn)`: computes the new value from the old one
- `.asReadonly()`: expose a read-only version from a service

> [!warning] Objects and arrays: don't mutate in place (`items().push(x)` won't notify anyone). Create a new value: `items.update((list) => [...list, x])`.

## `computed`: derived values

Read-only signal that recalculates when the signals it reads change. **Lazy and memoized**: only recomputes when read after a dependency changed.

```ts
price = signal(100);
qty = signal(2);
total = computed(() => this.price() * this.qty());   // 200
```

## `effect`: side effects

Runs whenever signals it reads change: logging, saving to `localStorage`, syncing with non-Angular code. Don't use it to set other signals (use `computed` or `linkedSignal`).

```ts
constructor() {
  effect(() => localStorage.setItem('cart', JSON.stringify(this.cart())));
}
```

## `linkedSignal`

Writable signal that **resets** when a source changes:

```ts
options = signal(['A', 'B']);
selected = linkedSignal(() => this.options()[0]);   // user can set it; resets when options change
```

## Signal inputs, outputs and model

Function-based replacements for `@Input` / `@Output` (see [[09 Component Communication|Component Communication]]):

```ts
export class UserCard {
  name = input<string>('');               // optional, with default
  id = input.required<number>();          // must be passed
  selected = output<number>();            // this.selected.emit(this.id())
  checked = model(false);                 // two-way: <app-user-card [(checked)]="isChecked" />

  label = computed(() => `#${this.id()} ${this.name()}`);   // inputs are signals → use in computed
}
```

Signal queries: `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()` (see [[20 ViewChild and Content Projection|ViewChild]]).

## RxJS interop

```ts
users = toSignal(this.http.get<User[]>('/api/users'), { initialValue: [] });  // Observable → Signal (auto-unsubscribes)
count$ = toObservable(this.count);                                           // Signal → Observable
```

## Resources

Load async data as signals; re-fetches when `params` change:

```ts
userId = input.required<number>();
user = httpResource<User>(() => `/api/users/${this.userId()}`);
```

```html
@if (user.isLoading()) { <p>Loading…</p> }
@else if (user.error()) { <p>Error</p> }
@else { <p>{{ user.value()?.name }}</p> }
```

(`resource()` does the same for any Promise-based loader.)

## Signals vs Observables

| Signals | Observables |
| --- | --- |
| always have a current value | stream of values over time |
| synchronous read: `count()` | must subscribe |
| no subscriptions to clean up | need unsubscribe |
| best for **state** shown in the UI | best for **events / async flows** (HTTP, debouncing, websockets) |

They work together, not instead of each other.

## State in a service

```ts
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<Item[]>([]);
  readonly cartItems = this.items.asReadonly();
  readonly count = computed(() => this.items().length);
  add(item: Item) { this.items.update((l) => [...l, item]); }
}
```

More on this in [[24 State Management|State Management]]; how signals enable zoneless apps in [[23 Change Detection and Performance|Change Detection]].
