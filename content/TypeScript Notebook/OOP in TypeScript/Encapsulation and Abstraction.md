---
title: Encapsulation and Abstraction
tags:
  - TypeScript
  - OOP
---

## Access modifiers

Keywords used in classes to control visibility and access of class members (properties, methods, constructor, accessors).

|               | public | private | protected |
| ------------- | ------ | ------- | --------- |
| Same class    | ✓      | ✓       | ✓         |
| Derived class | ✓      | ✗       | ✓         |
| Outside class | ✓      | ✗       | ✗         |

```ts
class Animal {
  protected legs: number
  constructor(legs: number) {
    this.legs = legs
  }
  // console.log(legs) outside → Error
}
class Dog extends Animal {
  // console.log(this.legs)  → accessible because protected
}
```

## Encapsulation

Hiding data (private) and giving access through getters & setters.

- **Getter** (`get`): reads and returns the hidden/private value – a read-only doorway.
- **Setter** (`set`): receives a value and assigns it to a hidden/private property.
- Properties are usually used with getters and setters.

## Abstraction (v. imp)

Hiding logic from the user and showing only the required things. We use abstract classes and interfaces to implement it.

| Encapsulation                                                   | Abstraction                                                    |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| Hiding internal data and allowing methods provided in the class | Showing only required things, hiding unnecessary complex logic |
| Access modifiers, getters & setters                             | Abstract class & interface                                     |

### Abstract class

```ts
abstract class Animal {
  name: string
  abstract makeSound(): void
}
```

Acts like a parent; cannot be instantiated (can't create objects); must be extended.

### Interface

```ts
interface Animal {
  name: string
  makeSound(): void
}
```

When to use an interface: 1) define a contract/rules 2) enforce a common structure across multiple classes 3) avoid inconsistency in large applications.

### Abstract class vs interface (v. imp)

| Abstract class                                                           | Interface                                                                     |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Methods need to be defined; at least one abstract method should be there | No method implementation required, just declare                               |
| Defined by `abstract` keyword                                            | Defined by `interface` keyword                                                |
| You cannot extend multiple classes                                       | Supports multiple inheritance (e.g. `class College implements University, B`) |
| You need to explicitly write things down                                 | Methods are implicitly abstract [?]                                           |
| Can have a constructor                                                   | Cannot have a constructor                                                     |

### When to use interface vs abstract class in real apps

_(Left empty.)_
