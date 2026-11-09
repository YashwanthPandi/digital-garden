---
title: JavaScript Notebook
tags:
  - JavaScript
  - Notes
  - Revision
  - Skills
---

My JavaScript notes, written for a **complete beginner** and ordered from zero to interview ready. Every page has a one-line summary, a memory trick, small examples, common mistakes and recall questions to test yourself.

Pairs with [[HTML Notebook/index|HTML Notebook]] and [[CSS3 Notebook/index|CSS3 Notebook]]. Next step after this: [[TypeScript Notebook/index|TypeScript Notebook]] → [[Angular Notebook/index|Angular Notebook]].

> [!tip] How to study a page
> 1. Read the **one-liner** and the **memory trick**.
> 2. Type out every code example yourself (browser console or `node`).
> 3. Close the page and answer the **Recall** questions out loud.
> 4. Come back in 1, 3 and 7 days and do step 3 again (spaced repetition).

## Learning roadmap

### 1. Getting Started → [[JavaScript Notebook/1 Getting Started/index|overview]]

1. [[01 JS Introduction and Setup|Introduction and Setup]]
2. [[02 JS History Versions and Running Code|History, Versions and Running Code]]

### 2. Values and Types → [[JavaScript Notebook/2 Values and Types/index|overview]]

3. [[03 JS Variables and Data Types|Variables and Data Types]]: `let`, `const`, `var`, primitives vs objects
4. [[04 JS Data Types In Depth|Data Types In Depth]]: all 8 types, Symbol, BigInt, built-in objects and functions
5. [[05 JS Strings and Numbers|Strings and Numbers]]: template literals, common methods, `NaN`
6. [[06 JS Type Casting|Type Casting]]

### 3. Operators and Control Flow → [[JavaScript Notebook/3 Operators and Control Flow/index|overview]]

7. [[07 JS Operators and Type Coercion|Operators and Type Coercion]]
8. [[08 JS Operators In Depth|Operators In Depth]]
9. [[09 JS Equality Comparisons|Equality Comparisons]]: `==`, `===`, `Object.is` and the four equality algorithms
10. [[10 JS Conditionals and Loops|Conditionals and Loops]]: `if`, `switch`, `for`, `while`, `for...of`
11. [[11 JS Error Handling|Error Handling]]: `try`/`catch`, custom errors, debugging

### 4. Functions → [[JavaScript Notebook/4 Functions/index|overview]]

12. [[12 JS Functions|Functions]]
13. [[13 JS Functions In Depth|Functions In Depth]]
14. [[14 JS Scope Hoisting and Closures|Scope, Hoisting and Closures]]
15. [[15 JS this call apply bind|this, call, apply, bind]]

### 5. Objects and Collections → [[JavaScript Notebook/5 Objects and Collections/index|overview]]

16. [[16 JS Arrays|Arrays]]: `map`, `filter`, `reduce` and friends
17. [[17 JS Objects|Objects]]
18. [[18 JS Collections In Depth|Collections In Depth]]: typed arrays, Map, WeakMap, Set, WeakSet, JSON
19. [[19 JS Prototypes and Classes|Prototypes and Classes]]
20. [[20 JS Iterators and Generators|Iterators and Generators]]: `Symbol.iterator`, `function*`, `yield`

### 6. Modern JavaScript → [[JavaScript Notebook/6 Modern JavaScript/index|overview]]

21. [[21 JS ES6 Plus Features|ES6+ Features]]
22. [[22 JS Modules CommonJS and ESM|Modules: CommonJS and ESM]]

### 7. Browser and DOM → [[JavaScript Notebook/7 Browser and DOM/index|overview]]

23. [[23 JS DOM Manipulation|DOM Manipulation]]: select, create, change elements
24. [[24 JS Events|Events]]
25. [[25 JS Browser Storage|Browser Storage]]: localStorage, sessionStorage, cookies

### 8. Async and APIs → [[JavaScript Notebook/8 Async and APIs/index|overview]]

26. [[26 JS Asynchronous JavaScript|Asynchronous JavaScript]]
27. [[27 JS Timers XHR and Working with APIs|Timers, XHR and Working with APIs]]: `setTimeout`, `setInterval`, callback hell, `XMLHttpRequest`
28. [[28 JS Fetch and JSON|Fetch and JSON]]

### 9. Debugging and Memory → [[JavaScript Notebook/9 Debugging and Memory/index|overview]]

29. [[29 JS Debugging with DevTools|Debugging with DevTools]]: breakpoints, memory leaks, performance
30. [[30 JS Memory Management|Memory Management]]

### 10. Interview Prep → [[JavaScript Notebook/10 Interview Prep/index|overview]]

31. [[31 JS Interview Cheat Sheet|Interview Cheat Sheet]]

## roadmap.sh coverage

