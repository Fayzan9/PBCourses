# AI Engineer Curriculum v2
### From a Single Vector to Training Your Own LLM

---

## Design Principles

Every chapter follows this exact structure:

- **The Problem** — what breaks without this concept. Always shown before the solution.
- **The Insight** — the one idea that makes everything click.
- **The Visual** — what to put on screen to make it undeniable.
- **Papers** — read in context, not as a reading list.
- **Build** — implement it. Reading without building is half the work.
- **What Breaks Here** — what this chapter's concept still can't do. Sets up the next chapter.

The order is not arbitrary. Every chapter is a direct response to the limitation of the previous one.

---

---

# PHASE 0 — Prerequisites: The Language of AI

*Most people skip this. Most people plateau at intermediate. The chain rule, matrix multiplication, and Bayes theorem appear in every single chapter that follows. Own them before proceeding.*

---

## Chapter 0: Why Computers Need Math to Understand the World

**The Problem:**
A Spotify engineer in 2006 wants to recommend music. Her first algorithm: if two songs share a genre, recommend them. It recommends death metal to someone who listened to one Metallica song. Genre is too coarse. She needs to measure *similarity* — but computers only understand numbers.

A Google engineer wants to rank web pages. He counts how many times a word appears on a page. But "the page about banking on a river" and "the page about banking your money" use the same words. The computer can't tell them apart.

The entire field of AI is the answer to one question: how do we get computers to understand things the way humans do?

**The Insight:**
Everything — a song, a movie, a sentence, a face — can be turned into a list of numbers. And once it's a list of numbers, math can measure similarity, find patterns, and make predictions.

**The Visual:**
Song → features (tempo=120, energy=0.8, danceability=0.6) → point in space. Two similar songs become nearby points. Two different songs become far apart. The insight lands before a single equation.

**What Breaks Here:**
Numbers in a list aren't enough. We need mathematical structures that capture relationships. That's what the next four chapters build.

---

## Chapter 0.1: Python for Scientific Computing

**Learn:**
- NumPy arrays, broadcasting, vectorized operations
- Why vectorization is 100x faster than loops: memory layout, SIMD instructions
- Matplotlib for visualization
- How floating point numbers work: why 0.1 + 0.2 ≠ 0.3 in computers

**Build:**
- Implement matrix multiplication using only Python lists, then NumPy. Benchmark both. Understand why the gap exists.
- Implement broadcasting rules manually, verify against NumPy.

---

## Chapter 0.2: Linear Algebra Fundamentals

**Learn:**
- Vectors, vector spaces, basis vectors
- Linear transformations: functions that map vectors to vectors
- Matrix multiplication as composition of transformations
- Determinants as volume scaling factors
- Rank, null space, column space, row space
- Solving linear systems: Gaussian elimination, LU decomposition
- Inverse matrices: when they exist and when they don't

**Papers/Books:**
- Gilbert Strang — *Introduction to Linear Algebra* (Chapters 1–4 are mandatory)
- 3Blue1Brown Essence of Linear Algebra series (watch before reading Strang)

**Build:**
- Implement Gaussian elimination from scratch
- Implement LU decomposition
- Visualize what "column space" means geometrically

---

## Chapter 0.3: Calculus & Multivariable Calculus

**Learn:**
- Derivatives as rates of change and slopes of tangents
- Chain rule — this is the *entire* mathematical foundation of backpropagation
- Partial derivatives: change one variable, hold others fixed
- Gradient: vector of all partial derivatives
- The Jacobian matrix: partial derivatives of a vector-valued function
- The Hessian matrix: second-order information about curvature
- Taylor series: approximate any function around a point

**Build:**
- Implement numerical differentiation using finite differences
- Derive the chain rule on a composed function (f(g(h(x)))) by hand and verify numerically

---

## Chapter 0.4: Probability & Statistics

