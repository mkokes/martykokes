# AGENTS.md

Context for AI coding agents working in this repo. Human-facing overview: [README.md](README.md). Design rationale: [docs/visual-refresh-spec.md](docs/visual-refresh-spec.md).

## What this is

Marty Kokes's personal site and resume ([martykokes.com](https://martykokes.com)): a React + Ant Design single-page app with Home, About, Experience, Projects and Contact pages, installable as a PWA and deployed to GitHub Pages.

## Layout

```
index.html              Inline script sets data-theme before first paint
pwa-manifest.ts         Web app manifest (used by vite-plugin-pwa)
vite.config.ts          Vite + Vitest config (coverage thresholds live here)
public/                 Static files: CNAME, favicon, PWA icons
src/
  main.tsx              Entry: fonts, router, global CSS
  App.tsx               Routes + theme preference hook (useThemeMode)
  theme.ts              Palette, antd ThemeConfig, Mode / ThemePref types, THEME_KEY
  index.css             Global CSS and CSS custom properties (mirror of theme.ts palette)
  components/           Layout and section components (SiteLayout, Hero, ProjectCard, ...)
  pages/                One component per route
  data/                 All site content (profile, experience, skills, about, projects)
  assets/               Avatar and project screenshots (800x500 .webp)
docs/                   Design spec
```

## Commands

```bash
npm ci                  # install (Node 22, as in CI)
npm run dev             # Vite dev server
npm test                # Vitest, single run
npm run test:coverage   # Vitest with 100% coverage thresholds
npm run lint            # oxlint
npm run format          # oxfmt (write)
npm run format:check    # oxfmt (check)
npm run build           # tsc -b && vite build
```

The Husky pre-push hook runs `lint`, `format:check` and `test:coverage`. CI (`.github/workflows/pages.yml`) runs those plus `build` on every PR and deploys `master` to GitHub Pages.

## Conventions

- **Content lives in `src/data/`.** Pages and components only render it. To add a project, add an entry to `projects` in `src/data/projects.ts` (ordered most technical first; the home page shows the first three) and an 800×500 `.webp` screenshot in `src/assets/projects/`.
- **Styling:** antd components themed via `themeConfig()` in `src/theme.ts`, plus plain CSS in `src/index.css` using the CSS custom properties. Keep the two palettes in sync.
- **Theme:** the visitor's preference is `"light" | "system" | "dark"` (default `"system"`). Light/dark are stored in `localStorage` under `THEME_KEY`; choosing system removes the key. The resolved mode is written to `<html data-theme>`. The inline script in `index.html` reads the same key, so keep them in step if the storage format changes.
- **Tests** sit next to the code (`*.test.tsx`) and use Testing Library with role/name queries. Coverage must stay at 100% for statements, branches, functions and lines, or CI and pre-push fail.
- Wrap `localStorage` access in try/catch; it throws in some private modes.
- Formatting is oxfmt; don't hand-format against it.

## Gotchas

- antd `Segmented` radios have `pointer-events: none`; in tests click the option's `<label>` (see `pick()` in `src/App.theme.test.tsx`).
- `src/setupTests.ts` stubs `matchMedia`, `scrollTo` and `ResizeObserver` for jsdom. Theme tests replace `matchMedia` to drive the system preference.
- Deep links on GitHub Pages work because CI copies `dist/index.html` to `dist/404.html`.
- The contact form posts to Formspree; the form id is in `src/data/profile.ts`.
