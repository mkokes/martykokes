import { render, screen, within } from "@testing-library/react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const project = projects[0];

describe("ProjectCard", () => {
  it("shows the name, screenshot, blurb and tech", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("heading", { level: 3, name: project.name })).toBeInTheDocument();
    expect(screen.getByAltText(`Screenshot of ${project.name}`)).toHaveAttribute("loading", "lazy");
    expect(screen.getByText(project.blurb)).toBeInTheDocument();
    const tech = screen.getByRole("list", { name: `${project.name} tech` });
    expect(
      within(tech)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(project.tech);
  });

  it("links to the live site and the repo in a new tab", () => {
    render(<ProjectCard project={project} />);
    const links = [
      [/Visit site/, project.url],
      [/GitHub/, project.repo],
    ] as const;
    for (const [name, href] of links) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
