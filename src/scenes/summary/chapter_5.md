# Chapter 5 — Eigenvectors & Eigenvalues: The Skeleton of Transformations

## Core Concept
Every matrix transformation has special directions that survive unchanged in orientation — they only get scaled. These are **eigenvectors**, and the scale factor is the **eigenvalue** λ. Formally: `Mv = λv`. They reveal the fundamental structure (the "skeleton") of any transformation, and power PCA, Google PageRank, and dimensionality reduction across all of ML.

---

## What Was Taught

### Hook
- Most vectors rotate when a matrix is applied. A few special ones only stretch or shrink — these are eigenvectors. What makes them special?

### Building the Intuition
- **Rubber sheet thinking** — imagine space as a rubber sheet being pulled; most lines tilt, but some lines stay on themselves
- **Real-world analogies** — principal stress axes in materials science, vibration modes in structures, stable states in Markov chains
- **Bridge** — connecting the rubber sheet intuition to the formal definition

### Finding Eigenvectors
- **The wobble test** — apply a matrix to a vector; does it change direction (wobble) or only change length?
- **What makes them special** — eigenvectors are the directions the matrix "agrees with"; it only rescales them
- **The eigenvalue equation** — `Mv = λv` — the same vector appears on both sides, only scaled by λ
- **What λ means** — λ > 1 stretches, 0 < λ < 1 shrinks, λ < 0 flips direction, λ = 0 collapses the direction to zero
- Interactive eigenvalue explorer

### The Geometry
- **Geometric picture** — eigenvectors are the "natural axes" of the transformation; all other vectors are combinations of these
- **Not every matrix has real eigenvectors** — pure rotation matrices have no real eigenvectors (no direction stays on itself during a rotation)

### Computing Eigenvectors
- **Characteristic equation** — rearrange `Mv = λv` → `(M − λI)v = 0` → non-trivial solutions exist only when `det(M − λI) = 0`
- **Worked example** — solving the characteristic equation numerically step by step
- **Negative eigenvalues** — what it looks like geometrically when a direction is flipped

### Diagonalization
- **M = PDP⁻¹** — decompose any (diagonalizable) matrix into: change to eigenvector basis → scale → change back
- **Why it's powerful** — computing Mⁿ becomes trivial: just scale each eigenvector by λⁿ instead of multiplying matrices n times

### Applications in ML
- **PCA intuition** — rotate a data cloud to find the direction of maximum variance; that direction is the eigenvector of the data's covariance matrix with the largest eigenvalue
- **Why ML loves eigenvectors** — dimensionality reduction, compression, denoising, feature extraction
- **Symmetric matrices** — covariance matrices are always symmetric; symmetric matrices always have real, perpendicular (orthogonal) eigenvectors — ML exploits this guarantee
- **The eigenspectrum** — the full set of eigenvalues reveals how much "action" happens along each direction
- **Rank connection** — zero eigenvalues correspond to directions the matrix collapses; the number of non-zero eigenvalues = the rank of the matrix

### Practice
- Interactive eigenvector sandbox
- Grand summary — full recap of eigenvectors, eigenvalues, PCA, PageRank, and symmetric matrices

---

## Key Formulas

```
Eigenvalue equation:       Mv = λv

Characteristic equation:   det(M − λI) = 0

Diagonalization:           M = P D P⁻¹
                           D = diagonal matrix of eigenvalues
                           P = matrix of eigenvectors as columns

PCA:                       eigenvectors of Cov(X) = principal components
                           eigenvalues = variance captured per component
```

---

## Key Takeaways
- Eigenvectors are the "natural axes" of a matrix — directions that only get scaled, never rotated
- The eigenvalue λ is the scale factor: it can stretch, shrink, flip, or annihilate the direction
- Diagonalization breaks any matrix into rotate → scale → un-rotate; this trivializes repeated matrix powers
- PCA finds the directions of maximum variance in data by solving for eigenvectors of the covariance matrix
- Eigenvalues tell you how much variance (importance) each direction captures
- Google PageRank is the dominant eigenvector of the web's link matrix
- Symmetric matrices (ubiquitous in ML) always have real, orthogonal eigenvectors — a mathematical guarantee

---

## Leads Into
**Chapter 6 — SVD (Singular Value Decomposition):** You found the natural axes. Now compress along them. SVD generalizes eigendecomposition to any matrix shape and powers recommender systems, image compression, and the attention mechanism in transformers.
