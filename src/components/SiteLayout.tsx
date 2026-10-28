import { Button, Drawer, Layout, Segmented, Typography } from "antd";
import { DesktopOutlined, MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import type { ThemePref } from "../theme";
import SocialLinks from "./SocialLinks";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const year = new Date().getFullYear();

const themeOptions = [
  { value: "light", label: "Light", icon: <SunOutlined aria-hidden /> },
  { value: "system", label: "System", icon: <DesktopOutlined aria-hidden /> },
  { value: "dark", label: "Dark", icon: <MoonOutlined aria-hidden /> },
].map((o) => ({
  value: o.value as ThemePref,
  title: `${o.label} theme`,
  icon: o.icon,
  label: <span className="sr-only">{o.label}</span>,
}));

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return navItems.map((i) => (
    <NavLink key={i.to} to={i.to} end={i.to === "/"} className="nav-link" onClick={onNavigate}>
      {i.label}
    </NavLink>
  ));
}

interface Props {
  themePref: ThemePref;
  onThemePrefChange: (pref: ThemePref) => void;
}

export default function SiteLayout({ themePref, onThemePrefChange }: Props) {
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header className={`site-header no-print${scrolled ? " is-scrolled" : ""}`}>
        <Link to="/" className="site-logo">
          {profile.name}
        </Link>
        <nav className="nav-desktop" aria-label="Main">
          <NavLinks />
        </nav>
        <Segmented
          className="theme-toggle"
          size="small"
          shape="round"
          aria-label="Theme"
          options={themeOptions}
          value={themePref}
          onChange={onThemePrefChange}
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
