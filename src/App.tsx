import { ConfigProvider, Layout, theme } from "antd";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Sites from "./components/Sites";
import Education from "./components/Education";
import Interests from "./components/Interests";

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
      <AppBody />
    </ConfigProvider>
  );
}

function AppBody() {
  const { token } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh", background: token.colorBgLayout }}>
      <Layout.Content className="page">
        <Hero />
        <Experience />
        <Skills />
        <Sites />
        <Education />
        <Interests />
      </Layout.Content>
    </Layout>
  );
}
