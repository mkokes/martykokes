import { Typography } from "antd";
import CardGrid from "../components/CardGrid";
import ProjectCard from "../components/ProjectCard";
import { projects, projectsIntro } from "../data/projects";

export default function Projects() {
  return (
    <>
      <Typography.Title level={1}>Projects</Typography.Title>
      <Typography.Paragraph className="lead">{projectsIntro}</Typography.Paragraph>
      <CardGrid
        className="section"
        items={projects}
        getKey={(p) => p.slug}
        render={(p) => <ProjectCard project={p} from="projects" />}
      />
    </>
  );
}
