---
title: Variables and Data Types
tags:
  - TypeScript
---

## Variables

Variables are where data is stored. 3 types: `var`, `let`, `const`.

```ts
let userName: string = "Yashwanth"
//  ↑variable  ↑datatype annotation  ↑value
```

**Special type annotations:** `any`, `unknown`, `null`, `undefined`

|                | var            | let                    | const          |
| -------------- | -------------- | ---------------------- | -------------- |
| Scope          | Function scope | Block                  | Block          |
| Redeclared     | Yes            | No                     | No             |
| Safety         | Unsafe         | Safe                   | Very safe      |
| Recommendation | Avoid using    | Use when value changes | Use as default |

With `var`, redeclaration is allowed → **never use var**.

```ts
function varExample() {
  var x = 10
  var x = 20
} // allowed (bad)
function letExample() {
  let y = 18 /* let y = 20 inside: not allowed; outside: allowed */
}
function constExample() {
  const z = 180
  z = 80
} // not allowed
```

## Data types

Data types → the kind of value a variable allows.

- **Primitive (built-in), single values:** `string`, `number`, `boolean`, `undefined` (value not assigned), `null` (intentionally empty), `any` (disables type checking), `unknown` (safer alternative to `any`)
- **Non-primitive (user defined), multiple values:** classes, arrays, tuples, enums, interfaces

## Type annotation vs type inference

```ts
function fname(text: string): string {
  // parameter annotation / function return annotation
  return text
}
```

**Type annotation** = the process of explicitly assigning a type.

**Type inference** = TypeScript assumes the type based on the given value.
_Sticky note ("Simplify notes"):_ type inference is like a [?] that just assumes the variable type based on its value.
If TS can't determine the type, it needs a type annotation.

## any vs unknown

`any` allows everything. If we pass an `any` value to a function that only works with `string`, it breaks that part and an error occurs.
