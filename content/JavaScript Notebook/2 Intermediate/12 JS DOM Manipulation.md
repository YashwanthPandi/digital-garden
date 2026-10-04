---
title: 12. DOM Manipulation
tags:
  - JavaScript
  - HTML
---

> [!summary] In one line
> The **DOM** (Document Object Model) is the browser's **tree of objects** built from your HTML. JavaScript changes the page by changing this tree.

```
document
 └─ html
     ├─ head
     └─ body
         ├─ h1
         └─ ul
             ├─ li
             └─ li
```

🧠 **HTML is the blueprint; the DOM is the actual building that JS can renovate live.**

## 1. Select

```js
document.getElementById('title');
document.querySelector('.card');        // FIRST match, any CSS selector
document.querySelectorAll('ul > li');   // ALL matches (NodeList, has forEach)
```

> [!tip] 🧠 Remember it
> Just learn **`querySelector`** (one) and **`querySelectorAll`** (all). They take the same selectors as CSS.

## 2. Change

```js
const h1 = document.querySelector('h1');
h1.textContent = 'Hello';               // plain text (safe)
h1.innerHTML = '<em>Hello</em>';        // parses HTML (⚠️ XSS risk with user input)
h1.style.color = 'tomato';              // inline style (camelCase: backgroundColor)
h1.classList.add('active');             // prefer classes over inline styles
h1.classList.remove('active');
h1.classList.toggle('dark');
h1.setAttribute('data-id', '7');
h1.dataset.id;                          // '7' (reads data-* attributes)
input.value;                            // form field value
```

## 3. Create, add, remove

```js
const li = document.createElement('li');
li.textContent = 'New item';
list.append(li);          // add at end (also: prepend, before, after)
li.remove();              // delete
```

Adding many items? Build them in a `DocumentFragment` or a single string, then insert once (fewer reflows).

## 4. Traverse

```js
el.parentElement;  el.children;  el.firstElementChild;
el.nextElementSibling;  el.closest('.card');  // nearest ancestor matching
```

## When is the DOM ready?

```js
document.addEventListener('DOMContentLoaded', init);  // HTML parsed
// or just use <script defer>
```

> [!warning] Common mistakes
> - Running scripts before the element exists → `null`. Use `defer`.
> - `innerHTML` with user input → XSS. Use `textContent`.
> - `querySelectorAll` returns a NodeList, not an Array: use `[...nodes].map()` if you need array methods.

> [!question] Recall
> 1. What's the DOM?
> 2. `textContent` vs `innerHTML`?
> 3. How do you add a CSS class to an element?
