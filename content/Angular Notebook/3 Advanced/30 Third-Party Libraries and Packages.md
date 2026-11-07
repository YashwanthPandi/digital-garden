---
title: 30. Third-Party Libraries and Packages
tags:
  - Angular
---

Sooner or later an app needs code that isn't Angular: a chart library, a date library, jQuery plugins, analytics or chat scripts. How you bring it in depends on the library.

## 1. Libraries with their own types

Modern libraries ship TypeScript types. Install and import:

```bash
npm install date-fns
```

```ts
import { format } from 'date-fns';
```

## 2. Libraries that need separate types

Many older JavaScript libraries have types published separately as `@types/<name>`:

```bash
npm install lodash
npm install --save-dev @types/lodash
```

Without types, TypeScript doesn't know the library's functions and reports errors. (Old projects used a `typings` tool and `typings.json` for this; `@types` replaced it.)

## 3. Global scripts (jQuery and plugins)

Some libraries aren't meant to be imported: they attach a global (`$`, `THREE`, `Intercom`) to `window`.

**Load the script** through `angular.json`, in order (dependencies first):

```json
"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "src/assets/js/jquery.cycle.plugin.js"
]
```

(Or a `<script>` tag in `index.html` for a CDN script.)

**Tell TypeScript the global exists**, either with `npm i -D @types/jquery` or a one-line declaration where you use it:

```ts
declare const $: any;                              // "trust me, this exists at runtime"

declare global {                                   // for globals attached to window
  interface Window { Intercom: (cmd: string, opts?: object) => void; }
}
```

**Use it after the view exists**, because the plugin needs real DOM elements:

```ts
export class Slider {
  private el = viewChild.required<ElementRef<HTMLElement>>('slider');

  constructor() {
    afterNextRender(() => $(this.el().nativeElement).cycle());   // or ngAfterViewInit
  }
}
```

Rules: let Angular own the DOM it renders and give the plugin **one element** to control; clean up in `ngOnDestroy`; don't use jQuery to change things Angular binds (the next change detection overwrites it). In a Zone.js app, start chatty plugins inside `NgZone.runOutsideAngular()` (see [[23 Change Detection and Performance|Change Detection]]).

## 4. Angular wrapper libraries

For popular widgets someone has usually written an Angular version with inputs, outputs and `ngModel` support. Prefer it to wiring the raw library yourself:

| Need | Libraries |
| --- | --- |
| UI components (dialog, select, datepicker, tooltip, toast…) | **Angular Material + CDK** (`ng add @angular/material`), PrimeNG, ngx-bootstrap, ng-bootstrap |
| File upload with drag & drop | ngx-dropzone-wrapper, ngx-file-drop |
| Charts | ng2-charts (Chart.js), ngx-echarts |

```html
<!-- Angular Material datepicker -->
<mat-form-field>
  <input matInput [matDatepicker]="picker" [(ngModel)]="date" />
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker />
</mat-form-field>
```

Check before installing: last release date, supported Angular version, open issues. Libraries from 2016–2018 (e.g. `md2`, `angular2-*` packages) are mostly abandoned.

## 5. Web components (custom elements)

You can use native web components (built with Lit, Stencil, Shoelace…) in templates. Angular would complain that `<my-webcomponent>` is an unknown element, so tell it to allow custom tags:

```ts
@Component({
  selector: 'app-about',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],          // allows any tag with a dash in its name
  template: `<my-webcomponent [label]="title"></my-webcomponent>`,
})
export class About {}
```

(Module apps put `schemas: [CUSTOM_ELEMENTS_SCHEMA]` on the `@NgModule`.) The schema switches off checking for **all** unknown dashed tags in that template, so typos aren't caught anymore. The opposite direction, turning an Angular component into a web component, is **Angular Elements** (`@angular/elements`).

## Publishing your own library

To share components or services between apps, package them as a library:

```bash
ng new my-workspace --no-create-application
cd my-workspace
ng generate library my-lib          # → projects/my-lib/
ng build my-lib                     # → dist/my-lib/ (Angular Package Format)
cd dist/my-lib && npm publish
```

- `projects/my-lib/src/public-api.ts` lists what users can import (a barrel, see [[21 Standalone Architecture#Barrel files|Barrel files]]). Anything not exported there is private.
- Put `@angular/*` and `rxjs` in **`peerDependencies`**, not `dependencies`, so the app's own Angular is used.
- Test it in an app before publishing: `ng build my-lib --watch` and import it from the same workspace, or `npm pack` and install the `.tgz`.

> [!note] The old way
> Before the CLI could build libraries (v6), you did it by hand: a gulp task to **inline** templates and styles into the components (`gulp-angular-embed-templates`), `ngc` to compile, **rollup** to create UMD bundles, a hand-written `index.d.ts`, and `.npmignore` to skip source files. ng-packagr, used by `ng build` for libraries, now does all of this.

## Running the app behind your own backend

`ng build` produces static files (`dist/<app>/browser`). Any web server can host them: Express, ASP.NET Core, nginx, a CDN. One rule matters:

> [!important] Unknown paths must return `index.html`
> When a user refreshes `/products/5`, the server gets a request for `/products/5`. There's no such file; only Angular's router knows that route. The server has to answer with `index.html` and let Angular take over (the "SPA fallback"). Otherwise refreshing any page except `/` gives a 404.

Express example:

```js
const express = require('express');
const path = require('path');
const app = express();
const dist = path.join(__dirname, 'dist/my-app/browser');

app.get('/api/test', (req, res) => res.json({ ok: true }));   // API routes first
app.use(express.static(dist));                                // then real files
app.use((req, res) => res.sendFile(path.join(dist, 'index.html')));        // then the fallback

app.listen(process.env.PORT || 9999);
```

ASP.NET Core does the same with `app.UseStaticFiles()` + `app.MapFallbackToFile("index.html")`, and the Angular build output copied into `wwwroot`.

**During development**, keep `ng serve` and proxy API calls to the backend so you avoid CORS problems:

```json
// proxy.conf.json
{ "/api": { "target": "http://localhost:9999", "secure": false } }
```

```bash
ng serve --proxy-config proxy.conf.json      # or set "proxyConfig" in angular.json
```

Related: [[14 HttpClient|HttpClient]], [[01 Fundamentals and Setup|Fundamentals and Setup]].
