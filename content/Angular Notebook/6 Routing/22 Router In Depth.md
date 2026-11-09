---
title: 22. Router In Depth
tags:
  - Angular
---

> [!summary] In one line
> The router maps URLs to components. This chapter covers what [[Angular Notebook/6 Routing/21 Routing|Routing]] leaves out: router configuration options, nested and **named outlets**, every way to write **router links**, **router events**, and how guards and lazy loading fit in.

## Configuration

```ts
// app.config.ts
provideRouter(
  routes,
  withComponentInputBinding(),          // route params, query params and data → component inputs
  withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
  withViewTransitions(),                // animated page changes with the View Transitions API
  withPreloading(PreloadAllModules),    // download lazy routes in the background after start-up
)

// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },                 // title sets the browser tab
  { path: 'products/:id', component: ProductComponent },
  { path: 'admin', canMatch: [adminGuard], loadChildren: () => import('./admin/admin.routes') },
  { path: 'old-path', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },                          // wildcard: always last
];
```

With `withComponentInputBinding()`, `/products/42` sets `id = input<string>()` on `ProductComponent` without injecting `ActivatedRoute`.

## Router outlets

```html
<app-header />
<router-outlet />                         <!-- primary outlet: the matched component appears here -->
<router-outlet name="sidebar" />          <!-- named (secondary) outlet -->
```

```ts
{ path: 'chat', component: ChatComponent, outlet: 'sidebar' }
```

```html
<a [routerLink]="[{ outlets: { sidebar: ['chat'] } }]">Open chat</a>   <!-- URL: /home(sidebar:chat) -->
<a [routerLink]="[{ outlets: { sidebar: null } }]">Close chat</a>
```

- **Nested outlets:** a component with child routes has its own `<router-outlet>` → [[Angular Notebook/6 Routing/21 Routing|Child routes]].
- Outlets emit `(activate)` and `(deactivate)` events with the component instance.

> [!tip] Remember it
> **An outlet is a picture frame; the router swaps the picture depending on the URL.** Named outlets are extra frames on the same wall.

## Router links

```html
<a routerLink="/products">All</a>
<a [routerLink]="['/products', product.id]">Details</a>            <!-- /products/42 -->
<a routerLink="edit">Edit</a>                                       <!-- relative to the current route -->
<a routerLink="../">Back up one level</a>
<a routerLink="/search" [queryParams]="{ q: term, page: 1 }" queryParamsHandling="merge">Search</a>
<a routerLink="/docs" fragment="install">Install section</a>         <!-- /docs#install -->

<a routerLink="/settings"
   routerLinkActive="active"
   [routerLinkActiveOptions]="{ exact: true }"
   ariaCurrentWhenActive="page">Settings</a>
```

From code: `router.navigate(['/products', id], { queryParams: { tab: 'reviews' } })` or `router.navigateByUrl('/home')`.

## Router events

Every navigation emits a sequence of events on `router.events`:

```
NavigationStart → RoutesRecognized → GuardsCheckStart → GuardsCheckEnd
→ ResolveStart → ResolveEnd → NavigationEnd   (or NavigationCancel / NavigationError)
```

```ts
export class AppComponent {
  private router = inject(Router);
  loading = signal(false);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(e => {
      if (e instanceof NavigationStart) this.loading.set(true);
      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.loading.set(false);
      }
    });
  }
}
```

Typical uses: a top loading bar, analytics page views on `NavigationEnd`, moving focus to the new page's heading (accessibility → [[HTML Notebook/2 Structure and Meaning/08 HTML Accessibility|Accessibility]]).

## Guards and lazy loading

| Guard | Runs | Use for |
| --- | --- | --- |
| `canActivate` | before entering a route | logged in? has the role? |
| `canActivateChild` | before entering any child route | protecting a whole section |
| `canDeactivate` | before leaving | "you have unsaved changes" |
| `canMatch` | while matching (route is skipped if `false`) | different routes per role; stops lazy code from downloading |
| `resolve` | before activation, fetches data | load data first |

Details: [[Angular Notebook/6 Routing/23 Route Guards|Route Guards]].

**Lazy loading:** `loadComponent: () => import('./x.component')` for one component, `loadChildren: () => import('./admin/admin.routes')` for a group of routes. Each becomes its own bundle, downloaded on first visit.

> [!question] Recall
> 1. What does `withComponentInputBinding()` do?
> 2. How do you show a component in a named outlet? What does the URL look like?
> 3. Write a router link with a route parameter and query parameters. What does `ariaCurrentWhenActive` add?
> 4. List the main router events in order. Give two uses for them.
> 5. `canActivate` vs `canMatch`?

Prev: [[21 Routing|21. Routing]] · Next: [[23 Route Guards|23. Route Guards]]
