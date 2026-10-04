---
title: 12. Routing
tags:
  - Angular
---

1. Create components
2. Define routes
3. Import router directives in `app.ts`
4. Add navigation links
5. Add `<router-outlet>`

`**` → wildcard route for unknown links.

![[routing-steps.jpg]]

Routing = navigating between views/components using **URLs, without reloading** the page.

![[how-routing-works.jpg]]

How it works: user clicks a link / enters a URL → Angular Router matches it against the route config → loads the matching component → displays it inside `<router-outlet>`.

## `provideRouter`

Enables routing by registering the routes at app startup:

```ts
// app.config.ts
providers: [provideRouter(routes, withComponentInputBinding())]
```

## `app.routes.ts`

The main routing config file. Holds the `Routes` array: each object maps a URL `path` to a `component`.

```ts
export const routes: Routes = [
  { path: 'home', component: Home, title: 'Home' },
  { path: 'about', component: About },
  { path: '', redirectTo: 'home', pathMatch: 'full' },   // default route
  { path: '**', component: PageNotFound },               // wildcard, always LAST
];
```

- **Default route:** redirects when no path is given. `pathMatch: 'full'` = only when the whole URL is empty.
- **Wildcard route:** handles invalid/unknown URLs, usually a 404 page. Must be last because routes match top-down.
- **`title`:** sets the browser tab title.

## `routerLink`, `router-outlet`, `routerLinkActive`

```ts
imports: [RouterOutlet, RouterLink, RouterLinkActive]
```

```html
<a routerLink="/home" routerLinkActive="active">Home</a> |
<a routerLink="/about" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">About</a>

<router-outlet></router-outlet>
```

- **`routerLink`**: navigates without refreshing the page (unlike `href`).
- **`router-outlet`**: placeholder where the routed component is displayed.
- **`routerLinkActive`**: adds a CSS class (here `.active`) to the link whose route is currently active.

## Navigating from code

```ts
private router = inject(Router);

goToProduct(id: number) {
  this.router.navigate(['/products', id], { queryParams: { tab: 'reviews' } });
  // or: this.router.navigateByUrl('/products/5?tab=reviews');
}
```

## Route parameters and query parameters

```ts
{ path: 'products/:id', component: ProductDetail }
```

```html
<a [routerLink]="['/products', product.id]" [queryParams]="{ tab: 'reviews' }">View</a>
<!-- → /products/5?tab=reviews -->
```

Reading them:

```ts
// 1. With withComponentInputBinding(): params become inputs automatically
id = input<string>();          // matches :id
tab = input<string>();         // matches ?tab=

// 2. With ActivatedRoute
private route = inject(ActivatedRoute);
ngOnInit() {
  this.route.paramMap.subscribe((p) => this.load(p.get('id')!));     // re-fires when :id changes
  const tab = this.route.snapshot.queryParamMap.get('tab');           // one-time read
}
```

- **Path param** (`/products/5`): identifies the resource, required.
- **Query param** (`?tab=reviews&page=2`): optional filters/sort/pagination.

## Child (nested) routes

```ts
{
  path: 'admin', component: AdminLayout,
  children: [
    { path: 'users', component: Users },       // /admin/users
    { path: 'settings', component: Settings }, // /admin/settings
  ],
}
```

`AdminLayout`'s template needs its own `<router-outlet>`.

## Lazy loading

Load a component or a group of routes only when the user navigates there, so the initial bundle is smaller.

```ts
{ path: 'admin', loadComponent: () => import('./admin/admin').then((m) => m.Admin) },
{ path: 'shop', loadChildren: () => import('./shop/shop.routes').then((m) => m.SHOP_ROUTES) },
```

Preloading: `provideRouter(routes, withPreloading(PreloadAllModules))` downloads lazy chunks in the background after startup.

## Resolvers

Fetch data **before** the route activates:

```ts
export const productResolver: ResolveFn<Product> = (route) =>
  inject(ProductService).get(route.paramMap.get('id')!);

{ path: 'products/:id', component: ProductDetail, resolve: { product: productResolver } }
```

Protecting routes: [[18 Route Guards|Route Guards]].
