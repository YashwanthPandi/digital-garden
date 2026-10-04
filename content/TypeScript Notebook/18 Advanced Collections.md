---
title: 18. Advanced Collections
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> **Set** = unique values only. **Map** = key → value pairs where the keys can be any type. Pick the collection that matches the job.

## Q. What are collections? What types are there? ⭐ V. IMP.

Collections are built-in structures that **store, organize and manage groups of data** under a single variable, instead of many scattered variables.

| Collection | Example | Key point |
| --- | --- | --- |
| **Array** | `let arr: number[] = [1, 2, 3]` | Ordered, index access |
| **Tuple** | `let t: [string, number] = ["Alice", 20]` | Fixed length and types |
| **Set** | `new Set<string>(["apple", "orange"])` | **Unique values only** |
| **Map** | `new Map<K, V>()` | Key–value pairs, **keys can be any type** |
| **Object / Record** | `{ name: "Alice", age: 20 }` | String-like keys, values of any type |

## Q. What is a Set? How do you add, check, delete and iterate?

A `Set` stores **only unique values** and ignores duplicates automatically. Use it when values must be unique (e.g. a list of emails).

```ts
let uniqueNumbers = new Set<number>();

uniqueNumbers.add(10);
uniqueNumbers.add(20);
uniqueNumbers.add(10); // duplicate → ignored

console.log(uniqueNumbers.has(20)); // true
uniqueNumbers.delete(10);
console.log(uniqueNumbers.size);    // 1

uniqueNumbers.forEach(value => console.log(value)); // 20
```

> [!tip] Handy trick
> Remove duplicates from an array: `const unique = [...new Set(arr)];`

## Q. Set vs array: when to use which?

| Feature | Array | Set |
| --- | --- | --- |
| Duplicate values | ✅ Allowed | ❌ Not allowed |
| Order | Ordered | Ordered (insertion order) |
| Access | By index (`arr[0]`) | No index access |
| Use case | When duplicates are needed | When values must be unique |

## Q. What is a Map? How do you add, check, delete and iterate?

A `Map` stores **key–value pairs**. Each key is **unique** and can be **any data type**.

```
 Key  ──mapping──▶  Value
 US                 United States
 UK                 United Kingdom
 IN                 India
```

```ts
let users = new Map<number, string>();

users.set(1, "Happy");
users.set(2, "Anurag");
users.set(3, "Ganesh");

console.log(users.get(1)); // Happy
console.log(users.has(2)); // true
users.delete(3);
console.log(users.size);   // 2

users.forEach((value, key) => console.log(key, value));
// 1 Happy
// 2 Anurag
```

## Q. Map vs object: when to use which?

| Object | Map |
| --- | --- |
| Keys are strings (or symbols) only | **Any data type** can be a key |
| Optimized for a fixed set of known keys | Optimized for **frequent adds/removes** and lookups |
| No built-in `size` | Has `.size` |
| Use case: simple, fixed-shape data | Use case: dynamic or complex key–value data |

```ts
const user = { name: "Happy", age: 40 };
console.log(user.name, user["age"]);

const userMap = new Map<string, string | number>();
userMap.set("name", "Happy");
userMap.set("age", 40);
console.log(userMap.get("name"), userMap.get("age"));
```

> [!question] Recall
> - What happens when you `add` a duplicate to a Set?
> - Which collection allows an object as a key?
> - How do you de-duplicate an array in one line?

Prev: [[17 Error Handling|17. Error Handling]] · Back to [[TypeScript Notebook/index|TypeScript Notebook]]
