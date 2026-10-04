---
title: 14. Inheritance and Polymorphism
tags:
  - TypeScript
  - Interview
  - OOP
---

> [!summary] In one line
> **Inheritance** (`extends`) lets a child class reuse a parent's code. **Polymorphism** lets the same method name behave differently per object, usually through **method overriding**.

```
Employee Management System

            Employee (parent)
            calculateSalary(): basic
              ╱                ╲
 TemporaryEmployee          PermanentEmployee
 (uses parent's version)    calculateSalary(): basic + bonus  ← overridden
```

## Q. What is inheritance? When do you use it? ⭐ V. IMP.

Inheritance creates a **parent–child relationship** between classes. The child automatically gets the parent's properties and methods.

- Parent = base = super class
- Child = derived = sub class

**Why:** **code reusability**. Several subclasses reuse fields and methods (`getExp()`, `setExp()`, `calculateSalary()`) from one superclass and add only what's specific to them (`doFun()`, `doWork()`).

## Q. How do you implement inheritance in TS? ⭐ V. IMP.

1. Create a base class
2. Define shared properties and methods
3. Create a derived class with `extends`
4. Use the child object to call the base class methods

```ts
class Employee {
  exp: number;
  constructor(exp: number) {
    this.exp = exp;
  }
  calculateSalary(): number {
    return this.exp * 50000;
  }
}

class PermEmployee extends Employee {}

const p = new PermEmployee(5);
console.log(p.calculateSalary()); // 250000
```

> [!tip] Interview extra
> If the child has its own constructor, it **must call `super(...)`** before using `this`. TS classes support **single inheritance** only: one `extends`.

## Q. What is polymorphism? When do you use it? ⭐ V. IMP.

Polymorphism ("many forms") is the ability of the **same method name to behave differently depending on the object**.

```ts
class Animal {
  speak() { console.log("Animal makes a sound"); }
}
class Dog extends Animal {
  speak() { console.log("Woof"); }
}
```

## Q. What is method overriding? How do you implement it?

Method overriding lets a **child class change the behaviour of a parent method** by redefining it with the same name and signature.

```ts
class Employee {
  calculateSalary(): number {
    return 50000; // basic
  }
}

class TemporaryEmployee extends Employee {}

class PermanentEmployee extends Employee {
  override calculateSalary(): number {
    return 50000 + 10000; // basic + bonus
  }
}

const permEmp: Employee = new PermanentEmployee();
const tempEmp: Employee = new TemporaryEmployee();

console.log(permEmp.calculateSalary()); // 60000
console.log(tempEmp.calculateSalary()); // 50000
```

The `override` keyword (TS 4.3+) is optional but makes the compiler check that the parent method really exists.

## Q. Why use method overriding instead of a new method name? 🧠

Different names (`calculatePermSalary()`, `calculateTempSalary()`) **cause confusion and break polymorphism**. With one name, code can treat every employee as an `Employee` and call `calculateSalary()`, and each object does the right thing.

> [!note] ✍️ My notes
> - With `extends`, the child also gets the parent's **constructor** (unless it defines its own, which must call `super()`).
> - Diagram: main class (`name: string`, `salary()`, `constructor`) → extends → child class (salary method and variables available).
> - ⚠️ My notes said polymorphism is implemented with method **overloading**. For this handbook example it's method **overriding**: the child redefines the parent's method.

> [!question] Recall
> - Which keyword creates inheritance?
> - In the example, why does `permEmp` return 60000 even though its type is `Employee`?

Prev: [[13 Constructors|13. Constructors]] · Next: [[15 Encapsulation and Abstraction|15. Encapsulation and Abstraction]]
