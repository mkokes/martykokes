import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ExperiencePage from "./pages/Experience";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

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

export default function App() {
  const dark = usePrefersDark();
  return (
    <ConfigProvider theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
