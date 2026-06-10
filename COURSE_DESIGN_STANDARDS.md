# AI Series — Master Course Design Framework

## Purpose

This document defines the educational philosophy, curriculum architecture, lesson structure, interaction design, visual standards, and mathematical presentation principles used throughout the AI Series.

The objective is not merely to teach formulas.

The objective is to build mental models.

Students should leave each chapter feeling:

> "I understand why this exists."

before they learn

> "How to calculate it."

---

# 1. Educational Philosophy

## The Fundamental Rule

### Intuition First. Mathematics Second. Formalism Last.

Traditional education teaches:

```text
Definition
    ↓
Formula
    ↓
Example
```

The AI Series teaches:

```text
Experience
    ↓
Intuition
    ↓
Visual Model
    ↓
Interactive Exploration
    ↓
Mathematics
    ↓
Formal Definition
```

The learner should never encounter a formula before understanding the problem the formula solves.

---

## Every Concept Must Answer A Question

Bad teaching:

> Here is the dot product.

Good teaching:

> Distance tells us how far apart things are.
>
> But how do we measure alignment?

The question creates demand.

The concept becomes the answer.

Every chapter should emerge naturally from the previous chapter.

---

# 2. Curriculum Design Principles

## The Chain Principle

Every chapter should solve a limitation of the previous chapter.

Example:

```text
Vectors
↓
How close are vectors?
↓
Distance & Similarity
↓
Why does cosine work?
↓
Dot Product
↓
How do we transform vectors?
↓
Matrices
↓
What directions survive transformations?
↓
Eigenvectors
↓
How do we analyze ANY matrix?
↓
SVD
```

Students should feel:

> "Of course this is the next thing to learn."

not

> "Why are we suddenly talking about this?"

---

## The Compression Principle

Each chapter should reduce complexity.

A learner should leave with a simpler model of reality than when they entered.

Example:

Before SVD:

```text
Matrices are complicated.
```

After SVD:

```text
Every matrix =
rotate
→ stretch
→ rotate
```

A chapter succeeds when it compresses many ideas into one intuitive model.

---

# 3. The Standard Lesson Structure

Every lesson follows the same architecture.

---

## Stage 1 — The Hook

Purpose:

Create curiosity.

Never begin with a definition.

Begin with a puzzle.

Examples:

### Vectors

> What do a movie, a song, and a sentence have in common?

### Dot Product

> Distance tells us how far apart things are.
>
> But how aligned are they?

### Eigenvectors

> Most vectors change direction.
>
> Why do some survive unchanged?

---

## Stage 2 — The Visual Story

Before mathematics appears:

Show behavior.

Examples:

* vectors moving
* spaces stretching
* clouds rotating
* circles becoming ellipses

The student should observe a phenomenon before explaining it.

---

## Stage 3 — Interactive Discovery

The learner manipulates the system.

Rules:

* drag points
* rotate vectors
* move sliders
* alter matrices

The learner must discover patterns independently.

Do not explain immediately.

Allow exploration first.

---

## Stage 4 — Naming The Pattern

Only after observation:

Introduce terminology.

Example:

```text
You've discovered a direction that never changes.

Mathematicians call this an eigenvector.
```

Name the idea after the learner understands it.

Never before.

---

## Stage 5 — Mathematical Translation

Only now introduce equations.

The formula should feel inevitable.

Example:

Instead of:

```text
Mv = λv
```

Start with:

```text
This direction survives.
It only stretches.
```

Then translate:

```text
Mv = λv
```

---

## Stage 6 — Practical Meaning

Answer:

> Why should anyone care?

Every chapter must end with applications.

Examples:

* Search engines
* Recommendation systems
* Transformers
* PCA
* Computer vision

---

## Stage 7 — Compression Summary

End every lesson with:

```text
Problem
→ Insight
→ Formula
→ Application
```

Students should be able to explain the chapter in one sentence.

---

# 4. Explanation Style Guide

## Feynman Rule

Assume intelligence.

Assume zero background.

Use simple language without removing depth.

Bad:

> The eigenspace corresponds to invariant subspaces.

Good:

> Some directions survive the transformation unchanged.

---

## The Analogy Ladder

Every major concept should have:

### Level 1

Real-world analogy.

### Level 2

Geometric interpretation.

### Level 3

Mathematical formulation.

Example:

```text
Shadow
↓
Projection
↓
Dot Product
```

---

## Avoid Symbol Overload

Never introduce more than:

* one new symbol
* one new equation
* one new definition

at a time.

---

# 5. Interactive Design Philosophy

## Interactions Are Experiments

Interactive elements are not decorations.

Every interaction must answer a question.

Bad:

> Move slider.

Good:

> What happens when the angle reaches 90°?

---

## Every Playground Must Teach One Insight

Examples:

### Dot Product Playground

Insight:

```text
Alignment controls similarity.
```

### Eigenvector Playground

Insight:

```text
Some directions survive.
```

### SVD Playground

Insight:

```text
Every matrix stretches some directions more than others.
```

---

# 6. Visual Design Principles

## Geometry Before Algebra

Whenever possible:

Show:

```text
Circle → Ellipse
```

before:

```text
A = UΣVᵀ
```

Humans understand shapes faster than symbols.

---

## Color Semantics

Colors should carry meaning consistently.

```text
Emerald  = principal direction
Blue     = input
Rose     = projection
Amber    = transformed output
Slate    = reference/background
```

A color should never change meaning across chapters.

---

# 7. Mathematics Standards

Mathematics should appear in layers.

Layer 1:

```text
Plain language
```

Layer 2:

```text
Visual meaning
```

Layer 3:

```text
Equation
```

Layer 4:

```text
Formal derivation
```

Never jump directly to Layer 4.

---

# 8. Chapter Quality Checklist

Before publishing a chapter, verify:

### Understanding

* Why does this concept exist?
* What problem does it solve?

### Intuition

* Is there a visual mental model?

### Interaction

* Can the learner explore it?

### Mathematics

* Does the equation emerge naturally?

### Applications

* Is there a real-world connection?

### Continuity

* Does it naturally lead to the next chapter?

If any answer is "no", the chapter is incomplete.
