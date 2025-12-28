import { Variants } from "framer-motion";

// Animation timing constants
export const DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.5,
} as const;

export const STAGGER_DELAYS = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
} as const;

// Easing curves
export const EASINGS = {
  easeOut: [0.16, 1, 0.3, 1], // Smooth deceleration
  easeInOut: [0.4, 0, 0.2, 1], // Smooth both
  spring: { type: "spring", stiffness: 300, damping: 30 },
} as const;

// Viewport settings for scroll animations
export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.2,
} as const;

// ============================================
// Fade Variants
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
};

// ============================================
// Scale Variants
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
};

// ============================================
// Stagger Container Variants
// ============================================

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_DELAYS.normal,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_DELAYS.fast,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_DELAYS.slow,
    },
  },
};

// ============================================
// Slide Variants (for menus/panels)
// ============================================

export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
  exit: {
    x: "100%",
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeInOut },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
  exit: {
    x: "-100%",
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeInOut },
  },
};

export const slideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOut },
  },
  exit: {
    y: "100%",
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeInOut },
  },
};

export const slideDown: Variants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeOut },
  },
  exit: {
    y: -10,
    opacity: 0,
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeInOut },
  },
};

// ============================================
// Backdrop Variant
// ============================================

export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.fast },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATIONS.fast },
  },
};
