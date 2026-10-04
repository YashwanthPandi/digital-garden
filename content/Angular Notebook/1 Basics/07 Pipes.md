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

The `async` pipe subscribes to Observables for you, see [[13 Observables and RxJS#Async pipe|Observables and RxJS]].
