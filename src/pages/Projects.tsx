import { Col, Row, Typography } from "antd";
import ProjectCard from "../components/ProjectCard";
import { projects, projectsIntro } from "../data/projects";

export default function Projects() {
  return (
    <>
      <Typography.Title level={1}>Projects</Typography.Title>
      <Typography.Paragraph className="lead">{projectsIntro}</Typography.Paragraph>
      <Row gutter={[16, 16]} className="section">
        {projects.map((p) => (
          <Col key={p.url} xs={24} sm={12} lg={8}>
            <ProjectCard project={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}
