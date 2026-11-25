import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { projects } from "../data/projects";
import { useMotionOk } from "../useMotionOk";
import ProjectCard from "./ProjectCard";

vi.mock("../useMotionOk", () => ({
  useMotionOk: vi.fn(() => true),
  usePointerEffects: vi.fn(() => false),
}));

const project = projects[0];

function renderCard() {
  return render(
    <MemoryRouter>
      <ProjectCard project={project} from="projects" />
    </MemoryRouter>,
  );
}

describe("ProjectCard", () => {
  it("shows the name, screenshot, blurb and tech", () => {
    renderCard();
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
    renderCard();
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

  it("links its title to the project's page, saying which page it came from", async () => {
    function Where() {
      const { pathname, state } = useLocation();
      return <p>{`${pathname} ${JSON.stringify(state)}`}</p>;
    }
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ProjectCard project={project} from="home" />} />
          <Route path="*" element={<Where />} />
        </Routes>
      </MemoryRouter>,
    );
    await userEvent.click(screen.getByRole("link", { name: project.name }));
    expect(screen.getByText(`/projects/${project.slug} {"from":"home"}`)).toBeInTheDocument();
  });

  it("drifts the screenshot with scroll, unless motion is reduced", () => {
    const shot = () => screen.getByAltText(`Screenshot of ${project.name}`);
    const { unmount } = renderCard();
    expect(shot().style.transform).toContain("scale(1.15)");
    unmount();
    vi.mocked(useMotionOk).mockReturnValue(false);
    renderCard();
    expect(shot().style.transform).toBe("");
  });
});
