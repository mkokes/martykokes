import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { now } from "../data/projects";
import NowFeature from "./NowFeature";

function renderNow() {
  return render(
    <MemoryRouter>
      <NowFeature />
    </MemoryRouter>,
  );
}

describe("NowFeature", () => {
  it("features the current project with its story and tech", () => {
    renderNow();
    const section = screen.getByRole("region", { name: "What I'm working on now" });
    expect(
      within(section).getByRole("heading", { level: 3, name: /ReceiptVault/ }),
    ).toBeInTheDocument();
    expect(within(section).getByText("In progress")).toBeInTheDocument();
    expect(within(section).getByText(now.tagline)).toBeInTheDocument();
    for (const p of now.story) {
      expect(within(section).getByText(p)).toBeInTheDocument();
    }
    for (const t of now.tech) {
      expect(within(section).getByText(t)).toBeInTheDocument();
    }
  });

  it("lists what's done and what's next", () => {
    renderNow();
    const done = screen.getByRole("list", { name: "Done" });
    const next = screen.getByRole("list", { name: "Up next" });
    expect(
      within(done)
        .getAllByRole("listitem")
        .map((li) => li.textContent?.trim()),
    ).toEqual(now.done);
    expect(
      within(next)
        .getAllByRole("listitem")
        .map((li) => li.textContent?.trim()),
    ).toEqual(now.next);
  });

  it("links to the repos and the projects page", () => {
    renderNow();
    for (const r of now.repos) {
      const link = screen.getByRole("link", { name: new RegExp(`${r.label} repo`) });
      expect(link).toHaveAttribute("href", r.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByRole("link", { name: /See all projects/ })).toHaveAttribute(
      "href",
      "/projects",
    );
  });
});
