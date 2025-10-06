---
sidebar_position: 7
---

# Getting Started with Vector Search

Vector search has become a fundamental building block of modern AI applications. Whether you're building semantic search, recommendation systems, or retrieval-augmented generation (RAG) pipelines, understanding vector search is essential.

## What is Vector Search?

Vector search (also called semantic search or similarity search) finds data based on meaning rather than exact keyword matches. It works by:

1. **Converting data into vectors** (embeddings) that capture semantic meaning
2. **Measuring similarity** between vectors using mathematical distance metrics
3. **Retrieving the most similar items** efficiently from large datasets

### Traditional Search vs. Vector Search

**Traditional Keyword Search:**
```text
Query: "quick brown fox"
Matches: Documents containing exactly "quick", "brown", and "fox"
Misses: "fast amber canine" (semantically similar but no keyword match)
```

**Vector Search:**
```text
Query: "quick brown fox"
Matches: Documents about fast animals, regardless of exact wording
Finds: "rapid red wolf", "swift tawny dog", etc.
```

## Core Concepts

### 1. Embeddings

Embeddings are dense vector representations of data that capture semantic meaning.

```python
from openai import OpenAI

client = OpenAI()

# Generate an embedding
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="The quick brown fox jumps over the lazy dog"
)

embedding = response.data[0].embedding
print(f"Embedding dimension: {len(embedding)}")  # 1536 dimensions
print(f"First 5 values: {embedding[:5]}")
# Output: [-0.0234, 0.0156, -0.0089, 0.0123, -0.0067]
```

**Key Properties:**
- Fixed-size vectors (e.g., 768, 1536 dimensions)
- Semantically similar texts have similar vectors
- Can represent text, images, audio, or any data type

### 2. Distance Metrics

To find similar vectors, we need to measure distance. Common metrics:

#### Cosine Similarity

Measures the angle between vectors (most common for text).

```python
import numpy as np

def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors."""
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    return dot_product / (norm1 * norm2)

# Example
vec_a = np.array([1.0, 2.0, 3.0])
vec_b = np.array([2.0, 3.0, 4.0])
vec_c = np.array([-1.0, -2.0, -3.0])

print(f"A • B: {cosine_similarity(vec_a, vec_b):.4f}")  # 0.9926 (very similar)
print(f"A • C: {cosine_similarity(vec_a, vec_c):.4f}")  # -1.0000 (opposite)
```

#### Euclidean Distance (L2)

Straight-line distance between points.

```python
def euclidean_distance(vec1, vec2):
    """Calculate Euclidean distance between two vectors."""
    return np.linalg.norm(vec1 - vec2)

print(f"Distance A-B: {euclidean_distance(vec_a, vec_b):.4f}")
```

#### Dot Product

Simple and fast, works well when vectors are normalized.

```python
def dot_product(vec1, vec2):
    """Calculate dot product."""
    return np.dot(vec1, vec2)
```

### 3. Vector Databases

Specialized databases optimized for storing and searching vectors at scale.

**Popular Options:**
- **Pinecone**: Managed, easy to use
- **Weaviate**: Open source, full-featured
- **Qdrant**: Fast, Rust-based
- **Milvus**: Scalable, production-ready
- **ChromaDB**: Simple, great for prototyping
- **pgvector**: PostgreSQL extension

## Practical Example: Building a Semantic Search Engine

Let's build a simple semantic search system using ChromaDB.

### Step 1: Installation

```bash
pip install chromadb openai
```

### Step 2: Create and Populate the Database

```python
import chromadb
from openai import OpenAI

# Initialize
openai_client = OpenAI()
chroma_client = chromadb.Client()

# Create a collection
collection = chroma_client.create_collection(
    name="articles",
    metadata={"description": "Technical articles collection"}
)

# Sample documents
documents = [
    "Introduction to machine learning algorithms and techniques",
    "Building scalable microservices with Docker and Kubernetes",
    "Deep dive into neural networks and backpropagation",
    "RESTful API design best practices and patterns",
    "Understanding transformers architecture in NLP",
    "Cloud-native application development with AWS",
    "Computer vision applications using convolutional networks",
    "Database optimization strategies for high-traffic apps"
]

# Generate embeddings and add to collection
for idx, doc in enumerate(documents):
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=doc
    )
    embedding = response.data[0].embedding
    
    collection.add(
        embeddings=[embedding],
        documents=[doc],
        ids=[f"doc_{idx}"]
    )

print(f"Added {len(documents)} documents to the collection")
```

### Step 3: Search the Database

```python
def search(query: str, n_results: int = 3):
    """Search for documents similar to the query."""
    # Generate query embedding
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    )
    query_embedding = response.data[0].embedding
    
    # Search
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )
    
    return results

# Example searches
print("\n=== Query: 'AI and deep learning' ===")
results = search("AI and deep learning")
for doc in results['documents'][0]:
    print(f"- {doc}")

print("\n=== Query: 'cloud infrastructure' ===")
results = search("cloud infrastructure")
for doc in results['documents'][0]:
    print(f"- {doc}")
```

