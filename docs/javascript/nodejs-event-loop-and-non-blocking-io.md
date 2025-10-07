---
title: Node.js Event Loop and Non-Blocking I/O
sidebar_position: 5
---

# Node.js Event Loop and Non-Blocking I/O

Understanding the Node.js event loop and non-blocking I/O is crucial for building high-performance applications. This article explores how these core concepts work together to enable JavaScript to handle concurrent operations efficiently.

## The Event Loop Architecture

Node.js uses a single-threaded event loop to handle asynchronous operations. This architecture allows Node.js to handle thousands of concurrent connections without the overhead of thread management.

### Event Loop Phases

The event loop operates in distinct phases:

```javascript
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

1. **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`
2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, Prepare**: Internal use only
4. **Poll**: Retrieves new I/O events and executes I/O-related callbacks
5. **Check**: Executes `setImmediate()` callbacks
6. **Close Callbacks**: Executes close event callbacks (e.g., `socket.on('close')`)

## Non-Blocking I/O

Node.js uses non-blocking I/O operations, meaning the program doesn't wait for I/O operations to complete before moving on to other tasks.

### Blocking vs. Non-Blocking Example

**Blocking (Synchronous)**:
```javascript
const fs = require('fs');

// This blocks the entire event loop
const data = fs.readFileSync('large-file.txt', 'utf8');
console.log(data);
console.log('Done reading'); // Only logs after file is completely read
```

**Non-Blocking (Asynchronous)**:
```javascript
const fs = require('fs');

// This doesn't block the event loop
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('Reading file...'); // Logs immediately, before file is read
```

### Modern Async/Await Approach

```javascript
const fs = require('fs').promises;

async function readFileAsync() {
  try {
    console.log('Starting to read file...');
    const data = await fs.readFile('large-file.txt', 'utf8');
    console.log('File content:', data);
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

// Non-blocking: other code can execute while file is being read
readFileAsync();
console.log('This logs immediately');
```

## Common Pitfalls

### 1. Blocking the Event Loop

**Problem**: CPU-intensive operations block the event loop:

```javascript
// BAD: This blocks the event loop
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/slow', (req, res) => {
  const result = fibonacci(40); // Blocks for several seconds
  res.json({ result });
});
```

**Solution**: Use Worker Threads for CPU-intensive tasks:

```javascript
const { Worker } = require('worker_threads');

app.get('/fast', async (req, res) => {
  const worker = new Worker('./fibonacci-worker.js', {
    workerData: { n: 40 }
  });
  
  worker.on('message', (result) => {
    res.json({ result });
  });
  
  worker.on('error', (error) => {
    res.status(500).json({ error: error.message });
  });
});
```

### 2. Mixing Sync and Async Code

**Problem**: Unexpected execution order:

```javascript
// BAD: Mixing patterns
function processData() {
  const syncData = fs.readFileSync('config.json'); // Blocks
  fs.readFile('data.json', (err, asyncData) => {  // Non-blocking
    // asyncData arrives later than expected
    console.log('Async data:', asyncData);
  });
  return syncData; // Returns before asyncData is available
}
```

**Solution**: Use consistent async patterns:

```javascript
// GOOD: Consistent async/await
async function processData() {
  const configData = await fs.promises.readFile('config.json', 'utf8');
  const data = await fs.promises.readFile('data.json', 'utf8');
  return { config: JSON.parse(configData), data: JSON.parse(data) };
}
```

### 3. Unhandled Promise Rejections

**Problem**: Silent failures:

```javascript
// BAD: Promise rejection not handled
fs.promises.readFile('nonexistent.txt')
  .then(data => console.log(data));
// Error goes unhandled
```

**Solution**: Always handle rejections:

