# Visual refresh spec

## Goal

Move the site off the stock Ant Design look toward a **warm, personal** feel that works as a general personal hub. Keep antd, but theme it heavily through `ConfigProvider` tokens plus custom CSS. Content and routes stay the same.

## Design decisions

| Area        | Decision                                   |
| ----------- | ------------------------------------------ |
| Personality | Warm & personal                            |
| Framework   | Keep antd, theme heavily (tokens + CSS)    |
| Accent      | Forest / sage green                        |
| Type        | Serif headings + sans body                 |
| Background  | Warm neutrals, not pure white/black        |
| Theme       | System default + manual toggle, remembered |
| Motion      | Subtle; respects `prefers-reduced-motion`  |

## 1. Design tokens

Define these once in a `src/theme.ts` that exports light and dark antd `ThemeConfig`s, and mirror them as CSS custom properties on `:root` / `[data-theme="dark"]` for custom CSS.

| Token                       | Light     | Dark      |
| --------------------------- | --------- | --------- |
| `colorPrimary` (sage)       | `#3F6B4E` | `#8DB89A` |
| Primary tint (pill/icon bg) | `#E6EFE8` | `#26352B` |
| `colorBgLayout` (page)      | `#FAF8F3` | `#1C1B19` |
| `colorBgContainer` (cards)  | `#FFFFFF` | `#252320` |
| `colorText`                 | `#2B2A27` | `#ECE8E1` |
| `colorTextSecondary`        | `#6B675F` | `#A8A39A` |
| `colorBorderSecondary`      | `#ECE7DD` | `#34312C` |
| `borderRadius`              | 10        | 10        |
| `borderRadiusLG` (cards)    | 16        | 16        |

Text/primary pairs must meet WCAG AA (4.5:1) against their background, so verify these with a contrast checker when implementing.

## 2. Typography

- **Headings:** Fraunces (variable serif), weight ~600, slight negative letter-spacing on h1.
- **Body/UI:** Inter (variable), 16px base, line-height 1.65 for paragraphs.
- Self-host via `@fontsource-variable/fraunces` and `@fontsource-variable/inter` (no external requests; works offline for the PWA).
- antd: set `fontFamily` token to Inter. Apply Fraunces to `h1–h4` / `.ant-typography` headings in CSS.
- Scale: h1 `clamp(2.25rem, 5vw, 3.25rem)`, h2 1.75rem, h3 1.25rem.

## 3. Theme toggle

- Add a `useThemeMode` hook with a `"light" | "dark" | "system"` preference stored in `localStorage` (wrapped in try/catch). Default to `"system"`.
- Resolved mode drives the antd algorithm and sets `data-theme` on `<html>`.
- Header gets a sun/moon icon button (`aria-label="Switch to dark/light theme"`). It cycles light ↔ dark; system stays the default until the user clicks.
- Set the theme before React mounts (a small inline script in `index.html`) so the page doesn't flash the wrong theme on load.
- Update `theme-color` meta / PWA manifest colors to the new backgrounds.
- Extend `App.theme.test.tsx` to cover the toggle and persistence.

## 4. Header

- Transparent over the page background at the top.
- After scrolling more than 8px, add the `.is-scrolled` class: translucent background (`color-mix` of bg at ~80%), `backdrop-filter: blur(12px)`, and a hairline bottom border.
- Name/logo set in Fraunces.
- Desktop nav: plain text links rather than antd's underlined Menu style. The active link gets a sage color and a small dot or underline beneath it.
- Mobile Drawer stays, but gets the same theming. The theme toggle sits beside the hamburger.

## 5. Home: bigger hero

- More vertical space: min-height ~60vh, content vertically centered, and a single column on mobile.
- **Photo:** ~200px circle (160px on mobile) with a sage accent ring. Use a 4px gap ring via `box-shadow`, plus a soft offset sage blob/circle behind it at low opacity.
- **Copy:** friendly greeting line above the name (e.g. "Hi, I'm"), the name in large Fraunces, the title in secondary text, and the location with a small pin icon. The objective sits in a warmer, slightly larger paragraph (max ~60ch).
- Social links and the two CTAs stay below. Restyle the CTAs as pill buttons: primary is solid sage, secondary is outlined.
- The `Sites` component stays unrendered (out of scope).

## 6. Inner pages

### About: "What I do" cards

- Card padding 24px, radius 16, no harsh border (use a hairline or a very soft shadow).
- Icon sits in a 44px sage-tinted circle with a primary-colored glyph.
- Hover: `translateY(-2px)` plus a slightly stronger shadow, over 150ms.

### Skills & interests: soft pills

- Replace grey antd `Tag`s with rounded pills: tinted sage background, primary text, no border, padding 4×12.
- Show each skill group as a small card with the group name as a label.
- Interests use the same pill style in a neutral warm tint so they differ from skills.

### Experience: restyled timeline

- Sage dots, with a thin line in the border color.
- Each entry is card-like (container background, radius 16, padding 20). The header row puts **title** and company on the left and dates on the right, in secondary text and tabular numerals. On mobile the dates wrap below.
- Highlights get comfortable spacing, and their bullets use the sage color.
- Education gets the same card treatment.

### Contact: two-column layout

- On desktop (≥768px), the left column holds the friendly intro copy and social links, stacked vertically with labels. The right column holds the form inside a card.
- On mobile, the columns stack with the copy first.
- Form inputs use the themed radius. The submit button is a full-width sage pill.

## 7. Motion

- Keep the existing page fade.
- Add a scroll-reveal fade/slide-up (8px) on `.section` elements using CSS scroll-driven animations (`animation-timeline: view()`) behind `@supports`. Browsers without support show the content immediately, with no JS needed.
- Add the card hover lifts described in section 6.
- `prefers-reduced-motion: reduce` disables all of the above.

## 8. Global polish

- Thread the footer's social icons and text through the new tokens, and add a little more top spacing.
- Focus rings: a 2px sage outline with an offset, visible in both themes.
- Text selection color: the sage tint.
- Bump the `.page` max-width to 1040px for the inner pages. Keep paragraph widths capped at ~70ch.

## Out of scope

- New content (a "Now" section, projects, writing)
- Rendering the `Sites` section
- Replacing antd

## Acceptance

- Every page renders correctly in light and dark mode, at 375px and at 1280px.
- The theme toggle persists across reloads, and the page doesn't flash the wrong theme on load.
- AA contrast for body text, secondary text, and primary buttons in both themes.
- `npm run lint`, `npm run format:check`, `npm test`, and `npm run build` all pass. Tests are updated where markup changed.
