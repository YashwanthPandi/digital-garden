---
title: 11. Advanced Type System
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> **Union** (`A | B`) = either type. **Intersection** (`A & B`) = both types combined. **Assertion** (`as`) = "trust me, it's this type". **Narrowing** (`typeof`) = check, then use safely.

## Q. What are union types? When do you use them?

A union type lets a variable or parameter accept **multiple types**, using the pipe `|`. Use it when a value can legitimately be more than one type, for example IDs that are `"EMP01"` or `51`.

```ts
let value: string | number;
value = "Happy";
value = 100;
// value = true; // ❌ Error: boolean not accepted

function printId(id: string | number) {
  console.log(id);
}
```

## Q. What are intersection types? When do you use them?

An intersection **combines several types into one**. The result must have **all** properties of every type. It improves type safety and **code reuse**.

```ts
type Person = { name: string };
type Employee = { empId: number };

type EmployeePerson = Person & Employee;

let user: EmployeePerson = {
  name: "Happy", // from Person
  empId: 101,    // from Employee
};
```

> [!tip] 🧠 Remember it
> `|` = **OR**: one of them is enough. `&` = **AND**: you need everything from both.

## Q. What is type assertion (`as` keyword)?

Type assertion tells TypeScript to **treat a value as a specific type** when you know more than the compiler. It doesn't convert anything at runtime.

```ts
let value: any = "Happy";
let strLength: number = (value as string).length;
```

## Q. When should you avoid type assertion?

When the type is **uncertain and cannot be guaranteed**, for example data from an API.

```ts
let value: any = getData();
let name = value as string; // ❌ risky: if it's not a string, you'll crash at runtime
```

Prefer narrowing (below) in those cases.

## Q. What is type narrowing (`typeof`)?

You **check the type** with `typeof` (or `instanceof`, `in`, …), and inside that block TS knows the exact type, so you can **safely** use its methods.

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // value is string here
  } else {
    console.log(value.toFixed(2));    // value is number here
  }
}

printValue("Happy"); // HAPPY
printValue(100);     // 100.00
```

> [!warning] Correction
> In the handbook's version, `printValue(100)` prints **nothing**, because there is no `else` branch. The `else` above makes the `100.00` output true.

> [!question] Recall
> - What does `string | number` allow? What about `A & B`?
> - Why is narrowing safer than `as`?

Prev: [[10 Functions|10. Functions]] · Next: [[12 Object-Oriented Programming|12. OOP]]
