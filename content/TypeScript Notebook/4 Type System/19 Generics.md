---
title: 19. Generics
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> **Generics** are type parameters (`<T>`): write a function, interface or class once and let the caller decide the type, while keeping full type safety. **Constraints** (`extends`) limit what `T` can be, and **`keyof`** turns an object type into a union of its keys.

## Q. What are generics? Why use them?

```ts
function firstAny(arr: any[]): any { return arr[0]; }       // works, but loses the type
function first<T>(arr: T[]): T | undefined { return arr[0]; }

const n = first([1, 2, 3]);        // T = number → n: number | undefined
const s = first(["a", "b"]);       // T = string
const u = first<User>(users);      // T written explicitly
```

Generics give you **reusable** code **without** falling back to `any`. You already use them: `Array<number>`, `Promise<User>`, `Map<string, number>`, Angular's `Observable<User[]>` and `EventEmitter<string>`.

> [!tip] Remember it
> **A generic is a box with a label slot:** the box (code) is the same, the caller writes the label (`T`) and TS remembers what's inside.

## Q. How do you write generic types, interfaces and classes?

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}
type UsersResponse = ApiResponse<User[]>;

type Pair<K, V> = [K, V];

class Stack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}
const stack = new Stack<number>();
stack.push(1);
stack.push("a");                   // Error

interface Page<T = unknown> {      // default type parameter
  items: T[];
  total: number;
}
```

## Q. What are generic constraints?

`T extends X` means "T can be anything, **as long as** it has the shape of X":

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest("apple", "fig");      // OK: strings have length
longest([1, 2], [1]);         // OK: arrays have length
longest(10, 20);              // Error: numbers don't
```

## Q. What is the `keyof` operator?

`keyof T` gives a **union of T's property names**:

```ts
interface User { id: number; name: string; email: string }
type UserKey = keyof User;          // "id" | "name" | "email"

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {   // T[K] = indexed access type
  return obj[key];
}

const user: User = { id: 1, name: "Asha", email: "a@x.com" };
getProp(user, "name");   // string
getProp(user, "age");    // Error: "age" is not a key of User
```

Related operators:

| Operator | Gives |
| --- | --- |
| `keyof T` | the keys of a type as a union |
| `T[K]` | the type of property `K` (indexed access) |
| `typeof value` | the type of a **value** (in a type position) |
| `typeof obj[keyof typeof obj]` | the union of an object's values |

```ts
const config = { port: 3000, host: "localhost" };
type Config = typeof config;        // { port: number; host: string }
```

> [!question] Recall
> - Why are generics better than `any`?
> - Write a generic `Stack<T>` class.
> - What does `T extends { length: number }` mean?
> - What do `keyof User` and `User["name"]` give you?
> - Why does `getProp<T, K extends keyof T>` reject unknown keys?

Prev: [[18 Type Guards Narrowing and Compatibility|18. Type Guards, Narrowing and Compatibility]] · Next: [[20 Utility Mapped and Conditional Types|20. Utility, Mapped and Conditional Types]]
