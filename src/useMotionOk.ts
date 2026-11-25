import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "./useMediaQuery";

/** False when the visitor prefers reduced motion; scroll-linked effects then stay still. */
export function useMotionOk() {
  return !useReducedMotion();
}

/** True for pointer-driven effects (tilt, spotlight): motion is allowed and there's a mouse. */
export function usePointerEffects() {
  const fine = useMediaQuery("(pointer: fine)");
  return useMotionOk() && fine;
}
