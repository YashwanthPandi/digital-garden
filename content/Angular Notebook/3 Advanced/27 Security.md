---
title: 27. Security
tags:
  - Angular
  - security
---

## XSS (Cross-Site Scripting)

An attacker gets their script to run in your page (e.g. via a comment containing `<script>`), and can then steal tokens or act as the user.

Angular's built-in protection: **everything bound in templates is treated as untrusted and sanitized/escaped by default.**

```html
<p>{{ userComment }}</p>            <!-- escaped: shown as text -->
<div [innerHTML]="userComment"></div> <!-- sanitized: <script>, onerror=… removed -->
```

`DomSanitizer.bypassSecurityTrustHtml()` / `…TrustUrl()` turns this off. Only use it on content you fully control, never on user input.

Don't:

- build templates from user strings
- use `ElementRef.nativeElement.innerHTML = …` (skips sanitization)
- disable AOT or use `eval`-like tricks

## CSRF / XSRF (Cross-Site Request Forgery)

A malicious site makes the user's browser send a request to your API, and the browser automatically attaches the user's **cookies**. Only a risk with cookie-based auth.

Angular's HttpClient supports the standard defence: the server sets an `XSRF-TOKEN` cookie, Angular reads it and sends it back as the `X-XSRF-TOKEN` header (configurable with `withXsrfConfiguration()`); the server checks they match. Plus `SameSite` cookies.

JWT in an `Authorization` header isn't sent automatically, so it's not vulnerable to CSRF, but it is exposed to XSS if stored in `localStorage`.

## Token storage trade-off

| Storage | XSS can read it? | CSRF risk? |
| --- | --- | --- |
| `localStorage` / `sessionStorage` | yes | no |
| HttpOnly + Secure + SameSite cookie | no | yes (mitigate with XSRF token / SameSite) |
| memory (variable) | harder | no, but lost on refresh |

See [[17 JWT Authentication|JWT Authentication]].

## Other practices

- **Content Security Policy (CSP)** header to restrict where scripts can load from (Angular supports nonces via `ngCspNonce`).
- **Never trust the client:** route guards and hidden buttons are UX; authorization must be enforced by the API ([[18 Route Guards|Route Guards]]).
- **No secrets in the frontend:** anything in the bundle or `environment.ts` is public.
- **HTTPS everywhere.**
- **Keep Angular and dependencies updated** (`ng update`, `npm audit`).
