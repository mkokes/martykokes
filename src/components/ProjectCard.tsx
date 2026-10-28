import { Card, Space, Typography } from "antd";
import { ExportOutlined, GithubOutlined } from "@ant-design/icons";
import type { Project } from "../data/projects";

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Card
      className="soft-card lift project-card"
      cover={
        <img
          src={p.image}
          alt={`Screenshot of ${p.name}`}
          width={800}
          height={500}
          loading="lazy"
        />
      }
    >
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        {p.name}
      </Typography.Title>
      <Typography.Paragraph>{p.blurb}</Typography.Paragraph>
      <ul className="pills" aria-label={`${p.name} tech`}>
        {p.tech.map((t) => (
          <li key={t} className="pill pill-neutral">
            {t}
          </li>
        ))}
      </ul>
      <Space size="large" className="project-links">
        <a href={p.url} target="_blank" rel="noopener noreferrer">
          <ExportOutlined /> Visit site
        </a>
        <a href={p.repo} target="_blank" rel="noopener noreferrer">
          <GithubOutlined /> GitHub
        </a>
      </Space>
    </Card>
  );
}
