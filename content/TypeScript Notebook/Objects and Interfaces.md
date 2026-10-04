---
title: Objects and Interfaces
tags:
  - TypeScript
---

Topics: inline object · alias & interfaces · object features (readonly, optional props) · when to use in a real app

**Why objects?** Using multiple variables for a single entity (thing) is difficult to manage.
**Variable vs object:** a variable holds one single value; an object holds multiple variables of different datatypes.

```ts
let objName = {
  name: "string",
  age: 25,
  isDev: true,
}
console.log(objName.age) // 25
```

Three ways to define an object: inline object type · type alias · interface.

## Inline object

```ts
let person: { name: string; age: number } = { name: "rahul", age: 27 }
```

Anything not in the declared type is not accepted. Advantages: strongly typed, clear structure, safer for real projects.

## Type alias

```ts
type User = { name: string; age: number }
let Durga: User = { name: "Durgasree", age: 26 }
```

## Interface

```ts
interface Admin {
  name: string
  age: number
  edit: boolean
}
let primaryAdmin: Admin = { name: "Yashwant Pandi", age: 27, edit: true }
```

## When to use what

- Inline object → when the object type is used only once (rarely used)
- `type` → when the same object is used in multiple places
- `interface` → when the same object structure is used in multiple places (basically we use interfaces); the same interface name can be declared again to add members, which helps in large applications where `type` doesn't allow it

## Optional and readonly properties

**Optional properties** (may or may not be there):

```ts
interface User {
  name: string
  age?: number
  gender: string
}
```

**Readonly property** (immutable): `readonly SSN: string`

See also: interfaces as contracts in [[Encapsulation and Abstraction#Interface|Encapsulation and Abstraction]].
