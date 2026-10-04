---
title: 17. Fetch and JSON
tags:
  - JavaScript
---

> [!summary] In one line
> `fetch(url)` sends an HTTP request and returns a Promise of a **Response**; call `.json()` on it to get data.

## GET

```js
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);  // fetch does NOT reject on 404/500!
  const users = await res.json();                       // second await: body is a stream
  return users;
}
```

> [!tip] 🧠 Remember it
> **Two awaits and a check:** `await fetch` → check `res.ok` → `await res.json()`.
> fetch only rejects on **network** failure, never on HTTP error codes.

## POST / PUT / DELETE

```js
await fetch('/api/users', {
  method: 'POST',                                   // PUT, PATCH, DELETE
  headers: { 'Content-Type': 'application/json',
             Authorization: `Bearer ${token}` },
  body: JSON.stringify({ name: 'Asha' }),           // objects must be stringified
});
```

## HTTP methods (CRUD)

| CRUD | Method | Example |
| --- | --- | --- |
| Create | `POST` | add a user |
| Read | `GET` | list users |
| Update | `PUT` (replace) / `PATCH` (partial) | edit a user |
| Delete | `DELETE` | remove a user |

Status codes: **2xx** ok · **3xx** redirect · **4xx** your fault (400 bad, 401 not logged in, 403 forbidden, 404 not found) · **5xx** server's fault.

## JSON

JavaScript Object Notation: text format for data. Keys **must** be in double quotes; no functions, `undefined`, or comments.

```js
JSON.stringify({ a: 1 });         // '{"a":1}'
JSON.parse('{"a":1}');            // { a: 1 }
JSON.stringify(obj, null, 2);     // pretty print
```

## Cancel a request

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```

**CORS** errors mean the *server* didn't allow your site's origin; it's fixed on the server, not in your fetch code.

> [!question] Recall
> 1. Does `fetch` reject on a 404? How do you detect it?
> 2. Why are there two `await`s?
> 3. PUT vs PATCH?
