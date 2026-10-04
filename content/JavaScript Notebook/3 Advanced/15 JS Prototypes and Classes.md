---
title: 15. Prototypes and Classes
tags:
  - JavaScript
  - OOP
---

> [!summary] In one line
> Every object has a hidden link to a **prototype** object it can borrow properties from. `class` is friendly syntax on top of this.

## Prototypes

```js
const animal = { eats: true };
const dog = Object.create(animal);   // dog's prototype is animal
dog.barks = true;
dog.eats;                            // true: found on the prototype
Object.getPrototypeOf(dog) === animal; // true
```

When you read `dog.eats`, JS checks `dog` → its prototype → that prototype's prototype → … → `null`. This is the **prototype chain**.

> [!tip] 🧠 Remember it
> **The prototype chain is asking your family.** Don't know something? Ask your parent, then grandparent, until someone knows or you run out of ancestors (`null`).

That's why `[1,2].map` works: `map` lives on `Array.prototype`, which every array links to.

## Classes

```js
class Person {
  #secret = 'hidden';             // private field (#)
  static species = 'human';       // on the class, not instances

  constructor(name) { this.name = name; }
  greet() { return `Hi, I'm ${this.name}`; }   // stored on Person.prototype
  get upper() { return this.name.toUpperCase(); }
}

class Student extends Person {
  constructor(name, school) {
    super(name);                   // must call before using `this`
    this.school = school;
  }
  greet() { return `${super.greet()} from ${this.school}`; }  // override
}

const s = new Student('Asha', 'MIT');
s.greet();               // "Hi, I'm Asha from MIT"
s instanceof Person;     // true
Person.species;          // 'human'
```

## What `new` does (4 steps)

1. Creates an empty object `{}`
2. Links it to `Class.prototype`
3. Runs the constructor with `this` = that object
4. Returns the object

🧠 **"Create, Link, Run, Return."**

## OOP pillars in JS

| Pillar | In JS |
| --- | --- |
| Encapsulation | `#private` fields, closures |
| Inheritance | `extends`, prototype chain |
| Polymorphism | overriding methods (`greet` above) |
| Abstraction | expose simple methods, hide details |

For deeper OOP (with types), see [[TypeScript Notebook/OOP in TypeScript/index|OOP in TypeScript]].

> [!question] Recall
> 1. What is the prototype chain?
> 2. Why must `super()` come before `this` in a subclass constructor?
> 3. What 4 things does `new` do?