Every topic on the [roadmap.sh JavaScript roadmap](https://roadmap.sh/javascript), and where it's covered.

| Roadmap section | Topics | Notes |
| --- | --- | --- |
| Introduction | What is JavaScript, history, versions, how to run JavaScript | [[01 JS Introduction and Setup\|01]], [[02 JS History Versions and Running Code\|02]] |
| All about variables | `var` / `let` / `const`, hoisting, naming rules | [[03 JS Variables and Data Types\|03]], [[14 JS Scope Hoisting and Closures\|14]], [[02 JS History Versions and Running Code\|02]] |
| Variable scopes | block, function, global | [[14 JS Scope Hoisting and Closures\|14]], [[13 JS Functions In Depth\|13]] |
| Data types | string, number, BigInt, boolean, undefined, null, Symbol, object, `typeof` | [[03 JS Variables and Data Types\|03]], [[05 JS Strings and Numbers\|05]], [[04 JS Data Types In Depth\|04]] |
| Object | prototype, prototypal inheritance, built-in objects | [[19 JS Prototypes and Classes\|19]], [[04 JS Data Types In Depth\|04]] |
| Type casting | conversion vs coercion, explicit, implicit | [[07 JS Operators and Type Coercion\|07]], [[06 JS Type Casting\|06]] |
| Data structures | JSON, arrays, typed arrays, Map, WeakMap, Set, WeakSet | [[16 JS Arrays\|16]], [[17 JS Objects\|17]], [[18 JS Collections In Depth\|18]] |
| Equality comparisons | `==`, `===`, `Object.is`, IsLooselyEqual, IsStrictlyEqual, SameValueZero, SameValue | [[07 JS Operators and Type Coercion\|07]], [[09 JS Equality Comparisons\|09]] |
| Loops and iterations | `for`, `while`, `do...while`, `for...in`, `for...of`, `break` / `continue` | [[10 JS Conditionals and Loops\|10]] |
| Control flow | `if...else`, `switch`, `throw`, `try` / `catch` / `finally`, Error objects | [[10 JS Conditionals and Loops\|10]], [[11 JS Error Handling\|11]] |
| Expressions and operators | assignment, comparison, arithmetic, bitwise, logical, BigInt, string, conditional, comma, unary | [[07 JS Operators and Type Coercion\|07]], [[08 JS Operators In Depth\|08]] |
| Functions | default params, rest, arrow functions, IIFEs, `arguments`, scope and function stack, recursion, lexical scoping, closures, built-in functions | [[12 JS Functions\|12]], [[14 JS Scope Hoisting and Closures\|14]], [[04 JS Data Types In Depth\|04]], [[13 JS Functions In Depth\|13]] |
| Strict mode | `"use strict"` | [[02 JS History Versions and Running Code\|02]] |
| `this` keyword | in a method, in a function, alone, in event handlers, in arrow functions | [[15 JS this call apply bind\|15]], [[13 JS Functions In Depth\|13]] |
| Function borrowing and explicit binding | `call`, `apply`, `bind` | [[15 JS this call apply bind\|15]], [[13 JS Functions In Depth\|13]] |
| Asynchronous JavaScript | event loop, `setTimeout`, `setInterval`, callbacks, callback hell, promises, `async` / `await` | [[26 JS Asynchronous JavaScript\|26]], [[27 JS Timers XHR and Working with APIs\|27]] |
| Working with APIs | `XMLHttpRequest`, Fetch | [[28 JS Fetch and JSON\|28]], [[27 JS Timers XHR and Working with APIs\|27]] |
| Classes | `class`, inheritance | [[19 JS Prototypes and Classes\|19]] |
| Iterators and generators | iteration protocol, `function*`, `yield` | [[20 JS Iterators and Generators\|20]] |
| Modules | CommonJS, ESM | [[21 JS ES6 Plus Features\|21]], [[22 JS Modules CommonJS and ESM\|22]] |
| Memory management | memory lifecycle, garbage collection | [[30 JS Memory Management\|30]] |
| Using browser DevTools | debugging issues, memory leaks, performance | [[11 JS Error Handling\|11]], [[29 JS Debugging with DevTools\|29]] |
| DOM APIs | selecting, changing, creating elements; events | [[23 JS DOM Manipulation\|23]], [[24 JS Events\|24]] |

## Practice projects (in order)

- [ ] Counter and tip calculator (variables, events)
- [ ] To-do list with localStorage (DOM, arrays, storage)
- [ ] Quiz app (objects, arrays, conditionals)
- [ ] Weather app with a public API (fetch, async/await, error handling)

## Quick revision sheet

| Concept | One-liner |
| --- | --- |
| `const` / `let` | const by default, let if it changes, var never |
| `===` | same type and same value, no conversion |
| Falsy | `false 0 -0 0n '' null undefined NaN` |
| Arrow function | short function that borrows `this` |
| map / filter / reduce | transform / select / combine |
| Destructuring | arrays by position, objects by name |
| Spread / rest | spread pours out, rest gathers |
| Closure | function + backpack of outer variables |
| `this` | look left of the dot |
| Prototype | where an object looks for missing properties |
| Promise | IOU for a future value |
| async / await | promises that read like normal code |
| Event loop | sync → microtasks → one macrotask |
| DOM | live tree of the page that JS can change |
| Bubbling | events float up from the target |

## Resources compared

| Resource | Best for | Notes |
| --- | --- | --- |
| [javascript.info](https://javascript.info) | **learning in order** | Best structured tutorial; deep but beginner-friendly. Start here. |
| [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | **reference, accuracy** | The official-quality source; use it to look things up. |
| [GeeksforGeeks](https://www.geeksforgeeks.org/javascript/) | interview questions, coding practice | Huge question bank; quality varies, double-check against MDN. |
| [TutorialsPoint](https://www.tutorialspoint.com/javascript/) | quick syntax lookup | Short pages, online editor; less depth on modern features. |
| [freeCodeCamp](https://www.freecodecamp.org/learn) | hands-on exercises | Interactive challenges and projects. |

_These notes are written in my own words, using the resources above as references._
