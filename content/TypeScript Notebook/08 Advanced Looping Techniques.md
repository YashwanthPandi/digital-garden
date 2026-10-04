---
title: 8. Advanced Looping Techniques
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> `for` is a Swiss knife that can do everything. `for…of` and `forEach` are nail cutters: **simple and focused on collections**.

## Q. What is a `for…of` loop? `for` vs `for…of`

- `for` is a **general-purpose** loop for any iteration. It is a bit more complex for collections because you handle indexes.
- `for…of` is **simpler and cleaner** for collections because it gives you **values directly**, with no indexes.

```ts
const numbers: number[] = [1, 2, 3, 4];

for (let i: number = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

for (const num of numbers) {
  console.log(num);
}
// Both output: 1 2 3 4
```

## Q. What is the `forEach` method?

- `forEach()` iterates over each element of an array.
- It runs a **function once for every element**.
- It gives direct access to the element, with no index handling needed (the index is available as a second parameter if you want it).

```ts
const numbers: number[] = [1, 2, 3, 4];
numbers.forEach(num => {
  console.log(num);
});
// Output: 1 2 3 4
```

## Q. `for…of` vs `forEach`: when to use which?

| `for…of` | `forEach` |
| --- | --- |
| Use when you need loop control: **`break` / `continue`** | Use when you will process **every element without interruption** |
| Works with `await` inside | Doesn't wait for `async` callbacks |

```ts
for (const num of numbers) {
  console.log(num);
  break;
}
// Output: 1

numbers.forEach(num => console.log(num));
// Output: 1 2 3 4   (cannot break out early)
```

> [!warning] Correction
> The handbook labels **both** columns "for…of". The right-hand one is `forEach`.

> [!note] ✍️ My notes
> ```ts
> for (const item of items) { console.log(item); } // item = temp variable for each iteration
>
> const names: string[] = ["Yash", "Bash", "Mash"];
> names.forEach((name) => console.log(name));      // a method called on the array
> ```

> [!question] Recall
> - Can you `break` out of a `forEach`?
> - What does `for…of` give you each iteration: the index or the value?

Prev: [[07 Collections - Arrays and Tuples|7. Arrays and Tuples]] · Next: [[09 Objects and Structured Data|9. Objects]]
