import { motion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { usePointerEffects } from "../useMotionOk";

/** Maximum tilt in degrees at the card's edges. */
const MAX_TILT = 8;
const tiltSpring = { stiffness: 300, damping: 22 };

/**
 * Wraps a card so it tilts toward the mouse in 3D, with a glare and a lit border that follow
 * the cursor. Without a mouse, or with reduced motion, the card renders as it is.
 */
export default function InteractiveCard({ children }: { children: ReactNode }) {
  const enabled = usePointerEffects();
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);

  if (!enabled) return <div className="interactive-card-static">{children}</div>;

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    // 0..1 across the card; the centre is 0.5.
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotateY.set((px - 0.5) * 2 * MAX_TILT);
    rotateX.set((0.5 - py) * 2 * MAX_TILT);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="tilt-stage">
      <motion.div
        className="interactive-card"
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
