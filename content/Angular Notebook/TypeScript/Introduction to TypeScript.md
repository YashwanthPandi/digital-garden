---
title: Introduction to TypeScript
tags:
  - TypeScript
---

**Why TypeScript:** TypeScript = JS + OOPs + Type system. It is a superset of JS.
Static typing means the type is checked before running.

**Why don't we skip JavaScript and use TS directly?**
Browsers only understand JavaScript. TypeScript is compiled to JS by the compiler (`tsc`), then it runs (`node main.js`).

**Main features:** open source · developed by Microsoft · OOPs concepts · strongly typed

## Strongly typed / static typing

```js
// JavaScript
let name = "Yashwant"
name = 40 // number – works
console.log(name) // successful
```

```ts
// TypeScript
let name: string = "Yashwant"
name = 40 // not encouraged and blocked → compile-time error
```

FYI: TypeScript doesn't allow changing types, which avoids big problems in large projects.

## TS vs JS

|                  | TS (TypeScript)                                       | JS (JavaScript)           |
| ---------------- | ----------------------------------------------------- | ------------------------- |
| Typing           | Strongly typed                                        | Loosely typed             |
| Error detection  | Errors show at compile time                           | Errors show up at runtime |
| Browser support  | Needs compiler to JS                                  | Runs directly in browser  |
| OOPs             | Full OOPs (interface, generics, enum)                 | Limited OOPs              |
| Suggestions      | Full support                                          | Basic support             |
| Code maintenance | Easier in large projects because of types & structure | Hard in large projects    |
| When to use      | Large apps, Angular apps                              | Small applications        |

## Setup

- Install: `npm install typescript -g`
- `tsc` → command to compile
- Run code immediately: `ts-node <filename>`

```ts
let message: string = "Yashwant Pandi" // type: any | string | number
```

**What is `tsconfig.json`?** A configuration file that tells the TypeScript compiler how to compile your code:

- Which files to compile?
- Which JS version to generate?
- How strict should the checking be?
- Output file location
