---
title: 9. Objects and Structured Data
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> A variable holds **one** value. An object holds **many related** values as **key–value pairs**. You describe an object's shape with an inline type, a `type` alias or an `interface`.

## Q. What is an object? Why do we need objects?

An object is a collection of related data stored as **key–value pairs**. Objects represent **real-world entities** and group related data together.

```ts
let person = {
  name: "Happy",
  age: 25,
  isDeveloper: true,
};

console.log(person.name); // Happy
console.log(person.age);  // 25
```

## Q. How do you define object types? Why is an inline object type better than a plain object?

There are three ways to type an object: **inline object type**, **type alias** and **interface**.

```ts
// inline object type
let person: {
  name: string;
  age: number;
} = {
  name: "Happy",
  age: 40,
};
```

Advantages of an inline type over a plain object:

1. **Strongly typed:** property types are explicit and cannot change later.
2. **Clear structure:** the object's shape is visible in the code.
3. **Safer:** it catches missing required properties and rejects extra ones.

## Q. What is a type alias? Why is it better than an inline type?

```ts
type Person = {
  name: string;
  age: number;
};

let user: Person = { name: "Anurag", age: 30 };
```

1. **Reusability:** define the shape once and reuse it everywhere.
2. **Maintenance:** easier to read, maintain and update.

## Q. What is an interface?

An interface defines the **structure (shape)** of an object or class: which properties and methods it must have.

```ts
interface Person {
  name: string;
  age: number;
}

let user: Person = { name: "Happy", age: 25 };
```

## Q. When should you use a type alias and when an interface? ⭐ V. IMP.

| Inline type | Type alias | Interface |
| --- | --- | --- |
| The shape is used **only once** | The same shape is used in **several places** | The same shape is used in many places in **big projects with classes** |

> [!tip] Interview extra
> Interfaces can be **extended** and **merged** (declaring `interface Person` twice combines them), and classes can `implements` them. Type aliases can express **unions** (`type Id = string | number`), which interfaces cannot.

## Q. What are optional properties? When do you use them?

Optional properties (`?`) **may or may not be present** on the object.

```ts
interface User {
  name: string;
  age?: number; // optional
}

let u1: User = { name: "Happy" };          // valid
let u2: User = { name: "Happy", age: 40 }; // valid
```

## Q. What are readonly properties? When do you use them? ⭐ V. IMP.

A `readonly` property **cannot be changed after the object is created**. Use it for things like IDs.

```ts
interface User {
  readonly id: number;
  name: string;
}

let user: User = { id: 101, name: "Happy" };
user.name = "Anurag"; // ✅ allowed
user.id = 102;        // ❌ Cannot assign to 'id' because it is a read-only property
```

> [!note] ✍️ My notes
> - **Why objects?** Using many separate variables for one entity is hard to manage.
> - Inline object: anything not in the declared type is **not accepted**. It's rarely used.
> - In practice we mostly use **interfaces**. The same interface name can be declared again to add members, which helps in large apps; `type` doesn't allow that.
> ```ts
> type User = { name: string; age: number };
> let durga: User = { name: "Durgasree", age: 26 };
>
> interface Admin { name: string; age: number; edit: boolean }
> let primaryAdmin: Admin = { name: "Yashwant Pandi", age: 27, edit: true };
>
> interface Person { name: string; age?: number; readonly SSN: string } // optional + readonly
> ```

> [!question] Recall
> - Name the three ways to type an object.
> - What symbol makes a property optional?
> - Which keyword stops a property from being reassigned?

Prev: [[08 Advanced Looping Techniques|8. Advanced Looping]] · Next: [[10 Functions|10. Functions]]
