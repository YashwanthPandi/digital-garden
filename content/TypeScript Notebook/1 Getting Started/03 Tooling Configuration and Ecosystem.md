---
title: 3. Tooling, Configuration and Ecosystem
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> Install TypeScript per project, configure it with `tsconfig.json`, run it with `tsc`, `tsx` or Node's built-in type stripping, mix it with JavaScript gradually, and pair it with a formatter, a linter and a bundler.

## Q. How do you install TypeScript and set up a project?

Install it **per project** as a dev dependency, so every developer and the CI server use the same version:

```bash
npm install --save-dev typescript
npx tsc --init          # creates tsconfig.json with sensible defaults
npx tsc                 # compile the project
npx tsc --watch         # recompile on every save
npx tsc --noEmit        # type-check only (common in CI when a bundler does the output)
```

A global install (`npm install -g typescript`) works for quick experiments, but projects shouldn't depend on it.

## Q. What are the most important compiler options?

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",              // which JavaScript version to output
    "module": "NodeNext",            // module system: NodeNext for Node, ESNext/preserve for bundlers
    "moduleResolution": "NodeNext",  // how imports are found (Bundler when using Vite/webpack)
    "strict": true,                  // turns on all strict checks: always use it
    "noUncheckedIndexedAccess": true,// arr[i] may be undefined
    "outDir": "dist",                // where compiled JS goes
    "rootDir": "src",
    "declaration": true,             // also emit .d.ts files (for libraries)
    "sourceMap": true,               // debug the TS source in DevTools
    "esModuleInterop": true,         // smoother default imports from CommonJS packages
    "skipLibCheck": true,            // don't type-check node_modules .d.ts files (faster)
    "lib": ["ES2022", "DOM"],        // which built-in APIs exist
    "allowJs": true                  // compile .js files too (migration)
  },
  "include": ["src"]
}
```

`strict: true` switches on `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes` and more. New projects should always start strict.

## Q. What are the ways to run TypeScript?

| Way | Use it for |
| --- | --- |
| **TS Playground** ([typescriptlang.org/play](https://www.typescriptlang.org/play)) | try snippets in the browser, see the JS output and errors, share a link |
| `tsc` then `node dist/app.js` | the classic build-then-run |
| `npx tsx app.ts` | run a file directly (fast, uses esbuild; no type check) |
| `ts-node app.ts` | older direct runner; slower, still common in tutorials |
| `node app.ts` | Node.js 22.18+ and 23.6+ strip types natively (erasable syntax only: no enums or namespaces) |
| Deno / Bun | run `.ts` files directly |
| Vite, Angular CLI, Next.js | the framework's build compiles TS for you |

> [!tip] Remember it
> **Most runners only strip the types; only `tsc` checks them.** Run `tsc --noEmit` (or rely on your editor) to catch type errors.

## Q. How do TypeScript and JavaScript work together?

TypeScript is a **superset** of JavaScript: every valid JS file is valid TS, and TS compiles to plain JS. So you can migrate gradually:

1. Add `tsconfig.json` with `"allowJs": true`; rename files to `.ts` one at a time.
2. Turn on `"checkJs": true` (or `// @ts-check` at the top of a JS file) to type-check JavaScript using **JSDoc** comments:

```js
// @ts-check
/** @param {string} name @returns {string} */
function greet(name) { return `Hi ${name}`; }
```

3. **Using JS libraries from TS:** types come from the package itself or from **DefinitelyTyped** (`npm install -D @types/lodash`). A `.d.ts` file describes a JS library's types without any code → [[TypeScript Notebook/1 Getting Started/04 Modules Namespaces and Declarations|Declarations]].

## Q. What does the TypeScript ecosystem look like?

| Need | Common tools |
| --- | --- |
| **Formatting** | Prettier (or Biome): consistent style, no arguments in code review |
| **Linting** | ESLint with **typescript-eslint** (finds bugs types can't, e.g. floating promises); Biome is a fast all-in-one alternative |
| **Build tools** | `tsc` (types and libraries), **Vite** (apps, uses esbuild/Rollup), esbuild, SWC, tsup (libraries), webpack (older apps) |
| **Runtime validation** | Zod, Valibot: check API data at runtime and infer the TS type from the schema |
| **Testing** | Vitest, Jest (+ ts-jest), Playwright |
| **Useful type packages** | `type-fest` (extra utility types), `@total-typescript/ts-reset` (stricter built-ins), `@types/*` |

```ts
import { z } from "zod";
const User = z.object({ id: z.number(), email: z.string().email() });
type User = z.infer<typeof User>;          // the TS type, from the same schema
const user = User.parse(await res.json()); // throws if the API sends the wrong shape
```

> [!tip] Remember it
> **TypeScript checks your code at build time, not your data at runtime.** For data from outside (APIs, forms, files), validate it with a schema library.

> [!question] Recall
> - Why install TypeScript per project instead of globally?
> - What does `strict: true` turn on? What does `noEmit` do?
> - Name three ways to run a `.ts` file. Which of them check types?
> - How do you add types to a JavaScript library? What's in a `.d.ts` file?
> - What's the difference between a formatter and a linter?

Prev: [[02 TypeScript Setup and First Program|2. TypeScript Setup and First Program]] · Next: [[04 Modules Namespaces and Declarations|4. Modules, Namespaces and Declarations]]
