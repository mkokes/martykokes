import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectDetail from "./ProjectDetail";

const project = projects[1];

function renderAt(path: string, state?: unknown) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: path, state }]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProjectDetail", () => {
  it("shows the project with its screenshot, blurb, tech and links", () => {
    renderAt(`/projects/${project.slug}`);
    expect(screen.getByRole("heading", { level: 1, name: project.name })).toBeInTheDocument();
    expect(screen.getByAltText(`Screenshot of ${project.name}`)).toBeInTheDocument();
    expect(screen.getByText(project.blurb)).toBeInTheDocument();
    const tech = screen.getByRole("list", { name: `${project.name} tech` });
    expect(within(tech).getAllByRole("listitem")).toHaveLength(project.tech.length);
    expect(screen.getByRole("link", { name: /Visit site/ })).toHaveAttribute("href", project.url);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", project.repo);
    expect(screen.getByRole("link", { name: /All projects/ })).toHaveAttribute("href", "/projects");
  });

  it("renders the same page when a card led here", () => {
    renderAt(`/projects/${project.slug}`, { from: "home" });
    expect(screen.getByRole("heading", { level: 1, name: project.name })).toBeInTheDocument();
  });

  it("shows the not-found page for an unknown project", () => {
    renderAt("/projects/nope");
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
