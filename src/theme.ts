import { theme, type ThemeConfig } from "antd";

export type Mode = "light" | "dark";
export type ThemePref = Mode | "system";

// Also read by the inline script in index.html, which sets the theme before first paint.
export const THEME_KEY = "theme";

// Keep in sync with the CSS custom properties in index.css.
export const palette = {
  light: {
    primary: "#3F6B4E",
    onPrimary: "#FFFFFF",
    bg: "#FAF8F3",
    surface: "#FFFFFF",
    text: "#2B2A27",
    textSecondary: "#6B675F",
    border: "#ECE7DD",
  },
  dark: {
    primary: "#8DB89A",
    onPrimary: "#1C1B19",
    bg: "#1C1B19",
    surface: "#252320",
    text: "#ECE8E1",
    textSecondary: "#A8A39A",
    border: "#34312C",
  },
} satisfies Record<Mode, Record<string, string>>;

export function themeConfig(mode: Mode): ThemeConfig {
  const c = palette[mode];
  return {
    algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: c.primary,
      colorBgLayout: c.bg,
      colorBgContainer: c.surface,
      colorBgElevated: c.surface,
      colorText: c.text,
      colorTextSecondary: c.textSecondary,
      colorBorderSecondary: c.border,
      borderRadius: 10,
      borderRadiusLG: 16,
      fontSize: 16,
      fontFamily: '"Inter Variable", system-ui, sans-serif',
    },
    components: {
      Button: { primaryColor: c.onPrimary },
      Layout: {
        headerBg: "transparent",
        headerPadding: "0 16px",
        footerBg: "transparent",
        bodyBg: c.bg,
      },
    },
  };
}
