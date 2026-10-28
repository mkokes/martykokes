import { Button, Drawer, Layout, Typography } from "antd";
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import type { Mode } from "../theme";
import SocialLinks from "./SocialLinks";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const year = new Date().getFullYear();

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return navItems.map((i) => (
    <NavLink key={i.to} to={i.to} end={i.to === "/"} className="nav-link" onClick={onNavigate}>
      {i.label}
    </NavLink>
  ));
}

interface Props {
  mode: Mode;
  onToggleMode: () => void;
}

export default function SiteLayout({ mode, onToggleMode }: Props) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextMode = mode === "dark" ? "light" : "dark";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header className={`site-header no-print${scrolled ? " is-scrolled" : ""}`}>
        <Link to="/" className="site-logo">
          {profile.name}
        </Link>
        <nav className="nav-desktop" aria-label="Main">
          <NavLinks />
        </nav>
        <Button
          type="text"
          shape="circle"
          icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
          aria-label={`Switch to ${nextMode} theme`}
          onClick={onToggleMode}
        />
        <Button
          className="nav-mobile"
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        />
        <Drawer
          title="Menu"
          placement="right"
          open={open}
          onClose={() => setOpen(false)}
          size={240}
        >
          <nav className="nav-drawer" aria-label="Main">
            <NavLinks onNavigate={() => setOpen(false)} />
          </nav>
        </Drawer>
      </Layout.Header>
      <Layout.Content className="page">
        <div key={pathname} className="page-fade">
          <Outlet />
        </div>
      </Layout.Content>
      <Layout.Footer className="site-footer no-print">
        <SocialLinks iconOnly />
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          © {year} {profile.name}
        </Typography.Paragraph>
      </Layout.Footer>
    </Layout>
  );
}
