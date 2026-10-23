import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("shows the name, current role and social links", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Marty Kokes" })).toBeInTheDocument();
    expect(screen.getByAltText("Marty Kokes")).toBeInTheDocument();
    expect(screen.getByText(/Senior Frontend Engineer, BI Worldwide/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/martykokes/",
    );
  });
});
