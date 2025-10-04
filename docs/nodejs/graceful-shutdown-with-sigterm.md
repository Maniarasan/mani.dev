---
id: "nodejs-graceful-shutdown-with-sigterm"
title: "Graceful Shutdown with SIGTERM"
sidebar_label: "Graceful Shutdown with SIGTERM"
description: "Graceful Shutdown with SIGTERM"
---

## Overview

In production, your process will receive **SIGTERM** during deploys or autoscaling.
A graceful shutdown stops accepting new work, drains existing requests, closes connections, and exits cleanly to avoid data loss.
## Step-by-step

1. Listen for SIGTERM/SIGINT and start a shutdown timer.
2. Stop accepting new requests (e.g., server.close).
3. Drain active connections and finish in-flight jobs.
4. Exit with code 0; force-exit if the timer elapses.
## Examples

```js
// Express + HTTP server — Node.js Example (2025)
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (req,res)=> res.send("ok"));

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> console.log("listening", PORT));

function shutdown(){
  console.log("Shutting down...");
  server.close(()=> {
    console.log("HTTP server closed.");
    process.exit(0);
  });
  setTimeout(()=>{
    console.error("Forcing shutdown");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
```
## Key Takeaways

- Always set a max timeout; networks can hang.
- Close DB/queue connections explicitly in shutdown.
- Prefer idempotent handlers to simplify retries.
## Next Steps

- Add health/readiness probes for rolling deploys.
