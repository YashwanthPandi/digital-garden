---
title: 8. Operators In Depth
tags:
  - JavaScript
---

> [!summary] In one line
> An **expression** is any piece of code that produces a value. **Operators** combine values into expressions. JS has ten groups of them: assignment, comparison, arithmetic, bitwise, logical, BigInt, string, conditional, comma and unary.

Everyday operators first: [[07 JS Operators and Type Coercion|Operators and Type Coercion]].

## Assignment operators

```js
let x = 10;
x += 5;    // x = x + 5    → 15
x -= 3;    // 12
x *= 2;    // 24
x /= 4;    // 6
x %= 4;    // 2
x **= 3;   // 8

// Logical assignment (ES2021): only assigns when needed
user.name ||= 'Guest';     // assign if name is falsy
user.age  ??= 18;          // assign if age is null/undefined
user.isAdmin &&= check();  // assign only if isAdmin is truthy

// Destructuring assignment
const [first, second] = [1, 2];
const { name, age = 0 } = user;
[a, b] = [b, a];           // swap
```

`=` is itself an expression that returns the assigned value, so `a = b = 5` sets both.

## Comparison operators

```js
5 == '5'     // true  (converts)      5 === '5'  // false (strict)
5 != '5'     // false                 5 !== '5'  // true
3 > 2, 3 >= 3, 2 < 3, 2 <= 2          // all true
null >= 0    // true   (relational ops turn null into 0)
null == 0    // false  (== has its own rules)
```

Full rules: [[09 JS Equality Comparisons|Equality Comparisons]].

## Arithmetic operators

```js
7 + 2   // 9        7 - 2   // 5
7 * 2   // 14       7 / 2   // 3.5 (no integer division)
7 % 2   // 1        -7 % 2  // -1  ← sign follows the left number
2 ** 10 // 1024     2 ** 3 ** 2  // 512 (right to left: 2 ** 9)
(-2) ** 2   // 4    -2 ** 2      //  SyntaxError: add brackets

let i = 1;
i++;    // returns 1, then i is 2 (postfix: use, then add)
++i;    // i is 3, returns 3      (prefix: add, then use)
1 / 0   // Infinity    0 / 0   // NaN
```

## Bitwise operators

They turn numbers into **32-bit integers** and work on the individual bits.

| Operator | Name | `5` (`101`) op `3` (`011`) |
| --- | --- | --- |
| `&` | AND | `1` (`001`) |
| `\|` | OR | `7` (`111`) |
| `^` | XOR | `6` (`110`) |
| `~` | NOT | `~5` → `-6` |
| `<<` | left shift | `5 << 1` → `10` |
| `>>` | sign-keeping right shift | `-16 >> 2` → `-4` |
| `>>>` | zero-fill right shift | `-1 >>> 0` → `4294967295` |

```js
n & 1                    // 1 if n is odd, 0 if even
x | 0                    // drop decimals (only for numbers within 32 bits)

// Flags: pack several on/off settings into one number
const READ = 1, WRITE = 2, EXEC = 4;   // 001, 010, 100
let perms = READ | WRITE;              // 011
perms & WRITE;                         // 2 → truthy: can write
perms &= ~WRITE;                       // remove WRITE → 001
```

## Logical operators

They return **one of the operands**, not necessarily `true`/`false`, and they **short-circuit** (stop as soon as the answer is known).

```js
'a' || 'b'     // 'a'  (first truthy)
'' || 'b'      // 'b'
'a' && 'b'     // 'b'  (first falsy, or the last value)
0 ?? 5         // 0    (?? only skips null/undefined)
null ?? 5      // 5
!'a'           // false
user?.address?.city   // undefined instead of an error if anything is missing

a || b ?? c    //  SyntaxError: mixing ?? with || or && needs brackets
```

## BigInt operators

BigInts work with `+ - * / % **`, comparisons and bitwise operators, with a few rules:

```js
10n + 5n     // 15n
7n / 2n      // 3n  (rounds toward zero)
10n + 5      //  TypeError: convert one side first
+10n         //  TypeError: unary + isn't allowed
10n >>> 1n   //  TypeError: no zero-fill shift (BigInts have no fixed width)
5n > 3       // true (comparing with numbers is fine)
```

## String operators

```js
'Hello' + ' ' + 'world'   // concatenation
let msg = 'Hi';
msg += '!';               // 'Hi!'
`Total: ${2 + 3}`         // template literal, usually clearer than +

'apple' < 'banana'        // true: compared character by character (UTF-16 codes)
'Z' < 'a'                 // true  capitals come first
'10' < '9'                // true  text, not numbers
'é'.localeCompare('f')    // -1: use this for real alphabetical sorting
```

## Conditional (ternary) operator

The only operator with three operands: `condition ? ifTrue : ifFalse`.

```js
const fee = isMember ? 0 : 50;
const label = score > 90 ? 'A' : score > 60 ? 'B' : 'C';  // chaining: keep it short
```

## Comma operator

Evaluates each expression left to right and returns the **last** one.

```js
let x = (1, 2, 3);   // 3
for (let i = 0, j = 10; i < j; i++, j--) { }   // the only common use
```

Not to be confused with commas in arrays, arguments or `let a, b` declarations, which are just separators.

## Unary operators

Operators that take **one** operand.

```js
+'3'          // 3 (to number)
-'3'          // -3
!true         // false
~5            // -6
typeof 42     // 'number'
delete obj.key    // removes a property, returns true (can't delete variables)
void 0        // always undefined
i++; --i;     // increment / decrement
await promise // inside async functions
```

## Relational operators

```js
'name' in user          // true if the property exists (own or inherited)
[] instanceof Array     // true if Array.prototype is in the chain
```

## Operator precedence (high → low)

| Level | Operators |
| --- | --- |
| Grouping | `( )` |
| Member, call, `new`, optional chaining | `.` `[]` `()` `?.` |
| Postfix / prefix | `x++` `x--` / `!` `~` `+x` `-x` `++x` `typeof` `delete` `await` |
| Exponent | `**` (right to left) |
| Multiply | `*` `/` `%` |
| Add | `+` `-` |
| Shift | `<<` `>>` `>>>` |
| Relational | `<` `<=` `>` `>=` `in` `instanceof` |
| Equality | `==` `!=` `===` `!==` |
| Bitwise | `&` then `^` then `\|` |
| Logical | `&&` then `\|\|` and `??` |
| Ternary, assignment, arrow | `? :` `=` `+=` … `=>` (right to left) |
| Comma | `,` |

> [!tip] Remember it
> **"Please Excuse My Dear Aunt Sally"** still works for maths (Parentheses, Exponents, Multiply/Divide, Add/Subtract). For everything else: **when in doubt, add brackets.**

> [!question] Recall
> 1. What's the difference between `||=`, `&&=` and `??=`?
> 2. What does `x++` return compared with `++x`?
> 3. How would you use bitwise flags to store permissions?
> 4. Why does `10n + 5` throw, and how do you fix it?
> 5. What does the comma operator return?

Prev: [[07 JS Operators and Type Coercion|7. Operators and Type Coercion]] · Next: [[09 JS Equality Comparisons|9. Equality Comparisons]]
