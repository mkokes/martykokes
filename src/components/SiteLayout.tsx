import { Button, Drawer, Layout, Menu, Typography, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import SocialLinks from "./SocialLinks";

export const navItems = [
  { key: "/", label: "Home" },
  { key: "/about", label: "About" },
  { key: "/experience", label: "Experience" },
  { key: "/contact", label: "Contact" },
];

const year = new Date().getFullYear();

export default function SiteLayout() {
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const items = navItems.map((i) => ({ key: i.key, label: <Link to={i.key}>{i.label}</Link> }));
  const selectedKeys = [
    navItems.find((i) => i.key !== "/" && pathname.startsWith(i.key))?.key ??
      (pathname === "/" ? "/" : ""),
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: token.colorBgLayout }}>
      <Layout.Header
        className="site-header no-print"
        style={{
          background: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Link to="/" className="site-logo">
          <Typography.Text strong style={{ fontSize: 18 }}>
            {profile.name}
          </Typography.Text>
        </Link>
        <Menu
          className="nav-desktop"
          mode="horizontal"
          items={items}
          selectedKeys={selectedKeys}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: "flex-end",
            background: "transparent",
            borderBottom: "none",
          }}
        />
        <Button
          className="nav-mobile"
          type="text"
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
          <Menu
            mode="inline"
            onClick={() => setOpen(false)}
            items={items}
            selectedKeys={selectedKeys}
            style={{ borderInlineEnd: "none" }}
          />
        </Drawer>
      </Layout.Header>
      <Layout.Content className="page">
        <div key={pathname} className="page-fade">
          <Outlet />
        </div>
      </Layout.Content>
      <Layout.Footer className="site-footer no-print" style={{ background: "transparent" }}>
        <SocialLinks iconOnly />
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          © {year} {profile.name}
        </Typography.Paragraph>
      </Layout.Footer>
    </Layout>
  );
}
