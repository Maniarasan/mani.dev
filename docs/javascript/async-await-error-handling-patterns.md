---
id: "javascript-async-await-error-handling-patterns"
title: "Async/Await — Error Handling Patterns"
sidebar_label: "Async/Await — Error Handling Patterns"
description: "Async/Await — Error Handling Patterns"
---

## Overview

`async/await` makes asynchronous code look synchronous, but errors still propagate as **rejected promises**.
Use `try/catch`, boundary wrappers, and utilities like `Promise.allSettled` for robustness.
## Examples

```js
// try/catch with boundary — Node.js Example (2025)
async function handler(){
  try {
    const data = await fetchJSON("/api/data");
    return data;
  } catch (err) {
    console.error("Failed to load", err);
    return { fallback: true };
  }
}
```

```js
// allSettled for independent tasks — Node.js Example (2025)
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
for (const r of results){
  if (r.status === "fulfilled") console.log("ok", r.value);
  else console.warn("failed", r.reason);
}
```
## Key Takeaways

- Use boundaries: catch at I/O edges, not everywhere.
- Prefer allSettled when tasks are independent.
## Next Steps

- Add request cancellation with AbortController.
