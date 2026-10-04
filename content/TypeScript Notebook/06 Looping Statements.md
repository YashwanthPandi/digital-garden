---
title: 6. Control Flow – Looping Statements
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Loops **repeat a block of code while a condition is true**: like setting an alarm once instead of every night.

```
start: let i = 1
      │
      ▼
 ┌─▶ i <= 5 ? ──false──▶ end (1 2 3 4 5)
 │     │ true
 │     ▼
 └── console.log(i); i++
```

## Q. What are looping statements? What types of loops are there?

Looping statements execute a block of code **repeatedly** based on a condition.

Types: `while` · `for` · `do-while` · `for-of` · `for-in` · `Array.forEach()`

## Q. What is a `while` loop?

It repeats a block **while a condition is true**.

```ts
let i: number = 1;      // initialization
while (i <= 5) {        // condition
  console.log(i);
  i++;                  // increment
}
// Output: 1 2 3 4 5
```

## Q. What is a `for` loop? `while` vs `for`

- `for` repeats a block a **known number of times**. Use it when you need **initialization, condition and increment** together.
- `while` repeats while a condition is true. Use it when **only the condition** is required.

```ts
for (let i: number = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5
```

## Q. What is a `do-while` loop? `while` vs `do-while` ⭐ V. IMP.

- `while` checks the condition **first**, so the body may run zero times.
- `do-while` runs the body **at least once**, even if the condition is false.

```ts
let i: number = 5;
do {
  console.log(i);
  i++;
} while (i < 4);
// Output: 5   (ran once, although 5 < 4 is false)
```

> [!warning] Correction
> The handbook's `while` example starts at `i = 5` with `i <= 5` and claims the output is `1 2 3 4 5`. The output is actually just `5`. Start at `i = 1` to get `1 2 3 4 5`.

## Q. What are `break` and `continue`? ⭐ V. IMP.

- `break` **ends the loop** completely.
- `continue` **skips the current iteration** and moves on to the next.

```ts
for (let i = 1; i <= 5; i++) {
  if (i === 3) break;
  console.log(i);
}
// Output: 1 2

for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
// Output: 1 2 4 5
```

## Q. How do you choose between `for`, `while` and `do-while`? ⭐ V. IMP.

| Loop | Use when |
| --- | --- |
| `for` | You have initialization + condition + increment, all on one line (compact and readable) |
| `while` | You only have a **condition** (no counter) |
| `do-while` | The body must run **at least once**, whatever the condition |

```ts
while ("a" == "a") { // only a condition
  console.log("Happy");
  break;
}
```

> [!note] ✍️ My notes
> - **for:** initialization, condition and increment are all mandatory. You know where to start and where to stop.
> - **while:** only the condition is mandatory.
> - **do-while:** do something first, then check the condition.
> - **break:** exits the loop when its condition is met. **continue:** skips only that iteration.

> [!question] Recall
> - Which loop always runs at least once?
> - What does `continue` do that `break` doesn't?

Prev: [[05 Conditional Statements|5. Conditionals]] · Next: [[07 Collections - Arrays and Tuples|7. Arrays and Tuples]]
