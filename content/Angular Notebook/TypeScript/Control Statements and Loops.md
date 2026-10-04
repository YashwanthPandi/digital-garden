---
title: Control Statements and Loops
tags:
  - TypeScript
---

## Control statements

- **Conditional:** ternary, if / else if / else, switch
- **Loops:** for, while, do-while, for-of
- **Branching:** break, continue, return

```ts
if (condition) {
} else if (condition) {
} else {
}

switch (caseNo) {
  case 1:
    /* ... */ break
  case 2:
    /* ... */ break
  default: /* ... */
}
```

**When to use which?**

- if/else → complex conditions or multiple lines of code
- ternary → simple conditions
- switch → switching between fixed values

## Loops

for loop · while · do-while · for-of · for-in · Array forEach

```ts
for (let i: number = 1; i <= 5; i++) {}

let i: number = 0 // initialize
while (condition) {
  // executing
  i++ // increment
}

do {
  // do something and check
} while (condition)
```

- **for loop:** initialization, condition and increment are mandatory; we know the condition and when to start and where to stop.
- **while loop:** only the condition is mandatory.
- **do-while:** do something before the condition executes.
- **break:** exits the loop when the break condition is satisfied.
- **continue:** skips the iteration where the condition is satisfied.

## Advanced looping: `for...of` and `forEach`

```ts
for (const item of items) {
  console.log(item)
} // item = temp variable per iteration

const names: string[] = ["Yash", "Bash", "Mash"]
names.forEach((name) => {
  console.log(name)
}) // method applied on an array
```
