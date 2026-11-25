import type { Transition, Variants } from "motion/react";

// Seconds mirror of the mk-styleguide motion tokens (styleguide/tokens.css); keep them in step.
export const duration = { fast: 0.1, normal: 0.18, slow: 0.28 } as const;
export const ease = {
  standard: [0.2, 0, 0, 1],
  enter: [0, 0, 0, 1],
  exit: [0.3, 0, 1, 1],
} as const satisfies Record<string, Transition["ease"]>;

// The entrances below deliberately run longer than the duration tokens, and the springs are
// tuned by feel; the tokens are meant for UI feedback (hover, press), not showpiece entrances.
const enter: Transition = { duration: duration.slow * 2, ease: ease.enter };

/** Fades and lifts an element into place. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: enter },
};

/** A bigger reveal: travels farther, grows slightly and comes into focus. */
export const revealBig: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    // A leftover filter would make every section a containing block and stacking context.
    transitionEnd: { filter: "none" },
    transition: enter,
  },
};

/** One letter of a split-text heading. */
export const letter: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: 70, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transitionEnd: { filter: "none" },
    transition: { type: "spring", stiffness: 380, damping: 26 },
  },
};

/** A pill or chip popping into place. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 520, damping: 18 } },
};

/** Parent that plays its children's variants one after another. */
export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Props that play the `show` variant once the element scrolls into view. */
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.15 },
} as const;

/** Spring for the shared nav indicator. */
export const indicatorSpring: Transition = { type: "spring", stiffness: 500, damping: 40 };

/** Spring for elements that morph between pages through a shared layoutId. */
export const morphSpring: Transition = { type: "spring", stiffness: 260, damping: 32 };

/**
 * Whole-page transitions. `slide` moves sideways; `fade` only crossfades, for changes where
 * shared layoutId elements (a project card and its page) carry the motion instead.
 */
export const pageVariants: Variants = {
  initial: (kind: PageTransition) => ({ opacity: 0, x: kind === "slide" ? 40 : 0 }),
  show: { opacity: 1, x: 0, transition: { duration: duration.slow * 1.5, ease: ease.enter } },
  exit: (kind: PageTransition) => ({
    opacity: 0,
    x: kind === "slide" ? -40 : 0,
    transition: { duration: duration.slow, ease: ease.exit },
  }),
};

export type PageTransition = "slide" | "fade";
