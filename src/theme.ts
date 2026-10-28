import { theme, type ThemeConfig } from "antd";

export type Mode = "light" | "dark";
export type ThemePref = Mode | "system";

// Also read by the inline script in index.html, which sets the theme before first paint.
export const THEME_KEY = "theme";

// Hex mirror of the mk-styleguide role tokens (styleguide/tokens.css). antd needs real colours to
// derive hover/active shades, so it can't read the CSS variables; keep these in step with the tokens.
export const palette = {
  light: {
    link: "#476700", // --color-link (primary-700)
    bg: "#FFFFFF", // --color-bg
    surface: "#F7F7F7", // --color-surface (neutral-50)
    text: "#242424", // --color-text (neutral-950)
    textSecondary: "#6E6E6E", // --color-text-muted (neutral-600)
    border: "#D9D9D9", // --color-border (neutral-200)
    danger: "#DC2626", // --color-danger (danger-600)
  },
  dark: {
    link: "#BAFF39", // primary-100
    bg: "#242424", // neutral-950
    surface: "#383838", // neutral-900
    text: "#F7F7F7", // neutral-50
    textSecondary: "#C1C1C1", // neutral-300
    border: "#484848", // neutral-800
    danger: "#FA7064", // danger-400
  },
} satisfies Record<Mode, Record<string, string>>;

// The lime fill is the same in both modes: --color-primary (primary-100) with --color-on-primary text.
export const lime = {
  fill: "#BAFF39",
  hover: "#B0F22F", // primary-200
  active: "#9AD816", // primary-300
  onFill: "#242424",
};

export function themeConfig(mode: Mode): ThemeConfig {
  const c = palette[mode];
  return {
    algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // antd's "primary" drives links, focus and selected states: the link role.
      colorPrimary: c.link,
      colorLink: c.link,
      // The danger role, so solid danger buttons and error text pass contrast in both modes.
      colorError: c.danger,
      // Text on solid primary (e.g. checked states): dark on lime in dark mode.
      colorTextLightSolid: mode === "dark" ? lime.onFill : "#FFFFFF",
      colorBgLayout: c.bg,
      colorBgContainer: c.surface,
      colorBgElevated: c.surface,
      colorText: c.text,
      colorTextSecondary: c.textSecondary,
      // Typography type="secondary" reads colorTextDescription, so it gets the muted role too.
      colorTextDescription: c.textSecondary,
      colorBorder: c.border,
      colorBorderSecondary: c.border,
      borderRadius: 10, // --radius-md
      borderRadiusLG: 16, // --radius-lg
      borderRadiusSM: 6, // --radius-sm
      fontSize: 16,
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif",
    },
    components: {
      // Primary buttons are a lime fill with dark text, and every button is a pill.
      Button: {
        colorPrimary: lime.fill,
        colorPrimaryHover: lime.hover,
        colorPrimaryActive: lime.active,
        primaryColor: lime.onFill,
        // The lime overrides above also drive default-button hover; keep that on the link role.
        defaultHoverColor: c.link,
        defaultHoverBorderColor: c.link,
        defaultActiveColor: c.link,
        defaultActiveBorderColor: c.link,
        // Pin solid danger buttons to the danger role: antd's dark algorithm would shift colorError
        // and drop the text contrast below 4.5:1.
        colorError: c.danger,
        colorErrorHover: c.danger,
        colorErrorActive: c.danger,
        dangerColor: mode === "dark" ? lime.onFill : "#FFFFFF",
        primaryShadow: "none",
        borderRadius: 9999,
        borderRadiusLG: 9999,
        borderRadiusSM: 9999,
        fontWeight: 600,
      },
      // Form fields sit on the page background, not the card surface.
      Input: { colorBgContainer: c.bg },
      Layout: {
        headerBg: "transparent",
        headerPadding: "0 16px",
        footerBg: "transparent",
        bodyBg: c.bg,
      },
    },
  };
}
