import { Button, Space } from "antd";
import {
  GithubOutlined,
  GitlabOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import { socialLinks, type SocialLink } from "../data/profile";

const icons: Record<SocialLink["icon"], ReactNode> = {
  linkedin: <LinkedinOutlined />,
  twitter: <TwitterOutlined />,
  github: <GithubOutlined />,
  gitlab: <GitlabOutlined />,
  mail: <MailOutlined />,
};

export default function SocialLinks({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <Space wrap className="no-print">
      {socialLinks.map((l) => (
        <Button
          key={l.label}
          type={iconOnly ? "text" : "default"}
          icon={icons[l.icon]}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          aria-label={iconOnly ? l.label : undefined}
        >
          {iconOnly ? null : l.label}
        </Button>
      ))}
    </Space>
  );
}
