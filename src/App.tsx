import { ConfigProvider } from "antd";
import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ExperiencePage from "./pages/Experience";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import { useMediaQuery } from "./useMediaQuery";
import { THEME_KEY, palette, themeConfig, type Mode, type ThemePref } from "./theme";

function readStoredPref(): ThemePref {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

// Follows the system preference unless the visitor picks light or dark, which is then remembered.
function useThemeMode() {
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [pref, setPrefState] = useState(readStoredPref);
  const mode: Mode = pref === "system" ? (systemDark ? "dark" : "light") : pref;

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    // Browser chrome (mobile address bar, installed-app title bar) follows the chosen mode.
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palette[mode].bg);
  }, [mode]);

  function setPref(next: ThemePref) {
    setPrefState(next);
    try {
      if (next === "system") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice just won't persist.
    }
  }

  return { mode, pref, setPref };
}

export default function App() {
  const { mode, pref, setPref } = useThemeMode();
  return (
    <ConfigProvider theme={themeConfig(mode)}>
      {/* Visitors who ask for reduced motion get fades without movement. */}
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<SiteLayout themePref={pref} onThemePrefChange={setPref} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MotionConfig>
    </ConfigProvider>
  );
}
