/** Intro timeline in seconds. Total runtime ~6.4s; every step is skippable. */
export const T = {
  lidStart: 0.5,
  lidEnd: 2.2,
  keysStart: 1.1,
  keysEnd: 2.0,
  powerStart: 2.0,
  powerEnd: 2.35,
  bootStart: 2.4,
  bootEnd: 4.9,
  zoomStart: 4.7,
  zoomEnd: 6.2,
  fadeStart: 5.75,
  fadeEnd: 6.35,
  total: 6.4,
} as const;

export const LID_OPEN_ANGLE = (105 * Math.PI) / 180;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Normalised progress of a segment [a, b] at time t. */
export const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

export const smooth = (x: number) => x * x * (3 - 2 * x);
export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeInOutQuint = (x: number) => (x < 0.5 ? 16 * x ** 5 : 1 - Math.pow(-2 * x + 2, 5) / 2);
