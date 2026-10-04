---
title: 5. Control Flow – Conditional Statements
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Conditional statements let a program **choose a path** based on a condition: `if-else`, `switch`, or the ternary operator.

## Q. What are control statements? What types are there?

Control statements **manage the flow of execution** in a program.

| Conditional | Looping | Branching |
| --- | --- | --- |
| `if-else` | `for` | `break` |
| `switch` | `while` | `continue` |
| ternary `?:` | `do-while` | `return` |
| | `for-of` | |

## Q. What are conditional statements? What is `if-else if-else`?

Conditional statements make **decisions** based on conditions.

- There is **one** `if` block, **any number** of `else if` blocks, and at most **one** `else` block.
- **Only one block** runs.

```ts
let num: number = 0;

if (num > 0) {
  console.log("positive");
} else if (num < 0) {
  console.log("negative");
} else if (num === 10) {
  console.log("ten");
} else {
  console.log("zero");
}
// Output: zero
```

## Q. What is the `switch` statement? When do you use it?

- `switch` runs the block of the **matching `case`**.
- Use `break` to leave the switch. Without it, execution "falls through" to the next case.
- `default` is optional and runs when no case matches.

```ts
let priority: number = 2;
let result: string;

switch (priority) {
  case 1:
    result = "High";
    break;
  case 2:
    result = "Medium";
    break;
  default:
    result = "Low";
    break;
}
console.log(result); // Medium
```

## Q. What is the ternary operator? ⭐ V. IMP.

```ts
let result: string = x > y ? "A" : "B";
```

See [[04 Operators and Expressions#Q. What is the ternary (conditional) operator? ⭐ V. IMP.|Ternary operator]].

## Q. When should you use if-else, ternary or switch? ⭐ V. IMP.

| Use | When | Benefit |
| --- | --- | --- |
| **Ternary** | A single, simple condition | Short, one-line syntax |
| **if…else** | Complex conditions or multi-line blocks | Covers every scenario |
| **switch** | Comparing **the same value** against many cases | More structured code |

```ts
// complex condition → if-else
let a = 25, b = true, c = false;
if ((a >= 21 && b) || c) {
  console.log(1);
  console.log(2);
} else {
  console.log(0);
}
```

> [!tip] 🧠 Remember it
> **One question → ternary. Many different questions → if-else. One value, many answers → switch.**

> [!note] ✍️ My notes
> - if/else → complex conditions or multiple lines of code
> - ternary → simple conditions
> - switch → switching between **fixed values**

> [!question] Recall
> - How many `else` blocks can an if-chain have?
> - What happens if you forget `break` in a `switch`?

Prev: [[04 Operators and Expressions|4. Operators]] · Next: [[06 Looping Statements|6. Looping Statements]]
