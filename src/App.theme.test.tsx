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

// antd hides the radio input itself from pointer events, so click its label like a visitor would.
const pick = (name: string) =>
  userEvent.click(screen.getByRole("radio", { name }).closest("label")!);

describe("theme", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("keeps the theme-color meta tag in step with the chosen mode", async () => {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#FFFFFF";
    document.head.append(meta);
    const { unmount } = renderApp();
    expect(meta.content).toBe("#FFFFFF");
    await pick("Dark");
    expect(meta.content).toBe("#242424");
    await pick("Light");
    expect(meta.content).toBe("#FFFFFF");
    unmount();
    meta.remove();
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

  it("defaults to system and remembers an explicit choice", async () => {
    const { unmount } = renderApp();
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
    expect(theme()).toBe("light");

    await pick("Dark");
    expect(theme()).toBe("dark");
    expect(localStorage.getItem(THEME_KEY)).toBe("dark");

    unmount();
    renderApp();
    expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(theme()).toBe("dark");
    await pick("Light");
    expect(theme()).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
  });

  it("goes back to following the system when System is picked", async () => {
    localStorage.setItem(THEME_KEY, "light");
    const mm = mockMatchMedia(true);
    renderApp();
    expect(theme()).toBe("light");

    await pick("System");
    expect(theme()).toBe("dark");
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
    mm.restore();
  });

  it("ignores unknown stored values", () => {
    localStorage.setItem(THEME_KEY, "purple");
    renderApp();
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
    expect(theme()).toBe("light");
  });

  it("still switches when storage is unavailable", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    renderApp();
    expect(theme()).toBe("light");
    await pick("Dark");
    expect(theme()).toBe("dark");
  });
});