**Output:**
```text
=== Query: 'AI and deep learning' ===
- Deep dive into neural networks and backpropagation
- Introduction to machine learning algorithms and techniques
- Understanding transformers architecture in NLP

=== Query: 'cloud infrastructure' ===
- Cloud-native application development with AWS
- Building scalable microservices with Docker and Kubernetes
- Database optimization strategies for high-traffic apps
```

## Advanced Techniques

### 1. Hybrid Search

Combine vector search with traditional keyword search for best results.

```python
def hybrid_search(query: str, alpha: float = 0.5):
    """
    Hybrid search combining semantic and keyword matching.
    
    Args:
        query: Search query
        alpha: Weight for semantic search (0=keyword only, 1=semantic only)
    """
    # Semantic search
    semantic_results = vector_search(query)
    
    # Keyword search (e.g., BM25)
    keyword_results = bm25_search(query)
    
    # Combine results with weighted scoring
    combined_scores = {}
    for doc_id, score in semantic_results:
        combined_scores[doc_id] = alpha * score
    
    for doc_id, score in keyword_results:
        if doc_id in combined_scores:
            combined_scores[doc_id] += (1 - alpha) * score
        else:
            combined_scores[doc_id] = (1 - alpha) * score
    
    # Sort by combined score
    return sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
```

### 2. Metadata Filtering

Filter results by metadata before similarity search.

```python
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    where={
        "category": "machine-learning",
        "date": {"$gte": "2024-01-01"}
    }
)
```

### 3. Re-ranking

Use a more powerful model to re-rank initial results.

```python
def rerank_results(query: str, initial_results: list) -> list:
    """Re-rank results using a cross-encoder model."""
    from sentence_transformers import CrossEncoder
    
    model = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    # Score each query-document pair
    pairs = [[query, doc] for doc in initial_results]
    scores = model.predict(pairs)
    
    # Sort by score
    ranked = sorted(zip(initial_results, scores), 
                   key=lambda x: x[1], 
                   reverse=True)
    
    return [doc for doc, score in ranked]
```

## Performance Considerations

### 1. Approximate Nearest Neighbors (ANN)

For large datasets, exact search is too slow. ANN algorithms trade a small amount of accuracy for massive speed improvements.

**Common ANN Algorithms:**
- **HNSW** (Hierarchical Navigable Small World): Fast, memory-intensive
- **IVF** (Inverted File Index): Good balance of speed and memory
- **LSH** (Locality-Sensitive Hashing): Simple, works for high dimensions
- **ScaNN**: Google's high-performance library

### 2. Dimensionality Reduction

Reduce embedding size for faster search and lower storage.

```python
from sklearn.decomposition import PCA

# Reduce 1536D embeddings to 256D
pca = PCA(n_components=256)
reduced_embeddings = pca.fit_transform(embeddings)

print(f"Original: {embeddings.shape}")      # (10000, 1536)
print(f"Reduced: {reduced_embeddings.shape}")  # (10000, 256)
print(f"Variance retained: {pca.explained_variance_ratio_.sum():.2%}")
```

### 3. Batch Processing

Generate embeddings in batches to reduce API calls.

```python
def embed_batch(texts: list[str], batch_size: int = 100):
    """Generate embeddings for a list of texts in batches."""
    embeddings = []
    
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        response = openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=batch
        )
        batch_embeddings = [item.embedding for item in response.data]
        embeddings.extend(batch_embeddings)
    
    return embeddings
```

## Common Use Cases

### 1. Semantic Search

Search documents, FAQs, or knowledge bases by meaning.

### 2. Recommendation Systems

Find similar products, articles, or content.

### 3. RAG (Retrieval-Augmented Generation)

Retrieve relevant context for LLM prompts.

### 4. Duplicate Detection

Identify similar or duplicate content.

### 5. Clustering

Group similar items together.

```python
from sklearn.cluster import KMeans

# Cluster documents
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(embeddings)

for cluster_id in range(3):
    docs_in_cluster = [doc for doc, c in zip(documents, clusters) if c == cluster_id]
    print(f"\nCluster {cluster_id}:")
    for doc in docs_in_cluster:
        print(f"  - {doc}")
```

## Best Practices

1. **Choose the Right Embedding Model**
   - Consider dimension size, quality, and cost
   - Larger isn't always better

2. **Normalize Your Embeddings**
   - Use cosine similarity with normalized vectors for consistent results

3. **Chunk Your Documents Wisely**
   - Break large documents into meaningful chunks
   - Typical chunk size: 200-500 tokens with overlap

4. **Add Metadata**
   - Include timestamps, categories, authors for filtering

5. **Monitor and Iterate**
   - Track search relevance metrics
   - A/B test different configurations

6. **Consider Hybrid Approaches**
   - Combine vector and keyword search
   - Use re-ranking for top results

## Next Steps

- Experiment with different embedding models
- Try various distance metrics and see how they affect results
- Build a RAG application using vector search
- Optimize for your specific use case
- Scale up with production-ready vector databases

## Resources

- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- [ChromaDB Documentation](https://docs.trychroma.com/)
- [Pinecone Learning Center](https://www.pinecone.io/learn/)
- [Vector Database Comparison](https://github.com/erikbern/ann-benchmarks)

---

*Vector search is revolutionizing how we build intelligent applications. Start experimenting today and discover the power of semantic understanding.*
