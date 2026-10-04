---
title: 3. Variables and Data Types
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Every app is **logic + data**. Functions control the logic. **Variables** and **data types** control the data.

```ts
let message: string = "Interview Happy";
//  │         │        └── assigned value
//  │         └── type annotation
//  └── 'let' keyword for variable
```

## Q. What are variables? What is the difference between `var`, `let` and `const`? ⭐ V. IMP.

Variables are **named containers** used to store data values.

- `var` is **function scoped** and allows **redeclaration**.
- `let` is **block scoped**, does **not** allow redeclaration, but allows updating the value.
- `const` is block scoped and allows **neither redeclaration nor reassignment**.

```ts
function varExample() {
  var x = 10;
  var x = 20; // allowed (var can be redeclared)
}

function letExample() {
  let y = 10;
  let y = 20; // error (cannot redeclare)
  y = 30;     // allowed (value can be updated)
}
let y = 30;   // allowed (declared outside that scope)

function constExample() {
  const z = 10;
  z = 20; // error (cannot update const)
}
```

|  | `var` | `let` | `const` |
| --- | --- | --- | --- |
| Scope | Function | Block | Block |
| Redeclare | Yes | No | No |
| Reassign | Yes | Yes | **No** |
| Safety | ❌ Unsafe | ✅ Safe | ⭐ Very safe |
| Recommended | Avoid | When the value changes | Use by default |

> [!warning] Correction
> The handbook's table says `const` can be reassigned ("YES"). It **cannot**. Its own code example shows `z = 20` is an error. You *can* still change the **contents** of a `const` object or array (`const arr = []; arr.push(1)` is fine).

## Q. What are data types? What are the different data types in TypeScript?

Data types define the **kind of value** a variable can store.

| Built-in (primitive) | User-defined (non-primitive) |
| --- | --- |
| `string`: text | Arrays |
| `number`: integers and decimals | Tuples |
| `boolean`: true/false | Enums |
| `undefined`: not assigned yet | Interfaces |
| `null`: intentionally empty | Classes |
| `any`: disables type checking | |
| `unknown`: safer alternative to `any` | |

```ts
let age: number = 40;
let fname: string = "Happy";
let isWorking: boolean = true;
```

## Q. Primitive vs non-primitive data types ⭐ V. IMP.

| Primitive | Non-primitive (reference) |
| --- | --- |
| Stores the **actual value** | Stores a **reference (address)** to the value |
| Stored in **stack** memory | Data in **heap** memory, reference in the stack |
| **Immutable** | **Mutable** |
| Holds a **single** value | Can hold **multiple** values |

```
var a: number = 10;          let arr: number[] = [1, 2];

STACK                        STACK                    HEAP
┌─────┬───────┐              ┌─────┬──────────┐       ┌──────────┬────────┐
│ a   │ 10    │              │ arr │ → 8888XX │ ────▶ │ 8888XX   │ [1, 2] │
└─────┴───────┘              └─────┴──────────┘       └──────────┴────────┘
```

## Q. Built-in vs user-defined data types

- **Built-in (primitive)** types are the basic types TypeScript provides.
- **User-defined (non-primitive)** types are created by the developer to **structure complex data**.

## Q. What is type annotation? How do you add it to a function?

Type annotation **explicitly assigns a type** to a variable, parameter or return value using a colon (`:`).

```ts
let message: string = "Interview Happy";   // variable annotation

function getText(text: string): string {   // parameter + return type annotation
  return text;
}
```

## Q. What is type inference?

TypeScript **automatically works out the type** from the assigned value, so no annotation is needed.

```ts
let message = "Interview Happy"; // inferred as string

function add(a = 10, b = 20) {   // a, b and the return type inferred as number
  return a + b;
}
```

## Q. Why do we still need type annotations if TS has inference?

To avoid confusion, make code clearer, and handle cases where TS **cannot infer the type correctly**.

```ts
let age;         // inferred as 'any': unsafe
let age: string; // annotation required
```

## Q. `undefined` vs `null`

| `undefined` | `null` |
| --- | --- |
| The variable exists but **has no value yet** | The developer **deliberately** set it to "nothing" |
| Use it when a value is **currently missing** and may come later | Use it when a value is **intentionally empty** |

```ts
let x;
console.log(x); // undefined

let a = null;
console.log(a); // null
```

## Q. `any` vs `unknown`

- `any` holds any value and **turns off type checking**: complete freedom, **zero safety**.
- `unknown` holds any value, but you **must check its type before using it**: flexibility **with** safety.

```ts
let value: any = "Happy";
value = 10;
value.toUpperCase(); // no compile error (crashes at runtime!)

let value1: unknown = "Happy";
value1.toUpperCase(); // ❌ error
if (typeof value1 === "string") {
  value1.toUpperCase(); // ✅ allowed after the check
}
```

| Feature | `any` | `unknown` |
| --- | --- | --- |
| Type safety | ❌ | ✅ |
| Requires a type check | ❌ | ✅ |
| Allows any value | ✅ | ✅ |
| Prevents wrong operations | ❌ | ✅ |
| Recommended | ❌ | ⭐ |

> [!tip] 🧠 Remember it
> `any` = "trust me, don't check". `unknown` = "I don't know yet, **check first**".

> [!note] ✍️ My notes
> - Variables are where data is stored: `let userName: string = "Yashwanth"` (variable · type annotation · value).
> - With `var`, redeclaration is allowed → **never use `var`**.
> - **Special type annotations:** `any`, `unknown`, `null`, `undefined`.
> - Primitive = **single** value. Non-primitive = **multiple** values (classes, arrays, tuples, enums, interfaces).
> - **Simplified:** type inference means TS just *assumes* the variable's type from its value. If TS can't work it out, add a type annotation.
> - **any vs unknown:** `any` allows everything. Pass an `any` value into a function that only works with `string` and that part breaks at runtime. `unknown` forces you to check first.

> [!question] Recall
> - Which of `var`/`let`/`const` is function scoped?
> - Where does a primitive live in memory? Where does an array's data live?
> - Why is `unknown` safer than `any`?

Prev: [[02 TypeScript Setup and First Program|2. Setup]] · Next: [[04 Operators and Expressions|4. Operators and Expressions]]
