---
id: "nodejs-node-streams-backpressure-explained"
title: "Node Streams — Backpressure Explained"
sidebar_label: "Node Streams — Backpressure Explained"
description: "Node Streams — Backpressure Explained"
---

## Overview

Streams process data incrementally.
**Backpressure** occurs when the consumer is slower than the producer; if not handled, memory usage spikes and throughput drops.
## Step-by-step

1. Prefer `.pipe()` which handles backpressure automatically.
2. For manual reads, respect `stream.write()` return values.
3. Use `drain` events to resume writing when ready.
## Examples

```js
// .pipe() with backpressure — Node.js Example (2025)
const fs = require("fs");
const zlib = require("zlib");
fs.createReadStream("big.log")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("big.log.gz"))
  .on("finish", ()=> console.log("done"));
```
## Key Takeaways

- Backpressure is a *signal* to slow down producers.
- Use highWaterMark wisely for memory/throughput trade‑offs.
## Next Steps

- Explore stream.Transform for custom processing.
