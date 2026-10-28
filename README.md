# martykokes.com

Personal site and resume of Marty Kokes, senior frontend engineer.

A small React single-page app with my background, work history, side projects and a contact form. It's themed in a warm sage palette, works in light and dark mode, and installs as a PWA. It is live at [martykokes.com](https://martykokes.com).

## Features

- Home page with hero, current project and the top three past projects
- About, Experience, Projects and Contact pages
- Light / System / Dark theme control; System follows the OS setting and is the default
- Contact form backed by Formspree
- Installable PWA with offline caching

## Tech stack

- React 19, TypeScript, React Router 7
- Ant Design 6, themed through `ConfigProvider` plus plain CSS
- Vite with `vite-plugin-pwa`
- Vitest + Testing Library, oxlint, oxfmt, Husky
- GitHub Pages via GitHub Actions

Requires Node 22 (what CI uses) and npm.

## Getting started

```bash
git clone https://github.com/mkokes/martykokes.git
cd martykokes
npm ci
npm run dev
```

Other scripts:

```bash
npm test                # run tests once
npm run test:coverage   # tests with 100% coverage thresholds
npm run lint            # oxlint
npm run format          # oxfmt
npm run build           # type-check and build to dist/
npm run preview         # serve the production build
```

## Editing content

All copy lives in [`src/data/`](src/data/): profile and social links, experience, skills, about, and projects. To add a project, append it to `projects` in [`src/data/projects.ts`](src/data/projects.ts) and add an 800×500 `.webp` screenshot to `src/assets/projects/`.

## Contributing

Run `npm run lint`, `npm run format:check` and `npm run test:coverage` before pushing (the pre-push hook does this too), then open a pull request against `master`. Merges to `master` deploy automatically. See [AGENTS.md](AGENTS.md) for conventions and [docs/](docs/) for the design spec.

## License

Copyright (C) 2018-2026 Marty Kokes

Licensed under the GNU General Public License v3.0 or later. See [LICENSE](LICENSE).
