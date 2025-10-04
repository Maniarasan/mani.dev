---
id: "javascript-closures-practical-examples"
title: "Closures — Practical Examples"
sidebar_label: "Closures — Practical Examples"
description: "Closures — Practical Examples"
---

## Overview

A **closure** is a function remembering the bindings of its lexical environment.
Closures enable data privacy, function factories, and partial application.
## Examples

```js
// Private state via closure — Node.js Example (2025)
function makeCounter(){
  let n = 0;
  return { inc: () => ++n, get: () => n };
}
const c = makeCounter();
console.log(c.inc()); // 1
console.log(c.get()); // 1
```

```js
// Function factory — Node.js Example (2025)
const add = x => y => x + y;
const add10 = add(10);
console.log(add10(3)); // 13
```
## Key Takeaways

- Closures capture variables by reference, not by value.
- Beware of closures inside loops without block scoping.
## Next Steps

- Explore module patterns and IIFEs for encapsulation.
