---
title: Functions
tags:
  - TypeScript
---

A function in TypeScript is a named block of code that performs a specific task. It takes typed parameters and can return a defined type (JavaScript has no typed parameters).

```ts
function sayHello(name: string): string {
  return `Hello, ${name}`
}
// if there is no return → void

function add(a: number, b: number): number {
  return a + b
}
let c = add(5, 3)
console.log(c) // 8
```

## Function declaration & expression

_(Left empty.)_

## Advanced type system

_(Left empty.)_
