import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { manifest } from "../pwa-manifest";

const publicFile = (name: string) => resolve(__dirname, "../public", name);

describe("PWA manifest", () => {
  it("identifies the app and runs standalone", () => {
    expect(manifest.name).toBe("Marty Kokes");
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.id).toBe("/");
    expect(manifest.display).toBe("standalone");
  });

  it("ships every icon, with a maskable 512px one", () => {
    const icons = manifest.icons ?? [];
    for (const icon of icons) {
      expect(existsSync(publicFile(icon.src)), icon.src).toBe(true);
    }
    expect(icons.map((i) => i.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
    expect(icons.some((i) => i.purpose === "maskable" && i.sizes === "512x512")).toBe(true);
  });

  it("has shortcuts that point at real routes", () => {
    const app = readFileSync(resolve(__dirname, "App.tsx"), "utf8");
    for (const s of manifest.shortcuts ?? []) {
      expect(app).toContain(`path="${s.url.slice(1)}"`);
    }
  });

  it("provides an iOS home-screen icon and a dark-mode theme colour", () => {
    expect(existsSync(publicFile("apple-touch-icon.png"))).toBe(true);
    const html = readFileSync(resolve(__dirname, "../index.html"), "utf8");
    expect(html).toContain('href="/apple-touch-icon.png"');
    expect(html).toMatch(/theme-color" content="#242424" media="\(prefers-color-scheme: dark\)"/);
  });
});
