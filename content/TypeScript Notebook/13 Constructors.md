---
title: 13. Constructors
tags:
  - TypeScript
  - Interview
  - OOP
---

> [!summary] In one line
> A constructor is a **special method that runs on `new`** and initializes the object's properties.

> [!tip] 🧠 Remember it
> **Class** (father) + **Constructor** (mother) = **Object** (child).

```
new Person("Happy", 25)  →  constructor runs  →  object in memory  →  p.name, p.age
 object creation starts     receives values      { name: "Happy",    get and use
                            sets properties        age: 25 }          the data
```

## Q. What is a constructor? When do you use it?

A constructor is a **special method used to initialize objects** of a class, setting their properties when they're created.

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p = new Person("Happy", 25);
console.log(p.name); // Happy
console.log(p.age);  // 25
```

## Q. Default constructor vs parameterized constructor ⭐ V. IMP.

- A **default constructor** has **no parameters**. TypeScript provides one automatically when you don't write a constructor.
- A **parameterized constructor** **accepts parameters** and uses them to initialize properties.

```ts
// explicit default constructor
class Person {
  name: string;
  age: number;
  constructor() {
    this.name = "Happy";
    this.age = 25;
  }
}
const p = new Person();
```

```ts
// implicit default constructor
class Person {
  name: string | undefined;
  age: number | undefined;
}
const p = new Person();
```

```ts
// parameterized constructor
class Person {
  constructor(public name: string, public age: number) {} // shorthand: declares + assigns
}
const p = new Person("Happy", 25);
```

> [!tip] Interview extra
> `constructor(public name: string)` is **parameter property** shorthand. It declares and assigns the field in one step, and you'll see it everywhere in Angular (`constructor(private http: HttpClient)`).

## Q. What happens if no constructor is defined? 🧠

The compiler **automatically supplies an empty default constructor**:

```ts
class Person {}
// is treated as
class Person {
  constructor() {}
}
const p = new Person();
```

## Q. What is the role of the `this` keyword?

`this` refers to the **current instance** of the class. It's used to access or assign that object's members, for example `this.name = name`.

> [!question] Recall
> - When does a constructor run?
> - What does `this.name = name` do?
> - What do you get if you write no constructor at all?

Prev: [[12 Object-Oriented Programming|12. OOP]] · Next: [[14 Inheritance and Polymorphism|14. Inheritance and Polymorphism]]
