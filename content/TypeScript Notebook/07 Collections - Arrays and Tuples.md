---
title: 7. Collections – Arrays and Tuples
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> An **array** is a list of values of (usually) one type. A **tuple** is a fixed-size array where **each position has its own type**.

Types of collections in TS: **Array**, **Tuple**, **Set**, **Map**, **Object/Record**. Set and Map are covered in [[18 Advanced Collections|18. Advanced Collections]].

## Q. What is an array? Why do we need arrays? ⭐ V. IMP.

An array stores **multiple values in a single variable**. It keeps related data in a **structured** way and gives sequential access via **indexes**.

| Element | apple | banana | orange |
| --- | --- | --- | --- |
| **Index** | 0 | 1 | 2 |

## Q. How do you declare, initialize and access an array?

```ts
// declare + initialize
let fruits: string[] = ["apple", "banana", "orange"];

// access one element by index
console.log(fruits[2]); // orange

// access all elements
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// apple, banana, orange
```

## Q. What is the `length` property of an array?

It gives the **number of elements** in the array (`fruits.length` → `3`).

## Q. What are `push`, `pop`, `shift` and `unshift`?

| Method | Does | Position |
| --- | --- | --- |
| `push()` | Adds | End |
| `pop()` | Removes | End |
| `unshift()` | Adds | Start |
| `shift()` | Removes | Start |

```ts
let fruits: string[] = ["apple", "banana"];

fruits.push("orange");  // ["apple", "banana", "orange"]
fruits.pop();           // ["apple", "banana"]
fruits.unshift("mango");// ["mango", "apple", "banana"]
fruits.shift();         // ["apple", "banana"]
```

> [!tip] 🧠 Remember it
> **push/pop** work at the **back**. **shift/unshift** work at the **front**. ("**un**shift" **un**-does a shift by adding back to the front.)

## Q. What are tuples?

A tuple is a **fixed-size array** where **each element has a specific type**.

```ts
let person: [string, number] = ["Happy", 40];
console.log(person); // [ 'Happy', 40 ]
```

## Q. Array vs tuple

| Feature | Array | Tuple |
| --- | --- | --- |
| Length | Not fixed | Fixed |
| Types | Usually one type | Different types allowed |
| Order | Doesn't define the type | **Order defines the type** |
| Use case | A list of similar items | Structured data with known positions |

```ts
let marks: number[] = [85, 90, 95];           // array
let person: [string, number] = ["Happy", 40]; // tuple
```

> [!note] ✍️ My notes
> - `let fruits: string[]` → the array **only accepts string elements**.
> - Tuple: `let person: [string, number]; person = ["Happy", 40];`, where the **order is defined by the type**.

> [!question] Recall
> - Which two methods work at the front of an array?
> - In `[string, number]`, what type must index 1 be?

Prev: [[06 Looping Statements|6. Loops]] · Next: [[08 Advanced Looping Techniques|8. Advanced Looping]]
