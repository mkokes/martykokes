import { Button, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import CardGrid from "./CardGrid";
import ProjectCard from "./ProjectCard";
import Section from "./Section";

export default function PastProjects() {
  return (
    <Section labelledBy="past-projects">
      <Typography.Title level={2} id="past-projects">
        Past projects
      </Typography.Title>
      <CardGrid
        items={projects.slice(0, 3)}
        getKey={(p) => p.slug}
        render={(p) => <ProjectCard project={p} from="home" />}
      />
      <div className="section-more">
        <Link to="/projects">
          <Button size="large" shape="round">
            View more projects <RightOutlined />
          </Button>
        </Link>
      </div>
    </Section>
  );
}
