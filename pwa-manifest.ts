import type { ManifestOptions } from "vite-plugin-pwa";

export const manifest: Partial<ManifestOptions> = {
  id: "/",
  name: "Marty Kokes",
  short_name: "Marty Kokes",
  description: "Resume and personal projects of Marty Kokes",
  categories: ["business", "portfolio", "productivity"],
  theme_color: "#242424",
  background_color: "#FFFFFF",
  display: "standalone",
  orientation: "any",
  icons: [
    { src: "icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
  shortcuts: [
    { name: "About", url: "/about" },
    { name: "Experience", url: "/experience" },
    { name: "Projects", url: "/projects" },
    { name: "Contact", url: "/contact" },
  ],
};
