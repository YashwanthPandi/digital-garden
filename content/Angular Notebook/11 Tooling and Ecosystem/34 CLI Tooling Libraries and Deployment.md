---
title: 34. CLI, Tooling, Libraries and Deployment
tags:
  - Angular
---

> [!summary] In one line
> The **Angular CLI** creates, builds, tests and updates projects. It runs **schematics** (code generators and migrations) and **builders** (build, serve, test tasks), uses **build configurations** for environments, compiles templates **ahead of time**, and can package **libraries** and **deploy** apps.

## Local setup

1. Install **Node.js** (an active LTS version supported by your Angular version) and npm.
2. `npm install -g @angular/cli`, then `ng version` to check.
3. `ng new my-app` (asks about styles, SSR, AI tooling), `cd my-app`, `ng serve` → http://localhost:4200.
4. Editor: VS Code with the **Angular Language Service** extension (autocomplete, errors and "go to definition" inside templates).
5. Browser: the **Angular DevTools** extension (component tree, inputs and signals, change detection profiler).

→ [[Angular Notebook/1 Getting Started/01 Fundamentals and Setup|Fundamentals and Setup]]

## Angular CLI commands

| Command | Does |
| --- | --- |
| `ng new` | create a workspace and app |
| `ng serve` | dev server with live reload |
| `ng generate` (`ng g`) | generate a component, service, pipe, directive, guard, interceptor, library… |
| `ng build` | production build into `dist/` |
| `ng test` / `ng e2e` | unit tests / end-to-end tests |
| `ng add <package>` | install a library **and** run its setup schematic (`ng add @angular/material`) |
| `ng update` | upgrade Angular and run code migrations |
| `ng lint` | run ESLint (after `ng add angular-eslint`) |
| `ng deploy` | deploy using an installed deploy builder |
| `ng extract-i18n` | extract text to translate → i18n |

## Schematics

A **schematic** is a template-based code generator or transformer. `ng generate component` runs a schematic; so do `ng add` (library setup) and `ng update` (migrations that rewrite your code for a new version).

```bash
ng generate @angular/core:control-flow       # migrate *ngIf/*ngFor to @if/@for
ng generate @angular/core:signal-input-migration
ng generate @angular/core:inject             # constructor injection → inject()
```

Teams write **custom schematics** (`@angular-devkit/schematics`) to generate code that follows their own conventions.

## CLI builders and `angular.json`

A **builder** is the function that runs a task (build, serve, test). `angular.json` says which builder each target uses:

```jsonc
"architect": {
  "build": {
    "builder": "@angular/build:application",      // esbuild + Vite based (default since v17)
    "options": { "outputPath": "dist/my-app", "index": "src/index.html", "browser": "src/main.ts" },
    "configurations": {
      "production": {
        "budgets": [{ "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" }],
        "outputHashing": "all"
      },
      "development": { "optimization": false, "sourceMap": true },
      "staging": {
        "fileReplacements": [{ "replace": "src/environments/environment.ts", "with": "src/environments/environment.staging.ts" }]
      }
    },
    "defaultConfiguration": "production"
  },
  "serve": { "builder": "@angular/build:dev-server" },
  "test":  { "builder": "@angular/build:unit-test" }
}
```

Third-party builders exist for Jest, Playwright, deploy targets and custom webpack setups.

## Build environments

```bash
ng generate environments          # creates src/environments/environment.ts (+ .development.ts)
```

```ts
// environment.ts (production)
export const environment = { production: true, apiUrl: 'https://api.example.com' };
```

```bash
ng build --configuration=staging  # swaps in environment.staging.ts via fileReplacements
```

Everything in an environment file ends up in the JavaScript bundle and is **public**. Never put secrets there.

## AoT compilation

**Ahead-of-Time** (AoT) compilation turns templates into JavaScript **at build time** (default since v9, with Ivy). **Just-in-Time** (JIT) compiled them in the browser at runtime.

| AoT benefit | Why |
| --- | --- |
| Faster start-up | the browser runs ready-made code |
| Smaller bundles | the compiler isn't shipped |
| Template errors at build time | typos in bindings fail the build |
| Safer | no runtime `eval`-style template compilation (helps against injection) |

## End-to-end testing

E2E tests drive a real browser through user journeys (log in, add to cart, pay). Use **Playwright** or **Cypress** (`ng add @cypress/schematic`, or Playwright's Angular schematic) and run them with `ng e2e`. Protractor is no longer maintained. → [[Angular Notebook/9 Security and Testing/32 Testing|Testing]]

## Libraries

### Using libraries

```bash
ng add @angular/material         # install + configure (preferred when the library supports it)
npm install date-fns             # plain npm install for libraries without schematics
```

Check that the library supports your Angular version (its `peerDependencies`), prefer standalone-compatible and tree-shakable libraries, and update them with `ng update`.

### Creating libraries

```bash
ng generate library ui-kit                  # projects/ui-kit inside the workspace
ng build ui-kit                             # ng-packagr builds the Angular Package Format into dist/ui-kit
cd dist/ui-kit && npm publish               # publish to npm (or a private registry)
```

- Export the public API from `projects/ui-kit/src/public-api.ts`; everything else stays private.
- Apps in the same workspace import it by name (`import { ButtonComponent } from 'ui-kit'`) through a `tsconfig` path.
- Monorepo tools like Nx help when many apps share many libraries.

## Deployment

1. `ng build` → static files in `dist/<app>/browser`.
2. Upload them to any static host: Firebase Hosting, Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront, or an Nginx server.
3. **Configure a fallback to `index.html`** for unknown paths, so deep links like `/products/42` load the app instead of a 404.
4. Set `<base href>` if the app isn't served from the domain root (`ng build --base-href /my-app/`).
5. Apps with SSR need a Node.js server (or a serverless/edge platform that runs it) → [[Angular Notebook/8 Reactivity and Performance/29 SSR and Hydration|SSR]].

`ng add @angular/fire` (Firebase) or `ng add angular-cli-ghpages` (GitHub Pages) add an `ng deploy` builder for one-command deploys.

> [!question] Recall
> 1. What do `ng add` and `ng update` do beyond `npm install`?
> 2. What is a schematic? Give three examples of schematics you've run.
> 3. What is a builder? Where is it configured?
> 4. How do you build with staging settings? Why must environment files hold no secrets?
> 5. Four benefits of AoT over JIT?
> 6. How do you create and publish an Angular library?
> 7. Why do SPAs need an `index.html` fallback on the host?

Prev: [[33 NgModules|33. NgModules]]
