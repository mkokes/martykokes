import { render, screen, within } from "@testing-library/react";
import { aboutIntro, whatIDo } from "../data/about";
import { interests, interestsDisclaimer, skills } from "../data/skills";
import About from "./About";

describe("About", () => {
  it("shows the intro paragraphs", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 1, name: "About me" })).toBeInTheDocument();
    for (const p of aboutIntro) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it("shows a card for everything I do", () => {
    render(<About />);
    const section = screen.getByRole("region", { name: "What I do" });
    for (const w of whatIDo) {
      expect(within(section).getByText(w.title)).toBeInTheDocument();
      expect(within(section).getByText(w.description)).toBeInTheDocument();
    }
    expect(within(section).getAllByRole("img")).toHaveLength(whatIDo.length);
  });

  it("lists skills by group", () => {
    render(<About />);
    const section = screen.getByRole("region", { name: "Skills" });
    for (const [group, items] of Object.entries(skills)) {
      expect(within(section).getByText(group)).toBeInTheDocument();
      for (const item of items) {
        expect(within(section).getByText(item)).toBeInTheDocument();
      }
    }
  });

  it("lists interests with the disclaimer", () => {
    render(<About />);
    const section = screen.getByRole("region", { name: "Activities & interests" });
    for (const i of interests) {
      expect(within(section).getByText(i)).toBeInTheDocument();
    }
    expect(within(section).getByText(interestsDisclaimer)).toBeInTheDocument();
  });
});
