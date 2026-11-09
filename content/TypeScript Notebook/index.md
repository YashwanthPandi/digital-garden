---
title: TypeScript Notebook
tags:
  - TypeScript
  - Notes
  - Revision
  - Skills
---

My TypeScript notes in one place, as a roadmap **from beginner to interview ready**. Learn after [[JavaScript Notebook/index|JavaScript]] and before [[Angular Notebook/index|Angular]], which is built on TypeScript.

Every page has a one-line summary, interview Q&As with code, a memory trick, a **My notes** box with my own notes, and recall questions. **V. IMP.** marks the questions asked most often in interviews.

> [!tip] How to study
> Read a chapter, cover the code, and answer the **Recall** questions out loud. Then run the examples in VS Code with Code Runner (`ts-node file.ts`).

## Learning roadmap

### 1. Getting Started → [[TypeScript Notebook/1 Getting Started/index|overview]]

1. [[01 TypeScript Foundation|TypeScript Foundation]]: what TS is, TS vs JS, static typing
2. [[02 TypeScript Setup and First Program|TypeScript Setup and First Program]]: Node, `tsc`, `tsconfig.json`, strict mode
3. [[03 Tooling Configuration and Ecosystem|Tooling, Configuration and Ecosystem]]: install, compiler options, running TS, JS interop, linting, build tools
4. [[04 Modules Namespaces and Declarations|Modules, Namespaces and Declarations]]: `import type`, `.d.ts`, ambient modules, augmentation

### 2. Language Basics → [[TypeScript Notebook/2 Language Basics/index|overview]]

5. [[05 Variables and Data Types|Variables and Data Types]]: `var`/`let`/`const`, primitives, `any` vs `unknown`
6. [[06 Operators and Expressions|Operators and Expressions]]: arithmetic, comparison, logical, ternary
7. [[07 Conditional Statements|Control Flow – Conditional Statements]]: if-else vs switch vs ternary
8. [[08 Looping Statements|Control Flow – Looping Statements]]: for, while, do-while, break/continue
9. [[09 Advanced Looping Techniques|Advanced Looping Techniques]]: `for…of` vs `forEach`
10. [[10 Error Handling|Error Handling]]: try/catch/finally, `throw`

### 3. Data and Functions → [[TypeScript Notebook/3 Data and Functions/index|overview]]

11. [[11 Collections - Arrays and Tuples|Collections – Arrays and Tuples]]: array methods, array vs tuple
12. [[12 Advanced Collections|Advanced Collections]]: Set, Map, Map vs Object
13. [[13 Objects and Structured Data|Objects and Structured Data]]: inline type, type alias vs interface, optional, readonly
14. [[14 Functions|Functions]]: declaration, expression, arrow
15. [[15 Interfaces and Functions In Depth|Interfaces and Functions In Depth]]: extending, hybrid types, overloads, constructor params

### 4. Type System → [[TypeScript Notebook/4 Type System/index|overview]]

16. [[16 Advanced Type System|Advanced Type System]]: union, intersection, assertion, narrowing
17. [[17 Special Types Assertions and Literals|Special Types, Assertions and Literals]]: `never`, `void`, enums, literal types, `as const`, `!`, `satisfies`
18. [[18 Type Guards Narrowing and Compatibility|Type Guards, Narrowing and Compatibility]]: `typeof`, `instanceof`, `in`, type predicates, structural typing
19. [[19 Generics|Generics]]: generic types, constraints, `keyof`
20. [[20 Utility Mapped and Conditional Types|Utility, Mapped and Conditional Types]]: `Partial`, `Pick`, `Omit`, `ReturnType`, `infer`, recursive types

### 5. Object-Oriented Programming → [[TypeScript Notebook/5 Object-Oriented Programming/index|overview]]

21. [[21 Object-Oriented Programming|Object-Oriented Programming]]: classes, objects, class members
22. [[22 Constructors|Constructors]]: default vs parameterized, `this`
23. [[23 Inheritance and Polymorphism|Inheritance and Polymorphism]]: `extends`, method overriding
24. [[24 Encapsulation and Abstraction|Encapsulation and Abstraction]]: access modifiers, getters/setters
25. [[25 Abstract Classes and Interfaces|Abstract Classes and Interfaces]]
26. [[26 Decorators|Decorators]]: standard vs experimental decorators

## Interview cheat list

- `var` vs `let` vs `const` · primitive vs non-primitive · `any` vs `unknown`
- Ternary operator · when to use if-else / ternary / switch
- `while` vs `do-while` · `break` vs `continue` · choosing a loop
- Array vs tuple · type alias vs interface · readonly properties
- Arrow functions vs normal functions
- Inheritance · polymorphism · encapsulation · abstraction vs encapsulation
- Abstract class vs interface, and when to use each
- Exception handling · `throw`
- Types of collections · Set vs Array · Map vs Object
- `never` vs `void` · `as const` · `satisfies` · non-null assertion
- Type guards and type predicates · discriminated unions · structural typing
- Generics and constraints · `keyof` · `Partial` / `Pick` / `Omit` / `Record`
- Mapped and conditional types · `.d.ts` files · decorators

## roadmap.sh coverage

