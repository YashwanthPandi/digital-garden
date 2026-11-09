---
title: 4. Modules, Namespaces and Declarations
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Organise code with **ES modules** (`import`/`export`, called "external modules" in older docs). **Namespaces** are TypeScript's older way of grouping code. **Ambient declarations** (`declare`, `.d.ts`) describe code that exists elsewhere, and **augmentation** adds types to existing modules or the global scope.

## Q. How do modules work in TypeScript?

Any file with a top-level `import` or `export` is a **module** with its own scope. TypeScript uses standard JavaScript modules → [[22 JS Modules CommonJS and ESM|JS Modules]].

```ts
// user.ts
export interface User { id: number; name: string }
export function createUser(name: string): User { return { id: Date.now(), name }; }
export default class UserService { }

// app.ts
import UserService, { createUser, type User } from "./user.js";
import type { Config } from "./config.js";     // type-only import: removed from the output
```

- `import type` / `export type` import only types. They disappear from the compiled JS, so there's no runtime import.
- With `"module": "NodeNext"`, write the **`.js` extension** in relative imports, even from `.ts` files (it's the name of the output file). With `"moduleResolution": "Bundler"` you can leave it out.
- A file without `import`/`export` is a **script**: its declarations are global. Add `export {}` to make it a module.

> [!tip] Remember it
> **"External module" in old TypeScript docs = an ES module file today.** "Internal module" = a namespace.

## Q. What are namespaces? Should you use them?

```ts
namespace Validation {
  export interface Validator { isValid(s: string): boolean }
  const zip = /^[0-9]{6}$/;                      // private to the namespace
  export class ZipValidator implements Validator {
    isValid(s: string) { return zip.test(s); }
  }
}

const v = new Validation.ZipValidator();
```

Namespaces group code under one global name and compile to an object (an IIFE). They come from before ES modules. **In new code, use modules instead.** You'll still see namespaces in `.d.ts` files for old libraries and in global types (like `namespace NodeJS`). Namespaces can't be used with Node's built-in type stripping.

## Q. What are ambient declarations and `.d.ts` files?

`declare` tells TypeScript "this exists at runtime, here is its type" without producing any code:

```ts
declare const API_URL: string;                 // a global injected by the build tool
declare function gtag(...args: unknown[]): void;   // from a <script> tag

// types.d.ts: a declaration file, types only
declare module "legacy-chart" {                // an ambient module: types for an untyped package
  export function draw(el: HTMLElement, data: number[]): void;
}
declare module "*.svg" {                       // wildcard: let TS accept SVG imports
  const url: string;
  export default url;
}
```

| File / syntax | Purpose |
| --- | --- |
| `.d.ts` file | types only, no code; ships with libraries (`"declaration": true` generates them) |
| `declare module "name"` | **ambient module**: types for a package that has none |
| `@types/name` | community declaration files from DefinitelyTyped → [[TypeScript Notebook/1 Getting Started/03 Tooling Configuration and Ecosystem\|Tooling]] |
| `/// <reference types="node" />` | pull in a declaration package explicitly (rarely needed) |

## Q. What is module augmentation (namespace augmentation)?

Adding new members to a type that **another module** declares, by re-opening it with the same module name:

```ts
// router-augment.ts
import "vue-router";
declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;           // now every route's meta can have requiresAuth
  }
}
```

Works because interfaces **merge** → [[TypeScript Notebook/3 Data and Functions/15 Interfaces and Functions In Depth|Interfaces]]. Libraries use it for plugin systems (Express `Request`, Vue Router, Pinia). The same idea applies to namespaces: declaring `namespace X` again adds to the existing one.

## Q. What is global augmentation?

Adding to **global** types (like `Window`, `Array`, or `process.env`) from inside a module, with `declare global`:

```ts
// globals.d.ts or any module
export {};
declare global {
  interface Window {
    dataLayer: unknown[];             // window.dataLayer is now typed
  }
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;           // process.env.DATABASE_URL is a string, not string | undefined
    }
  }
}
```

> [!question] Recall
> - What makes a file a module? What is `import type` for?
> - Why should new code use modules instead of namespaces?
> - What does `declare` do? What goes in a `.d.ts` file?
> - How do you type a package that has no types?
> - Module augmentation vs global augmentation: give an example of each.

Prev: [[03 Tooling Configuration and Ecosystem|3. Tooling, Configuration and Ecosystem]] · Next: [[05 Variables and Data Types|5. Variables and Data Types]]
