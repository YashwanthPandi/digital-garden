---
title: Arrays, Tuples and Sets
tags:
  - TypeScript
---

## Array

A datatype that lets you store multiple values in a single datatype; used to store related data in a structured way, accessible by index.

```ts
let fruits: string[] = ["Apple", "Banana", ...];   // array only allows string elements
console.log(fruits[2]);
```

**Methods:** `push()` add at end · `pop()` remove from end · `unshift()` add at start · `shift()` remove at start

## Tuple

A fixed-size array where each element has a specific datatype.

```ts
let person: [string, number];
person = ["Happy", ...];
```

|          | Array                         | Tuple                                |
| -------- | ----------------------------- | ------------------------------------ |
| Length   | Not fixed                     | Fixed                                |
| Types    | Same                          | Different types allowed              |
| Order    | Doesn't define position/order | Order defined by type                |
| Use case | List of similar items         | Structured data with known positions |

For looping over arrays see [[Control Statements and Loops#Advanced looping: for...of and forEach|for...of and forEach]].

## Set

A collection that only saves unique values.

```ts
let setVarName = new Set()
let uniqueNumber = new Set<number>()
```

**Methods:** `.has`, `.add`, `.delete`, `.size`, `forEach`

**Set vs Array** _(as written; some cells look swapped)_

| Feature          | Set                        | Array                           |
| ---------------- | -------------------------- | ------------------------------- |
| Duplicate values | Not allowed                | Allowed                         |
| Order            | Ordered                    | Ordered (insertion order)       |
| Access           | By index                   | No index access                 |
| Use case         | When duplicates are needed | When unique values are required |

## Map ?

_(Left empty.)_
