---
id: "vector-stores-and-embeddings"
title: "Vector Stores and Embeddings"
sidebar_label: "Vector Stores and Embeddings"
description: "Learn about vector stores, embeddings, compatibility, and prominent vector databases."
---

## What are Embeddings?

Embeddings are numerical representations of data (e.g., text, images, audio) in a high-dimensional vector space. They are designed such that similar data points are closer together in this space, enabling efficient similarity-based operations. For a deeper understanding, refer to the [Dimensionality in AI](./dimensionality-in-ai.md) document.

### Key Properties of Embeddings:

- **Dimensionality**: The number of dimensions in the vector space. Learn more about dimensionality in the [Dimensionality in AI](./dimensionality-in-ai.md) document.
- **Semantic Proximity**: Similar items have smaller distances between their vectors.
- **Task-Specific**: Embeddings are often tailored to specific tasks (e.g., NLP, image recognition).

### Example:

For text, embeddings like Word2Vec, GloVe, or Sentence Transformers map words or sentences into vectors that capture semantic meaning.

## What is a Vector Store?

A vector store is a specialized database designed to store and retrieve high-dimensional vectors efficiently. It supports operations like:

- **Nearest Neighbor Search**: Finding vectors closest to a query vector.
- **Filtering**: Applying metadata-based filters to refine results.
- **Indexing**: Creating structures (e.g., HNSW, IVF) for fast retrieval.

### Why Use a Vector Store?

- **Scalability**: Handles millions or billions of vectors.
- **Performance**: Optimized for similarity search.
- **Integration**: Supports embeddings from various models.

## Are All Embedders Compatible with All Vector Stores?

Not all embedders are universally compatible with all vector stores. Compatibility depends on:

1. **Vector Format**: Some stores require normalized vectors (e.g., unit length for cosine similarity).
2. **Distance Metric**: Ensure the store supports the metric used by the embedder (e.g., cosine similarity, dot product, Euclidean distance).
3. **Dimensionality**: High-dimensional vectors may require specific indexing techniques.

### Best Practices:

- Check the documentation of the vector store for supported metrics and formats.
- Preprocess embeddings (e.g., normalization) to match the store's requirements.
- Test retrieval performance with your specific embeddings.

## Prominent Vector Stores

Here are some of the most popular vector stores:

### 1. **FAISS (Facebook AI Similarity Search)**

- **Features**: Open-source, supports various indexing techniques (e.g., HNSW, IVF).
- **Use Cases**: Large-scale similarity search.
- **Limitations**: Requires manual setup and tuning.

### 2. **Pinecone**

- **Features**: Managed service, real-time indexing, metadata filtering.
- **Use Cases**: Production-grade applications with minimal setup.
- **Limitations**: Paid service.

### 3. **Weaviate**

- **Features**: Open-source, schema-based, supports hybrid search (vector + keyword).
- **Use Cases**: Semantic search, knowledge graphs.
- **Limitations**: Requires Kubernetes for scaling.

### 4. **Milvus**

- **Features**: Open-source, distributed, supports multiple distance metrics.
- **Use Cases**: High-throughput applications.
- **Limitations**: Complex deployment.

### 5. **pgvector**

- **Features**: PostgreSQL extension, integrates with relational data.
- **Use Cases**: Small to medium-scale applications.
- **Limitations**: Limited scalability compared to dedicated vector stores.

### 6. **Qdrant**

- **Features**: Open-source, supports payload filtering, high performance.
- **Use Cases**: Real-time applications.
- **Limitations**: Relatively new, smaller community.

## Choosing the Right Vector Store

Consider the following factors when selecting a vector store:

- **Scale**: Number of vectors and query throughput.
- **Integration**: Compatibility with your tech stack.
- **Cost**: Open-source vs. managed services.
- **Features**: Support for filtering, hybrid search, and indexing options.

## Conclusion

Embeddings and vector stores are foundational to modern AI applications like semantic search, recommendation systems, and RAG. While embeddings capture the essence of data, vector stores enable efficient storage and retrieval. By understanding their compatibility and choosing the right tools, you can build scalable and performant AI systems.

---

_Explore the options, experiment with embeddings, and leverage vector stores to unlock the full potential of your AI applications._
