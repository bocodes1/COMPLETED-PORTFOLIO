/**
 * Motion System — Centralized animation tokens, variants and hooks
 * All animation configs flow from these tokens for consistency.
 */

// ─── Duration Tokens (seconds) ───
export const duration = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.2,
  hero: 1.6,
} as const;

// ─── Easing Tokens ───
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  snappy: [0.16, 1, 0.3, 1] as [number, number, number, number],
  expo: [0.87, 0, 0.13, 1] as [number, number, number, number],
  elastic: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  inOut: [0.42, 0, 0.58, 1] as [number, number, number, number],
} as const;

// ─── Distance/Intensity Tokens ───
export const distance = {
  xs: 8,
  sm: 16,
  md: 30,
  lg: 60,
  xl: 100,
  hero: 150,
} as const;

export const blur = {
  none: 0,
  subtle: 4,
  medium: 10,
  heavy: 20,
} as const;

// ─── Framer Motion Variants ───
export const fadeUp = {
  hidden: { opacity: 0, y: distance.md, filter: `blur(${blur.subtle}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: `blur(${blur.none}px)`,
    transition: { duration: duration.slow, ease: easing.snappy },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.snappy },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, filter: `blur(${blur.medium}px)` },
  visible: {
    opacity: 1,
    filter: `blur(${blur.none}px)`,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: `blur(${blur.subtle}px)` },
  visible: {
    opacity: 1,
    scale: 1,
    filter: `blur(${blur.none}px)`,
    transition: { duration: duration.slow, ease: easing.snappy },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: distance.lg },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.snappy },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: -distance.lg },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.snappy },
  },
};

// ─── Stagger Container ───
export const staggerContainer = (staggerDelay = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

// ─── Child item for stagger ───
export const staggerItem = {
  hidden: { opacity: 0, y: distance.sm, filter: `blur(${blur.subtle}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: `blur(${blur.none}px)`,
    transition: { duration: duration.normal, ease: easing.snappy },
  },
};

// ─── Hero-specific variants ───
export const heroTitle = {
  hidden: { opacity: 0, y: distance.lg, filter: `blur(${blur.heavy}px)`, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: `blur(${blur.none}px)`,
    scale: 1,
    transition: { duration: duration.hero, ease: easing.expo },
  },
};

export const heroSubtitle = {
  hidden: { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.cinematic, ease: easing.snappy, delay: 0.3 },
  },
};

// ─── Nav variants ───
export const navReveal = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.snappy, delay: 0.8 },
  },
};
