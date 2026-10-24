import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("shows the home page with name, photo and social links", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { level: 1, name: "Marty Kokes" })).toBeInTheDocument();
    expect(screen.getByAltText("Marty Kokes")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /LinkedIn/ })[0]).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/martykokes/",
    );
  });

  it("shows the about page", () => {
    renderAt("/about");
    expect(screen.getByRole("heading", { level: 1, name: "About me" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "What I do" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toBeInTheDocument();
  });

  it("shows the experience page with the current role", () => {
    renderAt("/experience");
    expect(screen.getByRole("heading", { level: 1, name: "Experience" })).toBeInTheDocument();
    expect(screen.getByText(/Senior Frontend Engineer, BI Worldwide/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Education" })).toBeInTheDocument();
  });

  it("shows the contact page with the message form", () => {
    renderAt("/contact");
    expect(screen.getByRole("heading", { level: 1, name: "Get in touch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });

  it("shows a not-found page for unknown routes", () => {
    renderAt("/nope");
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("navigates between pages from the header", async () => {
    renderAt("/");
    await userEvent.click(screen.getAllByRole("link", { name: "About" })[0]);
    expect(await screen.findByRole("heading", { level: 1, name: "About me" })).toBeInTheDocument();
  });

  it("opens the mobile menu and closes it after choosing a page", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = await screen.findByRole("dialog");
    await userEvent.click(within(drawer).getByRole("link", { name: "Contact" }));
    expect(
      await screen.findByRole("heading", { level: 1, name: "Get in touch" }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.querySelector(".ant-drawer-open")).toBeNull());
  });

  it("highlights the section for nested paths", () => {
    renderAt("/about/team");
    expect(screen.getAllByRole("menuitem", { name: "About" })[0]).toHaveClass(
      "ant-menu-item-selected",
    );
  });

  it("closes the mobile menu with its close button", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await screen.findByRole("dialog");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(document.querySelector(".ant-drawer-open")).toBeNull());
  });
});
