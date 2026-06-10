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
