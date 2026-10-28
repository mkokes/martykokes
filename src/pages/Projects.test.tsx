import { render, screen } from "@testing-library/react";
import { projects, projectsIntro } from "../data/projects";
import Projects from "./Projects";

describe("Projects", () => {
  it("shows the intro and a card for each project, in order", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
    expect(screen.getByText(projectsIntro)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(
      projects.map((p) => p.name),
    );
  });
});
