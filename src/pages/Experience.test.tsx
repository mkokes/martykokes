import { render, screen, within } from "@testing-library/react";
import { education, experience } from "../data/experience";
import ExperiencePage from "./Experience";

describe("Experience page", () => {
  it("lists every job, newest first, with dates and highlights", () => {
    render(<ExperiencePage />);
    const section = screen.getByRole("region", { name: "Work history" });
    const titles = within(section)
      .getAllByRole("heading", { level: 4 })
      .map((h) => h.textContent);
    expect(titles).toEqual(experience.map((j) => `${j.title}, ${j.company}`));

    for (const job of experience) {
      expect(within(section).getByText(`${job.start} – ${job.end}`)).toBeInTheDocument();
      for (const h of job.highlights) {
        expect(within(section).getByText(h)).toBeInTheDocument();
      }
    }
  });

  it("shows the current role as present", () => {
    render(<ExperiencePage />);
    expect(screen.getByText("July 2021 – Present")).toBeInTheDocument();
    expect(screen.getByText("2015 – July 2021")).toBeInTheDocument();
  });

  it("lists education", () => {
    render(<ExperiencePage />);
    const section = screen.getByRole("region", { name: "Education" });
    for (const e of education) {
      expect(within(section).getByText(`${e.school} (${e.years})`)).toBeInTheDocument();
      expect(within(section).getByText(e.detail)).toBeInTheDocument();
    }
  });
});
