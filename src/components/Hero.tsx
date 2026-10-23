import { Avatar, Button, Space, Typography } from "antd";
import {
  GithubOutlined,
  GitlabOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import avatar from "../assets/avatar.jpg";
import { profile, socialLinks, type SocialLink } from "../data/profile";

const icons: Record<SocialLink["icon"], ReactNode> = {
  linkedin: <LinkedinOutlined />,
  twitter: <TwitterOutlined />,
  github: <GithubOutlined />,
  gitlab: <GitlabOutlined />,
  mail: <MailOutlined />,
};

export default function Hero() {
  return (
    <header className="hero">
      <Avatar src={avatar} alt={profile.name} size={128} />
      <div>
        <Typography.Title level={1} style={{ marginBottom: 0 }}>
          {profile.name}
        </Typography.Title>
        <Typography.Title level={3} type="secondary" style={{ marginTop: 4 }}>
          {profile.title}
        </Typography.Title>
        <Typography.Paragraph type="secondary">{profile.location}</Typography.Paragraph>
        <Typography.Paragraph style={{ fontSize: 16, maxWidth: 680 }}>
          {profile.objective}
        </Typography.Paragraph>
        <Space wrap className="no-print">
          {socialLinks.map((l) => (
            <Button
              key={l.label}
              icon={icons[l.icon]}
              href={l.url}
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
            </Button>
          ))}
        </Space>
      </div>
    </header>
  );
}
