---
title: 14. HttpClient
tags:
  - Angular
  - rxjs
---

**HttpClient** is an Angular service for making HTTP calls (GET, POST, PUT, DELETE) to a backend API.

![[role-of-httpclient.jpg]]

Flow: user action → component calls a service method → service makes the request with HttpClient → API returns JSON → service returns an **Observable** → component subscribes → UI updates.

![[httpclient-methods.jpg]]

| Method | Purpose | Amazon example |
| --- | --- | --- |
| `GET` | fetch data | search products |
| `POST` | send new data | place an order |
| `PUT` | replace/update data | change phone number |
| `PATCH` | partially update data | change one field |
| `DELETE` | remove data | cancel an order |

## Setup

1. Register it in `app.config.ts`:

```ts
providers: [provideHttpClient(withFetch())]   // withFetch: use the Fetch API (recommended, needed for SSR)
```

2. Inject it in a service (HttpClient returns an Observable built with RxJS):

```ts
export interface User { id: number; name: string; email: string; }

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/users';

  getUsers()             { return this.http.get<User[]>(this.url); }
  getUser(id: number)    { return this.http.get<User>(`${this.url}/${id}`); }
  create(user: Partial<User>) { return this.http.post<User>(this.url, user); }
  update(user: User)     { return this.http.put<User>(`${this.url}/${user.id}`, user); }
  remove(id: number)     { return this.http.delete<void>(`${this.url}/${id}`); }
}
```

3. Subscribe in the component:

```ts
export class UserList implements OnInit {
  users: User[] = [];
  private userService = inject(UserService);

  ngOnInit() {
    this.userService.getUsers().subscribe({ next: (data) => (this.users = data) });
  }
}
```

```html
@for (u of users; track u.id) { <li>{{ u.name }}</li> }
```

Or skip the subscribe and use the [[13 Observables and RxJS#Async pipe|async pipe]].

> [!important] Nothing is sent until you subscribe. HTTP Observables are cold: each `subscribe()` sends a new request.

## Typed responses

Pass the type as a generic (`get<User[]>`) so `data` is typed. Use interfaces instead of `any` (see [[TypeScript Notebook/Objects and Interfaces|Objects and Interfaces]]).

## Headers and query params

```ts
this.http.get<Product[]>('/api/products', {
  params: { page: 2, sort: 'price' },                  // → ?page=2&sort=price
  headers: { 'X-Client': 'web' },
});
```

## Error handling

```ts
getUsers() {
  return this.http.get<User[]>(this.url).pipe(
    retry(2),
    catchError((err: HttpErrorResponse) => {
      console.error(err.status, err.message);
      return of([]);                                  // fallback value
      // or: return throwError(() => new Error('Could not load users'));
    }),
  );
}
```

Or in the component: `subscribe({ next: …, error: (err) => this.error = 'Failed to load' })`. App-wide handling belongs in an [[19 HTTP Interceptors|interceptor]].

## Loading state pattern

```ts
loading = true;
ngOnInit() {
  this.userService.getUsers()
    .pipe(finalize(() => (this.loading = false)))
    .subscribe((u) => (this.users = u));
}
```

Newer option: `httpResource()` gives you `value()`, `isLoading()`, `error()` as signals (see [[22 Signals#Resources|Signals]]).

Related: [[19 HTTP Interceptors|HTTP Interceptors]] (add tokens to every request), [[17 JWT Authentication|JWT Authentication]].
