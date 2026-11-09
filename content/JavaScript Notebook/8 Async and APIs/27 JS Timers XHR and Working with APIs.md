---
title: 27. Timers, XHR and Working with APIs
tags:
  - JavaScript
---

> [!summary] In one line
> `setTimeout` and `setInterval` schedule code for **later**. Nesting callbacks for every step creates **callback hell**, which promises fix. `XMLHttpRequest` is the old way to call servers, `fetch` is the modern one, and every API call needs the same few things: a URL, a method, headers, a body and error handling.

Builds on [[26 JS Asynchronous JavaScript|Asynchronous JavaScript]] and [[28 JS Fetch and JSON|Fetch and JSON]].

## `setTimeout`

```js
const id = setTimeout((name) => console.log(`Hi ${name}`), 1000, 'Asha');  // extra args go to the callback
clearTimeout(id);          // cancel before it runs

setTimeout(() => console.log('later'), 0);
console.log('now');        // 'now' prints first: even 0ms waits for the current code to finish
```

- The delay is a **minimum**, not a promise. The callback runs when the call stack is empty and it's the timer's turn in the [[26 JS Asynchronous JavaScript|event loop]].
- Browsers raise the delay to at least 4ms once timers are nested 5 levels deep, and to about 1s or more in background tabs.
- `setTimeout('code', 100)` with a string works like `eval`. Never do it.

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
await sleep(500);          // the promise version
```

## `setInterval`

```js
let seconds = 0;
const timer = setInterval(() => {
  seconds++;
  if (seconds === 5) clearInterval(timer);   // always keep the id and clear it
}, 1000);
```

> [!warning] Intervals drift and can pile up
> If the callback takes longer than the interval (or does async work), runs can bunch up. A recursive `setTimeout` waits for each run to finish before scheduling the next:
> ```js
> async function poll() {
>   await checkForUpdates();
>   setTimeout(poll, 5000);   // the next run starts 5s after this one finished
> }
> poll();
> ```
> For animations use `requestAnimationFrame`, not timers.

> [!tip] Remember it
> **Timeout = an alarm (rings once). Interval = a metronome (keeps ticking until you stop it).** Both hand you an id: keep it so you can switch them off.

## Callbacks and callback hell

A **callback** is a function you pass in to be called later. Fine for one step. With several dependent async steps, each inside the last, you get the **pyramid of doom**:

```js
getUser(id, (err, user) => {
  if (err) return handle(err);
  getOrders(user, (err, orders) => {
    if (err) return handle(err);
    getDetails(orders[0], (err, details) => {
      if (err) return handle(err);
      render(details);              //  three levels deep, error handling repeated
    });
  });
});
```

**Problems:** hard to read, error handling repeated at every level, and **inversion of control** (you're trusting other code to call your function exactly once).

**Fixes:** name and flatten the functions, or better, use **promises** and `async`/`await`:

```js
try {
  const user = await getUser(id);
  const orders = await getOrders(user);
  render(await getDetails(orders[0]));
} catch (err) {
  handle(err);                      // one place for every error
}
```

## XMLHttpRequest (XHR)

The original way to make HTTP requests without reloading the page (the technique called AJAX). You'll meet it in older code, and libraries like jQuery's `$.ajax` and Axios (in browsers) still use it underneath.

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users');
xhr.responseType = 'json';
xhr.setRequestHeader('Accept', 'application/json');

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) console.log(xhr.response);
  else console.error('HTTP error', xhr.status);
};
xhr.onerror = () => console.error('Network error');
xhr.upload.onprogress = e => console.log(`${e.loaded}/${e.total} bytes`);
xhr.send();          // xhr.abort() cancels it
```

`readyState` goes `0` (unsent) → `1` (opened) → `2` (headers received) → `3` (loading) → `4` (done).

### XHR vs fetch

| | XMLHttpRequest | fetch |
| --- | --- | --- |
| Style | events and callbacks | promises (`await`) |
| HTTP 404/500 | you check `status` | still resolves: check `res.ok` |
| Network failure | `onerror` | promise rejects |
| Cancel | `xhr.abort()` | `AbortController` |
| Timeout | `xhr.timeout = 5000` | `signal: AbortSignal.timeout(5000)` |
| Upload progress |  `xhr.upload.onprogress` |  not built in |
| Streaming the response | No |  `res.body` |
| Available in | browsers | browsers, Node 18+, Deno, Bun |

## Working with APIs

An **API** (here: a web API) is a server's set of URLs that you send HTTP requests to and get data back from, usually as JSON.

**The parts of a request:**

| Part | Example |
| --- | --- |
| URL + query string | `https://api.example.com/posts?page=2&limit=10` |
| Method | `GET` read, `POST` create, `PUT`/`PATCH` update, `DELETE` remove |
| Headers | `Content-Type: application/json`, `Authorization: Bearer <token>` |
| Body | `JSON.stringify({ title: 'Hi' })` (not for `GET`) |

**Status codes to know:** `200` OK · `201` Created · `204` No Content · `400` Bad Request · `401` Unauthorized (not logged in) · `403` Forbidden (not allowed) · `404` Not Found · `429` Too Many Requests · `500` Server Error.

**A reusable helper:**

```js
async function api(path, { method = 'GET', body, token } = {}) {
  const url = new URL(path, 'https://api.example.com');
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
    signal: AbortSignal.timeout(8000),            // give up after 8s
  });
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

const params = new URLSearchParams({ q: 'js', page: 1 });
const posts = await api(`/posts?${params}`);
```

**Good habits:**
- Show **loading** and **error** states in the UI as well as the result.
- **Never put secret API keys in front-end code.** Anyone can read them in DevTools. Call your own server, which holds the key.
- **CORS:** a browser only lets a page read another origin's response if that server sends `Access-Control-Allow-Origin`. A CORS error has to be fixed on the server, not in your `fetch`.
- Respect rate limits (`429`): retry later, ideally with increasing delays.
- Cancel requests the user no longer needs (search-as-you-type) with `AbortController`.

> [!question] Recall
> 1. Why does `setTimeout(fn, 0)` run after the code below it?
> 2. Why can a recursive `setTimeout` be safer than `setInterval`?
> 3. What is callback hell, and what are two ways out of it?
> 4. Name three differences between XHR and fetch.
> 5. What's the difference between a `401` and a `403`? Why shouldn't API keys live in front-end code?

Prev: [[26 JS Asynchronous JavaScript|26. Asynchronous JavaScript]] · Next: [[28 JS Fetch and JSON|28. Fetch and JSON]]
