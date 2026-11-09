---
title: 18. Type Guards, Narrowing and Compatibility
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> **Narrowing** = checking a value so TypeScript knows a more exact type inside that branch. **Type guards** are the checks that do it (`typeof`, `instanceof`, `in`, equality, truthiness, your own predicates). **Type compatibility** = TS compares types by their **shape**, not their name.

First steps: [[16 Advanced Type System|Advanced Type System]].

## Q. What are the built-in type guards?

```ts
function format(value: string | number | Date | null) {
  if (value === null) return "n/a";               // equality narrowing
  if (typeof value === "string") return value.trim();     // typeof
  if (value instanceof Date) return value.toISOString();  // instanceof (classes)
  return value.toFixed(2);                         // only number is left
}
```

| Guard | Works for | Example |
| --- | --- | --- |
| `typeof` | primitives: `"string"`, `"number"`, `"boolean"`, `"bigint"`, `"symbol"`, `"undefined"`, `"function"`, `"object"` | `typeof x === "string"` |
| `instanceof` | class instances (`Date`, `Error`, your classes) | `err instanceof HttpError` |
| `in` | whether an object has a property | `"fly" in animal` |
| Equality | literal values, `null`, `undefined` | `x === null`, `kind === "circle"` |
| Truthiness | removes `null`, `undefined`, `""`, `0`, `NaN`, `false` | `if (user) …` |
| `Array.isArray` | arrays | `Array.isArray(x)` |

> [!warning] Truthiness traps
> `if (count)` also skips `0`, and `if (name)` also skips `""`. When `0` or `""` are valid values, compare with `!= null` instead.

> [!tip] Remember it
> **Narrowing is a bouncer at each door:** after each check, fewer types are allowed into the next room.

## Q. What is a discriminated union?

A union of object types that all share one **literal** property (the "tag"). Checking the tag narrows to the exact member:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape) {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;   // s is the circle type here
    case "rect":   return s.width * s.height;
  }
}
```

The standard way to model API responses, Redux/NgRx actions and UI states: `{ status: "loading" } | { status: "error"; message: string } | { status: "success"; data: T }`.

## Q. What is a type predicate (custom type guard)?

A function whose return type is `value is Type`. When it returns `true`, TS narrows the argument:

```ts
type Fish = { swim(): void };
type Bird = { fly(): void };

function isFish(pet: Fish | Bird): pet is Fish {
  return "swim" in pet;
}

if (isFish(pet)) pet.swim(); else pet.fly();

const nums = [1, null, 3].filter((n): n is number => n !== null);   // number[]
```

Since TS 5.5, simple filters like `.filter(n => n !== null)` infer the predicate automatically.

**Assertion functions** narrow by throwing instead of returning:

```ts
function assertIsString(v: unknown): asserts v is string {
  if (typeof v !== "string") throw new TypeError("Not a string");
}
assertIsString(input);
input.toUpperCase();   // input is string from here on
```

## Q. What is type compatibility (structural typing)?

TypeScript checks whether types are compatible by comparing their **structure** (properties and their types), not their names. If it has the right shape, it fits ("duck typing").

```ts
interface Point { x: number; y: number }
class Pixel { constructor(public x: number, public y: number, public color: string) {} }

const p: Point = new Pixel(1, 2, "red");   // OK: Pixel has x and y (extra props are fine)

function log(pt: Point) {}
log({ x: 1, y: 2, z: 3 });                 // Error: excess property check on object literals
const obj = { x: 1, y: 2, z: 3 };
log(obj);                                   // OK: not a fresh literal, so no excess check
```

- A type with **more** properties is assignable to one with **fewer** (subtype → supertype).
- **Fresh object literals** get an extra "excess property" check to catch typos.
- Functions: a function that takes **fewer** parameters can be used where more are passed (that's why `arr.forEach(x => …)` works).
- In other languages (Java, C#) types are **nominal**: names must match. To fake that in TS, use a "brand": `type UserId = string & { __brand: "UserId" }`.

> [!tip] Remember it
> **If it walks like a duck and quacks like a duck, TypeScript lets it be a duck.**

> [!question] Recall
> - Name five ways to narrow a union.
> - What makes a union "discriminated"? Why are they useful?
> - Write a type predicate `isString`. What does `asserts v is string` do differently?
> - Why can a `Pixel` be used as a `Point`? What is an excess property check?

Prev: [[17 Special Types Assertions and Literals|17. Special Types, Assertions and Literals]] · Next: [[19 Generics|19. Generics]]
