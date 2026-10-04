---
title: JavaScript Notebook
tags:
  - JavaScript
  - Notes
  - Revision
  - Skills
---

My JavaScript notes, written for a **complete beginner** and ordered from zero to interview ready. Every page has a one-line summary, a 🧠 memory trick, small examples, common mistakes and recall questions to test yourself.

Pairs with [[HTML5 Notebook/index|HTML5 Notebook]] and [[CSS3 Notebook/index|CSS3 Notebook]]. Next step after this: [[TypeScript Notebook/index|TypeScript Notebook]] → [[Angular Notebook/index|Angular Notebook]].

> [!tip] How to study a page
> 1. Read the **one-liner** and the **🧠 trick**.
> 2. Type out every code example yourself (browser console or `node`).
> 3. Close the page and answer the **Recall** questions out loud.
> 4. Come back in 1, 3 and 7 days and do step 3 again (spaced repetition).

## Learning roadmap

### Level 1 – Basics → [[JavaScript Notebook/1 Basics/index|overview]]

1. [[01 JS Introduction and Setup|Introduction and Setup]]
2. [[02 JS Variables and Data Types|Variables and Data Types]]
3. [[03 JS Operators and Type Coercion|Operators and Type Coercion]]
4. [[04 JS Conditionals and Loops|Conditionals and Loops]]
5. [[05 JS Functions|Functions]]
6. [[06 JS Arrays|Arrays]]
7. [[07 JS Objects|Objects]]
8. [[08 JS Strings and Numbers|Strings and Numbers]]

### Level 2 – Intermediate → [[JavaScript Notebook/2 Intermediate/index|overview]]

9. [[09 JS Scope Hoisting and Closures|Scope, Hoisting and Closures]]
10. [[10 JS this call apply bind|this, call, apply, bind]]
11. [[11 JS ES6 Plus Features|ES6+ Features]]
12. [[12 JS DOM Manipulation|DOM Manipulation]]
13. [[13 JS Events|Events]]
14. [[14 JS Error Handling|Error Handling]]

### Level 3 – Advanced → [[JavaScript Notebook/3 Advanced/index|overview]]

15. [[15 JS Prototypes and Classes|Prototypes and Classes]]
16. [[16 JS Asynchronous JavaScript|Asynchronous JavaScript]]
17. [[17 JS Fetch and JSON|Fetch and JSON]]
18. [[18 JS Browser Storage|Browser Storage]]
19. [[19 JS Interview Cheat Sheet|Interview Cheat Sheet]]

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
| [javascript.info](https://javascript.info) | ⭐ **learning in order** | Best structured tutorial; deep but beginner-friendly. Start here. |
| [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | ⭐ **reference, accuracy** | The official-quality source; use it to look things up. |
| [GeeksforGeeks](https://www.geeksforgeeks.org/javascript/) | interview questions, coding practice | Huge question bank; quality varies, double-check against MDN. |
| [TutorialsPoint](https://www.tutorialspoint.com/javascript/) | quick syntax lookup | Short pages, online editor; less depth on modern features. |
| [freeCodeCamp](https://www.freecodecamp.org/learn) | hands-on exercises | Interactive challenges and projects. |

_These notes are written in my own words, using the resources above as references._
