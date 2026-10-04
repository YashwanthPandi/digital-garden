---
title: 17. Error Handling
tags:
  - TypeScript
  - Interview
---

> [!summary] In one line
> `try` the risky code, `catch` the error if one is thrown, and `finally` clean up **whether it failed or not**. Use `throw` to raise your own error.

```
 try { risky code } ──error──▶ catch (error) { handle it }
        │                              │
        └────── always ──▶ finally { cleanup } ◀── always
```

## Q. What is exception handling? ⭐ V. IMP.

Exception handling is how a program **manages errors** at runtime so it doesn't crash, using `try`, `catch` and `finally`.

## Q. How do you implement exception handling in TS?

| Block | Role |
| --- | --- |
| `try` | Code where an error **might** happen |
| `catch` | Runs when the `try` block throws, and handles the error |
| `finally` | Runs **every time**, whether or not an exception happened |

```ts
try {
  let result = JSON.parse("invalid json"); // risky
  console.log(result);
} catch (error) {
  console.log("Something went wrong");     // handle
} finally {
  console.log("Finally block run");        // always
}
// Output:
// Something went wrong
// Finally block run
```

## Q. When do you use `finally`?

Mostly for **cleaning up resources**:

1. Closing DB connections
2. Closing I/O resources (files, streams)
3. Logging
4. Hiding a loading spinner

## Q. Can you have multiple `catch` blocks in TS?

**No.** A `try` can have only **one** `catch`. To handle different errors differently, check the error's type inside that one block:

```ts
try {
  JSON.parse("invalid json");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("Bad JSON");
  } else {
    console.log("Something else went wrong");
  }
}
```

> [!tip] Interview extra
> In strict mode the `catch` variable is typed **`unknown`**, so narrow it (`instanceof Error`) before reading `.message`.

## Q. What is the role of the `throw` keyword? When do you use it? ⭐ V. IMP.

`throw` **manually raises an error**. Control jumps to the **nearest `catch` block**, so the error can be handled safely. Use it for validation and for rule violations that callers must deal with.

```ts
function validateAge(age: number) {
  if (age <= 0) {
    throw new Error("Invalid age");
  }
  console.log("Valid age");
}

try {
  validateAge(-25);
} catch (error: any) {
  console.log(error.message);
}
// Output: Invalid age
```

> [!question] Recall
> - Which block runs even when no error is thrown?
> - How do you handle two kinds of errors with only one `catch`?
> - Where does control go after `throw`?


Prev: [[16 Abstract Classes and Interfaces|16. Abstract Classes and Interfaces]] · Next: [[18 Advanced Collections|18. Advanced Collections]]
