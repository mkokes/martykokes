import { render, screen, within } from "@testing-library/react";
import Pills from "./Pills";

describe("Pills", () => {
  it("lists each item as an accent pill under the given name", () => {
    render(<Pills items={["React", "Go"]} label="Tech" />);
    const items = within(screen.getByRole("list", { name: "Tech" })).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual(["React", "Go"]);
    expect(items[0]).toHaveClass("pill");
    expect(items[0]).not.toHaveClass("pill-neutral");
  });

  it("uses the neutral pill for the neutral tone", () => {
    render(<Pills items={["Woodworking"]} tone="neutral" />);
    expect(screen.getByRole("listitem")).toHaveClass("pill", "pill-neutral");
  });
});