```javascript
// GOOD: Proper error handling
fs.promises.readFile('nonexistent.txt')
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));

// Or with async/await
async function safeRead() {
  try {
    const data = await fs.promises.readFile('nonexistent.txt');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

### 4. Callback Hell

**Problem**: Nested callbacks become unreadable:

```javascript
// BAD: Callback hell
fs.readFile('file1.txt', (err1, data1) => {
  if (err1) throw err1;
  fs.readFile('file2.txt', (err2, data2) => {
    if (err2) throw err2;
    fs.readFile('file3.txt', (err3, data3) => {
      if (err3) throw err3;
      console.log(data1, data2, data3);
    });
  });
});
```

**Solution**: Use Promises or async/await:

```javascript
// GOOD: Clean async/await
async function readFiles() {
  try {
    const data1 = await fs.promises.readFile('file1.txt', 'utf8');
    const data2 = await fs.promises.readFile('file2.txt', 'utf8');
    const data3 = await fs.promises.readFile('file3.txt', 'utf8');
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error reading files:', err);
  }
}

// Or use Promise.all for parallel execution
async function readFilesParallel() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fs.promises.readFile('file1.txt', 'utf8'),
      fs.promises.readFile('file2.txt', 'utf8'),
      fs.promises.readFile('file3.txt', 'utf8')
    ]);
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error reading files:', err);
  }
}
```

## Best Practices

### 1. Use Async/Await for Cleaner Code

```javascript
// Modern, readable approach
async function fetchUserData(userId) {
  const user = await db.getUser(userId);
  const posts = await db.getUserPosts(userId);
  const comments = await db.getUserComments(userId);
  return { user, posts, comments };
}
```

### 2. Leverage Promise.all for Parallel Operations

```javascript
// Execute independent operations in parallel
async function getUserProfile(userId) {
  const [user, posts, comments] = await Promise.all([
    db.getUser(userId),
    db.getUserPosts(userId),
    db.getUserComments(userId)
  ]);
  return { user, posts, comments };
}
```

### 3. Use setImmediate for Breaking Up Long Operations

```javascript
// Break up CPU-intensive work
function processLargeArray(array) {
  return new Promise((resolve) => {
    let index = 0;
    const batchSize = 100;
    const results = [];
    
    function processBatch() {
      const end = Math.min(index + batchSize, array.length);
      for (; index < end; index++) {
        results.push(expensiveOperation(array[index]));
      }
      
      if (index < array.length) {
        setImmediate(processBatch); // Yield to event loop
      } else {
        resolve(results);
      }
    }
    
    processBatch();
  });
}
```

### 4. Monitor Event Loop Lag

```javascript
let lastCheck = Date.now();

setInterval(() => {
  const now = Date.now();
  const lag = now - lastCheck - 1000;
  
  if (lag > 100) {
    console.warn(`Event loop lag: ${lag}ms`);
  }
  
  lastCheck = now;
}, 1000);
```

### 5. Use Appropriate Timing Functions

```javascript
// For I/O operations: setImmediate
setImmediate(() => {
  console.log('Executes after I/O events');
});

// For next tick (microtask): process.nextTick
process.nextTick(() => {
  console.log('Executes before I/O events');
});

// For delayed execution: setTimeout
setTimeout(() => {
  console.log('Executes after minimum delay');
}, 0);
```

## Performance Considerations

### Database Connection Pooling

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Reuses connections from pool
async function queryDatabase(sql, params) {
  const client = await pool.connect();
  try {
    return await client.query(sql, params);
  } finally {
    client.release(); // Returns connection to pool
  }
}
```

### Stream Processing for Large Data

```javascript
const fs = require('fs');
const readline = require('readline');

// Process large files line by line
async function processLargeFile(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  for await (const line of rl) {
    // Process line without loading entire file into memory
    await processLine(line);
  }
}
```

## Conclusion

Understanding the Node.js event loop and non-blocking I/O is essential for building scalable applications. Key takeaways:

- The event loop enables concurrent operations in a single thread
- Non-blocking I/O prevents operations from blocking the event loop
- Always use async patterns consistently
- Handle errors properly in async code
- Monitor event loop performance in production
- Use Worker Threads for CPU-intensive operations
- Leverage streams for large data processing

By following these patterns and avoiding common pitfalls, you can build high-performance Node.js applications that efficiently handle concurrent operations.
