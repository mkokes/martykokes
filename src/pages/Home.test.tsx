import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { profile, socialLinks } from "../data/profile";
import Home from "./Home";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  it("introduces Marty with photo, title, location and objective", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: profile.title })).toBeInTheDocument();
    expect(screen.getByAltText(profile.name)).toBeInTheDocument();
    expect(screen.getByText(profile.location)).toBeInTheDocument();
    expect(screen.getByText(profile.objective)).toBeInTheDocument();
  });

  it("links to every social profile in a new tab", () => {
    const { container } = renderHome();
    // Scoped to the hero: project cards further down have their own GitHub links.
    const hero = within(container.querySelector<HTMLElement>(".hero")!);
    for (const l of socialLinks) {
      const link = hero.getByRole("link", { name: new RegExp(l.label) });
      expect(link).toHaveAttribute("href", l.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    }
  });

  it("has calls to action for the experience and contact pages", () => {
    renderHome();
    expect(screen.getByRole("link", { name: "View experience" })).toHaveAttribute(
      "href",
      "/experience",
    );
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  });

  it("shows past projects with a link to see more", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 2, name: "Past projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View more/ })).toHaveAttribute("href", "/projects");
  });

  it("features what I'm working on now", () => {
    renderHome();
    expect(
      screen.getByRole("heading", { level: 2, name: "What I'm working on now" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /See all projects/ })).toHaveAttribute(
      "href",
      "/projects",
    );
  });
});