Every topic on the [roadmap.sh TypeScript roadmap](https://roadmap.sh/typescript) (93 items), and where it's covered.

| Roadmap section | Topics | Notes |
| --- | --- | --- |
| Introduction | Introduction to TypeScript, TypeScript vs JavaScript, TS and JS Interoperability | [[TypeScript Notebook/1 Getting Started/01 TypeScript Foundation\|01]], [[TypeScript Notebook/1 Getting Started/03 Tooling Configuration and Ecosystem\|03]] |
| Installation and running | Installation and Configuration, tsconfig.json, Compiler Options, Running TypeScript, tsc, ts-node, TS Playground | [[TypeScript Notebook/1 Getting Started/02 TypeScript Setup and First Program\|02]], [[TypeScript Notebook/1 Getting Started/03 Tooling Configuration and Ecosystem\|03]] |
| TypeScript types | TypeScript Types, boolean, number, string, void, undefined, null, Object, Array, Tuple, Enum, any, unknown, never, Interface, Class | [[TypeScript Notebook/2 Language Basics/05 Variables and Data Types\|05]], [[TypeScript Notebook/3 Data and Functions/11 Collections - Arrays and Tuples\|11]], [[TypeScript Notebook/3 Data and Functions/13 Objects and Structured Data\|13]], [[TypeScript Notebook/5 Object-Oriented Programming/21 Object-Oriented Programming\|21]], [[TypeScript Notebook/4 Type System/17 Special Types Assertions and Literals\|17]] |
| Type assertions | as [type], as any, as const, Non-null Assertion, satisfies keyword | [[TypeScript Notebook/4 Type System/16 Advanced Type System\|16]], [[TypeScript Notebook/4 Type System/17 Special Types Assertions and Literals\|17]] |
| Type inference and compatibility | Type Inference, Type Compatibility | [[TypeScript Notebook/2 Language Basics/05 Variables and Data Types\|05]], [[TypeScript Notebook/4 Type System/18 Type Guards Narrowing and Compatibility\|18]] |
| Combining types | Combining Types, Union Types, Intersection Types, Type Aliases, keyof Operator | [[TypeScript Notebook/3 Data and Functions/13 Objects and Structured Data\|13]], [[TypeScript Notebook/4 Type System/16 Advanced Type System\|16]], [[TypeScript Notebook/4 Type System/19 Generics\|19]] |
| Type guards / narrowing | Type Guards / Narrowing, typeof, instanceof, Equality, Truthiness, Type Predicates | [[TypeScript Notebook/4 Type System/16 Advanced Type System\|16]], [[TypeScript Notebook/4 Type System/18 Type Guards Narrowing and Compatibility\|18]] |
| Interfaces | TypeScript Interfaces, Interface Declaration, Extending Interfaces, Types vs Interfaces, Hybrid Types | [[TypeScript Notebook/3 Data and Functions/13 Objects and Structured Data\|13]], [[TypeScript Notebook/5 Object-Oriented Programming/25 Abstract Classes and Interfaces\|25]], [[TypeScript Notebook/3 Data and Functions/15 Interfaces and Functions In Depth\|15]] |
| Functions | TypeScript Functions, Typing Functions, Function Overloading | [[TypeScript Notebook/3 Data and Functions/14 Functions\|14]], [[TypeScript Notebook/3 Data and Functions/15 Interfaces and Functions In Depth\|15]] |
| Classes | Classes, Constructor Params, Constructor Overloading, Access Modifiers, Abstract Classes, Inheritance vs Polymorphism, Method Overriding | [[TypeScript Notebook/5 Object-Oriented Programming/21 Object-Oriented Programming\|21]], [[TypeScript Notebook/5 Object-Oriented Programming/22 Constructors\|22]], [[TypeScript Notebook/5 Object-Oriented Programming/23 Inheritance and Polymorphism\|23]], [[TypeScript Notebook/5 Object-Oriented Programming/24 Encapsulation and Abstraction\|24]], [[TypeScript Notebook/5 Object-Oriented Programming/25 Abstract Classes and Interfaces\|25]], [[TypeScript Notebook/3 Data and Functions/15 Interfaces and Functions In Depth\|15]] |
| Generics | Generics, Generic Types, Generic Constraints | [[TypeScript Notebook/4 Type System/19 Generics\|19]] |
| Decorators | Decorators | [[TypeScript Notebook/5 Object-Oriented Programming/26 Decorators\|26]] |
| Utility types | Utility Types, Partial, Pick, Omit, Readonly, Record, Exclude, Extract, Awaited, Parameters, NonNullable, ReturnType, InstanceType | [[TypeScript Notebook/4 Type System/20 Utility Mapped and Conditional Types\|20]] |
| Advanced types | Advanced Types, Mapped Types, Conditional Types, Literal Types, Template Literal Types, Recursive Types | [[TypeScript Notebook/4 Type System/17 Special Types Assertions and Literals\|17]], [[TypeScript Notebook/4 Type System/20 Utility Mapped and Conditional Types\|20]] |
| TypeScript modules | TypeScript Modules, Namespaces, Ambient Modules, External Modules, Namespace Augmentation, Global Augmentation | [[TypeScript Notebook/1 Getting Started/04 Modules Namespaces and Declarations\|04]] |
| Ecosystem | Ecosystem, Formatting, Linting, Useful Packages, Build Tools | [[TypeScript Notebook/1 Getting Started/03 Tooling Configuration and Ecosystem\|03]] |

## Software and extensions

VS Code · Node.js · TypeScript (`npm install -g typescript`) · Code Runner · ESLint · Prettier

---

_Interview Q&As adapted from the "TypeScript Interview Handbook" by Happy Rawat (Interview Happy), merged with my own study notes. Where the handbook was wrong, the page has a **Correction** box._
