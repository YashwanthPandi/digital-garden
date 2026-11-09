---
title: 17. Special Types, Assertions and Literals
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Beyond `string` and `number`, TypeScript has **special types** (`any`, `unknown`, `void`, `never`, `object`), **enums**, **literal types** for exact values, and ways to override or check the compiler's view: `as`, `as const`, `!` and `satisfies`.

## Q. What are all the basic types in TypeScript?

```ts
let isDone: boolean = false;
let count: number = 42;               // integers and decimals
let big: bigint = 9007199254740993n;
let title: string = "TS";
let nothing: null = null;
let notSet: undefined = undefined;
let id: symbol = Symbol("id");

let scores: number[] = [90, 85];      // Array (also Array<number>)
let pair: [string, number] = ["age", 30];   // Tuple → [[11 Collections - Arrays and Tuples|Arrays and Tuples]]
let config: object = { debug: true }; // any non-primitive (rarely useful)
```

`Object` (capital O) means "anything except `null`/`undefined`": avoid it. Use a specific object type or `Record<string, unknown>`.

## Q. What are `any`, `unknown`, `void` and `never`?

| Type | Means | Use it for |
| --- | --- | --- |
| `any` | turn type checking off | migration only; it spreads silently |
| `unknown` | "could be anything, check before use" | API data, `catch (e)`, JSON |
| `void` | the function returns nothing useful | `function log(msg: string): void` |
| `never` | this can't happen / never returns | functions that always throw, exhaustive checks |

```ts
function fail(message: string): never {
  throw new Error(message);          // never returns normally
}

function area(shape: "circle" | "square"): number {
  switch (shape) {
    case "circle": return 3.14;
    case "square": return 1;
    default:
      const check: never = shape;    // error here if a new shape is added and not handled
      return check;
  }
}
```

> [!tip] Remember it
> **`any` = "I give up". `unknown` = "I'll check first". `void` = "nothing to give back". `never` = "this road is a dead end".**

## Q. What is an enum? Should you use it?

```ts
enum Status { Active, Inactive }                  // numeric: Active = 0, Inactive = 1
enum Role { Admin = "ADMIN", User = "USER" }      // string enum (clearer when logged)

let r: Role = Role.Admin;
```

Enums create real JavaScript objects at runtime. Many teams now prefer a **union of string literals** or an `as const` object, which add no runtime code and work with Node's type stripping:

```ts
type Role = "ADMIN" | "USER";

const ROLE = { Admin: "ADMIN", User: "USER" } as const;
type RoleValue = typeof ROLE[keyof typeof ROLE];  // "ADMIN" | "USER"
```

## Q. What are literal types?

A **literal type** is one exact value: `"GET"`, `404`, `true`. Combine them with unions for a fixed set of options:

```ts
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

function request(url: string, method: Method) { }
request("/api", "GET");     // OK
request("/api", "FETCH");   // Error: not one of the allowed values

let a = "GET";              // type: string (let can change)
const b = "GET";            // type: "GET" (const can't)
```

## Q. What are template literal types?

Build string types from other types, the way template strings build strings:

```ts
type Size = "sm" | "md" | "lg";
type Color = "red" | "blue";
type ClassName = `btn-${Size}-${Color}`;     // "btn-sm-red" | "btn-sm-blue" | … (6 options)

type EventName<T extends string> = `on${Capitalize<T>}`;
type Click = EventName<"click">;             // "onClick"
```

Built-in string helpers: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`.

## Q. What are type assertions: `as [type]`, `as any` and `as const`?

```ts
const input = document.getElementById("email") as HTMLInputElement;  // "I know it's an input"
input.value;

const weird = ("hello" as any) as number;   // as any: forces anything (dangerous, avoid)

const config = { mode: "dark", sizes: [8, 16] } as const;
// type: { readonly mode: "dark"; readonly sizes: readonly [8, 16] }
```

- `as Type`: tells the compiler the type; **no runtime check or conversion**. Only works when the types overlap.
- `as any` (or `as unknown as T`): escapes the type system completely. A sign something is wrong.
- `as const`: makes everything **readonly** and keeps **literal** types instead of widening (`"dark"` instead of `string`).

See also [[16 Advanced Type System|Advanced Type System]].

## Q. What is the non-null assertion operator (`!`)?

```ts
const el = document.querySelector("#app")!;   // "trust me, it's not null"
el.textContent = "Hi";

function greet(name?: string) {
  console.log(name!.toUpperCase());          // crashes at runtime if name is undefined
}
```

`!` removes `null` and `undefined` from a type. Like `as`, it doesn't check anything at runtime. Prefer a real check (`if (!el) throw …`) or optional chaining (`name?.toUpperCase()`).

## Q. What does the `satisfies` operator do?

`satisfies` **checks** that a value matches a type **without changing** the value's inferred type:

```ts
type Theme = Record<"primary" | "secondary", string | number[]>;

const a: Theme = { primary: "#4f46e5", secondary: [79, 70, 229] };
a.primary.toUpperCase();      // Error: TS only knows string | number[]

const b = { primary: "#4f46e5", secondary: [79, 70, 229] } satisfies Theme;
b.primary.toUpperCase();      // OK: TS still knows primary is a string
b.tertiary;                   // Error: typo caught, not in Theme
```

> [!tip] Remember it
> **`: Type` = "treat it as this type" (you lose detail). `as Type` = "trust me" (no check). `satisfies Type` = "check it, but keep what you know".**

> [!question] Recall
> - `any` vs `unknown`? When does a function return `never`?
> - Why do many teams avoid enums? What do they use instead?
> - What does `as const` change about a value's type?
> - What's the risk of `!` and `as`?
> - `const x: T = …` vs `const x = … satisfies T`?

Prev: [[16 Advanced Type System|16. Advanced Type System]] · Next: [[18 Type Guards Narrowing and Compatibility|18. Type Guards, Narrowing and Compatibility]]
