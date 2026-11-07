---
title: 18. Route Guards
tags:
  - Angular
  - security
---

Route guards control **whether a user can access a route**. E.g. a logged-out user types `amazon.com/orders` → guard blocks it and redirects to sign-in.

![[route-guards.jpg]]

**AuthGuard** isn't a separate feature: it's just a route guard (usually `CanActivate`) used for authentication.

## Types (in the order they run)

![[route-guard-types.jpg]]

| Guard | Question | Example |
| --- | --- | --- |
| `CanMatch` (replaces deprecated `CanLoad`) | should this route even match / its lazy code load? | admin module only for admins |
| `CanActivate` | can the user **enter** this page? (most common) | logged in? |
| `CanActivateChild` | can the user enter the **child** routes? | whole `/admin/*` section |
| `Resolve` | fetch data **before** the page loads | user profile, settings |
| `CanDeactivate` | can the user **leave** this page? | unsaved form changes warning |

Guards return `true` (allow), `false` (block), a `UrlTree` (redirect), or an Observable/Promise of these.

## Implementing an AuthGuard

```bash
ng generate guard auth    # pick CanActivate
```

![[authguard-flow.jpg]]

Flow: user enters `/home` → route has `canActivate: [authGuard]` → guard checks the token → allow, or redirect to `/login`.

### Functional guard: `CanActivateFn` (modern)

```ts
// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('token')) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
```

`inject()` gets a service instance inside a function, where there's no constructor.

### Async guard: wait for the server

A guard can return an Observable (or Promise). The router waits for it, e.g. to ask the server who's logged in on the first page load:

```ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.fetchCurrentUser().pipe(          // GET /api/users/me
    map((user) => (user ? true : router.createUrlTree(['/login']))),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};
```

The Observable must **emit and complete** (HTTP calls do). A guard that subscribes internally and returns nothing never lets the navigation finish; that's a classic bug in old examples.

Combine it with a resolver on the same route so the page receives the user it needs: `canActivate: [authGuard], resolve: { currentUser: currentUserResolver }` (see [[12 Routing#Resolvers|Resolvers]]).

### Class guard: `CanActivate` interface (older, deprecated style)

```ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
```

### Registering

```ts
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
];
```

## Role-based guard

Pass required roles through route `data`:

```ts
export const roleGuard: CanActivateFn = (route) => {
  const roles: string[] = route.data['roles'];
  return roles.includes(inject(AuthService).currentRole()) || inject(Router).createUrlTree(['/forbidden']);
};

{ path: 'admin', component: Admin, canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } }
```

## CanDeactivate: unsaved changes

```ts
export const unsavedGuard: CanDeactivateFn<{ hasUnsavedChanges(): boolean }> = (component) =>
  !component.hasUnsavedChanges() || confirm('You have unsaved changes. Leave anyway?');

{ path: 'edit', component: EditProfile, canDeactivate: [unsavedGuard] }
```

> [!warning] Guards are UX, not security. Anyone can bypass client code; the API must check the token and roles too.

See also [[12 Routing|Routing]], [[17 JWT Authentication|JWT Authentication]].
