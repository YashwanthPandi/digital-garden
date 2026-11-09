---
title: 6. Type Casting
tags:
  - JavaScript
---

> [!summary] In one line
> **Type conversion** is changing a value from one type to another. When **you** do it on purpose it's *explicit casting*. When **JS** does it behind your back it's *implicit casting*, also called **coercion**.

Quick version first: [[07 JS Operators and Type Coercion|Operators and Type Coercion]].

## Conversion vs coercion

```js
Number('42');   // 42  ← explicit: you asked for it
'42' * 1;       // 42  ← implicit: JS coerced the string because * needs numbers
```

There are only **three targets**: **string**, **number** and **boolean**. Objects first become a primitive, then one of these.

> [!tip] Remember it
> **Explicit = you decide. Implicit = JS guesses.** Prefer deciding.

## Explicit casting

```js
// → string
String(123)        // '123'
(123).toString()   // '123'   (toString fails on null/undefined)
String(null)       // 'null'
`${42}`            // '42'

// → number
Number('3.5')      // 3.5
Number('')         // 0
Number(' 12 ')     // 12  (whitespace trimmed)
Number('12px')     // NaN (the whole string must be numeric)
parseInt('12px', 10)   // 12  (reads digits from the start, stops at junk)
parseFloat('3.5kg')    // 3.5
+'7'               // 7   (unary plus = Number())

// → boolean
Boolean('hi')      // true
Boolean(0)         // false
!!'hi'             // true (double NOT = Boolean())
```

> [!warning] Always pass a radix to `parseInt`
> `parseInt('0x1f')` is `31` (read as hex). `parseInt('08', 10)` is unambiguous. And `parseInt(0.0000005)` is `5`, because the number becomes the string `'5e-7'` first.

## Conversion tables

**To number**

| Value | `Number(value)` |
| --- | --- |
| `undefined` | `NaN` |
| `null` | `0` |
| `true` / `false` | `1` / `0` |
| `''`, `'  '` | `0` |
| `'42'`, `' 42 '` | `42` |
| `'42abc'` | `NaN` |
| `[]` | `0` |
| `[5]` | `5` |
| `[1, 2]` | `NaN` |
| `{}` | `NaN` |

**To boolean.** Only these 8 are **falsy**. Everything else is truthy:

`false` · `0` · `-0` · `0n` · `''` · `null` · `undefined` · `NaN`

So `'0'`, `'false'`, `' '`, `[]` and `{}` are all **truthy**.

**To string**

| Value | `String(value)` |
| --- | --- |
| `null` / `undefined` | `'null'` / `'undefined'` |
| `[1, 2]` | `'1,2'` |
| `[]` | `''` |
| `{}` | `'[object Object]'` |
| `Symbol('x')` | `'Symbol(x)'` (but `` `${sym}` `` throws `TypeError`) |

## Implicit casting (coercion)

**Where it happens:**

| Situation | JS converts to |
| --- | --- |
| `+` with at least one string | string (concatenation) |
| `-`, `*`, `/`, `%`, `**`, unary `+` | number |
| `if`, `while`, `!`, `&&`, `\|\|`, ternary | boolean |
| `==` between different types | usually number (see [[09 JS Equality Comparisons\|Equality Comparisons]]) |
| `<`, `>` with mixed types | number (two strings compare alphabetically) |
| template literals `` `${x}` `` | string |

```js
'5' + 1       // '51'  ← + with a string concatenates
'5' - 1       // 4     ← - only does maths
'5' * '2'     // 10
true + 1      // 2
null + 1      // 1     (null → 0)
undefined + 1 // NaN   (undefined → NaN)
[] + []       // ''    (both become '')
[] + {}       // '[object Object]'
'3' > '12'    // true  ← two strings: compares '3' with '1' alphabetically
3 > '12'      // false ← one number: '12' → 12
```

> [!tip] Remember it
> **Plus is a people-pleaser:** see a string, glue strings. **Every other maths operator is a mathematician:** everything becomes a number.

## How objects become primitives

When an object is used where a primitive is needed, JS calls (in order):

1. `obj[Symbol.toPrimitive](hint)` if it exists
2. otherwise `valueOf()` then `toString()` (for the `'string'` hint: `toString()` first)

```js
const price = {
  amount: 99,
  valueOf() { return this.amount; },
  toString() { return `₹${this.amount}`; },
};
price + 1;        // 100    (valueOf)
`${price}`;       // '₹99'  (toString)
```

> [!warning] Common mistakes
> - Adding form inputs: `input.value + 1` gives `'51'`. Convert first: `Number(input.value) + 1`.
> - Treating `'0'` or `[]` as falsy.
> - Using `parseInt` on values that aren't strings.

> [!question] Recall
> 1. What's the difference between conversion and coercion?
> 2. What are `'5' + 1`, `'5' - 1` and `[] + []`? Why?
> 3. List all 8 falsy values.
> 4. When does `Number(x)` beat `parseInt(x)`, and when is it the other way round?

Prev: [[05 JS Strings and Numbers|5. Strings and Numbers]] · Next: [[07 JS Operators and Type Coercion|7. Operators and Type Coercion]]
