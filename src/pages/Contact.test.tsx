import { render, screen } from "@testing-library/react";
import { socialLinks } from "../data/profile";
import Contact from "./Contact";

describe("Contact", () => {
  it("invites a message and links to social profiles", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 1, name: "Get in touch" })).toBeInTheDocument();
    for (const l of socialLinks) {
      expect(screen.getByRole("link", { name: new RegExp(l.label) })).toHaveAttribute(
        "href",
        l.url,
      );
    }
  });

  it("includes the message form", () => {
    render(<Contact />);
    expect(screen.getByRole("region", { name: "Send a message" })).toBeInTheDocument();
    for (const label of ["Name", "Email", "Subject", "Message"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });
});
