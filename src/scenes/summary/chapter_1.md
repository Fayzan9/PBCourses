# Chapter 1 — Vectors: Everything is a Point

## Core Concept
Any real-world object — a movie, a song, a person, a sentence — can be represented as an ordered list of numbers: a **vector**. A vector is a geometric address, a point in multi-dimensional space. Once things are points, machines can compare, search, and learn from them.

---

## What Was Taught

### Hook
- What do a movie, a song, a person, and a sentence have in common?

### Building the Intuition
- **Representing a person** as a set of measurable attributes (numbers)
- **People as points** — each person occupies a unique coordinate in space
- **Movies as vectors** — genre, tone, pacing, etc. encoded as dimensions
- **3D coordinate space** — visualizing 3 attributes as axes
- **High-dimensional space** — generalizing beyond 3D; dimensions can be arbitrary

### Applying to Real Data
- **Music/audio** as a vector (tempo, energy, key, etc.)
- **Products (e-commerce)** as vectors (price, category, ratings, etc.)
- **Images** as vectors (raw pixel values flattened into one list)
- **Words and sentences** as vectors (language models assign numerical positions to meaning)
- **Semantic galaxy** — similar meanings cluster together in vector space

### The Big Reveal
- **ChatGPT reveal** — internally, ChatGPT operates entirely in vector space
- **Unification** — all data types (text, image, audio, structured) collapse into the same framework
- **Math reveal** — formal definition: `v = [v₁, v₂, v₃, ..., vₙ]`

### Practice
- Interactive playground to explore vectors hands-on

### Takeaway
- "Everything can become a point" — this is the founding insight of all modern AI

---

## Key Formulas

```
Vector:   v = [v₁, v₂, ..., vₙ]
Dimension n = number of attributes encoded
```

---

## Key Takeaways
- A vector is just an ordered list of numbers — nothing more
- Any object can be represented as a vector by choosing what to measure
- Once encoded as a point, objects can be compared, ranked, and clustered
- High-dimensional space is abstract but mathematically well-defined
- This single idea underpins recommendation systems, search engines, and every large language model

---

## Leads Into
**Chapter 2 — Distance & Similarity:** Points are in space. How do we measure how close or similar two points are?
