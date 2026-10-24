import { act, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

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

describe("theme", () => {
  it("follows the system colour scheme and cleans up its listener", () => {
    const mm = mockMatchMedia(true);
    const { unmount } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(mm.listeners.size).toBe(1);

    const [listener] = [...mm.listeners];
    act(() => listener({ matches: false } as MediaQueryListEvent));
    expect(mm.listeners.size).toBe(1);

    unmount();
    expect(mm.listeners.size).toBe(0);
    mm.restore();
  });
});
