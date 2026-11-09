---
title: 20. Utility, Mapped and Conditional Types
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> **Utility types** are built-in generics that transform other types (`Partial`, `Pick`, `Omit`, `ReturnType`…). They're built from **mapped types** (loop over keys) and **conditional types** (`T extends U ? X : Y`), which you can also write yourself, including **recursive** ones.

## Q. What are the most-used utility types?

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}
```

| Utility | Result | Typical use |
| --- | --- | --- |
| `Partial<User>` | every property optional | update/patch payloads |
| `Required<User>` | every property required | after defaults are filled in |
| `Readonly<User>` | every property `readonly` | state you must not mutate |
| `Pick<User, "id" \| "name">` | only those properties | list items, previews |
| `Omit<User, "id">` | all except those | "create" forms (the server assigns `id`) |
| `Record<"admin" \| "user", string[]>` | an object with those keys and value type | lookup tables, dictionaries |

```ts
function updateUser(id: number, changes: Partial<User>) { }
updateUser(1, { email: "new@x.com" });              // only what changed

type NewUser = Omit<User, "id">;
const permissions: Record<User["role"], string[]> = { admin: ["*"], user: ["read"] };
```

### Union helpers

| Utility | Does | Example → result |
| --- | --- | --- |
| `Exclude<T, U>` | removes members of `U` from union `T` | `Exclude<"a" \| "b" \| "c", "a">` → `"b" \| "c"` |
| `Extract<T, U>` | keeps only members assignable to `U` | `Extract<string \| number \| boolean, number \| boolean>` → `number \| boolean` |
| `NonNullable<T>` | removes `null` and `undefined` | `NonNullable<string \| null>` → `string` |

### Function and class helpers

```ts
function createUser(name: string, age: number) { return { id: 1, name, age }; }

type Args = Parameters<typeof createUser>;    // [name: string, age: number]
type Created = ReturnType<typeof createUser>; // { id: number; name: string; age: number }

class ApiClient { constructor(public baseUrl: string) {} }
type Client = InstanceType<typeof ApiClient>; // ApiClient
type CtorArgs = ConstructorParameters<typeof ApiClient>;  // [baseUrl: string]

type Data = Awaited<Promise<Promise<User[]>>>;   // User[]: unwraps promises (like await)
```

> [!tip] Remember it
> **Pick = "keep these", Omit = "drop these", Partial = "all optional", Record = "build a dictionary".**
> **Extract keeps, Exclude kicks out.**

## Q. What are mapped types?

A mapped type **loops over the keys** of a type and builds a new one. This is how `Partial` and `Readonly` are written:

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };       // - removes a modifier
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Rename keys with `as` + template literal types
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };
type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }
```

## Q. What are conditional types?

`T extends U ? X : Y` picks a type based on a condition, like a ternary for types:

```ts
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<"hi">;     // "yes"
type B = IsString<42>;       // "no"

// infer: capture a type from inside another
type ElementOf<T> = T extends (infer E)[] ? E : never;
type N = ElementOf<number[]>;          // number

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

When `T` is a union, the condition runs on **each member** (distributive), which is how `Exclude` works:

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

## Q. What are recursive types?

A type that refers to **itself**, for nested data:

```ts
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

TypeScript limits how deep recursion can go; very deep or infinite types give "Type instantiation is excessively deep".

> [!question] Recall
> - What would you use for a PATCH request body? For a "create" form without `id`?
> - `Pick` vs `Omit`? `Exclude` vs `Extract`?
> - How do you get the return type of a function you didn't write? What does `Awaited` do?
> - Write `Partial<T>` yourself as a mapped type.
> - What does `infer` do in a conditional type?
> - Write a recursive type for JSON values.

Prev: [[19 Generics|19. Generics]] · Next: [[21 Object-Oriented Programming|21. Object-Oriented Programming]]
