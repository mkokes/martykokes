import { Button, Col, Row, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function PastProjects() {
  return (
    <section className="section" aria-labelledby="past-projects">
      <Typography.Title level={2} id="past-projects">
        Past projects
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {projects.slice(0, 3).map((p) => (
          <Col key={p.url} xs={24} sm={12} lg={8}>
            <ProjectCard project={p} />
          </Col>
        ))}
      </Row>
      <div className="section-more">
        <Link to="/projects">
          <Button size="large" shape="round">
            View more projects <RightOutlined />
          </Button>
        </Link>
      </div>
    </section>
  );
}
