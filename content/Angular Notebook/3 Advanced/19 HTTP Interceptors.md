---
title: 19. HTTP Interceptors
tags:
  - Angular
  - security
---

An HTTP interceptor is a **centralized** place to intercept and modify every outgoing request and incoming response.

![[interceptor-why.jpg]]

Without it, every service (Products, Orders, Profile…) would repeat the "add token" code. With it, you write it once.

![[interceptor-flow.jpg]]

- **Request side:** add auth token, set headers, log requests, show a loading spinner
- **Response side:** handle errors (e.g. 401 → logout), log responses, transform data, caching

## Creating one

1. `ng g interceptor auth`
2. Read the token from `localStorage`
3. Clone the request with `req.clone()` (requests are **immutable**)
4. Add `Authorization: Bearer <token>`
5. Pass it on with `next(authReq)`

```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }
  return next(req);
};
```

## Registering

`withInterceptors()` registers one or more interceptors globally. They run **in array order** for requests and reverse order for responses.

```ts
// app.config.ts
providers: [
  provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, loggingInterceptor])),
]
```

Now any `this.http.get(...)` in any component/service automatically carries the token.

## Error-handling interceptor

```ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    }),
  );
};
```

## Logging / timing interceptor

```ts
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const start = Date.now();
  return next(req).pipe(
    finalize(() => console.log(`${req.method} ${req.url} took ${Date.now() - start}ms`)),
  );
};
```

Older class-based interceptors implement `HttpInterceptor` with `intercept(req, next: HttpHandler)` and are registered with `{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }` plus `withInterceptorsFromDi()`.

See [[14 HttpClient|HttpClient]], [[17 JWT Authentication|JWT Authentication]].
