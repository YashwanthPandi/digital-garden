---
title: Inheritance and Polymorphism
tags:
  - TypeScript
  - OOP
---

## Inheritance

Creating a parent–child relationship between two classes where the child gets props & methods from the parent. Use: multiple subclasses can reuse fields and methods from the superclass.

Implementation: `extends` keyword (constructor is also inherited). Diagram: main class (`name: string`, `salary()`, `constructor`) → extends → child class (salary method & variables available).

## Polymorphism

Many forms. Ability of the same method name to behave differently based on the object.

Implementation: method overloading. _(As written:)_ "method allows a child class to change the behavior of parent class method"; "create methods with different names causes confusion and breaks polymorphism."
