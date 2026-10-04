---
title: 15. Encapsulation and Abstraction
tags:
  - TypeScript
  - Interview
  - OOP
---

> [!summary] In one line
> **Encapsulation** hides the **data** (private fields + getters/setters). **Abstraction** hides the **complexity** (abstract classes + interfaces).

## Q. What are access modifiers: `public`, `private`, `protected`?

Access modifiers **control the visibility** of class members (properties, methods, constructors, accessors).

| Modifier | Same class | Child class | Outside |
| --- | --- | --- | --- |
| `public` (default) | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |

## Q. How do you use `public` and `private`?

```ts
class Animal {
  public name: string;   // accessible everywhere
  private sound: string; // only inside this class

  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }

  public makeSound() {
    return this.sound; // ✅ private used inside the class
  }
}

const animal = new Animal("Dog", "Bark");
console.log(animal.name);        // Dog
console.log(animal.makeSound()); // Bark
// console.log(animal.sound);    // ❌ private
```

## Q. How do you use `protected`?

`protected` members are visible in the **same class and its child classes**, but not from outside.

```ts
class Animal {
  protected legs: number;
  constructor(legs: number) {
    this.legs = legs;
  }
}

class Dog extends Animal {
  getLegs() {
    return this.legs; // ✅ allowed in a child class
  }
}

const animal = new Animal(4);
// console.log(animal.legs); // ❌ Error: 'legs' is protected
```

> [!tip] Interview extra
> TS `private` is only checked at **compile time**. JavaScript's `#field` syntax is private **at runtime** too.

## Q. What is encapsulation? How is it achieved? ⭐ V. IMP.

Encapsulation means **keeping data private** inside a class and allowing access **only through methods** (getters and setters). It bundles **functions + data** into one unit.

It is achieved by:

1. Access modifiers like `private`
2. Getter and setter methods

**Advantage:** **data hiding**, which makes code secure and easy to maintain.

```ts
class Employee {
  private _experience: number = 0;

  get experience(): number {
    // logic could be added here (e.g. decrypt)
    return this._experience;
  }
}

const emp = new Employee();
// console.log(emp._experience); // ❌ private
console.log(emp.experience);     // ✅ 0 (through the getter)
```

## Q. What are getter and setter methods?

- A **setter** lets you **safely update** private data (with validation).
- A **getter** lets you **safely read** private data.
- Together they give you **full control** over your data, which is the goal of encapsulation.

```ts
class Employee {
  private _experience: number = 0;

  get experience(): number {
    return this._experience;
  }

  set experience(value: number) {
    if (value < 0) {
      console.log("Experience cannot be negative");
      return;
    }
    this._experience = value;
  }
}

const emp = new Employee();
emp.experience = 5;          // calls the setter (looks like a property)
console.log(emp.experience); // calls the getter → 5
emp.experience = -1;         // "Experience cannot be negative"
```

## Q. What is abstraction? How do you implement it?

Abstraction means **showing only what is required and hiding the complex implementation**. On a shopping site you click "Add to Cart" without seeing the code behind it.

It is mostly implemented with **abstract classes** and **interfaces**. See [[16 Abstract Classes and Interfaces|16. Abstract Classes and Interfaces]].

## Q. Abstraction vs encapsulation ⭐ V. IMP.

| Abstraction | Encapsulation |
| --- | --- |
| Shows only what's required and **hides the complex implementation** | **Hides internal data** and allows access only through the class's methods |
| Achieved with **abstract classes and interfaces** | Achieved with **access modifiers and getters/setters** |
| Focus: *what* an object does | Focus: *protecting* how its data is stored |

> [!tip] 🧠 Remember it
> **Abstraction hides complexity. Encapsulation hides data.**

> [!note] ✍️ My notes
> - **Getter** (`get`): reads and returns the hidden/private value, a **read-only doorway**.
> - **Setter** (`set`): receives a value and assigns it to the hidden/private property.
> - Abstraction = hiding the logic from the user and showing only what's required.

> [!question] Recall
> - Which modifier lets a child class see a member but not outside code?
> - Write a setter that rejects negative numbers.
> - One line each: abstraction vs encapsulation.

Prev: [[14 Inheritance and Polymorphism|14. Inheritance]] · Next: [[16 Abstract Classes and Interfaces|16. Abstract Classes and Interfaces]]
