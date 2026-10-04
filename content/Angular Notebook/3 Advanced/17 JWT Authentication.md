---
title: 17. JWT Authentication
tags:
  - Angular
  - security
---

- **Authentication:** verifying *who* the user is (login). "Who are you?"
- **Authorization:** what that user is *allowed* to access, based on role. "Can you do that?" Comes after authentication.

![[authn-vs-authz.jpg]]

Auth types usable with Angular: JWT (token based), session-based (cookie), OAuth2, OpenID Connect (OIDC, e.g. "Sign in with Google"), custom API-based.

## JWT flow

The server issues a signed token after checking credentials; the client sends it with every later request.

![[jwt-flow.jpg]]

1. Client `POST`s `{ username, password }`
2. Server authenticates and creates a JWT
3. Server returns `{ token }`
4. Client stores the token (e.g. `localStorage`), user is logged in
5. Client requests data with the token in the header (`Authorization: Bearer <token>`)
6. Server validates the token signature
7. Server sends data
8. Client displays it

## Parts of a JWT

![[jwt-parts.jpg]]

`header.payload.signature` (each part base64url-encoded)

- **Header:** token type (JWT) + algorithm (HS256, RS256)
- **Payload:** claims, e.g. user id/name, roles, expiry (`exp`)
- **Signature:** made from header + payload + secret key. The server uses it to check the token wasn't changed.

> [!warning] The payload is only encoded, not encrypted. Anyone can read it, so never put secrets in it.

## Implementation

![[jwt-implementation.jpg]]

**Login component:** shows the form, captures input, calls `authService.login()`, subscribes, then redirects or shows an error.

```html
<form (ngSubmit)="onLogin()">
  <input type="text" [(ngModel)]="username" name="username" />
  <input type="password" [(ngModel)]="password" name="password" />
  <button type="submit">Login</button>
  @if (error) { <p>{{ error }}</p> }
</form>
```

```ts
onLogin() {
  this.auth.login(this.username, this.password).subscribe({
    next: () => this.router.navigate(['/home']),
    error: () => (this.error = 'Invalid credentials'),
  });
}
```

**Auth service:** sends the login request, returns the Observable, stores the token.

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>('https://fakestoreapi.com/auth/login', { username, password })
      .pipe(tap((res) => localStorage.setItem('token', res.token)));
  }

  logout() { localStorage.removeItem('token'); }
  isLoggedIn() { return !!localStorage.getItem('token'); }
}
```

**Store the token in the service, not the component.** Doing it in each component's `subscribe()` duplicates code; `pipe(tap(...))` in the service centralizes it. (`tap` = side effect without changing the data, see [[13 Observables and RxJS|Observables and RxJS]].)

## Going further

- **Expiry:** decode the payload (`JSON.parse(atob(token.split('.')[1]))`) and check `exp`; log out when expired.
- **Refresh tokens:** short-lived access token + long-lived refresh token; on a 401, call `/refresh` and retry (done in an interceptor).
- **Role-based UI:** read roles from the payload to show/hide menu items, but **always enforce permissions on the server**.
- **Where to store the token:** `localStorage` is simple but readable by any XSS script; an **HttpOnly cookie** can't be read by JS (but then you need CSRF protection). See [[27 Security|Security]].

Next steps: protect routes with [[18 Route Guards|Route Guards]], attach the token automatically with [[19 HTTP Interceptors|HTTP Interceptors]].
