/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { manifest } from "./pwa-manifest";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      // Installs updates silently in the background; they take effect on the next load.
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest,
      workbox: {
        // Client-side routes (/about, /projects...) fall back to the app shell offline.
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
        runtimeCaching: [
          {
            // Images not in the precache (e.g. added after install) are served from cache, then refreshed.
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "portfolio-images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: "module",
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/setupTests.ts", "src/**/*.test.{ts,tsx}", "src/vite-env.d.ts"],
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  },
});
