export type Vec2 = [number, number];
export type Mat2 = [[number, number], [number, number]];

export const IDENTITY: Mat2 = [[1, 0], [0, 1]];

export const mulMV = (M: Mat2, v: Vec2): Vec2 => [
  M[0][0] * v[0] + M[0][1] * v[1],
  M[1][0] * v[0] + M[1][1] * v[1],
];

export const mulMM = (A: Mat2, B: Mat2): Mat2 => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
];

export const lerpMat = (A: Mat2, B: Mat2, t: number): Mat2 => [
  [A[0][0] + (B[0][0] - A[0][0]) * t, A[0][1] + (B[0][1] - A[0][1]) * t],
  [A[1][0] + (B[1][0] - A[1][0]) * t, A[1][1] + (B[1][1] - A[1][1]) * t],
];

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function fmt(n: number): string {
  return String(parseFloat(n.toFixed(2)));
}

// Ch2/3 vector helpers
export const dot2 = (a: Vec2, b: Vec2): number => a[0] * b[0] + a[1] * b[1];
export const mag2 = (v: Vec2): number => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
export const norm = (v: Vec2): Vec2 => {
  const m = mag2(v);
  return m === 0 ? [0, 0] : [v[0] / m, v[1] / m];
};
export const proj2 = (a: Vec2, b: Vec2): Vec2 => {
  const bm2 = b[0] * b[0] + b[1] * b[1];
  if (bm2 === 0) return [0, 0];
  const f = dot2(a, b) / bm2;
  return [b[0] * f, b[1] * f];
};
export const angleDeg = (a: Vec2, b: Vec2): number => {
  const cosVal = dot2(a, b) / (mag2(a) * mag2(b) || 1);
  return (Math.acos(Math.min(1, Math.max(-1, cosVal))) * 180) / Math.PI;
};
export const fromAngle = (deg: number, len = 4): Vec2 => [
  len * Math.cos((deg * Math.PI) / 180),
  len * Math.sin((deg * Math.PI) / 180),
];

// Ch5 eigenvalue / eigenvector helpers
export const det = (M: Mat2): number => M[0][0] * M[1][1] - M[0][1] * M[1][0];
export const trace = (M: Mat2): number => M[0][0] + M[1][1];

export function eigenvalues(M: Mat2): [number, number] | null {
  const tr = trace(M);
  const d = det(M);
  const disc = tr * tr - 4 * d;
  if (disc < 0) return null;
  const sq = Math.sqrt(disc);
  return [(tr + sq) / 2, (tr - sq) / 2];
}

export function eigenvector(M: Mat2, λ: number): Vec2 {
  const a = M[0][0] - λ, b = M[0][1];
  const c = M[1][0], d = M[1][1] - λ;
  if (Math.abs(a) + Math.abs(b) >= Math.abs(c) + Math.abs(d)) {
    if (Math.abs(a) > 1e-8) return norm([-b / a, 1]);
    return norm([1, 0]);
  } else {
    if (Math.abs(c) > 1e-8) return norm([-d / c, 1]);
    return norm([0, 1]);
  }
}

// SVD helpers for 2×2 matrices
// Returns { U, S: [σ1, σ2], Vt } where A ≈ U · diag(S) · Vt
export interface SVD2 {
  U: Mat2;
  S: [number, number];
  Vt: Mat2; // rows are right singular vectors transposed
}

export function svd2(A: Mat2): SVD2 {
  // Compute AᵀA
  const At: Mat2 = [[A[0][0], A[1][0]], [A[0][1], A[1][1]]];
  const AtA: Mat2 = [
    [At[0][0] * A[0][0] + At[0][1] * A[1][0], At[0][0] * A[0][1] + At[0][1] * A[1][1]],
    [At[1][0] * A[0][0] + At[1][1] * A[1][0], At[1][0] * A[0][1] + At[1][1] * A[1][1]],
  ];

  // Eigenvalues of AᵀA
  const evals = eigenvalues(AtA);
  const [λ1, λ2] = evals ?? [0, 0];
  const σ1 = Math.sqrt(Math.max(0, λ1));
  const σ2 = Math.sqrt(Math.max(0, λ2));

  // Right singular vectors (eigenvectors of AᵀA)
  const v1 = eigenvector(AtA, λ1);
  const v2: Vec2 = [-v1[1], v1[0]]; // perpendicular

  // Left singular vectors u = Av / σ
  const Av1 = mulMV(A, v1);
  const u1: Vec2 = σ1 > 1e-10 ? [Av1[0] / σ1, Av1[1] / σ1] : [1, 0];
  const u2: Vec2 = [-u1[1], u1[0]];

  const U: Mat2 = [[u1[0], u2[0]], [u1[1], u2[1]]];
  const Vt: Mat2 = [[v1[0], v1[1]], [v2[0], v2[1]]];

  return { U, S: [σ1, σ2], Vt };
}
