---
title: 4. Operators and Expressions
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Operators are **symbols or keywords** that perform operations on **operands**: `x + y = z`.

```
   operators
   ↓       ↓
x  +  y    =   z
↑     ↑        ↑
operands     result
```

## Q. What are operators? What types are there in TS?

| Type | Operators |
| --- | --- |
| 1. Arithmetic | `+ - * / % ++ --` |
| 2. Assignment | `= += -= *= /= %=` |
| 3. Comparison | `== != > < >= <=` (prefer `===` / `!==`) |
| 4. Logical | `&& \|\| !` |
| 5. Unary | `++ -- !` |
| 6. Ternary / conditional | `? :` |

## Q. What are arithmetic operators?

They perform basic maths.

```ts
let a: number = 10;
let b: number = 5;

console.log("Sum:", a + b);        // 15
console.log("Difference:", a - b); // 5
console.log("Product:", a * b);    // 50
console.log("Quotient:", a / b);   // 2
console.log("Remainder:", a % b);  // 0
```

## Q. What are assignment operators?

They assign values to variables, often combined with an operation.

```ts
let c: number = 10;
c += 5; // c = c + 5 → 15
c -= 3; // c = c - 3 → 12
c *= 2; // c = c * 2 → 24
c /= 4; // c = c / 4 → 6
c %= 2; // c = c % 2 → 0
```

## Q. What are comparison operators? When do you use them?

They compare values and return a **boolean**. They are mostly used in conditions of control statements.

```ts
let x: number = 5;
let y: number = 4;

x == y; // false
x != y; // true
x > y;  // true
x < y;  // false
x >= y; // true
x <= y; // false
```

> [!tip] Interview extra
> `==` converts types before comparing (`5 == "5"` is `true`). `===` doesn't (`5 === "5"` is `false`). Use `===` in real code.

## Q. What are logical operators? When do you use them?

They combine boolean expressions for decision-making.

```ts
let x: boolean = true;
let y: boolean = false;

x && y; // AND → false
x || y; // OR  → true
!x;     // NOT → false
```

## Q. What are unary operators?

They work on a **single operand**.

```ts
let a: number = 5;
let preIncrement: number = ++a; // 6
let preDecrement: number = --a; // 5
```

## Q. What is the ternary (conditional) operator? ⭐ V. IMP.

It evaluates a boolean condition and returns one of two values. It is called *ternary* because it takes **three operands**.

```ts
// condition ? resultIfTrue : resultIfFalse
let x: number = 10;
let y: number = 5;
let result: string = x > y ? "A" : "B";
console.log(result); // A
```

> [!note] ✍️ My notes
> - `==` vs `===`: `===` checks **data type + value**.
> - `x < 4` reads as "x is less than 4".
> - Logical: `&&` both true → true · `||` one true → true · `!` gives the opposite.
> - `typeof` is also a unary operator.
> - Ternary = a **shortcut for if-else**: true → result 1, false → result 2.

> [!question] Recall
> - Name the six operator families.
> - Why is `?:` called "ternary"?
> - What is the difference between `==` and `===`?

Prev: [[03 Variables and Data Types|3. Variables]] · Next: [[05 Conditional Statements|5. Conditional Statements]]
