---
title: 7. Objects
tags:
  - JavaScript
---

> [!summary] In one line
> An object is a collection of **key → value** pairs, like a labelled drawer cabinet. Almost everything in JS is an object.

```js
const user = {
  name: 'Asha',
  age: 21,
  'fav color': 'blue',          // keys with spaces need quotes
  greet() { return `Hi, I'm ${this.name}`; },  // method
};

user.name;              // dot notation
user['fav color'];      // bracket notation (spaces, or a key in a variable)
const key = 'age'; user[key]; // 21
user.email = 'a@x.com'; // add
delete user.age;        // remove
'name' in user;         // true
```

> [!tip] 🧠 Remember it
> **Dot when you know the name, brackets when the name is in a variable or has weird characters.**

## Shorthand and computed keys

```js
const name = 'Ravi', age = 30;
const p = { name, age };              // same as { name: name, age: age }
const field = 'score';
const r = { [field]: 99 };            // { score: 99 }
```

## Looping over objects

```js
Object.keys(user);     // ['name', 'age', ...]
Object.values(user);   // ['Asha', 21, ...]
Object.entries(user);  // [['name','Asha'], ['age',21], ...]

for (const [k, v] of Object.entries(user)) console.log(k, v);
```

## Copying

```js
const shallow = { ...user };              // or Object.assign({}, user)
const deep = structuredClone(user);       // nested objects copied too
```

🧠 **Shallow copy = new box, same toys inside. Deep copy = new box, new toys.**

## Freezing

```js
Object.freeze(cfg);  // can't add, remove or change (shallow)
Object.seal(cfg);    // can change values, can't add/remove keys
```

## JSON

```js
const text = JSON.stringify(user);  // object → string (functions are dropped)
const back = JSON.parse(text);      // string → object
```

> [!warning] Common mistakes
> - Comparing objects with `===` compares **references**, not contents: `{} === {}` is `false`.
> - Spread copies are **shallow**; nested objects are still shared.

> [!question] Recall
> 1. When must you use bracket notation?
> 2. What's the difference between `Object.keys` and `Object.entries`?
> 3. How do you make a deep copy?
