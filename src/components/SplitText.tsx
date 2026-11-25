import { motion } from "motion/react";
import { Fragment } from "react";
import { letter } from "../motion";

/**
 * Text whose letters animate in one by one (driven by a parent's `hidden`/`show` variants).
 * Assistive tech reads the plain copy; the animated letters are hidden from it.
 */
export default function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="split-text" aria-hidden="true">
        {words.map((word, w) => (
          // A real space between word boxes keeps the line able to wrap there.
          <Fragment key={`${word}-${w}`}>
            {w > 0 && " "}
            <span className="split-word">
              {[...word].map((ch, i) => (
                <motion.span key={`${ch}-${i}`} className="split-letter" variants={letter}>
                  {ch}
                </motion.span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
