export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export const map = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);
