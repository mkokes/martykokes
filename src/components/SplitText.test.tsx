import { render, screen } from "@testing-library/react";
import SplitText from "./SplitText";

describe("SplitText", () => {
  it("reads as plain text while drawing one hidden span per letter", () => {
    const { container } = render(
      <h1>
        <SplitText text="Marty Kokes" />
      </h1>,
    );
    expect(screen.getByRole("heading", { name: "Marty Kokes" })).toBeInTheDocument();
    const visual = container.querySelector(".split-text")!;
    expect(visual).toHaveAttribute("aria-hidden", "true");
    expect(visual.querySelectorAll(".split-word")).toHaveLength(2);
    expect(visual.querySelectorAll(".split-letter")).toHaveLength("MartyKokes".length);
    // A real space between the words lets the line wrap there.
    expect(visual.textContent).toBe("Marty Kokes");
  });
});
