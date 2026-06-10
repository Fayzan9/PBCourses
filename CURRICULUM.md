# Complete AI Intuition Course — Full Curriculum Plan

---

## ✅ Done

| Ch | Title | Core Takeaway |
|---|---|---|
| 1 | Everything Can Become a Point | Vectors, embeddings, high-dimensional space |
| 2 | Measuring Proximity | Euclidean distance, cosine similarity |
| 3 | The Dot Product | Projection, alignment, signal strength |
| 4 | Matrix Transformations | Linear maps, neural layers, composing transforms |
| 5 | Eigenvectors & Eigenvalues | Natural axes, PCA, spectral decomposition |

---

## 📐 Foundation Block — Linear Algebra Completion

### Ch 6 — Singular Value Decomposition (SVD)
- What if the matrix isn't square?
- U·Σ·Vᵀ decomposition — rotate, scale, rotate back
- Singular values vs eigenvalues
- Low-rank approximation: keep top-k singular vectors
- Image compression walkthrough (rank-1, rank-5, rank-50 reconstruction)
- Recommender systems: user-movie matrix decomposed
- Connection to attention mechanism in transformers
- Interactive: SVD slider showing reconstruction quality

### Ch 7 — Probability & Distributions
- Why AI outputs probabilities, not hard answers
- Sample spaces as geometric regions
- Gaussian distribution — the bell curve as a vector space shape
- Joint probability, conditional probability
- Bayes' theorem: updating beliefs with evidence
- The "surprise" of an event → information content
- Real examples: spam filter, medical diagnosis, autocomplete confidence

---

## 🔥 Learning Block — How AI Trains

### Ch 8 — Loss Functions & Optimization Landscapes
- What is a loss function? Measuring wrongness as a number
- Loss surface as a landscape — hills, valleys, saddle points
- Why we want the minimum
- Mean Squared Error (regression) — geometric interpretation
- Cross-Entropy Loss (classification) — why it punishes confident wrong answers harder
- Softmax: turning raw scores into probabilities
- Interactive: drag a prediction, watch loss change live

### Ch 9 — Gradient Descent
- The gradient as "direction of steepest uphill"
- Gradient = vector of partial derivatives
- Gradient descent = walk downhill step by step
- Learning rate: step size matters
- Too large → diverge. Too small → stuck.
- Momentum, Adam optimizer intuition
- Saddle points and local minima
- Interactive: 2D loss landscape with animated descent path
- 3D loss surface visualization

### Ch 10 — Backpropagation
- How does a network know which weights to change?
- Chain rule as "credit assignment through a chain"
- Forward pass vs backward pass
- Computational graphs — nodes are operations, edges are gradients
- Vanishing gradients: why deep networks struggled pre-ReLU
- ReLU as a gradient gate
- Step-by-step: backprop through a 3-layer network
- Interactive: adjust one weight, watch the gradient flow backwards

---

## 🏗️ Architecture Block — How Models Are Built

### Ch 11 — Neural Networks in Depth
- One neuron: weighted sum + nonlinearity
- Universal approximation theorem (intuition only)
- Width vs depth: what each adds
- Activation functions: sigmoid, tanh, ReLU, GELU
- Batch normalization — why and what it does geometrically
- Dropout as a regularizer — ensembles for free
- Overfitting and underfitting as geometric concepts
- Interactive: build a small network, watch decision boundary form

### Ch 12 — Convolutional Neural Networks (CNNs)
- Images as 3D tensors (H × W × C)
- Convolution = sliding dot product
- What filters learn: edges → textures → objects → semantics
- Pooling: throwing away location, keeping presence
- Receptive field: why depth = bigger picture
- Transfer learning: why ImageNet features transfer to medical imaging
- Interactive: visualize a filter sliding over an image

### Ch 13 — Embeddings in Depth
- Word2Vec: predicting context trains meaning
- Skip-gram objective as a dot product game
- "king − man + woman = queen" — why arithmetic works
- Contrastive learning (CLIP): pull matching pairs, push non-matching
- Cosine similarity as the retrieval mechanism
- Embedding spaces for images, text, audio, video
- Nearest-neighbor search in embedding space (FAISS intuition)
- Real demo: t-SNE projection of word embeddings

