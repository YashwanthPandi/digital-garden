---
title: 1. TypeScript Foundation
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> **TypeScript = JavaScript + OOP support + a type system.** It compiles to plain JavaScript.

```
 ┌──────────── TypeScript ────────────┐
 │  JS                                 │
 │  + OOP (classes, generics, enums,   │      tsc       ┌────┐
 │         interfaces)                 │  ───────────▶  │ JS │ ──▶ browser / Node runs it
 │  + Type system (strong, static)     │                └────┘
 └─────────────────────────────────────┘
   browser can't run this directly
```

> [!tip] 🧠 Remember it
> JS is a **normal car** (fine for small apps). TS is a **super car** (built for big apps).

## Q. What is TypeScript? How is it different from JavaScript?

TypeScript is an **open-source** language developed by **Microsoft**. It is a **superset of JavaScript**: every valid JS program is also valid TS.

Advantages over JS:

1. TS is **strongly typed** and supports **static typing**.
2. TS adds **object-oriented** features (classes, interfaces, generics, enums).

## Q. How is TypeScript strongly typed with static typing?

TypeScript **does not let a variable change its type** once it has been defined. JavaScript is **loosely typed** and uses **dynamic typing**, so a variable can change type at any time.

```ts
// TypeScript is strongly typed
let name: string = "Happy";
name = 40; // ❌ Compile-time error
// Type 'number' is not assignable to type 'string'
```

```js
// JavaScript is loosely typed
let name = "Happy";
name = 40; // ✅ No error
```

## Q. Advantages of TypeScript over JavaScript (TS vs JS)

|  | JavaScript | TypeScript |
| --- | --- | --- |
| Typing | Loosely typed ❌ | Strongly typed ✅ |
| Error detection | At runtime ❌ | At compile time ✅ |
| Browser support | Runs directly in the browser | Must be compiled to JS first |
| OOP features | Limited ❌ | Full (interfaces, generics, enums) ✅ |
| IntelliSense | Basic suggestions ❌ | Rich IntelliSense and tooling ✅ |
| Maintainability | Harder in large projects ❌ | Easier thanks to types and structure ✅ |
| When to use | Small scripts, small apps | Large apps, team projects, Angular apps |

## Q. Why can't browsers run TypeScript directly?

Browsers understand **only JavaScript**. TypeScript must first be compiled to JS by the TypeScript compiler (`tsc`).

## Q. Why does Angular require TypeScript? 🧠

Because TypeScript provides **static typing, better structure and early error detection**, which large, scalable applications need. See [[Angular Notebook/index|Angular Notebook]].

> [!note] ✍️ My notes
> - **Why TypeScript:** TS = JS + OOPs + type system. Static typing means the type is checked **before running**.
> - **Why not skip JS and use TS directly?** Browsers only understand JS. `tsc` compiles TS to JS, then it runs (`node main.js`).
> - **Main features:** open source · developed by Microsoft · OOP concepts · strongly typed.
> - TS doesn't allow changing types, which avoids big problems in large projects:
>   ```ts
>   let name: string = "Yashwant";
>   name = 40; // blocked → compile-time error
>   ```

> [!question] Recall
> - What two things does TS add on top of JS?
> - Why does `name = 40` fail in TS but not in JS?
> - Who runs the `.ts` file: the browser or `tsc`?

Next: [[02 TypeScript Setup and First Program|2. Setup and First Program]] · Back to [[TypeScript Notebook/index|TypeScript Notebook]]
