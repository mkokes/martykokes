import { render, screen } from "@testing-library/react";
import { experience } from "../data/experience";
import { useMotionOk } from "../useMotionOk";
import Experience from "./Experience";

vi.mock("../useMotionOk", () => ({ useMotionOk: vi.fn(() => true) }));

describe("Experience", () => {
  it("lists every job and draws the timeline line over the rails", () => {
    const { container } = render(<Experience />);
    expect(screen.getByRole("region", { name: "Work history" })).toBeInTheDocument();
    for (const job of experience) {
      expect(screen.getByText(`${job.title}, ${job.company}`)).toBeInTheDocument();
    }
    expect(container.querySelector(".timeline-draw")).toBeInTheDocument();
  });

  it("leaves the plain rails when motion is reduced", () => {
    vi.mocked(useMotionOk).mockReturnValue(false);
    const { container } = render(<Experience />);
    expect(container.querySelector(".timeline-draw")).not.toBeInTheDocument();
  });
});