---

## ⚡ Transformer Block — The Architecture of Modern AI

### Ch 14 — Attention Mechanism
- The core problem: words depend on context far away
- Query, Key, Value — the library analogy
- Attention score = Q·Kᵀ = dot product similarity
- Softmax turns scores into a soft lookup
- Weighted sum of Values = context-aware representation
- Scaled dot product attention — why divide by √d
- Masked attention for autoregressive generation
- Interactive: sentence with attention weights visualized live

### Ch 15 — Multi-Head Attention & Transformers
- One head = one type of relationship
- Multiple heads = multiple relationship types simultaneously
- Concatenate + project: merge all heads
- Position encodings: giving the model a sense of order
- Feed-forward layers after attention: per-position processing
- Layer normalization and residual connections
- Encoder vs decoder architecture
- The full transformer diagram, built piece by piece

### Ch 16 — How LLMs Work End-to-End
- Tokenization: text → integers → embedding lookup
- The embedding table: a giant matrix of learned vectors
- All prior chapters combined: embed → attend → MLP → attend → … → predict
- Next-token prediction as the training objective
- Temperature and sampling strategies
- In-context learning: why few-shot prompting works
- RLHF intuition: human preferences as a reward signal
- Emergent capabilities: why scale changes everything

---

## 📊 Practical AI Block — Applied & Modern

### Ch 17 — Regularization & Generalization
- Bias-variance tradeoff as a geometric concept
- L1 (Lasso): sparse solutions, feature selection
- L2 (Ridge/weight decay): pulling weights toward zero
- Dropout, early stopping, data augmentation
- The double descent phenomenon
- When to regularize and how much

### Ch 18 — Optimization Deep Dive
- SGD, mini-batch gradient descent
- Momentum: rolling ball analogy
- RMSProp: adaptive learning rates per parameter
- Adam: momentum + adaptive rates combined
- Learning rate schedules: warmup, cosine decay
- Gradient clipping
- Mixed precision training (fp16/bf16)

### Ch 19 — Diffusion Models
- The reverse process: denoise step by step
- Forward process: add noise progressively (Gaussian chain)
- Score matching: learning the gradient of the data distribution
- U-Net architecture for noise prediction
- CLIP guidance: steering generation with text embeddings
- Stable Diffusion end-to-end intuition
- Interactive: step through denoising iterations

### Ch 20 — Reinforcement Learning Intuition
- Agent, environment, state, action, reward
- Policy as a function from state to action probabilities
- Value function: expected future reward from a state
- Q-learning: learn action-values
- Policy gradient: maximize expected reward via gradient
- PPO (what ChatGPT uses for RLHF)
- Exploration vs exploitation
- Connection to how LLMs learn from human feedback

---

## 🧭 Course Capstone

### Ch 21 — Everything Connected
- One unified diagram: from raw data → tokens → embeddings → attention → loss → gradient → update
- How every chapter feeds into this pipeline
- What "understanding" means to a model
- Open problems: reasoning, grounding, alignment
- What to learn next: research papers, libraries, projects

---

## 📌 Summary

**Total: 21 chapters, ~400 scenes**

### Critical Path (minimum to understand modern LLMs)
**Ch 6 → Ch 8 → Ch 9 → Ch 10 → Ch 14 → Ch 15 → Ch 16**

### Full Learning Blocks
| Block | Chapters | Focus |
|---|---|---|
| Foundation | 1–7 | Math intuition: vectors, matrices, probability |
| Learning | 8–10 | How AI trains: loss, gradients, backprop |
| Architecture | 11–13 | Building blocks: NNs, CNNs, embeddings |
| Transformers | 14–16 | Attention, transformers, LLMs end-to-end |
| Practical | 17–20 | Regularization, optimizers, diffusion, RL |
| Capstone | 21 | Everything unified |
