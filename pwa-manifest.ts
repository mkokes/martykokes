import { ManifestOptions } from "vite-plugin-pwa";

export const pwaManifest: Partial<ManifestOptions> = {
  name: "Marty Kokes | Senior Frontend Engineer",
  short_name: "Marty Kokes",
  description: "Personal landing page and resume of Marty Kokes, Senior Frontend Engineer.",
  theme_color: "#141414", // Matches your grey/dark system background token
  background_color: "#141414", // Prevents light flash during standalone splash screen load
  display: "standalone",
  orientation: "portrait-primary",
  start_url: "/",
  scope: "/",
  icons: [
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "maskable-icon-512x512.png", // Ensure you have a padded version for modern Android devices
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};
