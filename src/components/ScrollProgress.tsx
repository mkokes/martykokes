import { motion, useScroll, useSpring } from "motion/react";

/** A thin bar under the header that fills as the page scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress no-print" aria-hidden="true" style={{ scaleX }} />;
}
