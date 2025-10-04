---
id: "nodejs-bullmq-job-queues-basics"
title: "BullMQ Job Queues — Basics"
sidebar_label: "BullMQ Job Queues — Basics"
description: "BullMQ Job Queues — Basics"
---

## Overview

**BullMQ** uses Redis to manage background jobs with retries, delays, and concurrency control.
It’s great for webhooks, emails, image processing, and workflow steps.
## Step-by-step

1. Install Redis and BullMQ packages.
2. Create a Queue to enqueue jobs and a Worker to process them.
3. Use attempts/backoff for retries and add logging/metrics.
## Examples

```js
// Queue + Worker — Node.js Example (2025)
const { Queue, Worker } = require("bullmq");
const connection = { host: "127.0.0.1", port: 6379 };

const q = new Queue("emails", { connection });
(async () => {
  await q.add("sendWelcome", { userId: 123 }, { attempts: 3, backoff: { type: "exponential", delay: 1000 } });
})();

new Worker("emails", async job => {
  console.log("processing", job.name, job.data);
  // send email...
}, { connection });
```
## Key Takeaways

- Choose a job id for idempotency when enqueueing.
- Use dead-letter queues/alerts for poison messages.
## Next Steps

- Add rate limiting and concurrency metrics.
