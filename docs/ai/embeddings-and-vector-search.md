---
id: "ai-embeddings-and-vector-search"
title: "Embeddings and Vector Search"
sidebar_label: "Embeddings and Vector Search"
description: "Embeddings and Vector Search"
---

## Overview

**Embeddings** map text (or other modalities) into vectors such that similar meanings are close in vector space.
**Vector search** retrieves the most similar items using metrics like cosine similarity, dot‑product, or L2 distance.
## Why it matters

- Power semantic search, recommendations, clustering, and RAG.
- Support multilingual and domain‑specific retrieval.
- Enable fast nearest‑neighbor search via indexes.
## Step-by-step

1. Choose an embedding model appropriate to your task/latency.
2. Normalize/standardize text (lowercase, strip markup, split into chunks).
3. Index vectors in a store (FAISS, pgvector, or a managed service).
4. Retrieve top‑k neighbors and post‑filter by metadata.
## Examples

```python
# Cosine similarity — Python Example (2025)
import numpy as np

def cos_sim(a, b):
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

print(cos_sim([1,0,0],[0.5,0,0]))  # 1.0
```

```js
// Cosine similarity — Node.js Example (2025)
function cosSim(a,b){
  const dot = a.reduce((s,v,i)=>s+v*b[i],0);
  const n = Math.sqrt(a.reduce((s,v)=>s+v*v,0)) * Math.sqrt(b.reduce((s,v)=>s+v*v,0));
  return dot / n;
}
console.log(cosSim([1,0,0],[0.5,0,0])); // 1
```
## Key Takeaways

- Chunking strategy strongly affects retrieval quality.
- Cosine similarity is popular when vectors are L2‑normalized.
- Metadata filters are essential for relevance.
## Next Steps

- Integrate with a vector DB and test queries.
- Evaluate retrieval with labeled datasets (precision@k).
