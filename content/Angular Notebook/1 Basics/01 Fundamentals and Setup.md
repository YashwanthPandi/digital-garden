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

### Version numbering

Angular follows **semantic versioning** (`major.minor.patch`): the major number goes up only when there are breaking changes.

- **2.0** (Sept 2016): the rewrite. Articles from that era call it "Angular 2".
- **3 was skipped.** The router package was already at 3.x, so the team jumped to **4** (March 2017) to keep every `@angular/*` package on the same number.
- Since then: one major roughly every 6 months, each supported for 18 months.

"Angular 2+" or just "Angular" means everything after AngularJS. Print the exact version in an app with `VERSION` from `@angular/core`:

```ts
import { VERSION } from '@angular/core';
version = VERSION.full;   // e.g. "21.0.3"
```

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

Why it's faster: with JIT the browser downloads the Angular **compiler** plus your HTML templates, then walks each template at runtime to work out what to create. With AOT, the build has already turned each template into plain JavaScript instructions ("create a `<ul>`, create a text node, attach this binding…"), so the browser only has to:

1. download the assets
2. bootstrap Angular
3. render

AOT build flow: TypeScript + templates → Angular compiler (`ngc`) → JavaScript → bundle → minify → deploy.

> [!note] Old syntax you may still see
> Before AOT was the default you had to ask for it: `ng build --prod --aot`, and `main.ts` used `platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)` with a generated `*.ngfactory` file. Today a plain `ng build` is an AOT production build.

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

More things `ng generate` can create, with their one-letter shortcuts:

| Scaffold | Command | Short |
| --- | --- | --- |
| component | `ng g component user-card` | `ng g c` |
| service | `ng g service user` | `ng g s` |
| directive | `ng g directive highlight` | `ng g d` |
| pipe | `ng g pipe truncate` | `ng g p` |
| guard / interceptor / resolver | `ng g guard auth` | `ng g g` |
| class / interface / enum | `ng g class user`, `ng g interface user`, `ng g enum role` | `ng g cl`, `ng g i`, `ng g e` |
| module (legacy apps) | `ng g module admin` | `ng g m` |
| library | `ng g library my-lib` (see [[30 Third-Party Libraries and Packages\|Third-Party Libraries]]) | |

Handy flags:

```bash
ng new my-app --style=scss          # SCSS instead of CSS (also: sass, less)
ng build --base-href /my-app/       # app served from a sub-folder: sets <base href> in index.html
ng test --code-coverage             # coverage report (see Testing)
ng config -g cli.packageManager yarn   # use yarn/pnpm/bun instead of npm
```

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

## Setup troubleshooting

### npm behind a company proxy

If `npm install` hangs or fails at work, npm probably can't get through the corporate proxy. Tell npm about it:

```bash
npm config set proxy http://DOMAIN%5Cuser:password@proxy.company.com:8080/
npm config set https-proxy http://DOMAIN%5Cuser:password@proxy.company.com:8080/
```

This writes to your `.npmrc` (project folder, or your home folder for all projects). The part people miss is **`%5C`**: it's the URL-encoded `\` between the Windows domain and the user name (`DOMAIN\user`). A plain `\` doesn't work.

### Visual Studio using an old Node.js

Full Visual Studio (not VS Code) ships its own copy of Node.js. If your builds there behave differently from the terminal, put your installed Node first:

1. **Tools → Options → Projects and Solutions → Web Package Management → External Web Tools**
2. Add `C:\Program Files\nodejs` and move it to the **top** with the arrow buttons
3. Restart Visual Studio and run `npm install` again

![[vs-external-web-tools.jpg]]

### Upgrading an old CLI project

`ng update @angular/core @angular/cli` upgrades one major version at a time and runs code migrations for you. For very old projects where that fails, the "brute force" route works: create a fresh project with `ng new` on the target version and move your `src/app` code across.

> [!note] Before the CLI (2016–2017)
> Early Angular apps were wired up by hand: **SystemJS** loaded modules in the browser, `typings.json` fetched type definitions, `lite-server` served the files, and later many teams wrote their own **webpack** configs. You'll still meet these in old tutorials and codebases. Today the CLI handles all of it (it builds with esbuild and Vite), and types come from `@types/*` npm packages.
