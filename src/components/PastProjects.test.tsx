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
    const headings = within(section).getAllByRole("heading", { level: 3 });
    expect(headings.map((h) => h.textContent)).toEqual(projects.slice(0, 3).map((p) => p.name));
    const more = within(section).getByRole("link", { name: /View more projects/ });
    expect(more).toHaveAttribute("href", "/projects");
    // The link sits below the cards rather than beside the heading.
    expect(headings.at(-1)!.compareDocumentPosition(more)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
