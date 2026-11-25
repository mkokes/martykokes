import { Col, Row } from "antd";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, inView, stagger } from "../motion";

const MotionRow = motion.create(Row);

interface Props<T> {
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
  /** Column spans at the sm and lg breakpoints (always full width on xs). */
  sm?: number;
  lg?: number;
  className?: string;
}

/** A responsive card grid whose cards fade up one after another as it scrolls into view. */
export default function CardGrid<T>({
  items,
  getKey,
  render,
  sm = 12,
  lg = 8,
  className,
}: Props<T>) {
  return (
    <MotionRow gutter={[16, 16]} className={className} variants={stagger(0.08)} {...inView}>
      {items.map((item) => (
        <Col key={getKey(item)} xs={24} sm={sm} lg={lg}>
          <motion.div variants={fadeUp} style={{ height: "100%" }}>
            {render(item)}
          </motion.div>
        </Col>
      ))}
    </MotionRow>
  );
}
