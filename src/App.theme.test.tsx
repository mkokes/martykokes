import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { THEME_KEY } from "./theme";

type Listener = (e: MediaQueryListEvent) => void;

function mockMatchMedia(matches: boolean) {
  const darkQuery = "(prefers-color-scheme: dark)";
  const listeners = new Set<Listener>();
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    // Only track the app's own query; antd registers others for responsive grids.
    addEventListener: (_: string, l: Listener) => query === darkQuery && listeners.add(l),
    removeEventListener: (_: string, l: Listener) => query === darkQuery && listeners.delete(l),
  })) as unknown as typeof window.matchMedia;
  return { listeners, restore: () => (window.matchMedia = original) };
}

function renderApp() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
}

const theme = () => document.documentElement.dataset.theme;

describe("theme", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("follows the system colour scheme and cleans up its listener", () => {
    const mm = mockMatchMedia(true);
    const { unmount } = renderApp();
    expect(mm.listeners.size).toBe(1);
    expect(theme()).toBe("dark");

    const [listener] = [...mm.listeners];
    act(() => listener({ matches: false } as MediaQueryListEvent));
    expect(mm.listeners.size).toBe(1);
    expect(theme()).toBe("light");

    unmount();
    expect(mm.listeners.size).toBe(0);
    mm.restore();
  });

  it("toggles the theme and remembers the choice", async () => {
    const { unmount } = renderApp();
    expect(theme()).toBe("light");

    await userEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(theme()).toBe("dark");
    expect(localStorage.getItem(THEME_KEY)).toBe("dark");

    unmount();
    renderApp();
    expect(theme()).toBe("dark");
    await userEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(theme()).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
  });

  it("ignores unknown stored values", () => {
    localStorage.setItem(THEME_KEY, "purple");
    renderApp();
    expect(theme()).toBe("light");
  });

  it("still toggles when storage is unavailable", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    renderApp();
    expect(theme()).toBe("light");
    await userEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(theme()).toBe("dark");
  });
});
