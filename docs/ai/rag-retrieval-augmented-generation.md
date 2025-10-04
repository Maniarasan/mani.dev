---
id: "ai-rag-retrieval-augmented-generation"
title: "RAG — Retrieval‑Augmented Generation"
sidebar_label: "RAG — Retrieval‑Augmented Generation"
description: "RAG — Retrieval‑Augmented Generation"
---

## Overview

**RAG** combines retrieval (find relevant context) with generation (LLM answers) to reduce hallucinations and keep responses grounded in your data.
A classic pipeline: embed documents, index vectors, retrieve top‑k for a query, then stuff or map‑reduce into the LLM prompt.
## Why it matters

- Keep models up to date without full fine‑tuning.
- Control latency/cost with indexing and caching.
- Improve factuality and cite sources.
## Step-by-step

1. Preprocess and chunk your corpus; compute embeddings.
2. At query time, retrieve top‑k chunks by similarity.
3. Build the prompt with instructions + retrieved chunks.
4. Generate answer, optionally with citations and tool calls.
## Examples

```python
# Minimal RAG skeleton — Python Example (2025)
# Pseudocode skeleton; plug in your embedding + LLM providers.
def retrieve(query, k=4):
    # return top-k documents from your vector index
    return ["Doc A...", "Doc B..."]

def build_prompt(q, ctx):
    return f"Answer based on:\n{chr(10).join(ctx)}\nQ: {q}\nA:"

def rag_answer(q):
    ctx = retrieve(q, 4)
    prompt = build_prompt(q, ctx)
    # llm = ...  # call your LLM
    return "Answer using retrieved context."

print(rag_answer("What is RAG?"))
```

```js
// Minimal RAG skeleton — Node.js Example (2025)
function retrieve(query, k=4){
  return ["Doc A...", "Doc B..."];
}
function buildPrompt(q, ctx){
  return `Answer based on:\n${ctx.join("\n")}\nQ: ${q}\nA:`;
}
async function ragAnswer(q){
  const ctx = retrieve(q, 4);
  const prompt = buildPrompt(q, ctx);
  // const out = await callLLM(prompt);
  return "Answer using retrieved context.";
}
console.log(await ragAnswer("What is RAG?"));
```
## Key Takeaways

- Garbage in → garbage out: invest in chunking and metadata.
- Use re‑ranking for better top‑k quality when needed.
- Cache frequent queries and retrieved contexts.
## Next Steps

- Try hybrid retrieval (BM25 + vectors).
- Add evaluation: faithfulness and answer quality.
