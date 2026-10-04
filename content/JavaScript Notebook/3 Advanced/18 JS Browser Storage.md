---
title: 18. Browser Storage
tags:
  - JavaScript
---

> [!summary] In one line
> Browsers can remember data: **localStorage** (forever), **sessionStorage** (this tab only), **cookies** (small, sent to the server).

```js
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');      // 'dark'
localStorage.removeItem('theme');
localStorage.clear();

// stores strings only → use JSON for objects
localStorage.setItem('cart', JSON.stringify(cart));
const cart = JSON.parse(localStorage.getItem('cart')) ?? [];
```

`sessionStorage` has the exact same methods.

| | localStorage | sessionStorage | Cookies |
| --- | --- | --- | --- |
| Lifetime | until cleared | until tab closes | until expiry date |
| Size | ~5–10 MB | ~5 MB | ~4 KB |
| Sent to server | no | no | **yes, every request** |
| Readable by JS | yes | yes | yes, unless `HttpOnly` |
| Scope | origin | origin + tab | domain/path |

> [!tip] 🧠 Remember it
> **local = Long-lived, session = Short-lived, cookies = Carried to the server.**

## Cookies

```js
document.cookie = 'lang=en; max-age=86400; path=/; SameSite=Lax';
```

Auth cookies should be set by the **server** with `HttpOnly; Secure; SameSite`, so JS (and XSS attacks) can't read them.

## IndexedDB

A real in-browser database for large or structured data (offline apps). Use a wrapper like `idb`.

> [!warning] Common mistakes
> - Storing tokens or passwords in localStorage: any XSS can steal them.
> - Forgetting `JSON.stringify`: you'll store `"[object Object]"`.

> [!question] Recall
> 1. Which storage is cleared when the tab closes?
> 2. Which one is sent with every HTTP request?
> 3. How do you store an array in localStorage?
