---
title: 12. Object-Oriented Programming
tags:
  - TypeScript
  - Interview
  - OOP
---

> [!summary] In one line
> OOP means writing code with **classes** (blueprints) and **objects** (instances), built on four pillars: encapsulation, inheritance, polymorphism and abstraction.

```
                Classes & Objects
                       ▲
 Abstraction ◀──── OOP ────▶ Encapsulation
(hide complexity)     │       (data security)
           ┌──────────┴──────────┐
     Polymorphism           Inheritance
   (multiple forms)      (code reusability)
```

## Q. What is OOP? How is it better than function-based code?

**Without OOP**, you get:

1. No common structure
2. Scattered logic
3. More and more duplicate code as the app grows

```ts
// ❌ messy and repetitive
function printStudent(name: string, marks: number) {
  console.log(name + " scored " + marks);
}
function printTeacher(name: string, subject: string) {
  console.log(name + " teaches " + subject);
}
```

**With OOP**:

1. Common data goes into one class
2. Code becomes **reusable**
3. It is easy to **extend** (Student, Teacher, Admin…)
4. The app stays clean and organized

```ts
// ✅ structured and reusable
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  printName() {
    console.log("Name: " + this.name);
  }
}

class Student extends Person {
  marks: number;
  constructor(name: string, marks: number) {
    super(name);
    this.marks = marks;
  }
  printDetails() {
    console.log(this.name + " scored " + this.marks);
  }
}
```

## Q. What are the main concepts of OOP?

**Classes & objects** · **Encapsulation** (data security) · **Inheritance** (code reusability) · **Polymorphism** (multiple forms) · **Abstraction** (hide complexity)

## Q. What are classes and objects?

- A **class** is a **blueprint/template** for creating objects.
- An **object** is an **instance** of a class, representing a real-world entity.

Example from a social media app: the `Person` class has fields `name`, `age` and a method `createProfile()`. When someone registers, you create an object: `user.name = "Happy"` and `user.createProfile()`.

## Q. How do you create classes and objects in TS?

1. Create a class
2. Define its members (properties and methods)
3. Create an object with `new`
4. Call members through the object

```ts
class Person {
  name: string | undefined;
  age: number | undefined;
  greet() {
    console.log("Hello Happy");
  }
}

const person = new Person();
person.name = "Happy";
person.age = 25;
person.greet();      // Hello Happy
console.log(person); // Person { name: 'Happy', age: 25 }
```

## Q. What are the members of a class?

| Member | What it is |
| --- | --- |
| **Property** | A variable of any type that holds data |
| **Method** | A block of code that performs a task |
| **Constructor** | A method that runs when an object is created |
| **Access modifiers** | Set the visibility of members (`public`/`private`/`protected`) |

> [!note] ✍️ My notes
> - OOP is a paradigm built around **objects and methods**. Objects bundle state (data); methods hold behaviour (logic).
> - Main advantage over functional-style code: **code reusability**.

> [!question] Recall
> - Class vs object, in one sentence each.
> - Name the four OOP pillars and what each gives you.


Prev: [[11 Advanced Type System|11. Advanced Types]] · Next: [[13 Constructors|13. Constructors]]
