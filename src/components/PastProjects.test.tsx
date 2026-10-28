import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../data/projects";
import PastProjects from "./PastProjects";

describe("PastProjects", () => {
  it("shows the top three projects and links to the rest", () => {
    render(
      <MemoryRouter>
        <PastProjects />
      </MemoryRouter>,
    );
    const section = screen.getByRole("region", { name: "Past projects" });
    expect(
      within(section)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(projects.slice(0, 3).map((p) => p.name));
    expect(within(section).getByRole("link", { name: /View more/ })).toHaveAttribute(
      "href",
      "/projects",
    );
  });
});
