import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "motion/react";
import { useMotionOk, usePointerEffects } from "./useMotionOk";

vi.mock("motion/react", () => ({ useReducedMotion: vi.fn(() => false) }));

function stubPointer(fine: boolean) {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query === "(pointer: fine)" ? fine : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
  return () => (window.matchMedia = original);
}

describe("useMotionOk", () => {
  it("allows motion unless the visitor prefers it reduced", () => {
    expect(renderHook(useMotionOk).result.current).toBe(true);
    vi.mocked(useReducedMotion).mockReturnValueOnce(true);
    expect(renderHook(useMotionOk).result.current).toBe(false);
  });
});

describe("usePointerEffects", () => {
  it("needs a fine pointer as well as allowed motion", () => {
    let restore = stubPointer(true);
    expect(renderHook(usePointerEffects).result.current).toBe(true);
    restore();
    restore = stubPointer(false);
    expect(renderHook(usePointerEffects).result.current).toBe(false);
    restore();
  });
});
