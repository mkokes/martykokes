# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GPL-3.0-or-later license (`LICENSE`).
- Tours project card, linking to the 360° photo albums at tours.martykokes.com.
- Tours link in the header and mobile menu, pointing to tours.martykokes.com, which uses the same navigation.
- A page for each project at `/projects/<slug>`. Clicking a project card morphs the card into its page, and Back morphs it back into place, returning you to where you were on the list.
- Animations with [Motion](https://motion.dev): your name spells itself out letter by letter on the home page; sections reveal part by part as they scroll in; tech and skill pills pop in and wobble on hover; project and "What I do" cards tilt toward the mouse with a lime glare and lit border; project screenshots drift with scroll; the Experience timeline draws itself as you scroll; a lime bar under the header shows scroll progress; pages slide between each other; and the header's current-page dot slides between links. Visitors who prefer reduced motion get fades without movement, and tilt and parallax are off for them and on touch screens.

### Changed

- New home page intro: "Developer by trade, maker by nature", covering software, AI, mechanical projects, electronics and woodworking.

## [1.0.0] - 2026-10-28

### Added

- React + Ant Design resume site, replacing the old WordPress site.
- Multipage routing (Home, About, Experience, Projects, Contact) with a Formspree contact form and 100% test coverage enforced in CI.
- Profile photo in the home page hero.
- Installable PWA: maskable and iOS icons, manifest shortcuts and offline caching.
- Projects page with screenshot cards, plus "What I'm working on now" and "Past projects" sections on the home page.
- Fretomaton in the projects list.
- README, AGENTS.md, CLAUDE.md and this changelog.

### Changed

- Visual refresh: warm sage palette, Fraunces headings with Inter body text, restyled header, cards and timeline.
- Site is served from the domain root at martykokes.com.
- The home page's "View more projects" link is now a button below the project cards.
- The theme toggle is now a Light / System / Dark control that defaults to System.

### Removed

- The "My sites" section is no longer shown.

[Unreleased]: https://github.com/mkokes/martykokes/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mkokes/martykokes/releases/tag/v1.0.0
