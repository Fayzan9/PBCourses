# Chapter 4 — Matrix Transformations: Reshaping Space

## Core Concept
A **matrix** is not just a grid of numbers — it is a machine that transforms entire spaces. Every matrix encodes a linear transformation: a stretch, rotation, shear, or collapse. Neural networks are chains of such transformations, and each layer is a single matrix multiplication followed by a non-linearity.

---

## What Was Taught

### Hook
- "Stretch. Rotate. Squish. Bend. — all controlled by a single mathematical object."

### Building the Intuition
- **What physically happens** — visualizing how a grid of points moves when a matrix is applied
- **Real-world analogies** — image warping, coordinate transforms, physics simulations

### Types of Linear Transformations
- **Scaling** — a diagonal matrix stretches each axis independently
- **Rotation** — the 2D rotation matrix `[[cos θ, -sin θ], [sin θ, cos θ]]` spins every point by angle θ
- **Shear** — slants space; one axis is dragged by the other

### How a Matrix Works
- **Four numbers** — just 4 entries define an entire 2D transformation
- **What each entry controls** — each position in the matrix has a specific geometric role
- **Column destinations** — the key insight: columns of a matrix tell you exactly where each basis vector lands. Every other output follows from this
- **Matrix × vector recipe** — computing the output is one dot product per row: `(Mv)ᵢ = row_i · v`

### Composing Transformations
- **Stacking matrices** — applying two transformations in sequence: first M₁, then M₂
- **Matrix multiplication** — `M₂M₁` encodes both transformations as a single matrix; order matters
- **Dot product bridge** — connecting back to Chapter 3: each row of the matrix takes a dot product with the input vector

### From Matrices to Neural Networks
- **One neuron** — a single neuron computes a weighted sum of inputs plus a bias: `y = w · x + b`
- **A full neural layer** — all neurons in a layer computed simultaneously as one matrix multiplication: `y = Wx + b`
- **The linearity collapse problem** — stacking multiple linear layers is mathematically equivalent to a single linear layer; depth alone adds nothing
- **Non-linearities (activation functions)** — applying a function like ReLU after each layer breaks the linearity; this is what gives depth its power to learn complex patterns
- **Deep networks** — a deep network is a pipeline of transforms: `y = σ(W₃ · σ(W₂ · σ(W₁x + b₁) + b₂) + b₃)`

### Practice
- Interactive matrix transformation sandbox

---

## Key Formulas

```
Matrix × vector:     (Mv)ᵢ = Σⱼ Mᵢⱼ · vⱼ   (one dot product per row)

Linear layer:        y = Wx + b

Deep network:        y = σ(Wₙ · ... · σ(W₂ · σ(W₁x + b₁) + b₂) ... + bₙ)

Rotation matrix:     [[cos θ,  -sin θ],
                      [sin θ,   cos θ]]
```

---

## Key Takeaways
- A matrix is a complete description of a linear transformation of space
- Columns of a matrix = where basis vectors land; this fully determines the transformation
- Matrix × vector = one dot product per row; the output is a new point in (possibly different-dimensional) space
- One neuron = a dot product; one neural layer = a matrix multiplication
- Stacking linear layers without activations collapses to a single linear map — non-linearities are essential
- Deep networks progressively reshape space until messy, entangled data becomes linearly separable

---

## Leads Into
**Chapter 5 — Eigenvectors & Eigenvalues:** You can warp space. But which directions survive the transformation unchanged? The special directions that only get scaled — not rotated — are eigenvectors, and they reveal the hidden skeleton of any matrix.
