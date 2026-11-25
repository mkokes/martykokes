import { motion } from "motion/react";
import { Children, type ReactNode } from "react";
import { inView, revealBig, stagger } from "../motion";

interface Props {
  /** Id of the heading that names the section. */
  labelledBy: string;
  children: ReactNode;
}

/** A page section whose parts (heading, body, extras) reveal one after another as it scrolls in. */
export default function Section({ labelledBy, children }: Props) {
  return (
    <motion.section
      className="section"
      aria-labelledby={labelledBy}
      variants={stagger(0.12)}
      {...inView}
    >
      {Children.map(children, (child) => (
        <motion.div variants={revealBig}>{child}</motion.div>
      ))}
    </motion.section>
  );
}
