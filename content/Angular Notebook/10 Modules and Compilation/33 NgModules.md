---
title: 33. NgModules
tags:
  - Angular
---

> [!summary] In one line
> Before standalone components, every component had to belong to an **NgModule**, a class that groups components and lists what they import, export and provide. New apps use standalone components, but you'll still read and maintain module-based code.

Comparison with standalone: [[Angular Notebook/1 Getting Started/04 Standalone Architecture|Standalone Architecture]].

## Module architecture

```ts
@NgModule({
  declarations: [ProductListComponent, ProductCardComponent, PricePipe],  // what this module owns
  imports: [CommonModule, RouterModule, SharedModule],                     // what its templates need
  exports: [ProductCardComponent],                                         // what other modules may use
  providers: [ProductService],                                             // services (prefer providedIn: 'root')
})
export class ProductsModule {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ProductsModule],
  bootstrap: [AppComponent],                                               // only in the root module
})
export class AppModule {}
```

| Property | Means |
| --- | --- |
| `declarations` | components, directives and pipes that **belong** to this module (each can belong to only one) |
| `imports` | other modules whose **exported** items this module's templates use |
| `exports` | what this module shares with modules that import it |
| `providers` | services this module registers with the injector |
| `bootstrap` | the root component to start (root module only) |

> [!tip] Remember it
> **A module is a department:** `declarations` = its staff, `imports` = other departments it borrows from, `exports` = staff it lends out, `providers` = its shared equipment.

## Kinds of modules

| Module | Contains | Imported by |
| --- | --- | --- |
| **Root** (`AppModule`) | the bootstrap component, app-wide setup | nobody: it starts the app |
| **Feature** module | one area of the app (`ProductsModule`, `AdminModule`) | the root module, or lazy-loaded by the router |
| **Routing** module | `RouterModule.forChild(routes)` for one feature | its feature module |
| **Shared** module | reusable UI (buttons, pipes, directives), exported for others; no services | feature modules |
| **Core** module | app-wide singletons, imported once (now replaced by `providedIn: 'root'`) | the root module only |

## Creating modules

```bash
ng generate module products --routing             # products.module.ts + products-routing.module.ts
ng generate component products/product-list --module products
```

(In v19+ the CLI creates standalone components by default; add `--standalone false` for module-based ones.)

## Lazy loading modules

```ts
const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];
```

The `AdminModule` code is put in a separate bundle and only downloaded when the user visits `/admin`. With standalone components, use `loadComponent` or `loadChildren` pointing at a routes file instead → [[Angular Notebook/6 Routing/21 Routing|Routing]].

## Dependencies between modules

- A template can only use a component if it's **declared in the same module** or **exported by an imported module**. "`app-x` is not a known element" means one of those is missing.
- `forRoot()` / `forChild()` static methods return a module **with providers** (`RouterModule.forRoot(routes)` once in the root, `forChild` in features) so services aren't created twice.
- Services in a **lazy-loaded** module's `providers` get their own instance for that module (a child injector). Use `providedIn: 'root'` when you want one shared instance.

## Mixing modules and standalone

```ts
@NgModule({ imports: [StandaloneCardComponent] })   // a standalone component can be imported into a module
export class LegacyModule {}

@Component({ imports: [LegacyModule] })             // and a standalone component can import a module
export class NewPageComponent {}
```

`ng generate @angular/core:standalone` migrates a module-based app step by step.

> [!question] Recall
> 1. What do `declarations`, `imports`, `exports`, `providers` and `bootstrap` do?
> 2. Feature vs shared vs core module?
> 3. Why does "`app-x` is not a known element" happen in module-based apps?
> 4. How do you lazy-load a feature module? What do `forRoot()` and `forChild()` solve?

Prev: [[32 Testing|32. Testing]] · Next: [[34 CLI Tooling Libraries and Deployment|34. CLI, Tooling, Libraries and Deployment]]
