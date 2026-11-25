import { act, fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";

function Page({ name }: { name: string }) {
  const navigate = useNavigate();
  return (
    <>
      <h1>{name}</h1>
      <Link to="/">Home</Link>
      <Link to="/other">Other</Link>
      <Link to="/projects/demo">Demo project</Link>
      <a href="https://example.com/" onClick={(e) => e.preventDefault()}>
        Elsewhere
      </a>
      <a href="/other" target="_blank" onClick={(e) => e.preventDefault()}>
        Other in a new tab
      </a>
      <button onClick={() => navigate("/other")}>Go to other</button>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
}

function renderApp() {
  return render(
    <MemoryRouter>
      <Routes>
        <Route element={<AnimatedOutlet />}>
          <Route index element={<Page name="Home page" />} />
          <Route path="other" element={<Page name="Other page" />} />
          <Route path="projects/:slug" element={<Page name="Project page" />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

const livePage = () => screen.getAllByRole("heading", { level: 1 }).at(-1)!.closest(".page-view")!;
const homePage = () => screen.getByText("Home page").closest<HTMLElement>(".page-view")!;

function setScrollY(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
}

describe("AnimatedOutlet", () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollTo = vi.fn();
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
    setScrollY(0);
    history.replaceState(null, "");
  });

  it("pins the outgoing page and scrolls to the top before a link navigates", () => {
    renderApp();
    const home = homePage();
    setScrollY(300);
    fireEvent.click(screen.getByRole("link", { name: "Other" }));
    expect(home.style.position).toBe("fixed");
    expect(home.style.pointerEvents).toBe("none");
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
    expect(screen.getByRole("heading", { name: "Other page" })).toBeInTheDocument();
    // The held-open height is released once the new page is in.
    expect(livePage().parentElement!.style.minHeight).toBe("");
  });

  it("crossfades to and from project pages", () => {
    renderApp();
    fireEvent.click(screen.getByRole("link", { name: "Demo project" }));
    expect(screen.getByRole("heading", { name: "Project page" })).toBeInTheDocument();
  });

  it("leaves clicks alone that won't change the page here", () => {
    renderApp();
    scrollTo.mockClear();
    const home = homePage();
    // The current page's own link: no swap to prepare; the router's replace just scrolls up.
    fireEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(home.style.position).toBe("");
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
    scrollTo.mockClear();
    fireEvent.click(screen.getByRole("link", { name: "Other" }), { ctrlKey: true });
    fireEvent.click(screen.getByRole("link", { name: "Other" }), { button: 1 });
    fireEvent.click(screen.getByRole("link", { name: "Elsewhere" }));
    fireEvent.click(screen.getByRole("link", { name: "Other in a new tab" }));
    fireEvent.click(screen.getByText("Home page"));
    expect(home.style.position).toBe("");
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("ignores a click another handler already cancelled", () => {
    renderApp();
    const link = screen.getByRole("link", { name: "Other" });
    const cancel = (e: Event) => e.preventDefault();
    window.addEventListener("click", cancel, true);
    fireEvent.click(link);
    window.removeEventListener("click", cancel, true);
    expect(homePage().style.position).toBe("");
  });

  it("restores the scroll position of the entry Back returns to", () => {
    renderApp();
    setScrollY(640);
    fireEvent.click(screen.getByRole("link", { name: "Other" }));
    // The browser fires popstate before the router re-renders; the first entry has no key.
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(scrollTo).toHaveBeenLastCalledWith(0, 640);
    // The outgoing page is still mounted while it animates out; use the live page's button.
    fireEvent.click(screen.getAllByRole("button", { name: "Go back" }).at(-1)!);
    expect(screen.getByRole("heading", { name: "Home page" })).toBeInTheDocument();
  });

  it("scrolls to the top for an entry it has no position for", () => {
    renderApp();
    history.replaceState({ key: "unknown" }, "");
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
    // A second one before any page swap finds nothing left to pin.
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(scrollTo).toHaveBeenCalledTimes(3);
  });

  it("falls back to scrolling after navigations it didn't prepare", () => {
    renderApp();
    setScrollY(200);
    fireEvent.click(screen.getByRole("button", { name: "Go to other" }));
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
    fireEvent.click(screen.getAllByRole("button", { name: "Go back" }).at(-1)!);
    expect(screen.getByRole("heading", { name: "Home page" })).toBeInTheDocument();
  });

  it("hands scroll restoration back to the browser when it unmounts", () => {
    history.scrollRestoration = "auto";
    const { unmount } = renderApp();
    expect(history.scrollRestoration).toBe("manual");
    unmount();
    expect(history.scrollRestoration).toBe("auto");
  });
});
