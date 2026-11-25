import { Card, Space, Typography } from "antd";
import { ExportOutlined, GithubOutlined } from "@ant-design/icons";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { morphSpring } from "../motion";
import { useMotionOk } from "../useMotionOk";
import InteractiveCard from "./InteractiveCard";
import Pills from "./Pills";

/**
 * layoutIds shared with the project's page, so the card morphs into it. `from` names the page
 * the card sits on; without it, two pages' cards for the same project would morph into each
 * other (e.g. Home to Projects).
 */
export const morphIds = (from: string, slug: string) => ({
  card: `${from}-project-${slug}`,
  image: `${from}-project-${slug}-image`,
  title: `${from}-project-${slug}-title`,
});

/** Router state a card link passes to the project's page. */
export interface ProjectLinkState {
  from: string;
}

/** The screenshot drifts inside its frame as the card passes through the viewport. */
function ParallaxCover({ project: p, layoutId }: { project: Project; layoutId: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const moving = useMotionOk();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <motion.div ref={frame} className="project-cover" layoutId={layoutId} transition={morphSpring}>
      <motion.img
        src={p.image}
        alt={`Screenshot of ${p.name}`}
        width={800}
        height={500}
        loading="lazy"
        style={moving ? { y, scale: 1.15 } : undefined}
      />
    </motion.div>
  );
}

interface Props {
  project: Project;
  /** The page the card sits on, e.g. "home" or "projects". */
  from: string;
}

export default function ProjectCard({ project: p, from }: Props) {
  const ids = morphIds(from, p.slug);
  const state: ProjectLinkState = { from };
  return (
    <motion.div className="project-morph" layoutId={ids.card} transition={morphSpring}>
      <InteractiveCard>
        <Card
          className="soft-card lift project-card"
          cover={<ParallaxCover project={p} layoutId={ids.image} />}
        >
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            <motion.span
              className="project-title"
              layoutId={ids.title}
              layout="position"
              transition={morphSpring}
            >
              {/* The ::after overlay stretches this link across the whole card. */}
              <Link to={`/projects/${p.slug}`} state={state} className="stretched-link">
                {p.name}
              </Link>
            </motion.span>
          </Typography.Title>
          <Typography.Paragraph>{p.blurb}</Typography.Paragraph>
          <Pills items={p.tech} label={`${p.name} tech`} />
          <Space size="large" className="project-links">
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              <ExportOutlined /> Visit site
            </a>
            <a href={p.repo} target="_blank" rel="noopener noreferrer">
              <GithubOutlined /> GitHub
            </a>
          </Space>
        </Card>
      </InteractiveCard>
    </motion.div>
  );
}
