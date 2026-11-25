import { Button, Space, Typography } from "antd";
import { ArrowLeftOutlined, ExportOutlined, GithubOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { morphIds, type ProjectLinkState } from "../components/ProjectCard";
import Pills from "../components/Pills";
import { projects } from "../data/projects";
import { fadeUp, morphSpring, stagger } from "../motion";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const state = useLocation().state as ProjectLinkState | null;
  // Kept from the first render: while this page animates out after Back, the router's
  // location already belongs to the next page, which would drop the shared layoutIds.
  const [from] = useState(() => state?.from);
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  // Only morph when a card led here; a direct visit just fades in.
  const ids = from ? morphIds(from, p.slug) : undefined;

  return (
    <>
      <Link to="/projects" className="back-link">
        <ArrowLeftOutlined /> All projects
      </Link>
      <motion.article className="project-detail" layoutId={ids?.card} transition={morphSpring}>
        <motion.div className="project-cover" layoutId={ids?.image} transition={morphSpring}>
          <img src={p.image} alt={`Screenshot of ${p.name}`} width={800} height={500} />
        </motion.div>
        {/* The body fades in once the card has grown into place. */}
        <motion.div
          className="project-detail-body"
          initial="hidden"
          animate="show"
          variants={stagger(0.08, 0.25)}
        >
          <Typography.Title level={1} style={{ marginTop: 0 }}>
            <motion.span
              className="project-title"
              layoutId={ids?.title}
              layout="position"
              transition={morphSpring}
            >
              {p.name}
            </motion.span>
          </Typography.Title>
          <motion.div variants={fadeUp}>
            <Typography.Paragraph className="lead">{p.blurb}</Typography.Paragraph>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Pills items={p.tech} label={`${p.name} tech`} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Space wrap className="project-detail-actions">
              <Button
                type="primary"
                size="large"
                shape="round"
                icon={<ExportOutlined />}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit site
              </Button>
              <Button
                size="large"
                shape="round"
                icon={<GithubOutlined />}
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            </Space>
          </motion.div>
        </motion.div>
      </motion.article>
    </>
  );
}
