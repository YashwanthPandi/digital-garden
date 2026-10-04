---
title: 2. TypeScript Setup and First Program
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Install Node.js and `tsc`, write `hello.ts`, compile it to `hello.js` with `tsc`, then run it with `node`.

## Q. What software is required to run TypeScript programs?

1. **Node.js**: the runtime environment ([nodejs.org](https://nodejs.org))
2. **VS Code**: the editor ([code.visualstudio.com](https://code.visualstudio.com))
3. **TypeScript compiler (`tsc`)**: `npm install -g typescript`
4. **Terminal**: Command Prompt, PowerShell or Terminal

## Q. How do you write and run your first TypeScript program?

1. Open VS Code
2. Install TypeScript: `npm install -g typescript`
3. Create a file: `hello.ts`
4. Write the program:

   ```ts
   let message: string = "Hello TypeScript!";
   console.log(message);
   ```

5. Compile TS to JS: `tsc hello.ts` (this creates `hello.js`)
6. Run the JS file: `node hello.js` → `Hello TypeScript!`

## Q. How can you run a TypeScript program in VS Code with a single click?

1. **Set up auto-compile:** `tsc --init` creates `tsconfig.json`, and `tsc -w` starts watch mode.
2. **Install the Code Runner extension.**
3. **Click the ▶ Run button.** It runs `ts-node hello.ts`, and the output shows in the terminal.

## Q. What is the TypeScript compiler (`tsc`)? How does it convert TS to JS?

`tsc` is the tool that **transforms TypeScript code into plain JavaScript**. Its steps are:

1. Reads the TypeScript source code
2. Checks and validates all types
3. Removes TypeScript-only features (types, interfaces…)
4. Transforms the syntax and generates the equivalent JavaScript
5. Saves the final `.js` file

## Q. What is `tsconfig.json`? What is strict mode in it?

`tsconfig.json` is the **configuration file** that tells the compiler how to compile your TS into JS. It controls:

1. Which files to compile
2. Which JavaScript version to generate
3. How strict the type checking should be
4. Where the output JavaScript files go

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "module": "CommonJS",
    "strict": true
  }
}
```

**Strict mode** (`"strict": true`) turns on strict type-checking rules that catch errors at **compile time instead of runtime**.

> [!note] ✍️ My notes
> - Install: `npm install typescript -g` · compile: `tsc` · run straight away without a separate compile: `ts-node <filename>`
> - **My setup:** VS Code · Node.js · Code Runner (run with one click) · ESLint (suggestions) · Prettier (formatting)

> [!question] Recall
> - Which command creates `tsconfig.json`?
> - What does `tsc -w` do?
> - What does `tsc` remove from your code?

Prev: [[01 TypeScript Foundation|1. Foundation]] · Next: [[03 Variables and Data Types|3. Variables and Data Types]]
