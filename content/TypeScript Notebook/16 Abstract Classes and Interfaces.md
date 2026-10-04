---
title: 16. Abstract Classes and Interfaces
tags:
  - TypeScript
  - Interview
  - OOP
---

> [!summary] In one line
> An **abstract class** is a partly built base class (some methods done, some left `abstract`) that you `extends`. An **interface** is a pure contract (no code) that you `implements`.

```
   Abstract class                     Interface
 ┌───────────────────┐            ┌──────────────────┐
 │ can have abstract │            │ only signatures  │
 │ + concrete methods│            │ (no bodies)      │
 │ cannot be `new`ed │            │ cannot be `new`ed│
 └────────┬──────────┘            └────────┬─────────┘
       extends (one)                 implements (many)
```

## Q. What is an abstract class?

Five key points:

1. It **cannot be instantiated** directly (`new Animal()` ❌).
2. It serves as a **blueprint / base class** for derived classes.
3. It is created with the **`abstract`** keyword.
4. It usually contains **abstract methods** (a signature with no body).
5. **Child classes must implement** every abstract method.

## Q. How do you implement an abstract class?

1. Create an abstract base class
2. Declare abstract methods
3. Extend the abstract class
4. Implement the abstract methods in the child classes

```ts
abstract class University {
  // concrete method: shared code
  courses(): void {
    console.log("P, C, M");
  }
  // abstract method: no body
  abstract sports(): void;
}

class College extends University {
  sports(): void {
    console.log("football");
  }
}

const college = new College();
college.courses(); // P, C, M
college.sports();  // football
```

## Q. When and why should you use an abstract class? ⭐ V. IMP.

1. **Code reuse**, through concrete (implemented) methods.
2. **Consistent structure**, by forcing subclasses to implement the abstract methods.

Example: `DegreeCollege` and `DiplomaCollege` both inherit `courses()` and each implement their own `sports()` (football / cricket).

## Q. What is an interface?

Five key points:

1. It **cannot be instantiated**.
2. It defines a **structure or contract**.
3. It contains **only declarations**, no implementation.
4. Classes follow it with the **`implements`** keyword.
5. A class **must implement all members** of the interface.

## Q. How do you implement an interface?

```ts
interface University {
  courses(): void;
  sports(): void;
}

class College implements University {
  courses(): void {
    console.log("P, C, M");
  }
  sports(): void {
    console.log("football");
  }
}

const college = new College();
college.courses(); // P, C, M
college.sports();  // football
```

## Q. When do you use interfaces? ⭐ V. IMP.

1. To define a **contract** or rules
2. To enforce a **common structure** across many classes
3. To **avoid inconsistency** in large applications

## Q. Abstract class vs interface ⭐ V. IMP.

| Interface | Abstract class |
| --- | --- |
| Only declarations (no implementation) | Abstract **and** concrete methods |
| `interface` keyword | `abstract` keyword |
| A class can **implement many** interfaces | A class can **extend only one** class |
| Members are implicitly abstract | Use `abstract` to mark methods |
| **No** constructors | **Can** have constructors |
| Erased at compile time (no JS output) | Becomes a real JS class |

> [!warning] Correction
> The handbook says interfaces "can have default methods" and abstract classes "cannot". That's Java/C#, not TypeScript. In TS, **interfaces can never contain method bodies**, while abstract classes **can** have fully implemented (concrete) methods, as the `courses()` example shows.

## Q. When should you use an interface vs an abstract class?

- **Interface:** you only need a **contract**, and every implementation is different.
- **Abstract class:** you want to **share common logic** (concrete methods) **and** enforce a structure with abstract methods.

## Q. How do you achieve abstraction? Abstraction vs abstract class 🧠

There are two ways to achieve abstraction:

- **Interfaces** give **complete** abstraction (no implementation at all).
- **Abstract classes** give **partial** abstraction (some methods implemented).

**Abstraction** is the broad **concept** of hiding complexity. An **abstract class** is one practical **tool** for implementing it.

> [!note] ✍️ My notes
> ```ts
> abstract class Animal {          // acts like a parent, can't create objects, must be extended
>   name: string = "";
>   abstract makeSound(): void;
> }
>
> interface Pet {                  // just declarations
>   name: string;
>   makeSound(): void;
> }
>
> class College implements University, Sports {} // a class can implement many interfaces
> ```

> [!question] Recall
> - Can you `new` an abstract class?
> - How many interfaces can one class implement? How many classes can it extend?
> - Which gives complete abstraction, and which gives partial?

Prev: [[15 Encapsulation and Abstraction|15. Encapsulation]] · Next: [[17 Error Handling|17. Error Handling]]
