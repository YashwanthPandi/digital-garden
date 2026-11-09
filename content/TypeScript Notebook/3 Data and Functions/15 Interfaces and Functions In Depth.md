---
title: 15. Interfaces and Functions In Depth
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Interfaces describe object shapes and can **extend** and **merge**. Functions get typed parameters, return types, optional/default/rest parameters, **overloads**, and `this` types. Classes can declare fields straight from **constructor parameters**.

Basics: [[13 Objects and Structured Data|Objects]], [[14 Functions|Functions]], [[25 Abstract Classes and Interfaces|Abstract Classes and Interfaces]].

## Q. How do you declare and extend interfaces?

```ts
interface Person {
  readonly id: number;
  name: string;
  email?: string;                        // optional
  [key: string]: unknown;                // index signature: any other string key
}

interface Employee extends Person {      // inherit all of Person
  salary: number;
}
interface Auditable { createdAt: Date }
interface Manager extends Employee, Auditable {   // extend several at once
  reports: Employee[];
}
```

**Declaration merging:** two interfaces with the same name in the same scope combine into one. Type aliases can't do this.

```ts
interface Window { appVersion: string }  // adds a property to the built-in Window type
```

This works as-is in a non-module file. Inside a module (a file with `import`/`export`), wrap it in `declare global { … }` → [[TypeScript Notebook/1 Getting Started/04 Modules Namespaces and Declarations|Modules and Declarations]].

## Q. Types vs interfaces: which should you use?

| | `interface` | `type` |
| --- | --- | --- |
| Object shapes | Yes | Yes |
| Unions, tuples, primitives, mapped/conditional types | No | Yes |
| Extend | `extends` | `&` intersection |
| Declaration merging | Yes | No |
| Error messages | show the interface name | may show the expanded type |

Common rule: **`interface` for object shapes and public APIs, `type` for everything else** (unions, function types, utility results). Pick one style per codebase. → [[13 Objects and Structured Data|Objects]]

## Q. What are hybrid types?

An object that is **callable** and also has **properties**, like jQuery's `$` or Express's `app`:

```ts
interface Counter {
  (start: number): string;   // call signature: it can be called
  interval: number;          // and it has properties
  reset(): void;
}

function makeCounter(): Counter {
  const counter = ((start: number) => `count: ${start}`) as Counter;
  counter.interval = 1000;
  counter.reset = () => {};
  return counter;
}
```

## Q. How do you type functions?

```ts
function add(a: number, b: number): number { return a + b; }

const multiply = (a: number, b: number): number => a * b;

type MathOp = (a: number, b: number) => number;       // a function type
const divide: MathOp = (a, b) => a / b;                // parameters inferred from MathOp

function greet(name: string, greeting = "Hi", title?: string): string {   // default, optional
  return `${greeting} ${title ?? ""} ${name}`;
}

function sum(...nums: number[]): number {             // rest parameter
  return nums.reduce((t, n) => t + n, 0);
}

function onClick(this: HTMLButtonElement, e: MouseEvent) {   // typing `this`
  this.disabled = true;
}

async function load(): Promise<User[]> { /* … */ return []; }   // async returns a Promise
```

Optional parameters must come after required ones. Return types are usually inferred, but writing them on exported functions catches mistakes earlier.

## Q. What is function overloading?

Several **signatures** for one function, followed by **one implementation** that handles them all. Callers only see the signatures.

```ts
function parse(value: string): number;
function parse(value: number): string;
function parse(value: string | number): string | number {   // implementation (not callable directly)
  return typeof value === "string" ? Number(value) : String(value);
}

const n = parse("42");   // number
const s = parse(42);     // string
```

Prefer a **union parameter** when the return type doesn't depend on the input. Overloads are for when it does.

> [!tip] Remember it
> **Overloads are a menu: several dishes listed, one kitchen cooks them all.**

## Q. What are constructor parameter properties?

Adding an access modifier (or `readonly`) to a constructor parameter **declares and assigns the field** in one step:

```ts
class User {
  constructor(public name: string, private readonly id: number) {}
}
// same as:
class User2 {
  public name: string;
  private readonly id: number;
  constructor(name: string, id: number) { this.name = name; this.id = id; }
}
```

Angular uses this everywhere for dependency injection: `constructor(private http: HttpClient) {}`. (Newer Angular code uses `inject()` instead.)

## Q. How do you overload a constructor?

Like functions: several constructor signatures, one implementation.

```ts
class Point {
  x: number; y: number;
  constructor();
  constructor(x: number, y: number);
  constructor(x = 0, y = 0) {
    this.x = x; this.y = y;
  }
}
new Point();       // 0, 0
new Point(3, 4);
```

Often simpler: optional or default parameters, or static factory methods (`Point.fromArray([3, 4])`). → [[22 Constructors|Constructors]]

> [!question] Recall
> - How do you extend two interfaces at once? What is declaration merging?
> - When would you pick `type` over `interface`?
> - What is a hybrid type? Give a real-world example.
> - Write a function type alias and use it.
> - When do overloads beat a union parameter?
> - What does `constructor(private http: HttpClient) {}` do?

Prev: [[14 Functions|14. Functions]] · Next: [[16 Advanced Type System|16. Advanced Type System]]
