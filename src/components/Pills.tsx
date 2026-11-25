import { motion } from "motion/react";
import { inView, popIn, stagger } from "../motion";

interface Props {
  items: readonly string[];
  /** Accessible name for the list. */
  label?: string;
  /** `neutral` uses the grey pill instead of the accent tint. */
  tone?: "accent" | "neutral";
}

const wobble = { rotate: [0, -6, 5, -2, 0], scale: 1.08, transition: { duration: 0.45 } };

/** A row of pills that pop in one after another and wobble on hover. */
export default function Pills({ items, label, tone = "accent" }: Props) {
  return (
    <motion.ul className="pills" aria-label={label} variants={stagger(0.04)} {...inView}>
      {items.map((item) => (
        <motion.li
          key={item}
          className={tone === "neutral" ? "pill pill-neutral" : "pill"}
          variants={popIn}
          whileHover={wobble}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