**Learn:**
- Sample spaces, events, probability axioms
- Conditional probability and Bayes theorem (the most important formula in ML)
- Random variables, PMF, PDF, CDF
- Expectation, variance, covariance
- Key distributions: Bernoulli, Binomial, Gaussian, Uniform, Beta, Dirichlet, Categorical
- Central Limit Theorem: why the Gaussian appears everywhere
- Maximum Likelihood Estimation (MLE): find parameters that maximize probability of observed data
- Maximum A Posteriori Estimation (MAP): MLE + prior
- KL Divergence: how different are two distributions?
- The connection between MLE and minimizing cross-entropy loss (derive this — it's the most important derivation in supervised learning)

**Build:**
- Implement MLE for fitting a Gaussian to data from scratch
- Derive cross-entropy loss from MLE in writing
- Visualize KL divergence between different pairs of distributions

---

---

# PHASE 1 — Mathematical Foundations

*The vocabulary. Every algorithm in AI is a special case of something in this phase.*

---

## Chapter 1: Vectors — The Language of AI

**The Problem:**
We turned a song into three numbers: [tempo=120, energy=0.8, danceability=0.6]. Another song: [tempo=118, energy=0.75, danceability=0.65]. Are they similar? Just looking at numbers doesn't tell us. We need a mathematical object that represents *position in space* so we can reason about closeness.

**The Insight:**
A vector is a point in space. Once everything is a point, the entire machinery of geometry becomes available: distance, angle, projection — all of it.

**Concepts:**
- Vectors as arrows vs vectors as coordinates (two views, same object)
- Vector addition and scalar multiplication
- The dimensionality explosion: from 3D to 300D to 1536D
- Why high-dimensional spaces are where meaning lives in AI

**The Visual:**
Start 2D. Add a dimension. Add another. Each dimension is just a measurable property. A 300D word vector: each dimension is a learned feature of meaning.

**Build:**
- Implement vector addition, subtraction, scalar multiplication from scratch
- Visualize in 2D and 3D

**What Breaks Here:**
We have points but no way to measure closeness between them precisely.

---

## Chapter 2: Distance & Similarity — What Does "Close" Mean?

**The Problem:**
Two songs: [120, 0.8, 0.6] and [1200, 8.0, 6.0]. Euclidean distance is huge. But they're proportionally identical — 10× scale. Euclidean says they're different. A human knows they're the same.

**The Insight:**
Direction matters more than magnitude. Cosine similarity measures the *angle*, not the distance. Two vectors pointing the same direction are similar regardless of length.

**Concepts:**
- Euclidean distance: √(Σ(aᵢ - bᵢ)²)
- L1 / Manhattan distance
- The curse of dimensionality: in high dimensions, all points become equally distant. Euclidean distance becomes meaningless. (Beyer et al., 1999)
- Cosine similarity: cos(θ) = (A·B) / (|A||B|)
- Normalization: L2-normalize so Euclidean distance equals cosine distance

**The Visual:**
Stretch one vector to 10×. Euclidean explodes. Angle stays zero. Then: show 1000 random points at 2D, 10D, 100D, 1000D — all pairwise distances converging to the same value.

**Papers:**
- ⭐ "When Is Nearest Neighbor Meaningful?" (Beyer et al., 1999)

**Build:**
- Implement Euclidean, Manhattan, cosine from scratch
- Demonstrate curse of dimensionality empirically across dimensions
- Verify: L2-normalized Euclidean = cosine distance

**What Breaks Here:**
Cosine tells us alignment. Can't tell us how to *transform* space. That's matrices.

---

## Chapter 3: Dot Products & Projections — The Universal Operation

**The Problem:**
Cosine similarity uses a dot product. Neural networks use dot products at every layer. Attention mechanisms are dot products. Why does one operation appear everywhere in AI?

**The Insight:**
The dot product measures how much of A falls onto B. It's a projection. This one operation answers: how much does this input agree with this weight? How relevant is this word to that query?

**Concepts:**
- Geometric interpretation: A·B = |A||B|cos(θ)
- Algebraic interpretation: Σ aᵢbᵢ
- Projection: the shadow of A onto B
- Orthogonality: dot product = 0 means zero agreement
- The dot product as a trainable similarity detector

**The Visual:**
Animate A being projected onto B — the shadow shrinking as the angle grows, zeroing at 90°, going negative past 90°. Then map this directly to a neuron: weights are the "direction of interest," dot product with input says how aligned the input is.

**Build:**
- Implement dot product and projection from scratch
- Show cosine similarity = normalized dot product
- Build a simple semantic search using dot products on hand-crafted vectors

**What Breaks Here:**
Dot product measures alignment between existing vectors. To *transform* vectors — rotate, stretch, compress — we need matrices.

---

## Chapter 4: Matrix Transformations — Reshaping Space

**The Problem:**
A face recognition system needs to transform pixel values into a "face identity" space. A translation model needs to transform English word vectors toward French. How do you mathematically describe a transformation of an entire space?

**The Insight:**
A matrix is a function that transforms every vector in a space simultaneously. The weights in every neural network layer are exactly this.

**Concepts:**
- Matrix as transformation (not just a grid of numbers)
- Column interpretation: where do the basis vectors land?
- Rotation, scaling, shear, reflection
- Matrix multiplication as composing transformations
- Why AB ≠ BA
- Determinant: how much does the transformation scale volume?
- Singular matrices: they collapse space, lose information
- Matrix multiplication as a series of dot products

**The Visual:**
Show a 2D grid. Apply a matrix. Watch it deform. Compose two transformations. Show AB applied at once = applying B then A separately.

**Papers:**
- Gilbert Strang — *Introduction to Linear Algebra* Chapters 3–4

**Build:**
- Implement 2D transformation visualizer: input a 2×2 matrix, watch the grid deform
- Implement matrix multiplication from scratch
- Show rotation → scaling → rotation as composition

**What Breaks Here:**
Not all directions are equal under a transformation. Some get rotated. Some only get stretched. Finding the "stretch-only" directions reveals what a transformation truly does.

---

## Chapter 5: Eigenvectors & Eigenvalues — The Skeleton of Transformation

**The Problem:**
You apply a transformation to 1000 vectors. Most rotate unpredictably. But two only get stretched — they stay on the same line. What are these special directions and why do they matter?

**The Insight:**
Eigenvectors are the natural axes of a transformation. Every real symmetric matrix (like a covariance matrix) has orthogonal eigenvectors — a clean coordinate system for understanding the transformation.

**Concepts:**
- Av = λv: the equation and its meaning
- Power iteration: apply the matrix repeatedly, any vector converges to the dominant eigenvector
- Spectral decomposition: A = QΛQᵀ
- Why symmetric matrices always have real, orthogonal eigenvectors
- Covariance matrices are symmetric → eigenvectors are principal directions of variance

**The Visual:**
Show power iteration live: take a random vector, apply the matrix repeatedly, watch convergence. Then: covariance matrix of a 2D point cloud — eigenvectors point in directions of maximum spread.

**Papers:**
- "A Tutorial on Principal Component Analysis" (Shlens, 2014)

**Build:**
- Implement power iteration from scratch
- Implement eigendecomposition via deflation
- Show eigenvectors of a 2D covariance matrix aligned with the point cloud

**What Breaks Here:**
Eigendecomposition only works for square matrices. Most interesting matrices in AI are not square. We need a generalization.

---

## Chapter 6: SVD — Decomposing Any Transformation

**The Problem:**
A movie rating matrix: 10,000 users × 5,000 movies. Not square. We want to find underlying taste dimensions. How?

**The Insight:**
Every matrix, regardless of shape, decomposes as A = UΣVᵀ: a rotation, a scaling, and another rotation. Singular values tell you how important each direction is. Throw away the small ones. That's compression, recommendation, and the mathematical foundation of LoRA.

**Concepts:**
- U: output directions, Σ: importance, V: input directions
- Why AᵀA gives us V and AAᵀ gives us U
- Truncated SVD and low-rank approximation (Eckart-Young theorem)
- Connection to eigendecomposition: singular values = √eigenvalues of AᵀA

**The Visual:**
Circle transforms into ellipse. Axes = singular vectors. Lengths = singular values. Interactive: slider for rank k, watch image reconstruction quality change in real time.

**Papers:**
- ⭐ "Matrix Factorization Techniques for Recommender Systems" (Koren et al., 2009)
- "Latent Semantic Analysis" (Deerwester et al., 1990)

**Build:**
- Implement SVD via power iteration on AᵀA
- Build image compression using truncated SVD, plot reconstruction error vs rank
- Build toy movie recommender using matrix factorization

**What Breaks Here:**
SVD finds important directions but ignores statistical distribution. PCA combines SVD with variance to find directions where data *varies most*.

---

## Chapter 7: PCA — Finding What Actually Matters in Data

**The Problem:**
1000 faces, 10,000 pixels each. Most pixels are redundant — adjacent pixels are nearly identical. The data lives on a much lower-dimensional surface. How do you find it?

**The Insight:**
High variance = information. Low variance = noise. Project onto the top-k directions of variance, keep the information, discard the noise.

**Concepts:**
- Centering: subtract the mean first
- Covariance matrix: captures co-variation between dimensions
- Eigenvectors of covariance matrix = principal components
- Explained variance ratio
- PCA is SVD on the centered data matrix
- Whitening
- Limitations: PCA is linear

**The Visual:**
2D point cloud as diagonal ellipse. Show PCs as arrows. Project onto PC1 — data becomes 1D, most information preserved. Then: Eigenfaces. Show any face as a weighted sum of eigenfaces.

**Papers:**
- ⭐ "Eigenfaces for Recognition" (Turk & Pentland, 1991)
- "A Tutorial on Principal Component Analysis" (Shlens, 2014)

**Build:**
- Implement PCA from scratch using SVD on centered data
- Apply to MNIST, visualize first 10 principal components
- Implement Eigenfaces

**What Breaks Here:**
PCA is linear. Curved manifolds — spirals, Swiss rolls — are completely missed. We need non-linear dimensionality reduction.

---

## Chapter 8: t-SNE & UMAP — When Linear Fails

**The Problem:**
PCA on 300D word vectors projects everything into a blob. "King" and "queen" overlap. You can't see any structure.

**The Insight:**
t-SNE and UMAP preserve *neighborhood relationships*, not distance. Points nearby in high dimensions stay nearby in 2D. The result reveals clusters PCA hides entirely.

**Concepts:**
- t-SNE: distances → probabilities (Gaussian in high-D, t-distribution in 2D), minimize KL divergence
- The t-distribution prevents crowding: in 2D, there isn't enough room
- Warning: t-SNE distances between clusters are meaningless. Only local structure.
- UMAP: graph-based, topological approach. Faster, preserves more global structure. Better for downstream ML.
- Perplexity parameter: controls neighborhood size

**The Visual:**
MNIST in 2D: PCA = blob. t-SNE = 10 clean clusters. The difference is immediate.

**Papers:**
- ⭐ "Visualizing Data using t-SNE" (van der Maaten & Hinton, 2008)
- ⭐ "UMAP: Uniform Manifold Approximation and Projection" (McInnes et al., 2018)

**Build:**
- Apply t-SNE and UMAP to MNIST embeddings, label clusters
- Compare PCA vs t-SNE vs UMAP on the same dataset

**What Breaks Here:**
These are visualization tools — passive. They show structure but don't teach models to learn from it. For that we need loss functions, gradients, and optimization.

---

---

# PHASE 2 — How Machines Learn

*Before building any model, understand what "learning" means mathematically.*

---

## Chapter 9: The Learning Problem — Generalization

**The Problem:**
A student memorizes every answer in the textbook. The exam rephrases questions slightly. The student fails. The same thing happens to ML models. A model with 100% training accuracy can have 60% test accuracy.

**The Insight:**
The goal is not minimizing training error. It is minimizing *generalization error* — error on data never seen. These are fundamentally different objectives. The gap between them is the central tension in all of ML.

**Concepts:**
- Training error vs test error
- Overfitting and underfitting
- Bias: error from wrong assumptions (model too simple)
- Variance: error from sensitivity to training data (model too complex)
- Bias-variance tradeoff: the fundamental tension
- Train/validation/test split and why each exists
- Cross-validation
- Data leakage: the most common silent failure in ML
- VC dimension: theoretical measure of model complexity

**The Visual:**
Polynomial regression. Degree 1 = underfit. Degree 15 = overfit. Degree 3 = right. Training error always decreases. Test error forms a U-curve.

**Papers:**
- ⭐ "The Bias-Variance Dilemma" (Geman et al., 1992)
- "A Few Useful Things to Know About Machine Learning" (Domingos, 2012)

**Build:**
- Implement polynomial regression of varying degree
- Plot training vs validation error as degree increases
- Implement k-fold cross-validation from scratch

**What Breaks Here:**
We know what we want but can't measure it during training. We need a differentiable function that measures wrongness during training and correlates with test performance.

---

## Chapter 10: Loss Functions & Optimization Geometry

**The Problem:**
How do you tell a model it's wrong? You need one number. Differentiable. That number defines what "better" means for every update the model will ever make.

**The Insight:**
The geometry of the loss landscape determines whether training will be easy or impossible. A bowl converges cleanly. A mountain range with plateaus and saddle points is a nightmare.

**Concepts:**
- MSE: for regression, penalizes large errors quadratically
- Cross-entropy: for classification, derived from MLE — this is the *correct* loss, not MSE
- Binary vs categorical cross-entropy
- Huber loss: smooth version of MAE, robust to outliers
- Focal loss: downweights easy examples (used in object detection)
- Loss landscapes: terrain analogy. Training = finding the lowest valley.
- Convex vs non-convex landscapes
- Saddle points dominate high-dimensional non-convex landscapes (Dauphin et al., 2014)

**The Visual:**
3D loss landscape: smooth bowl (convex) vs rough mountain range (deep network). Animate gradient descent on both.

**Papers:**
- ⭐ "Identifying and attacking the saddle point problem in high-dimensional non-convex optimization" (Dauphin et al., 2014)
- ⭐ "Visualizing the Loss Landscape of Neural Nets" (Li et al., 2018)

**Build:**
- Implement MSE and cross-entropy from scratch
- Derive cross-entropy from MLE (most important derivation in Phase 2)
- Visualize 2D and 3D loss landscapes

**What Breaks Here:**
We have a loss function. We need its gradient to know which direction to move.

---

## Chapter 11: Gradients — The Direction of Steepest Ascent

**The Problem:**
You're in a foggy mountain range. You can only feel the slope. How do you find the lowest point? Step in the direction the ground slopes downward most steeply. That requires knowing the slope everywhere — that's differentiation.

**The Insight:**
The gradient points toward steepest *ascent*. Move in the negative gradient direction and you move toward lower loss. In multiple dimensions, the gradient is a vector of partial derivatives, one per parameter.

**Concepts:**
- Derivative: rate of change at a point
- Partial derivatives: rate of change with one variable, others held fixed
- Gradient: vector of all partial derivatives ∇L
- Jacobian: matrix of partial derivatives for vector-valued functions
- Directional derivative: gradient projected onto a specific direction
- Numerical gradient checking: finite differences to verify analytic gradient

**The Visual:**
2D loss surface. At a point, draw the gradient vector — it points uphill. Draw negative gradient — points downhill. Show multiple points, all gradients point away from minimum.

**Build:**
- Implement numerical gradient using finite differences
- Implement gradient checking
- Visualize gradient vector field on a 2D loss surface

**What Breaks Here:**
Computing gradients analytically for a million-parameter network would take billions of individual computations. We need a systematic algorithm.

---

## Chapter 12: Backpropagation — How Gradients Flow

**The Problem:**
A network has 1 million parameters. The loss is one number. How do you compute the gradient of the loss with respect to every single parameter? Numerically requires 2 million forward passes. There must be a better way.

**The Insight:**
Backpropagation is the chain rule applied systematically to a computational graph. One forward pass + one backward pass = all gradients. Cost: 2× a single forward pass, not 2M×.

**Concepts:**
- Computational graph: represent computation as a DAG
- Forward pass: compute values left to right
- Backward pass: propagate gradients right to left using chain rule
- Local gradients: each operation only needs its own local gradient
- Memory cost: must store all intermediate activations
- Gradient accumulation at nodes with multiple outgoing edges
- Why backprop is reverse-mode automatic differentiation (not symbolic)

**The Visual:**
Simple 3-operation graph: x → [×w] → [+b] → [sigmoid] → loss. Numbers flow left to right. Gradients flow right to left. The chain rule is visible as gradient values being multiplied at each node.

**Papers:**
- ⭐ "Learning Representations by Back-propagating Errors" (Rumelhart, Hinton & Williams, 1986)
- "Automatic Differentiation in Machine Learning: a Survey" (Baydin et al., 2018)

**Build:**
- ⭐ Implement a miniature autograd engine from scratch
  - Value class: stores value + gradient
  - Operations: +, ×, exp, tanh — each with forward and backward
  - backward(): topological sort, apply chain rule
  - Build a tiny neural net on top, train it on XOR
  - This is the most important build in the curriculum. Do not skip it.

**What Breaks Here:**
We can compute gradients. But subtracting them naively from weights with a fixed step size has catastrophic failure modes: oscillation, plateaus, saddle points. We need better algorithms.

---

## Chapter 13: Gradient Descent & Optimizers — From SGD to AdamW

**The Problem:**
Vanilla gradient descent on a narrow valley oscillates wildly side-to-side while barely moving toward the minimum. Some parameters receive huge gradients, others tiny ones. The same learning rate for all of them is wrong.

**The Insight:**
Adam combines momentum (smooth out noisy gradients) and adaptive learning rates (scale per parameter based on gradient history). The result works well on almost any problem without careful tuning.

**Concepts:**
- Gradient descent: θ ← θ - α∇L
- Batch vs SGD vs mini-batch: noise in SGD actually helps escape sharp minima
- Problems with vanilla GD: oscillation, plateaus, saddle points
- Momentum: v = β₁v + (1-β₁)g. Dampens oscillation.
- Nesterov: look ahead before computing gradient
- AdaGrad: divide LR by √(accumulated squared gradients). LR → 0 eventually.
- RMSProp: exponential moving average fixes AdaGrad's dying LR
- Adam = Momentum + RMSProp + bias correction
  - m̂ = m/(1-β₁ᵗ), v̂ = v/(1-β₂ᵗ) — bias correction matters in early steps
- AdamW: decouple weight decay from gradient update
  - In Adam, L2 regularization ≠ weight decay. AdamW fixes this.
  - This is why every LLM uses AdamW.
- LAMB: Adam for very large batches (BERT pretraining)
- Lion: sign-based optimizer found by neural architecture search

**The Visual:**
All optimizers racing on a narrow valley loss surface. SGD oscillates. Momentum overshoots then converges. Adam converges cleanest.

**Papers:**
- ⭐ "Adam: A Method for Stochastic Optimization" (Kingma & Ba, 2015)
- ⭐ "Decoupled Weight Decay Regularization" (Loshchilov & Hutter, 2019) — AdamW
- "On the Convergence of Adam and Beyond" (Reddi et al., 2018)
- "On the importance of initialization and momentum in deep learning" (Sutskever et al., 2013)

**Build:**
- Implement SGD, Momentum, AdaGrad, RMSProp, Adam, AdamW from scratch
- Verify AdamW differs from Adam+L2 on a simple example
- Visualize convergence trajectories side by side

**What Breaks Here:**
Fixed learning rate is suboptimal throughout training. Need it to change over time.

---

## Chapter 14: Learning Rate Schedules & Warmup

**The Problem:**
Early in training, Adam's second moment estimate is unreliable — computed from very few gradient samples. A large LR at this point causes Transformers to diverge. At the end of training, a large LR prevents fine convergence.

**The Insight:**
Warmup + cosine decay is the standard for Transformers and LLMs. Warmup is not optional — without it, attention layers diverge.

**Concepts:**
- Step decay, cosine annealing, cosine with warm restarts (SGDR)
- Linear warmup + cosine decay
- The Transformer schedule from Vaswani et al.: d_model^(-0.5) × min(step^(-0.5), step × warmup^(-1.5))
- OneCycleLR: warmup then cosine decay in one cycle
- Why warmup works: Adam's estimates stabilize before taking large steps

**Papers:**
- ⭐ "SGDR: Stochastic Gradient Descent with Warm Restarts" (Loshchilov & Hutter, 2017)
- "Cyclical Learning Rates for Training Neural Networks" (Smith, 2017)

**Build:**
- Implement cosine annealing with warm restarts
- Implement the exact Transformer LR schedule
- Train same model with and without warmup. Compare loss curves.

**What Breaks Here:**
We can train a model. But with millions of parameters, it memorizes training data trivially. Training loss 0 doesn't mean we've learned anything.

---

## Chapter 15: Regularization — Preventing Memorization

**The Problem:**
Training accuracy = 100%. Test accuracy = 60%. The model memorized the training set. This is the most common failure mode in deep learning.

**The Insight:**
Regularization constrains model capacity, making it harder to memorize and forcing it to learn generalizable patterns.

**Concepts:**
- L2 / Weight decay: add λΣwᵢ² to loss. Equivalent to Gaussian prior on weights.
- L1 / LASSO: produces sparse weights. L1 ball geometry explains why.
- Why weight decay ≠ L2 in Adam (but equals L2 in SGD)
- Dropout: zero out random neurons during training with probability p
  - Ensemble interpretation: 2ⁿ different architectures simultaneously
  - Inverted dropout: scale during training, not inference
- Label smoothing: use [0.05, 0.05, 0.85, 0.05] instead of [0, 0, 1, 0]
  - Prevents overconfident predictions. Used in every LLM training run.
- Early stopping: equivalent to L2 regularization under certain conditions
- Data augmentation: random crops, flips, CutMix, MixUp — most powerful regularizer

**Papers:**
- ⭐ "Dropout: A Simple Way to Prevent Neural Networks from Overfitting" (Srivastava et al., 2014)
- ⭐ "Regression Shrinkage and Selection via the Lasso" (Tibshirani, 1996)
- "mixup: Beyond Empirical Risk Minimization" (Zhang et al., 2018)

**Build:**
- Implement dropout (training and inference modes are different) from scratch
- Train same network with and without dropout on MNIST
- Visualize L1 vs L2 penalized decision boundaries

**What Breaks Here:**
Regularization helps. But as networks get deeper, the distribution of activations shifts at each layer during training — early layers update, later layers see different inputs, cascade. Training destabilizes.

---

## Chapter 16: Normalization — Stabilizing Deep Networks

**The Problem:**
A 10-layer network: layer 1 updates its weights, layer 2 now sees a different distribution, layer 2 adapts, layer 3 sees a different distribution, and so on. This cascading instability (internal covariate shift) made training deep networks nearly impossible before 2015.

**The Insight:**
Normalize activations at each layer to keep the distribution stable throughout training. Let the layer's parameters (γ, β) learn what scale and shift are optimal, not fight against a shifting input.

**Concepts:**
- Batch Normalization: normalize per feature across the batch
  - Training: use batch statistics. Inference: use running mean/variance.
  - Acts as regularization: batch noise ≈ dropout
  - Breaks with batch size 1 or recurrent networks
- Layer Normalization: normalize per sample across features
  - Same statistics in training and inference
  - Standard in Transformers and LLMs
- RMS Norm: remove mean subtraction, just divide by RMS
  - Cheaper, works equally well in practice. Used in LLaMA, Mistral.
- Group Normalization: between BatchNorm and LayerNorm (small batches in CV)
- Instance Normalization: per-sample, per-channel (style transfer)

**The Visual:**
Activation distributions at each layer without BatchNorm: they drift wildly during training. With BatchNorm: stay roughly Gaussian. Training curve: faster convergence, lower final loss.

**Papers:**
- ⭐ "Batch Normalization: Accelerating Deep Network Training" (Ioffe & Szegedy, 2015)
- ⭐ "Layer Normalization" (Ba et al., 2016)
- "Root Mean Square Layer Normalization" (Zhang & Sennrich, 2019)

**Build:**
- Implement BatchNorm from scratch (training and inference modes differ significantly)
- Implement LayerNorm from scratch
- Train deep MLP with and without BatchNorm. Plot gradient magnitudes per layer.

**What Breaks Here:**
Activations are normalized. But the transformations at each layer are linear. Linear stacked on linear is still linear. We need something that breaks this. Without it, deep networks are just expensive matrix multiplications.

---

## Chapter 17: Activation Functions — The Source of Non-Linearity

**The Problem:**
Stack 10 linear transformations. The result is still one linear transformation. A neural network with no activations is just one big matrix multiply, regardless of depth. It can only learn linear relationships — can't learn XOR, can't model language.

**The Insight:**
Activation functions introduce non-linearity. With the right activation, a deep network can approximate *any* continuous function (Universal Approximation Theorem). The choice of activation determines how well gradients flow.

**Concepts:**
- Sigmoid: saturates → vanishing gradients in deep nets
- Tanh: zero-centered, still saturates
- ReLU: max(0,x). Fast, doesn't saturate for positive inputs.
  - Dying ReLU: negative inputs → gradient = 0 → neuron never recovers
- Leaky ReLU: max(αx, x). Fixes dying ReLU.
- ELU: smooth negative region
- GELU: x × Φ(x). Used in BERT, GPT-2. Probabilistic interpretation.
- SiLU/Swish: x × sigmoid(x). Used in EfficientNet.
- SwiGLU: Swish(xW₁) ⊙ xW₂. Used in LLaMA, PaLM. Best empirically.
- Universal Approximation Theorem: 2-layer network with any non-linearity can approximate any continuous function on a compact domain

**The Visual:**
Plot all activations and their derivatives side by side. Sigmoid derivative at tails: nearly zero. ReLU: exactly 1 or 0. GELU: smooth. Then: show XOR — linear classifier fails, ReLU hidden layer succeeds. The intermediate representation warps space to make XOR linearly separable.

**Papers:**
- ⭐ "Rectified Linear Units Improve Restricted Boltzmann Machines" (Nair & Hinton, 2010)
- ⭐ "Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet" (He et al., 2015)
- "Gaussian Error Linear Units (GELUs)" (Hendrycks & Gimpel, 2016)
- "GLU Variants Improve Transformer" (Shazeer, 2020) — SwiGLU

**Build:**
- Plot all activations and their derivatives
- Train sigmoid vs ReLU deep network, plot gradient magnitudes per layer
- Demonstrate dying ReLU with bad initialization
- Solve XOR with 1-hidden-layer network using ReLU

**What Breaks Here:**
We have non-linearity. But bad weight initialization can mean activations start at zero or explode to infinity before a single gradient update. Training never recovers from a bad start.

---

## Chapter 18: Weight Initialization — Starting in the Right Place

**The Problem:**
Initialize all weights to zero: every neuron computes the same thing, receives the same gradient, stays identical. The network never differentiates. Initialize too large: activations explode through sigmoid, gradients vanish. Initialize too small: same problem. The starting point determines whether training is possible at all.

**The Insight:**
The initialization should maintain the *variance* of activations across layers — neither shrinking to zero nor exploding. The right initialization depends on the activation function used.

**Concepts:**
- Why zeros fail: symmetry breaking — neurons must start different
- Why random uniform/normal can still fail: variance doesn't scale with layer size
- Xavier/Glorot initialization: designed for sigmoid/tanh
  - W ~ Uniform(-√(6/(nᵢₙ + nₒᵤₜ)), √(6/(nᵢₙ + nₒᵤₜ)))
  - Derived to maintain variance through linear layers
- He initialization: designed for ReLU
  - W ~ N(0, 2/nᵢₙ)
  - ReLU zeroes half the activations, so we double the variance to compensate
- Orthogonal initialization: weight matrix is orthogonal, preserves gradient norms exactly
- LSUV (Layer-Sequential Unit-Variance): data-driven initialization
- Why batch normalization reduced (but didn't eliminate) sensitivity to initialization

**The Visual:**
Show activation distributions at each layer under: zero init, random init, Xavier init, He init. Zero: all identical. Random large: exploding. Xavier: stable for sigmoid. He: stable for ReLU.

**Papers:**
- ⭐ "Understanding the Difficulty of Training Deep Feedforward Neural Networks" (Glorot & Bengio, 2010) — Xavier init
- ⭐ "Delving Deep into Rectifiers" (He et al., 2015) — He init
- "Exact solutions to the nonlinear dynamics of learning in deep linear neural networks" (Saxe et al., 2014) — orthogonal init

**Build:**
- Train a 10-layer network with zero, random, Xavier, and He initialization
- Plot activation variance at each layer for all four
- Show training diverges or stagnates with bad init, converges with He

**What Breaks Here:**
We can initialize properly and train. Now we need the actual models. Starting with the simplest case and building up.

---

---

# PHASE 3 — Classical Machine Learning

*Understand what came before deep learning. Most DL innovations are direct responses to classical ML's limitations.*

---

## Chapter 19: Linear & Logistic Regression — The Foundation

**The Problem:**
Predict house prices from 10 features. Classify emails as spam. The simplest ML tasks. The algorithms solving them are still in production today, and they are the simplest case of every concept that follows.

**Concepts:**
- Linear regression: y = wᵀx + b, minimize MSE
  - Normal equation: closed form, O(n³) — impractical at scale
  - Gradient descent version: scales to large data
  - Geometric interpretation: projection onto column space of X
- Logistic regression: σ(wᵀx + b), minimize cross-entropy
  - Sigmoid as correct output for binary classification (derive from MLE)
  - Decision boundary: linear hyperplane
  - Multi-class: Softmax + categorical cross-entropy
  - Connection: logistic regression is a 1-layer neural network

**Build:**
- Implement linear regression via Normal Equation and gradient descent
- Implement logistic regression, train on 2D problem
- Visualize decision boundary changing as weights update

---

## Chapter 20: SVMs — Maximum Margin Classification

**The Problem:**
Logistic regression finds *a* separating hyperplane. Infinitely many exist. Which one should you pick? The one that is *maximally confident* — farthest from all data points.

**The Insight:**
The kernel trick maps data to higher dimensions implicitly without computing the transformation — making non-linear classification tractable.

**Concepts:**
- Maximum margin classifier, support vectors
- Hard margin vs soft margin (C parameter)
- Kernel trick: K(x,z) = φ(x)·φ(z) without computing φ
- Linear, polynomial, RBF kernels
- Dual formulation and Lagrange multipliers
- SVMs as state-of-the-art pre-2012

**Papers:**
- ⭐ "Support-Vector Networks" (Cortes & Vapnik, 1995)
- "A Practical Guide to Support Vector Classification" (Hsu et al., 2003)

**Build:**
- Implement linear SVM using gradient descent on hinge loss
- Visualize the margin and support vectors

---

## Chapter 21: Trees, Forests & Boosting — Learning Without Gradients

**The Problem:**
Tabular data: age, city, gender, income. Mixed types, missing values, no normalization possible. Gradient methods struggle. What if you don't use gradients at all?

**The Insight:**
Tree ensembles ask yes/no questions about features. On tabular data, they still win over neural networks in most benchmarks.

**Concepts:**
- Decision Trees: greedy splitting by Gini / Information Gain
- Random Forests: bagging + feature randomness → variance reduction
- Gradient Boosting: sequentially fit trees to the residuals of previous ensemble
  - Mathematically: fitting to the negative gradient of the loss
- XGBoost: second-order gradients (Hessian), regularization, sparsity
- LightGBM: histogram-based splits, leaf-wise growth, 10× faster
- CatBoost: native categorical handling, ordered boosting

**Papers:**
- ⭐ "Random Forests" (Breiman, 2001)
- ⭐ "Greedy Function Approximation: A Gradient Boosting Machine" (Friedman, 2001)
- ⭐ "XGBoost: A Scalable Tree Boosting System" (Chen & Guestrin, 2016)

**Build:**
- Implement decision tree from scratch
- Build random forest on top
- Implement gradient boosting using decision trees
- Train XGBoost on a Kaggle tabular dataset

---

## Chapter 22: Unsupervised Learning — Finding Structure Without Labels

**The Problem:**
1 million customer records. No labels. Find groups of similar customers.

**Concepts:**
- K-Means: assign → update → repeat. Assumes spherical clusters.
- K-Means++ initialization: smarter centroid placement
- DBSCAN: density-based, arbitrary shapes, handles noise
- GMMs: soft clustering via EM algorithm
- EM algorithm: Expectation (soft assignments) + Maximization (update parameters)
- Hierarchical clustering: agglomerative bottom-up, dendrogram

**Papers:**
- ⭐ "k-means++: The Advantages of Careful Seeding" (Arthur & Vassilvitskii, 2007)
- "A Density-Based Algorithm for Discovering Clusters" (Ester et al., 1996)

**Build:**
- Implement K-Means++ from scratch
- Implement GMM with EM algorithm
- Compare on datasets with different geometries

---

---

# PHASE 4 — Deep Learning: The Architectures

*Now we build neural networks — with full understanding of why every architectural choice exists.*

---

## Chapter 23: The Multi-Layer Perceptron — First Real Neural Network

**The Problem:**
Logistic regression only learns linear boundaries. Real data has hierarchical structure — edges combine into shapes, shapes into objects. We need depth. And now we have all the tools.

**Build:**
- ⭐ Implement a full MLP from scratch in NumPy (no PyTorch)
  - Forward pass with ReLU activations
  - Backprop using your autograd engine or manual chain rule
  - BatchNorm and Dropout
  - Adam optimizer
  - Train on MNIST: target 98%+ accuracy
  - This is where everything from Phase 2 comes together

---

## Chapter 24: Why Deep Networks Failed Until 2012

**The Problem:**
Neural networks existed since the 1980s. Why didn't they work until 2012?

**Concepts:**
- Vanishing gradient: sigmoid/tanh derivatives near zero at tails → gradients shrink exponentially backward
- Exploding gradients: the opposite problem in deep networks
- The AI winter: why neural network research was defunded
- What changed: ReLU (2010), He initialization, GPU compute, ImageNet dataset
- AlexNet 2012: the watershed moment that ended the winter

**Papers:**
- ⭐ "Learning Long-Term Dependencies with Gradient Descent is Difficult" (Bengio et al., 1994)
- ⭐ "ImageNet Classification with Deep CNNs" (Krizhevsky et al., 2012) — AlexNet

**Build:**
- Train 10-layer sigmoid network, plot gradient magnitudes per layer (vanish)
- Replace with ReLU + He init, plot again (recover)

---

## Chapter 25: CNNs — The First Real Win on Images

**The Problem:**
A 1000×1000 image = 1M input values. An MLP would need billions of parameters just for the first layer. And it would treat every pixel independently, ignoring spatial structure.

**Insight:**
Convolution: translate-equivariant, local connectivity, shared weights. A cat is a cat wherever it appears in the image.

**Concepts:**
- Convolution: sliding filter, shared weights across spatial locations
- Filters as feature detectors: edges → textures → parts → objects
- Padding, stride, pooling, receptive field
- Translation invariance vs equivariance
- AlexNet: 8 layers, ReLU, dropout, GPU, trained on ImageNet
- VGG: deeper, simpler (3×3 only), showed depth > filter size
- ResNet: skip connections. If a layer can't improve, output what it got.
  - Enables training of 100+ layer networks
  - Explains why skip connections flatten the loss landscape (Li et al., 2018)

**Papers:**
- ⭐ "Gradient-Based Learning Applied to Document Recognition" (LeCun et al., 1998) — LeNet
- ⭐ "ImageNet Classification with Deep CNNs" (Krizhevsky et al., 2012) — AlexNet
- "Very Deep Convolutional Networks" (Simonyan & Zisserman, 2015) — VGG
- ⭐ "Deep Residual Learning for Image Recognition" (He et al., 2016) — ResNet

**Build:**
- Implement 2D convolution from scratch in NumPy
- Build LeNet, train on MNIST
- Build ResNet-18, train on CIFAR-10
- Visualize feature maps at each layer

---

## Chapter 26: Object Detection & Segmentation

**The Problem:**
Classification says "what." Detection says "what and where." You want to find every object in an image and draw a bounding box around each. You need to output a variable number of detections.

**Concepts:**
- R-CNN: region proposals → CNN → classification. Slow.
- Fast R-CNN: share CNN computation across proposals
- YOLO: single forward pass, predict all boxes at once
  - Grid-based: divide image into SxS grid, each cell predicts boxes
  - Anchor boxes: predefined shapes to predict offsets from
- Semantic segmentation: label every pixel (FCN, U-Net)
- Instance segmentation: separate individual object instances (Mask R-CNN)
- mAP (mean Average Precision): how to evaluate detection

**Papers:**
- "Rich Feature Hierarchies for Accurate Object Detection" (Girshick et al., 2014) — R-CNN
- ⭐ "You Only Look Once: Unified, Real-Time Object Detection" (Redmon et al., 2016)
- ⭐ "Mask R-CNN" (He et al., 2017)
- "U-Net: Convolutional Networks for Biomedical Image Segmentation" (Ronneberger et al., 2015)

**Build:**
- Train YOLOv8 on a custom dataset
- Evaluate with mAP

---

## Chapter 27: Representation Learning — Autoencoders

**The Problem:**
Supervised learning requires labels. Labels are expensive. Can a model learn useful representations from unlabeled data?

**Insight:**
Design a task the model can supervise itself: compress an input to a bottleneck, then reconstruct it. The bottleneck forces the model to learn what matters.

**Concepts:**
- Autoencoder: encoder → bottleneck → decoder, minimize reconstruction error
- Undercomplete autoencoders: bottleneck forces compression
- Denoising autoencoders: reconstruct clean input from corrupted input
  - Forces the model to learn robust features, not just copy
- Sparse autoencoders: enforce sparsity in the bottleneck
  - Used in mechanistic interpretability to decompose LLM activations
- Variational Autoencoders (VAEs): bottleneck is a distribution, not a point
  - ELBO loss: reconstruction + KL divergence penalty
  - Enables smooth latent space and generation

**Papers:**
- ⭐ "Extracting and Composing Robust Features with Denoising Autoencoders" (Vincent et al., 2008)
- ⭐ "Auto-Encoding Variational Bayes" (Kingma & Welling, 2014) — VAE
- "Towards Monosemanticity" (Anthropic, 2023)

**Build:**
- Implement autoencoder on MNIST, visualize 2D latent space
- Implement denoising autoencoder
- Implement VAE: sample from the latent space to generate new digits

---

## Chapter 28: GANs — Learning by Competition

**The Problem:**
Autoencoders generate blurry images. The MSE reconstruction loss averages over all plausible outputs. We need a loss that rewards realistic-looking outputs, not pixel-level accuracy.

**The Insight:**
Train two networks simultaneously: a Generator that creates fake data, and a Discriminator that tries to distinguish real from fake. The generator's goal is to fool the discriminator. This adversarial pressure forces the generator to produce realistic outputs — much sharper than MSE reconstruction.

**Concepts:**
- Minimax game: min_G max_D [E[log D(x)] + E[log(1 - D(G(z)))]]
- Generator: takes noise z → realistic-looking sample
- Discriminator: takes sample → real/fake probability
- Training loop: alternate D updates and G updates
- Mode collapse: generator learns to produce a few good examples, ignores diversity
- Wasserstein distance (WGAN): more stable training, meaningful loss metric
- Progressive growing: train at low resolution, gradually increase
- StyleGAN: separate "style" (appearance) from "content" (structure) in latent space
- Conditional GANs: condition generation on a label or image

**The Visual:**
Show generator output evolving over training: random noise → blurry shapes → recognizable digits/faces. Show a discriminator loss vs generator loss curve — they should stay roughly balanced.

**Papers:**
- ⭐ "Generative Adversarial Nets" (Goodfellow et al., 2014)
- "Wasserstein GAN" (Arjovsky et al., 2017) — stable training
- ⭐ "Progressive Growing of GANs" (Karras et al., 2018)
- "A Style-Based Generator Architecture for Generative Adversarial Networks" (Karras et al., 2019) — StyleGAN

**Build:**
- Implement a basic GAN from scratch on MNIST
- Implement WGAN with gradient penalty
- Visualize latent space interpolation

**What Breaks Here:**
GANs are unstable to train. Mode collapse, training oscillation, and no meaningful loss metric make them hard to work with. The field needed a generative model that is more stable, more principled, and more scalable.

---

## Chapter 29: Contrastive & Self-Supervised Learning — Representations Without Labels

**The Problem:**
Autoencoders learn to reconstruct. GANs learn to fool a discriminator. Neither objective directly says "similar things should be nearby in the embedding space." We want representations where cats are near cats and cars are near cars — without any cat/car labels.

**The Insight:**
Two different augmentations of the same image should produce similar embeddings. Two images of different things should produce different embeddings. You can supervise this using only the data itself — no labels needed.

**Concepts:**
- Contrastive loss: pull positive pairs together, push negative pairs apart
- SimCLR: take two random augmentations of the same image as positive pairs
  - Large batch = more negatives = better representations
  - NT-Xent loss (normalized temperature-scaled cross-entropy)
- MoCo: maintain a momentum encoder and memory bank of negatives
  - Fixes the large-batch requirement of SimCLR
- BYOL: no negative pairs needed. Asymmetric architecture + stop-gradient.
  - Bootstrap your own latent: predict one augmentation's embedding from the other
- DINO: self-supervised Vision Transformer. Features reveal segmentation without labels.
- The connection to CLIP: same contrastive idea, but between images and text

**The Visual:**
Show two augmented views of the same image being pushed together in embedding space. Show embeddings of the entire dataset before training (random blob) vs after (clean clusters by object category — no labels used).

**Papers:**
- ⭐ "A Simple Framework for Contrastive Learning of Visual Representations" (Chen et al., 2020) — SimCLR
- "Momentum Contrast for Unsupervised Visual Representation Learning" (He et al., 2020) — MoCo
- ⭐ "Bootstrap Your Own Latent" (Grill et al., 2020) — BYOL
- "Emerging Properties in Self-Supervised Vision Transformers" (Caron et al., 2021) — DINO

**Build:**
- Implement SimCLR from scratch on CIFAR-10
- Train without labels, evaluate linear probe accuracy
- Compare: supervised ResNet vs SimCLR → linear probe

---

---

# PHASE 5 — Sequence Models

*Language is where AI gets hard. This phase is the historical path that leads to Transformers.*

---

## Chapter 30: Classical NLP — Before Deep Learning

**The Problem:**
How did computers process language before deep learning? The answer reveals why deep learning was such a revolution.

**Concepts:**
- Tokenization, stemming, lemmatization, stop words
- Bag of Words: ignore order, count word frequencies
- TF-IDF: weight words by rarity in the corpus
- N-gram language models: predict next word from previous N-1 words
- Markov assumption
- Perplexity: how surprised is the model at new text?
- Limitations: no understanding of word meaning, exponential data sparsity with N

**Build:**
- Implement TF-IDF from scratch
- Build a bigram language model, compute perplexity on held-out text

---

## Chapter 31: Word Embeddings — Language as Geometry

**The Problem:**
TF-IDF treats "king" and "queen" as completely unrelated. If we could represent words as vectors, similar words would be nearby in space, and relationships would be directions.

**The Insight:**
"You shall know a word by the company it keeps." Train a network to predict context from center words, and the internal representations become geometrically meaningful.

**Concepts:**
- Distributional hypothesis: meaning comes from context
- Word2Vec Skip-gram: predict context words given center word
- Negative sampling: efficient training — sample "wrong" contexts as negatives
- Word2Vec CBOW: predict center from context
- GloVe: global co-occurrence statistics + log-bilinear model
- FastText: subword embeddings, handles morphology and OOV
- Analogies: king - man + woman ≈ queen
- Bias in embeddings: word vectors encode societal stereotypes

**Papers:**
- ⭐ "Efficient Estimation of Word Representations in Vector Space" (Mikolov et al., 2013) — Word2Vec
- ⭐ "GloVe: Global Vectors for Word Representation" (Pennington et al., 2014)
- "Enriching Word Vectors with Subword Information" (Bojanowski et al., 2017) — FastText

**Build:**
- Implement Skip-gram with negative sampling from scratch
- Train on a text corpus
- Verify analogies: king - man + woman ≈ queen

---

## Chapter 32: RNNs — Sequential Processing

**The Problem:**
Word embeddings give us vectors. But "The dog bit the man" ≠ "The man bit the dog." Order matters. A plain MLP ignores it.

**Concepts:**
- RNN: one timestep at a time, hidden state passed forward
- Unrolling through time
- Backpropagation Through Time (BPTT)
- Vanishing gradient in RNNs: multiplying same matrix repeatedly → gradients decay exponentially
- Gradient clipping: cap gradient norm to handle explosions

**Build:**
- Implement character-level RNN from scratch
- Train on Shakespeare. Show locally coherent but globally incoherent text.
- Plot gradient magnitudes over 100 timesteps. Watch them vanish.

---

## Chapter 33: LSTMs & GRUs — Learning What to Remember

**The Problem:**
"The bank of the river was muddy... The water level in the [bank] was falling." Predicting "bank" means river-bank, not money-bank. That requires remembering context from 10 words back. RNN gradient is gone by then.

**The Insight:**
The LSTM cell state uses *additive* updates. Gradients flow through addition, not multiplication — they don't vanish.

**Concepts:**
- LSTM: cell state + forget/input/output gates
- Why additive updates prevent vanishing gradients
- GRU: simplified LSTM (update + reset gates)
- Bidirectional RNNs: process both directions

**Papers:**
- ⭐ "Long Short-Term Memory" (Hochreiter & Schmidhuber, 1997)
- "Empirical Evaluation of Gated Recurrent Neural Networks" (Chung et al., 2014)

**Build:**
- Implement LSTM from scratch
- Show it succeeds on long-range dependency task where vanilla RNN fails

---

## Chapter 34: Seq2Seq & The Bottleneck Problem

**The Problem:**
Machine translation: "The cat sat on the mat" → "Die Katze saß auf der Matte." Variable input, variable output, different lengths. One LSTM can't output variable-length sequences.

**The Insight:**
Encoder-Decoder: one LSTM reads the input into a single context vector, another LSTM decodes it into the output. It works — but only for short sentences. Everything passes through one fixed-size bottleneck.

**Concepts:**
- Encoder → context vector → Decoder
- Teacher forcing during training
- Beam search at inference: keep top-K hypotheses
- The bottleneck: all source information compressed into one vector. Fails on sentences > 20 words.

**Papers:**
- ⭐ "Sequence to Sequence Learning with Neural Networks" (Sutskever et al., 2014)
- "Learning Phrase Representations using RNN Encoder-Decoder" (Cho et al., 2014)

**Build:**
- Build encoder-decoder with LSTM
- Train on toy translation task
- Implement beam search
- Show translation quality degrading on long sentences

---

---

# PHASE 6 — The Attention Revolution

*Every chapter here is a direct response to the bottleneck problem.*

---

## Chapter 35: Attention — Breaking the Bottleneck

**The Problem:**
A 50-word French sentence compressed into one vector. Information about the beginning is gone by the time the encoder finishes. Translation quality degrades badly for long sentences.

**The Insight:**
Don't compress everything into one vector. Let the decoder look back at *all* encoder outputs at each step, weighing each by relevance. The context vector changes at every decoding step.

**Concepts:**
- Bahdanau attention: alignment score between decoder state and each encoder output
- Scores → softmax → attention weights → weighted sum of encoder outputs
- Soft, differentiable lookup table
- Attention weights as free interpretability: which source words contributed to this output?

**The Visual:**
Attention heatmap on a French-English translation. For each output word, which source words light up? "La chat" → "The cat." Interpretability for free.

**Papers:**
- ⭐ "Neural Machine Translation by Jointly Learning to Align and Translate" (Bahdanau et al., 2015)
- "Effective Approaches to Attention-based NMT" (Luong et al., 2015)

**Build:**
- Add Bahdanau attention to seq2seq model
- Visualize attention heatmaps
- Measure BLEU score improvement vs baseline

---

## Chapter 36: Self-Attention — Attending to Yourself

**The Problem:**
Attention lets the decoder look at the encoder. But what about the encoder itself? "The bank by the river" — to understand "bank" means riverbank, the encoder needs to look at "river" in the same sequence.

**Concepts:**
- Self-attention: Q, K, V all derived from the same sequence
- Q = XW_Q, K = XW_K, V = XW_V
- Attention(Q,K,V) = softmax(QKᵀ/√d_k)V
- Why divide by √d_k: prevents softmax saturation in high dimensions
- O(n²) complexity: every pair of tokens interacts
- Causal masking: only attend to past tokens (for generation)

**Build:**
- Implement scaled dot-product self-attention from scratch
- Verify shapes at every step
- Implement causal masking

---

## Chapter 37: Multi-Head Attention & The Transformer

**The Problem:**
One attention head looks for one type of relationship. For "The bank by the river" — one head might look for subject-verb, another for modifier-entity, another for coreference. We need multiple relationship types simultaneously.

**Insight:**
Run H attention heads in parallel, concatenate, project. Stack this with positional encoding, feed-forward layers, and residual connections. That is the Transformer.

**Concepts:**
- Multi-head attention: H parallel heads, concatenate outputs, project
- Positional encoding: sinusoidal, inject position since there's no recurrence
- Feed-forward sublayer: 2-layer MLP at each position independently
- Pre-norm vs post-norm: modern LLMs use pre-norm (stable training)
- Residual connections around every sublayer
- Encoder-only (BERT), Decoder-only (GPT), Encoder-Decoder (T5) variants
- The Transformer as a residual stream: each layer reads and writes to a shared representation

**Papers:**
- ⭐ "Attention Is All You Need" (Vaswani et al., 2017)
- "The Annotated Transformer" (Rush, 2018)

**Build:**
- ⭐ Implement the full Transformer from scratch
  - Multi-head attention, positional encoding, feed-forward, encoder stack, decoder stack
  - Causal masking
  - Train on translation task

---

## Chapter 38: BERT — Bidirectional Understanding

**The Problem:**
GPT reads left to right. But for understanding tasks — sentiment, Q&A, NER — you need context from both directions. "I went to the bank to deposit money" vs "I went to the bank by the river" — you need to see both sides to disambiguate.

**Concepts:**
- Masked Language Modeling (MLM): mask 15% of tokens, predict using both directions
- Next Sentence Prediction (NSP): predict if sentence B follows A (later shown unnecessary by RoBERTa)
- Fine-tuning for downstream tasks: add classification head, fine-tune all weights
- RoBERTa: BERT trained longer, bigger batches, no NSP → better
- ALBERT: parameter sharing, factorized embeddings
- DistilBERT: distillation → 6-layer BERT at 97% performance

**Papers:**
- ⭐ "BERT: Pre-training of Deep Bidirectional Transformers" (Devlin et al., 2019)
- "RoBERTa: A Robustly Optimized BERT Pretraining Approach" (Liu et al., 2019)
- "ALBERT: A Lite BERT" (Lan et al., 2020)
- "DistilBERT" (Sanh et al., 2020)

**Build:**
- Fine-tune BERT on sentiment classification
- Fine-tune on NER
- Implement MLM pre-training on a small corpus

---

## Chapter 39: GPT — The Autoregressive Path to LLMs

**The Problem:**
BERT understands. But can a model generate high-quality text? What if you train a decoder-only Transformer on next-token prediction, at maximum scale, on everything written by humans?

**The Insight:**
Next-token prediction requires no labels. It scales to any amount of text. At large scale, to predict accurately, the model must develop broad world knowledge, reasoning, and language understanding.

**Concepts:**
- Decoder-only Transformer with causal masking
- Autoregressive generation: sample one token, append, repeat
- GPT-1 → GPT-2 → GPT-3: same architecture, 10× scale each time
- In-context learning: give examples in the prompt, model adapts without weight updates
- Temperature, top-k, top-p (nucleus) sampling

**Papers:**
- "Improving Language Understanding by Generative Pre-Training" (Radford et al., 2018) — GPT-1
- ⭐ "Language Models are Unsupervised Multitask Learners" (Radford et al., 2019) — GPT-2
- ⭐ "Language Models are Few-Shot Learners" (Brown et al., 2020) — GPT-3

**Build:**
- ⭐ Implement nanoGPT from scratch
- Train on Shakespeare or small code dataset
- Implement top-k and nucleus sampling
- Compare temperature=0.5 vs 1.5

---

---

# PHASE 7 — Building Modern LLMs

---

## Chapter 40: Tokenization — The Vocabulary Problem

**Concepts:**
- Characters: too-long sequences. Words: OOV problem, huge vocab.
- BPE: merge most frequent byte pairs iteratively. Compression meets linguistics.
- WordPiece: BERT's tokenizer, optimize for language model likelihood
- SentencePiece: language-agnostic, treats text as raw bytes
- Vocabulary size tradeoffs: larger vocab → shorter sequences, larger embedding table
- The number problem: "1000" and "1001" share no tokens — why LLMs struggle with arithmetic

**Papers:**
- ⭐ "Neural Machine Translation of Rare Words with Subword Units" (Sennrich et al., 2016)

**Build:**
- Implement BPE from scratch
- Train on a small corpus, show vocabulary evolution
- Compare GPT-4, BERT, LLaMA tokenizations on identical text

---

## Chapter 41: Scaling Laws — The Physics of Deep Learning

**The Problem:**
You have a $100,000 GPU budget. 1B parameters on 1T tokens, or 10B on 100B tokens, or 100B on 10B? Same compute. Which gives the best model?

**The Insight:**
Loss follows power laws with parameters, data, and compute. Chinchilla showed most pre-2022 models were massively over-parameterized and under-trained. Optimal: ~20 tokens per parameter.

**Concepts:**
- Kaplan et al.: L ∝ N^(-0.076), L ∝ D^(-0.095), L ∝ C^(-0.05)
- Chinchilla: compute-optimal N/D ≈ 20 tokens/parameter
- Inference-optimal vs training-optimal: LLaMA 3 trains beyond Chinchilla — pay more to train, save on inference
- Emergent capabilities: abilities appearing at certain scales

**Papers:**
- ⭐ "Scaling Laws for Neural Language Models" (Kaplan et al., 2020)
- ⭐ "Training Compute-Optimal Large Language Models" (Hoffmann et al., 2022) — Chinchilla
- "Emergent Abilities of Large Language Models" (Wei et al., 2022)

**Build:**
- Plot Kaplan scaling curves from paper data
- Calculate compute-optimal parameters and tokens for a given FLOP budget

---

## Chapter 42: Modern LLM Architectures — Inside LLaMA

**The Problem:**
GPT-2 works. But five years of research found consistent improvements. What are they and why do they help?

**Concepts:**
- RMSNorm: remove mean subtraction, just divide by RMS. Cheaper, works equally well.
- Pre-norm: normalize before attention/FFN, not after. Stabler training.
- RoPE: encode position as rotation in complex plane. Better length generalization than learned embeddings. Used by every modern open-source LLM.
- SwiGLU: Swish(xW₁) ⊙ xW₂. Consistent improvement over ReLU/GELU.
- GQA: multiple query heads share key-value heads. Reduces KV cache by num_groups.
- MQA: all query heads share one KV head.
- FlashAttention: IO-aware exact attention. Same math, 2-4× faster.
  - Avoids writing full n×n attention matrix to HBM (tiled computation)
- Sliding Window Attention (Mistral): attend to local window. O(n) instead of O(n²).

**Papers:**
- ⭐ "LLaMA: Open and Efficient Foundation Language Models" (Touvron et al., 2023)
- ⭐ "Llama 2" (Touvron et al., 2023)
- ⭐ "RoFormer: Enhanced Transformer with Rotary Position Embedding" (Su et al., 2021)
- ⭐ "FlashAttention: Fast and Memory-Efficient Exact Attention" (Dao et al., 2022)
- "FlashAttention-2" (Dao, 2023)
- ⭐ "GQA: Training Generalized Multi-Query Transformer Models" (Ainslie et al., 2023)
- "Mistral 7B" (Jiang et al., 2023)

**Build:**
- Upgrade nanoGPT to RMSNorm + RoPE + SwiGLU + GQA
- Profile memory: MHA vs MQA vs GQA
- Implement and benchmark FlashAttention vs standard attention

---

## Chapter 43: Pretraining Data — What You Train On Is What You Get

**Concepts:**
- Data quality >> data quantity
- Common Crawl: raw internet, needs aggressive filtering
- Deduplication: MinHash, exact dedup — duplicate data degrades generalization
- The Pile, FineWeb, Dolma: curated high-quality pretraining corpora
- Data mixture: code improves reasoning even on non-code tasks
- Epoch repetition: training twice on same data degrades performance
- Data flywheel: more users → more data → better model → more users

**Papers:**
- ⭐ "The Pile: An 800GB Dataset of Diverse Text" (Gao et al., 2020)
- "FineWeb: Decanting the Web for the Finest Text Data" (Penedo et al., 2024)
- "Dolma: an Open Corpus of Three Trillion Tokens" (Soldaini et al., 2024)
- "Scaling Data-Constrained Language Models" (Muennighoff et al., 2023)

**Build:**
- Build a data pipeline: download, deduplicate, filter, tokenize
- Implement MinHash deduplication

---

## Chapter 44: Pretraining — Training a Language Model From Scratch

**This is the Phase 7 capstone.**

**Concepts:**
- Mixed precision: BF16 forward/backward, FP32 optimizer states
- Gradient checkpointing: recompute activations during backward, save memory
- Gradient accumulation: simulate large batch without memory
- Warmup + cosine decay LR schedule
- Healthy training: loss curves, gradient norms, weight norms
- Evaluation: perplexity on held-out set every N steps
- Checkpointing and resuming

**Build:**
- ⭐ Pretrain a 124M parameter LLaMA-style model from scratch
  - Mixed precision (BF16)
  - Gradient checkpointing
  - Log loss, gradient norms, LR
  - Evaluate perplexity on held-out set
  - This should take hours to days on a GPU. Do it.

---

## Chapter 45: Supervised Fine-Tuning — Teaching Instructions

**The Problem:**
Your pretrained model completes documents. Ask "What is the capital of France?" — it outputs "What is the capital of Germany? What is the capital of Spain?" It's pattern-completing trivia questions, not answering them.

**Concepts:**
- Chat templates: how conversations format into token sequences
- Instruction datasets: Alpaca, OpenHermes, ShareGPT, UltraChat
- Data quality over quantity: 1K high-quality > 100K noisy
- Catastrophic forgetting: fine-tuning can degrade base capabilities
- Sycophancy: model learns to agree rather than be correct

**Papers:**
- ⭐ "FLAN: Finetuned Language Models Are Zero-Shot Learners" (Wei et al., 2022)
- ⭐ "InstructGPT: Training language models to follow instructions" (Ouyang et al., 2022)

**Build:**
- Fine-tune your pretrained model on an instruction dataset
- Evaluate before/after on held-out instructions

---

## Chapter 46: Embedding Models for Retrieval — How Semantic Search Works

**The Problem:**
You have a RAG system. You embed documents and queries and find the nearest neighbors. But *who trained the embedding model?* The average Word2Vec/GloVe embedding of a sentence is terrible for retrieval. Modern retrieval needs embeddings where similar sentences are truly close.

**The Insight:**
Sentence embeddings are trained with contrastive learning on sentence pairs: positive pairs (paraphrase, question-answer) are pulled together, negative pairs pushed apart. The resulting space is semantically organized for retrieval.

**Concepts:**
- Sentence-BERT: Siamese BERT fine-tuned on NLI, cosine similarity becomes meaningful
- Contrastive fine-tuning: positive = paraphrase, negative = random sentence or hard negative
- Hard negative mining: negatives that look similar but aren't (improves representation quality)
- Matryoshka Representation Learning (MRL): train one model, use first 256, 512, or 768 dims depending on compute budget
- Modern embedding models: E5, BGE, Nomic-Embed, text-embedding-3
- Asymmetric retrieval: different models for query vs document (query is short, document is long)
- MTEB benchmark: how embedding models are evaluated across tasks

**Papers:**
- ⭐ "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks" (Reimers & Gurevych, 2019)
- "Text Embeddings by Weakly-Supervised Contrastive Pre-training" (Wang et al., 2022) — E5
- ⭐ "Matryoshka Representation Learning" (Kusupati et al., 2022)

**Build:**
- Fine-tune a BERT model with contrastive loss on a sentence-pair dataset
- Evaluate on retrieval task before and after fine-tuning
- Compare different embedding models on MTEB tasks

---

## Chapter 47: LoRA & PEFT — Fine-Tuning Without the Cost

**The Problem:**
Full fine-tuning of a 7B model requires 336GB (weights + gradients + Adam states). You don't have that.

**The Insight:**
Fine-tuning changes live in a low-rank subspace. LoRA adds tiny adapter matrices. Train only those.

**Concepts:**
- LoRA: W = W₀ + BA where B is m×r, A is r×n, r ≪ min(m,n)
  - Initialize B randomly, A to zero (ΔW = 0 at start)
  - At inference: merge W' = W₀ + BA (no overhead)
- QLoRA: quantize base model to NF4 (4-bit), train adapters in BF16
  - NF4: data type optimized for normally distributed weights
  - Train 70B on a single 48GB GPU
- Where to apply LoRA: q_proj, v_proj most important (attention layers)
- Rank selection: r=8 for most tasks, r=64 for complex domain shift
- Prefix tuning: learnable prefix tokens
- Prompt tuning: soft prompt embeddings only

**Papers:**
- ⭐ "LoRA: Low-Rank Adaptation of Large Language Models" (Hu et al., 2022)
- ⭐ "QLoRA: Efficient Finetuning of Quantized LLMs" (Dettmers et al., 2023)
- "The Power of Scale for Parameter-Efficient Prompt Tuning" (Lester et al., 2021)

**Build:**
- Implement LoRA layers from scratch
- Apply QLoRA fine-tuning to Llama 3.2 3B
- Compare: base model vs SFT vs LoRA on the same task

---

## Chapter 48: RL Foundations — Before RLHF

**The Problem:**
RLHF, DPO, and reasoning models all depend on reinforcement learning concepts. Without understanding MDP, policy, reward, and policy gradient, none of RLHF's design decisions make sense — not the KL penalty, not reward hacking, not why GRPO was chosen for DeepSeek-R1.

**The Insight:**
RL is the framework for learning from scalar reward signals in sequential decision processes. LLM alignment treats the language model as a policy, human preferences as a reward, and fine-tuning as policy optimization.

**Concepts:**
- Markov Decision Process (MDP): state, action, reward, transition, discount
- Policy: π(a|s) — probability of action given state
- Value function V(s): expected future reward from state s
- Q-function Q(s,a): expected future reward from state s taking action a
- Bellman equation: recursive definition of value
- Policy gradient: REINFORCE — increase probability of actions that led to high reward
- Actor-Critic: policy network + value network. Reduce variance of policy gradient.
- PPO (Proximal Policy Optimization): constrain policy update to prevent large jumps
  - Clip objective: surrogate loss that limits how much the policy can change per step
  - KL constraint: stay close to reference policy
- The exploration-exploitation tradeoff

**Papers:**
- "Policy Gradient Methods for Reinforcement Learning with Function Approximation" (Sutton et al., 2000)
- ⭐ "Proximal Policy Optimization Algorithms" (Schulman et al., 2017)

**Build:**
- Implement REINFORCE on a simple CartPole environment
- Implement PPO on CartPole
- Visualize reward curves over training

---

## Chapter 49: RLHF & DPO — Teaching Preferences

**The Problem:**
SFT teaches the model to mimic responses in a dataset. Mimicking ≠ good. The model learns to sound helpful, not be helpful. We need to teach what makes one response better than another.

**Concepts:**
- RLHF pipeline: SFT → Reward Model → PPO
  - Reward model: (prompt, response) → scalar reward, trained on human preference pairs
  - PPO: LLM is the policy, reward model provides signal
  - KL penalty: stay close to the SFT model (prevent reward hacking)
- Reward hacking: model learns to game the reward model (overly long, sycophantic)
- DPO: reformulate RLHF objective to eliminate the reward model entirely
  - Train directly on preference pairs (prompt, chosen, rejected)
  - Mathematically equivalent to PPO under certain conditions but far simpler
- ORPO: combines SFT and preference learning in one loss
- GRPO: Group Relative Policy Optimization — used in DeepSeek-R1

**Papers:**
- ⭐ "InstructGPT: Training language models to follow instructions with human feedback" (Ouyang et al., 2022)
- ⭐ "Direct Preference Optimization" (Rafailov et al., 2023)
- "ORPO: Monolithic Preference Optimization without Reference Model" (Hong et al., 2024)
- ⭐ "DeepSeek-R1" (DeepSeek, 2025) — GRPO

**Build:**
- Implement DPO training loop from scratch
- Train on Anthropic HH-RLHF preference dataset
- Compare SFT vs DPO outputs on preference-sensitive prompts

---

## Chapter 50: Prompt Engineering & Structured Output

**The Problem:**
You have a fine-tuned LLM. How do you reliably get it to follow instructions, think step-by-step, output JSON, call functions, and handle edge cases? This is where most AI engineering time is actually spent.

**The Insight:**
Prompting is a distinct engineering skill. The model's behavior is highly sensitive to framing, examples, and output constraints. Structured output and function calling are not features — they're constrained decoding.

**Concepts:**
- Zero-shot vs few-shot prompting: examples in-context dramatically improve performance
- Chain-of-Thought (CoT): "think step by step" before answering
- Self-consistency: sample multiple reasoning paths, take majority vote on final answer
- System prompt design: persona, format, constraints, examples
- Structured output / JSON mode: constrained decoding using a grammar
  - The model generates tokens that are forced to match a schema
  - Tools: Outlines, LMQL, SGLang, Instructor
- Function calling: structured output that maps to function signatures
- Context window management: what to include, what to compress, what to retrieve
- Prompt compression: compress long context without losing information (LLMLingua)
- Meta-prompting: using an LLM to write prompts for another LLM

**Papers:**
- ⭐ "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (Wei et al., 2022)
- "Self-Consistency Improves Chain of Thought Reasoning" (Wang et al., 2022)
- "Efficient Guided Generation for Large Language Models" (Willard & Louf, 2023) — constrained decoding
- "LLMLingua: Compressing Prompts for Accelerated Inference" (Jiang et al., 2023)

**Build:**
- Implement constrained decoding that forces JSON output without a library
- Build a function-calling system: define tools, parse model output, execute
- Measure how few-shot examples change accuracy on a reasoning benchmark

---

## Chapter 51: Long Context & Context Window Extensions

**The Problem:**
Your model was trained with a 4K context window. You want to use it on a 100K-token document. Naively extending RoPE position IDs beyond the training range causes the model to hallucinate and break down.

**The Insight:**
Position embeddings need to be scaled or modified to handle lengths beyond training. The key is that RoPE's frequency components can be adjusted to cover longer ranges without complete retraining.

**Concepts:**
- Why context length extension is hard: position embeddings weren't trained on those positions
- Position interpolation: scale all position IDs down to fit training range
- YaRN: Yet another RoPE extensioN. Dynamic frequency scaling + attention temperature.
- LongRoPE: extend RoPE to 2M tokens
- Sliding window attention (Mistral): each token only attends to last k tokens. O(n) not O(n²).
- Flash Decoding: parallelized attention for very long sequences
- Needle-in-haystack evaluation: how well does the model retrieve specific facts at different positions?
- The lost-in-the-middle problem: models attend better to beginning and end than middle

**Papers:**
- "Extending Context Window of Large Language Models via Positional Interpolation" (Chen et al., 2023)
- ⭐ "YaRN: Efficient Context Window Extension of Large Language Models" (Peng et al., 2023)
- "Lost in the Middle: How Language Models Use Long Contexts" (Liu et al., 2023)

**Build:**
- Implement RoPE position interpolation
- Run needle-in-haystack evaluation on a model before and after extension

---

---

# PHASE 8 — Advanced Topics

---

## Chapter 52: Inference-Time Compute & Reasoning Models

**The Problem:**
A model trained on next-token prediction computes the same amount per token regardless of problem difficulty. Hard math problems need more thinking. Can we give the model more compute at inference time?

**Concepts:**
- Chain-of-Thought: generate reasoning before answering
- Self-consistency: sample N chains, majority vote
- Tree of Thoughts: explore multiple reasoning branches, backtrack
- Process Reward Models (PRMs): score individual reasoning steps
- Outcome Reward Models (ORMs): score final answer only
- o1/o3 paradigm: train on long internal CoT via RL
- GRPO (Group Relative Policy Optimization): used in DeepSeek-R1
  - Generate group of responses, reward relative to group mean
- DeepSeek-R1: fully open reasoning model, o1-level performance via RL

**Papers:**
- ⭐ "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (Wei et al., 2022)
- "Self-Consistency Improves Chain of Thought Reasoning" (Wang et al., 2022)
- "Let's Verify Step by Step" (Lightman et al., 2023) — PRMs
- ⭐ "DeepSeek-R1: Incentivizing Reasoning Capability via Reinforcement Learning" (DeepSeek, 2025)

**Build:**
- Implement self-consistency decoding
- Train a small ORM on GSM8K math problems

---

## Chapter 53: RAG — Retrieval-Augmented Generation

**Concepts:**
- Why hallucination happens: LLMs generate plausible text, not necessarily factual
- RAG pipeline: retrieve → inject into context → generate
- Dense retrieval: embed query and documents, nearest-neighbor search
- Sparse retrieval: BM25 keyword matching
- Hybrid: combine dense and sparse scores
- Reranking: cross-encoder scores the top-K retrieved chunks more carefully
- Chunking strategies: fixed-size, semantic, hierarchical
- HyDE: generate a hypothetical document, use it as the retrieval query
- RAGAS evaluation: faithfulness, answer relevancy, context precision/recall

**Papers:**
- ⭐ "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (Lewis et al., 2020)
- "Precise Zero-Shot Dense Retrieval without Relevance Labels" (Gao et al., 2022) — HyDE

**Build:**
- Build a full RAG system from scratch
- Implement chunking, embedding, FAISS indexing, retrieval, reranking, generation
- Evaluate with RAGAS

---

## Chapter 54: Agents & Tool Use

**Concepts:**
- LLMs as reasoning engines that call external tools
- ReAct: interleave Reasoning (Thought) + Acting (tool call) + Observing (result)
- Tool calling: structured output → function execution
- Memory: in-context, external database, in-weights
- Planning: task decomposition, subgoal generation
- Multi-agent: orchestrator + specialist subagents
- Agentic loops: how to detect when the agent is stuck or looping

**Papers:**
- ⭐ "ReAct: Synergizing Reasoning and Acting in Language Models" (Yao et al., 2023)
- "Toolformer: Language Models Can Teach Themselves to Use Tools" (Schick et al., 2023)

**Build:**
- Build a ReAct agent from scratch (no LangChain or frameworks)
- Tools: calculator, web search, code executor
- Evaluate on multi-step tasks requiring tool use

---

## Chapter 55: Diffusion Models

**Concepts:**
- Forward process: gradually add Gaussian noise over T steps until pure noise
- Reverse process: learn to denoise step by step
- DDPM: predict noise, train with MSE loss
- DDIM: deterministic sampling, 10× fewer steps
- Score matching connection
- Classifier-free guidance: condition generation without a separate classifier
- Latent diffusion: denoise in latent space (VAE), not pixel space
  - This is what makes Stable Diffusion run on consumer hardware
- Flow matching: newer, simpler alternative to diffusion (used in Flux, Stable Diffusion 3)

**Papers:**
- ⭐ "Denoising Diffusion Probabilistic Models" (Ho et al., 2020)
- "Denoising Diffusion Implicit Models" (Song et al., 2020)
- ⭐ "High-Resolution Image Synthesis with Latent Diffusion Models" (Rombach et al., 2022) — Stable Diffusion
- "Flow Matching for Generative Modeling" (Lipman et al., 2022)

**Build:**
- Implement DDPM from scratch on MNIST
- Implement classifier-free guidance
- Sample with different guidance scales

---

## Chapter 56: Multimodal Models

**Concepts:**
- CLIP: contrastive learning between images and text
  - Image encoder + text encoder, trained so matching pairs are close
  - Zero-shot classification: embed classes as text, find nearest image
- ViT: divide image into 16×16 patches, treat as tokens
- LLaVA: CLIP vision encoder + projection MLP + LLM. Simple, effective.
- Flamingo: cross-attention between image features and language tokens
- GPT-4o: fully unified model processing text, audio, image natively

**Papers:**
- ⭐ "Learning Transferable Visual Models From Natural Language Supervision" (Radford et al., 2021) — CLIP
- ⭐ "An Image is Worth 16x16 Words" (Dosovitskiy et al., 2021) — ViT
- "LLaVA: Large Language and Vision Assistant" (Liu et al., 2023)
- "Flamingo: a Visual Language Model for Few-Shot Learning" (Alayrac et al., 2022)

**Build:**
- Fine-tune CLIP for custom image-text retrieval
- Build an image captioning pipeline: ViT encoder + LLM decoder

---

## Chapter 57: Mixture of Experts

**Concepts:**
- MoE: route each token to top-K of N expert FFN layers
  - Double parameters, same active compute per token
- Load balancing loss: penalize unequal expert utilization
- Switch Transformer: top-1 routing, one expert per token
- Mixtral 8x7B: 8 experts, top-2 routing. 47B total, 13B active.
- Expert collapse: some experts receive all traffic, others nothing

**Papers:**
- ⭐ "Switch Transformers: Scaling to Trillion Parameter Models" (Fedus et al., 2022)
- ⭐ "Mixtral of Experts" (Jiang et al., 2024)

**Build:**
- Implement MoE FFN layer with top-K routing + load balancing loss
- Compare dense vs MoE at same compute budget

---

## Chapter 58: Mechanistic Interpretability

**Concepts:**
- Goal: reverse-engineer the algorithms neural networks implement
- Circuits: small subgraphs implementing specific computations
- Superposition: one neuron encodes multiple features simultaneously
- Sparse autoencoders: decompose residual stream into sparse, monosemantic features
- Induction heads: the circuit that implements in-context learning
- Logit lens: project residual stream to vocabulary at each layer — what is the model thinking?
- Activation patching / causal tracing: which components cause a specific output?

**Papers:**
- ⭐ "A Mathematical Framework for Transformer Circuits" (Elhage et al., 2021)
- ⭐ "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning" (Templeton et al., 2023)
- "Scaling Monosemanticity" (Templeton et al., 2024)
- "Locating and Editing Factual Associations in GPT" (Meng et al., 2022) — ROME

**Build:**
- Implement logit lens on your trained GPT
- Train a sparse autoencoder on GPT-2's residual stream
- Visualize what features fire on different inputs

---

## Chapter 59: Quantization — Smaller Models, Same Quality

**Concepts:**
- A 70B FP16 model = 140GB. INT8 = 70GB. INT4 = 35GB.
- Post-training quantization (PTQ): no retraining
- Absmax quantization: scale to the maximum absolute value
- GPTQ: minimize reconstruction error layer by layer using second-order information
- AWQ: protect the ~1% of weights with large activation magnitudes
- NF4: optimal 4-bit data type for normally distributed weights
- GGUF: portable format for llama.cpp CPU inference

**Papers:**
- ⭐ "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers" (Frantar et al., 2023)
- "AWQ: Activation-aware Weight Quantization" (Lin et al., 2024)

**Build:**
- Apply GPTQ to a small model
- Compare perplexity at FP16, INT8, INT4
- Run quantized model with llama.cpp

---

## Chapter 60: Knowledge Distillation — Compress Without Losing

**The Problem:**
A 70B model is too slow and expensive for production. Can you train a smaller model to match the 70B's performance?

**The Insight:**
The teacher's soft probability distribution over all classes contains far more information than hard labels. A student trained on soft targets learns much faster and to higher accuracy than one trained on one-hot labels.

**Concepts:**
- Soft targets: use teacher's probability distribution instead of one-hot labels
- Temperature scaling: T > 1 softens the teacher's distribution, reveals more signal
- Response distillation: student matches teacher's output logits
- Feature distillation: student matches teacher's intermediate representations
- Attention transfer: student matches teacher's attention maps
- Self-distillation: model distills from itself (data augmentation variant)
- DeepSeek-R1 distillation: distilling reasoning capabilities into smaller models

**Papers:**
- ⭐ "Distilling the Knowledge in a Neural Network" (Hinton et al., 2015)
- "TinyBERT: Distilling BERT for Natural Language Understanding" (Jiao et al., 2020)
- "DistilBERT" (Sanh et al., 2020)

**Build:**
- Implement response distillation from scratch
- Distill a fine-tuned BERT into a 2-layer Transformer
- Measure accuracy/speed tradeoff vs original

---

## Chapter 61: Model Merging — Combining Fine-Tuned Models

**The Problem:**
You have one model fine-tuned for code and another fine-tuned for math. Can you combine them into one model that does both — without retraining?

**The Insight:**
Model weights from different fine-tunes of the same base model live in the same weight space. They can be arithmetically combined, and the result often inherits capabilities from both.

**Concepts:**
- Task arithmetic: fine-tuned model = base + task vector. Add task vectors together.
- SLERP (Spherical Linear Interpolation): interpolate between two model weight spaces
- TIES-Merging: resolve sign conflicts between merged models
- DARE: randomly drop and rescale delta weights before merging
- Frankenmerging: merge models of different architectures
- Why merging works: fine-tuning lives in low-dimensional subspace of weight space

**Papers:**
- ⭐ "Editing Models with Task Arithmetic" (Ilharco et al., 2023)
- "TIES-Merging: Resolving Interference When Merging Models" (Yadav et al., 2023)
- "DARE: Language Model Weight Pruning" (Yu et al., 2023)

**Build:**
- Merge a code-focused and a reasoning-focused LoRA adapter
- Evaluate merged model on both tasks vs individual adapters

---

## Chapter 62: Constitutional AI & Safety

**Concepts:**
- Alignment problem: capable but unsafe or dishonest models
- Constitutional AI (CAI): model critiques and revises its own outputs against a set of principles
- Red-teaming: systematically try to break the model
- Jailbreaks: why they work and why they're hard to eliminate
- Refusal training and its tradeoffs: over-refusal is a real failure mode
- Reward hacking: model learns to game the reward signal
- Scalable oversight: how do you supervise a model smarter than you?
- Debate: two models argue, human judge decides who's right

**Papers:**
- ⭐ "Constitutional AI: Harmlessness from AI Feedback" (Bai et al., 2022)
- "Red Teaming Language Models with Language Models" (Perez et al., 2022)
- "Scalable agent alignment via reward modeling" (Irving et al., 2018)
- "AI Safety via Debate" (Irving et al., 2018)

**Build:**
- Implement a simple CAI self-critique loop on your fine-tuned model
- Build a red-teaming evaluation suite

---

---

# PHASE 9 — Systems & Production

---

## Chapter 63: GPU Architecture & CUDA Intuition

**The Problem:**
Your model trains slowly. You profile it. The GPU utilization is 40%. Why? Because you don't understand the hardware you're programming.

**The Insight:**
Memory bandwidth is almost always the bottleneck in deep learning, not raw compute. Understanding this one fact changes how you write code.

**Concepts:**
- CPU vs GPU: latency-optimized (few fast cores) vs throughput-optimized (many slow cores)
- CUDA hierarchy: thread → warp (32 threads) → block → grid
- Memory hierarchy: registers → shared memory (fast) → L1/L2 cache → HBM (VRAM, slow)
- Memory bandwidth is the bottleneck: reading/writing to HBM is expensive
- Arithmetic Intensity = FLOPs / bytes moved. Determines if operation is compute or memory bound.
- Matrix multiply: compute-bound (high intensity). Element-wise ops: memory-bound (low intensity).
- Tensor Cores: specialized hardware for FP16/BF16 matrix multiplication
- Why FlashAttention is fast: avoids reading/writing the n×n attention matrix to HBM

**Papers:**
- "Making Deep Learning Go Brrrr From First Principles" (Horace He, 2022) — best intuition-first explanation

**Build:**
- Profile matrix multiplication at different sizes: observe compute vs memory bound transition
- Measure memory bandwidth utilization of standard attention vs FlashAttention
- Use torch.profiler to find bottlenecks in your GPT implementation

---

## Chapter 64: Efficient Training at Scale

**Concepts:**
- Mixed precision: BF16 forward/backward, FP32 master weights and optimizer states
  - Why BF16 preferred over FP16: same exponent range as FP32 (no overflow)
  - Why FP32 for optimizer states: Adam's second moment requires precision
- Gradient checkpointing: recompute activations during backward instead of storing
  - Memory: O(√n) instead of O(n) at cost of ~33% more compute
- Gradient accumulation: accumulate gradients over k steps before updating
  - Simulates batch size k× larger without memory cost
- Fused kernels: combine multiple ops into one CUDA kernel (less memory movement)
- torch.compile: traces model, optimizes kernel fusion, reduces overhead
- Activation checkpointing granularity: trade-off between memory and recompute cost

**Build:**
- Add gradient checkpointing to your GPT
- Measure memory before/after on various sequence lengths
- Profile with torch.profiler, identify top 3 bottlenecks, optimize them

---

## Chapter 65: Distributed Training

**The Problem:**
A 70B model doesn't fit on one GPU. Training on one GPU takes months. You need multiple GPUs working in parallel.

**Concepts:**
- Data Parallelism: same model on each GPU, different data, average gradients via all-reduce
  - DDP: ring-reduce algorithm, overlap communication with computation
- Tensor Parallelism: split weight matrices across GPUs (Megatron-LM)
  - Column then row parallel: split FFN across GPUs, one all-reduce per layer
- Pipeline Parallelism: split layers across GPUs
  - GPipe: fill pipeline with microbatches
  - PipeDream: async updates, reduce bubble time
- ZeRO (Zero Redundancy Optimizer): shard optimizer states (ZeRO-1), gradients (ZeRO-2), parameters (ZeRO-3)
- FSDP: PyTorch's ZeRO-3 implementation
- 3D Parallelism: data + tensor + pipeline together (used for 100B+ models)

**Papers:**
- ⭐ "Megatron-LM: Training Multi-Billion Parameter Language Models" (Shoeybi et al., 2019)
- ⭐ "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models" (Rajbhandari et al., 2020)

**Build:**
- Train a model with DDP across 2 GPUs
- Measure scaling efficiency as GPU count increases

---

## Chapter 66: Inference Optimization — Serving LLMs Fast

**Concepts:**
- KV Cache: store K,V projections from previous tokens, don't recompute
  - Memory: 2 × L × H × d_head × seq_len × bytes per request
  - GQA reduces this by num_groups
- Prefill vs Decode: prefill is parallel (fast), decode is sequential (bottleneck)
- Static batching: wait for all sequences to finish before starting new batch
- Continuous batching: new requests join mid-batch when sequences finish (vLLM)
- PagedAttention: manage KV cache like OS virtual memory. Eliminates fragmentation.
- Speculative decoding: small draft model proposes k tokens, large model verifies all in one forward pass
- Flash Decoding: parallelized attention for long-sequence decode

**Papers:**
- ⭐ "Efficient Memory Management for Large Language Model Serving with PagedAttention" (Kwon et al., 2023)

**Build:**
- Implement KV cache from scratch, measure speedup vs recomputing
- Implement continuous batching simulation
- Profile prefill vs decode token throughput

---

## Chapter 67: Evaluation & Benchmarks

**The Problem:**
Your model has lower perplexity than the previous version. Is it better? Not necessarily. Perplexity is a proxy. You need to measure what you actually care about.

**Concepts:**
- Why perplexity isn't enough: low perplexity on training distribution ≠ better capabilities
- Standard benchmarks:
  - MMLU: 57-subject multiple-choice knowledge test
  - HellaSwag: commonsense inference
  - ARC: science Q&A (easy/challenge)
  - GSM8K: grade school math, requires multi-step reasoning
  - HumanEval / MBPP: code generation
  - TruthfulQA: does the model produce true statements?
  - MATH: competition math, much harder than GSM8K
- LLM-as-judge: use GPT-4 to score free-form outputs. Scales to subjective tasks.
- MT-Bench: multi-turn conversation evaluation
- Chatbot Arena / Elo: human pairwise comparisons, Elo rating
- Evaluation contamination: training set overlaps with test set. How to detect it.
- Why benchmark leaderboards are noisy: overfitting, contamination, format tricks

**Papers:**
- ⭐ "MMLU: Measuring Massive Multitask Language Understanding" (Hendrycks et al., 2021)
- "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" (Zheng et al., 2023)
- "Chatbot Arena: An Open Platform for Evaluating LLMs" (Zheng et al., 2023)

**Build:**
- Run your model through MMLU and GSM8K
- Implement LLM-as-judge evaluation pipeline
- Build a task-specific eval suite for your fine-tuned model's use case

---

## Chapter 68: Production AI Systems

**Concepts:**
- Evaluation in production: task-specific evals that correlate with real user outcomes
- Prompt caching: cache KV state of static system prompt across requests
- Model routing: route simple queries to cheap models, hard queries to expensive
- Cost optimization: token counting, caching, batching, quantization
- Latency vs throughput tradeoffs: optimize one at the expense of the other
- Guardrails: input/output safety filtering (Llama Guard, custom classifiers)
- Observability: log every prompt, completion, latency, cost, errors
- A/B testing for LLM systems: how to measure if a new model version is actually better
- Evals before deployment: build a regression suite that catches quality regressions

**Build:**
- Build a production-ready inference server
- Add: logging, latency tracking, cost estimation, prompt caching
- Run regression evals before and after a model update

---

---

# Full Capstone: By the End You Will Have Built

- [ ] A miniature autograd engine from scratch (Phase 2)
- [ ] An MLP trained to 98%+ on MNIST from scratch in NumPy (Phase 4)
- [ ] A decision tree and gradient boosting from scratch (Phase 3)
- [ ] Word2Vec trained on a real corpus from scratch (Phase 5)
- [ ] A character-level RNN (Phase 5)
- [ ] An LSTM that outperforms the RNN on long-range dependencies (Phase 5)
- [ ] A GAN trained on MNIST from scratch (Phase 4)
- [ ] A SimCLR model trained on CIFAR-10 without labels (Phase 4)
- [ ] A VAE that can generate new digits (Phase 4)
- [ ] A full Transformer trained on a translation task (Phase 6)
- [ ] A GPT trained on Shakespeare or code (Phase 6)
- [ ] A 124M parameter LLM pretrained from scratch on real data (Phase 7)
- [ ] The same model fine-tuned with SFT then LoRA/QLoRA (Phase 7)
- [ ] The same model aligned with DPO (Phase 7)
- [ ] A DDPM diffusion model trained on MNIST (Phase 8)
- [ ] A RAG system with retrieval, reranking, and RAGAS evaluation (Phase 8)
- [ ] A ReAct agent with tool use (Phase 8)
- [ ] A distilled smaller model from a larger teacher (Phase 8)
- [ ] A quantized model deployed with llama.cpp (Phase 8)
- [ ] A sparse autoencoder trained on GPT-2 activations (Phase 8)
- [ ] A production inference server with logging, caching, and cost tracking (Phase 9)

---

# The 25 Papers — Read in This Exact Order

| # | Paper | Why |
|---|-------|-----|
| 1 | Rumelhart et al. (1986) | Backpropagation — the algorithm that makes everything trainable |
| 2 | Hochreiter & Schmidhuber (1997) | LSTM — solved vanishing gradients in sequences |
| 3 | LeCun et al. (1998) | LeNet — first proof learned features beat hand-crafted |
| 4 | Glorot & Bengio (2010) | Xavier initialization — why initialization determines trainability |
| 5 | Nair & Hinton (2010) | ReLU — the activation that made deep learning practical |
| 6 | Krizhevsky et al. (2012) | AlexNet — the paper that started the deep learning era |
| 7 | Mikolov et al. (2013) | Word2Vec — language as geometry |
| 8 | Goodfellow et al. (2014) | GANs — adversarial training and generation |
| 9 | Srivastava et al. (2014) | Dropout — the simplest regularizer |
| 10 | He et al. (2016) | ResNet — skip connections, train 1000-layer networks |
| 11 | Ioffe & Szegedy (2015) | Batch Normalization — stabilize deep training |
| 12 | Chen et al. (2020) | SimCLR — self-supervised contrastive learning |
| 13 | Vaswani et al. (2017) | Attention Is All You Need — the most important paper of the decade |
| 14 | Devlin et al. (2019) | BERT — bidirectional pre-training |
| 15 | Radford et al. (2019) | GPT-2 — language models as multitask learners |
| 16 | Brown et al. (2020) | GPT-3 — in-context learning emerges at scale |
| 17 | Kaplan et al. (2020) | Scaling Laws — the physics of deep learning |
| 18 | Radford et al. (2021) | CLIP — images and text in the same space |
| 19 | Hoffmann et al. (2022) | Chinchilla — optimal compute allocation |
| 20 | Ouyang et al. (2022) | InstructGPT — how ChatGPT was made |
| 21 | Hu et al. (2022) | LoRA — fine-tune 70B on one GPU |
| 22 | Touvron et al. (2023) | LLaMA — modern open-source LLM architecture |
| 23 | Rafailov et al. (2023) | DPO — alignment without RL complexity |
| 24 | Dao et al. (2022) | FlashAttention — IO-aware attention, memory and speed |
| 25 | DeepSeek (2025) | DeepSeek-R1 — reasoning through reinforcement learning |

---

**Total: 68 chapters. 9 phases. Every build is mandatory. A chapter where you only read is a chapter half-done.**
