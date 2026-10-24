import { render, screen } from "@testing-library/react";
import Sites from "./Sites";
import { sites } from "../data/sites";

describe("Sites", () => {
  it("lists each site as a link", () => {
    render(<Sites />);
    for (const s of sites) {
      expect(screen.getByRole("link", { name: s.name })).toHaveAttribute("href", s.url);
    }
  });
});
