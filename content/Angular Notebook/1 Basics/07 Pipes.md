---
title: 7. Pipes
tags:
  - Angular
---

A pipe is a feature in Angular used to transform or format data without changing the original value.

Types: built-in pipes, custom pipes. Built-in: text pipes, number pipes, date pipes.

![[types-of-pipes.jpg]]

Pipes are applied with the `|` operator in templates, and imported into the component (`imports: [UpperCasePipe, DatePipe]`).

| Group | Pipes |
| --- | --- |
| Text | `uppercase`, `lowercase`, `titlecase` |
| Number | `number` (DecimalPipe), `percent`, `currency` |
| Others | `date`, `json`, `slice`, `keyvalue`, `async` |
| Custom | your own class with `@Pipe` |

## Text pipes

```html
<p>{{ text | uppercase }}</p>   <!-- INTERVIEW HAPPY -->
<p>{{ text | lowercase }}</p>   <!-- interview happy -->
<p>{{ text | titlecase }}</p>   <!-- Interview Happy -->
```

## Number pipes

```html
<p>{{ 1234.567 | number: '1.2-2' }}</p>   <!-- 1,234.57 -->
<p>{{ 0.256 | percent }}</p>              <!-- 26% -->
<p>{{ 1000 | currency: 'INR' }}</p>       <!-- ₹1,000.00 -->
```

`'1.2-2'` = min digits before decimal `.` min digits after `-` max digits after.

## Date pipe

```html
<p>{{ today | date }}</p>                   <!-- Oct 3, 2026 -->
<p>{{ today | date: 'dd/MM/yyyy' }}</p>     <!-- 03/10/2026 -->
<p>{{ today | date: 'shortTime' }}</p>      <!-- 11:15 PM -->
```

## Slice, JSON and KeyValue

```html
<p>{{ 'InterviewHappy' | slice: 0 : 9 }}</p>   <!-- Interview -->
<p>{{ user | json }}</p>                       <!-- { "name": "Happy", "age": 30 } (great for debugging) -->
@for (entry of user | keyvalue; track entry.key) {
  <p>{{ entry.key }}: {{ entry.value }}</p>
}
```

## Parameterized and chained pipes

A **parameterized** pipe takes extra arguments after `:` (`number:'1.2-2'`, `currency:'INR'`, `slice:0:9`). `uppercase` is non-parameterized.

**Chaining:** output of one pipe feeds the next: `{{ today | date: 'fullDate' | uppercase }}`.

## Custom pipes

```bash
ng g pipe truncate
```

```ts
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20): string {
    return value.length > limit ? value.slice(0, limit) + '…' : value;
  }
}
```

```html
<p>{{ longText | truncate: 10 }}</p>
```

## Pure vs impure pipes

- **Pure (default):** re-runs only when the input **reference** changes. Cheap, cached. Pushing into an array won't re-run it; create a new array instead.
- **Impure (`pure: false`):** re-runs on **every** change detection cycle. Expensive; use sparingly. `async` is impure.

The `async` pipe subscribes to Observables for you, see [[13 Observables and RxJS#Async pipe|Observables and RxJS]]. It works with **Promises** too:

```ts
name = Promise.resolve('Misko');
friends$ = of(['Igor', 'Miško']);
```

```html
<h1>Hello, {{ name | async }}</h1>
@for (f of friends$ | async; track f) { <li>{{ f }}</li> }
```

### A stateful (impure) pipe

Pure pipes are stateless: same input, same output. An impure pipe can **remember** things between calls. `async` is one. Here's a countdown that keeps its own timer:

```ts
@Pipe({ name: 'countdown', pure: false })
export class CountdownPipe implements PipeTransform, OnDestroy {
  private remaining?: number;
  private timer?: ReturnType<typeof setInterval>;

  transform(start: number, intervalMs = 1000): number {
    if (this.remaining === undefined) this.remaining = start;
    this.timer ??= setInterval(() => {
      this.remaining = Math.max(0, this.remaining! - 1);
      if (this.remaining === 0) clearInterval(this.timer);
    }, intervalMs);
    return this.remaining;
  }

  ngOnDestroy() { clearInterval(this.timer); }   // pipes get ngOnDestroy too: avoid leaks
}
```

```html
{{ 300 | countdown }}  ·  {{ 1000 | countdown: 50 }}
```

Each use in a template gets its own pipe instance, so each countdown has its own state. In a zoneless app the view only refreshes if something tells Angular to check, so a signal in a component is usually a better fit for a live timer.

## Reusing a built-in pipe inside your own

Built-in pipes are ordinary classes, so you can wrap one. This pipe formats dates but passes numbers through untouched:

```ts
@Pipe({ name: 'ifDate' })
export class IfDatePipe implements PipeTransform {
  private datePipe = new DatePipe(inject(LOCALE_ID));

  transform(value: unknown, format = 'mediumDate') {
    if (typeof value === 'number') return value;
    try { return this.datePipe.transform(value as string | Date, format); }
    catch { return value; }   // not a valid date: show it as it is
  }
}
```

## No `orderBy` or `filter` pipe

AngularJS had `orderBy` and `filter` filters; Angular deliberately dropped them. Sorting or filtering inside a template has to be **impure** to notice changes in the array, so it would re-sort on **every** change detection: slow on big lists.

Do it in the component instead, so it only runs when the data changes:

```ts
users = signal<User[]>([]);
sortBy = signal<keyof User>('firstName');
sortedUsers = computed(() =>
  [...this.users()].sort((a, b) => String(a[this.sortBy()]).localeCompare(String(b[this.sortBy()]))),
);
```

```html
@for (u of sortedUsers(); track u.id) { <tr><td>{{ u.firstName }}</td></tr> }
```

(`[...this.users()]` copies the array first: `sort()` changes an array in place.) If you do write a sort pipe, keep it pure and give it a new array whenever the data changes.

> [!warning] Don't build "dynamic pipes" with `eval`
> Old examples choose a pipe at runtime by building a method name as a string and calling `eval()`. That is slow and a security hole. Use a `switch` over known formats, or pass a formatting function in.

Testing a pipe: [[26 Testing#Testing a pipe|Testing]].
