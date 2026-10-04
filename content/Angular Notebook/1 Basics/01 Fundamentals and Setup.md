---
title: 1. Fundamentals and Setup
tags:
  - Angular
---

## What is Angular?

Angular is a **component-based** front-end framework, built by Google, for building dynamic **single-page applications (SPAs)** with TypeScript (see [[TypeScript Notebook/index|TypeScript Notebook]]).

![[what-is-angular.jpg]]

Where it sits: Browser → **Web server** (HTML/CSS/JS, built with Angular) → **API server** (.NET / Spring / Laravel) → Database.

> [!note] AngularJS ≠ Angular
> AngularJS (1.x, JavaScript, 2010) is the old, end-of-life framework. "Angular" (2+, TypeScript, 2016) is a complete rewrite. A new major version ships roughly every 6 months.

- **Component:** a reusable building block of the UI. A page is a tree of components (menu, login, product list…). See [[03 Components|Components]].
- **SPA:** loads only **one HTML page** and updates the content dynamically without reloading the whole page. A multi-page app loads a new `.html` file for each page (`home.html`, `contact.html`…).

![[spa-vs-mpa.jpg]]

### Top 7 features

![[top-7-features.jpg]]

1. Component-based architecture
2. Open source
3. Two-way data binding ([[05 Data Binding|Data Binding]])
4. [[06 Directives|Directives]]
5. Angular CLI
6. Dependency injection ([[10 Services and Dependency Injection|Services and DI]])
7. [[12 Routing|Routing]]

Also worth knowing: it's a **full framework** ("batteries included": router, forms, HTTP, testing), unlike React which is a UI library.

### JIT vs AOT compilation

Angular templates must be compiled to JavaScript.

- **JIT (Just-in-Time):** compiled in the browser at runtime. Old dev default.
- **AOT (Ahead-of-Time):** compiled during the build. Smaller bundles, faster startup, template errors caught at build time. **Default since Angular 9** (Ivy compiler).

## Environment setup

Software needed: **Node.js** (LTS) → **VS Code** → **Angular CLI**

![[first-project-steps.jpg]]

```bash
node -v && npm -v               # check Node + npm
npm install -g @angular/cli     # install the CLI globally
ng version
ng new my-first-app             # routing: yes, stylesheet: CSS
cd my-first-app
ng serve                        # http://localhost:4200, Ctrl + C to stop
```

Useful VS Code extensions: **Angular Language Service** (template autocomplete + errors), **Prettier** (formatting), **ESLint** (mistakes + best practices).

### NPM

**NPM (Node Package Manager)** comes with Node.js; it downloads, installs, updates and manages packages from the **NPM registry**.

![[role-of-npm.jpg]]

### Angular CLI

Command-line tool to create, build and manage projects.

![[role-of-angular-cli.jpg]]

| Command | Does |
| --- | --- |
| `ng new app` | create a project |
| `ng serve` | dev server with live reload |
| `ng build` | production build into `dist/` |
| `ng generate component login` / `ng g c login` | generate code (also `s` service, `p` pipe, `d` directive, `guard`, `interceptor`) |
| `ng test` | unit tests |
| `ng add <pkg>` | install + configure a library (e.g. `ng add @angular/material`) |
| `ng update` | upgrade Angular versions |

**Live reload:** a feature of `ng serve`; saving a code/HTML/CSS file automatically refreshes the browser.

![[live-reload.jpg]]

## Project files

![[folder-structure.jpg]]

- **`package.json`**: tracks the libraries the project needs (`dependencies`, `devDependencies`) and the commands to run/build it (`scripts`: `start` → `ng serve`, `build` → `ng build`, `test` → `ng test`).
- **`package-lock.json`**: exact installed versions, so every machine gets the same dependencies.
- **`node_modules/`**: npm reads `package.json` and downloads all those libraries here. Never commit it.
- **`public/`**: static assets like images (was `src/assets/` in older versions).
- **`src/`**: where we write application code; **`src/app/`** holds components and business logic.
- **`angular.json`**: config telling Angular how to build, run and structure the project (e.g. `"browser": "src/main.ts"`, assets from `public`, build budgets).
- **`tsconfig.json`**: TypeScript compiler settings.

How they fit together:

![[node-npm-cli-together.jpg]]

Install Node (comes with npm) → npm installs the Angular CLI → CLI creates the project + `package.json` → npm installs dependencies into `node_modules`.

Startup files (`index.html`, `main.ts`, `app.ts`) are covered in [[02 Architecture|Architecture]].
