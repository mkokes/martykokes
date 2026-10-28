import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ExperiencePage from "./pages/Experience";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import { THEME_KEY, themeConfig, type Mode } from "./theme";

function usePrefersDark() {
  const query = "(prefers-color-scheme: dark)";
  const [dark, setDark] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return dark;
}

function readStoredMode(): Mode | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

// The system preference applies until the visitor picks a theme, which is then remembered.
function useThemeMode() {
  const systemDark = usePrefersDark();
  const [stored, setStored] = useState(readStoredMode);
  const mode: Mode = stored ?? (systemDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setStored(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice just won't persist.
    }
  }

  return [mode, toggle] as const;
}

export default function App() {
  const [mode, toggleMode] = useThemeMode();
  return (
    <ConfigProvider theme={themeConfig(mode)}>
      <Routes>
        <Route element={<SiteLayout mode={mode} onToggleMode={toggleMode} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
