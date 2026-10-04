---
title: 10. Functions
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> A function is a named block of code for one task. TypeScript adds **typed parameters and return types**. You can write one as a **declaration**, an **expression** or an **arrow function**.

```ts
function sayHello(name: string): string {
//│       │        └ parameter     └ return type
//└ keyword
  return `Hello, ${name}!`;
}
```

## Q. What is a function in TypeScript? How is it different from a JS function?

A function is a **named block of code that performs a specific task**. In TS it takes **typed parameters** and can return a value of a **defined type**. JavaScript functions have no types.

```ts
function add(a: number, b: number): number {
  return a + b;
}
let result = add(5, 3);
console.log(result); // 8
```

## Q. Function declaration vs function expression

- **Declaration:** defined with the `function` keyword **and a name**. Declarations are **hoisted**, so you can call them before the line that defines them.
- **Expression:** an (often anonymous) function **assigned to a variable**. It is **not hoisted**, so you can only call it after the assignment.

```ts
// Function declaration
function add(a: number, b: number): number {
  return a + b;
}

// Function expression
const add2 = function (a: number, b: number): number {
  return a + b;
};
```

## Q. What are arrow functions? How are they different from normal functions? ⭐ V. IMP.

Arrow functions are a **shorter, cleaner** way to write functions with `=>`.

```ts
const add = (a: number, b: number): number => {
  return a + b;
};

const addShort = (a: number, b: number): number => a + b; // implicit return

console.log(add(4, 5)); // 9
```

> [!tip] Interview extra: the real difference
> Arrow functions **don't have their own `this`**. They use `this` from the surrounding code. That's why they're handy for callbacks inside classes (and Angular components). They also have no `arguments` object and can't be used with `new`.

> [!note] ✍️ My notes
> - If a function returns nothing, its return type is **`void`**:
>   ```ts
>   function logIt(msg: string): void { console.log(msg); }
>   ```

> [!question] Recall
> - Which function style is hoisted?
> - What is special about `this` inside an arrow function?

Prev: [[09 Objects and Structured Data|9. Objects]] · Next: [[11 Advanced Type System|11. Advanced Type System]]
