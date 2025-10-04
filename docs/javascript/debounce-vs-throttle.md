---
id: "javascript-debounce-vs-throttle"
title: "Debounce vs Throttle"
sidebar_label: "Debounce vs Throttle"
description: "Debounce vs Throttle"
---

## Overview

**Debounce** waits for inactivity before running a function (great for search inputs).
**Throttle** ensures a function runs at most once per time window (great for scroll/resize handlers).
## Examples

```js
// Implementations — Node.js Example (2025)
function debounce(fn, wait){
  let t; return (...args) => {
    clearTimeout(t);
    t = setTimeout(()=> fn(...args), wait);
  };
}
function throttle(fn, wait){
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait){
      last = now; fn(...args);
    }
  };
}
```
## Key Takeaways

- Debounce for *trailing* behavior; throttle for *rate limiting*.
- Mind leading/trailing edge options for UX feel.
## Next Steps

- Combine with IntersectionObserver for efficient UIs.
