import { Timeline, Typography } from "antd";
import { motion, useScroll, useSpring } from "motion/react";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import { experience } from "../data/experience";
import { useMotionOk } from "../useMotionOk";
import Section from "./Section";

/** Where the drawn line runs: from the first timeline dot's centre to the last one's. */
function useDotSpan(container: RefObject<HTMLDivElement | null>) {
  const [span, setSpan] = useState({ top: 0, height: 0 });
  useLayoutEffect(() => {
    const el = container.current!;
    const measure = () => {
      const dots = [...el.querySelectorAll(".ant-timeline-item-icon")].map((d) =>
        d.getBoundingClientRect(),
      );
      const base = el.getBoundingClientRect().top;
      const first = dots[0];
      const last = dots[dots.length - 1];
      setSpan({ top: first.top + first.height / 2 - base, height: last.top - first.top });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [container]);
  return span;
}

export default function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const drawing = useMotionOk();
  const span = useDotSpan(track);
  // The line reaches each dot as that dot crosses 70% of the way down the viewport.
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 70%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section labelledBy="experience">
      <Typography.Title level={2} id="experience">
        Work history
      </Typography.Title>
      <div ref={track} className="timeline-track">
        {drawing && (
          <motion.div
            className="timeline-draw"
            aria-hidden="true"
            style={{ top: span.top, height: span.height, scaleY }}
          />
        )}
        <Timeline
          items={experience.map((job) => ({
            key: `${job.company}-${job.start}`,
            content: (
              <motion.div
                className="entry-card"
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              >
                <div className="entry-head">
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {job.title}, {job.company}
                  </Typography.Title>
                  <Typography.Text type="secondary" className="entry-dates">
                    {job.start} – {job.end}
                  </Typography.Text>
                </div>
                <ul className="entry-highlights">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </motion.div>
            ),
          }))}
        />
      </div>
    </Section>
  );
}
