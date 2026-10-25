import { Button, Space, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { profile } from "../data/profile";
import SocialLinks from "./SocialLinks";

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-photo">
        <img src={avatar} alt={profile.name} width={200} height={200} />
      </div>
      <div className="hero-text">
        <p className="hero-greeting">Hi, I'm</p>
        <Typography.Title level={1} style={{ marginTop: 0, marginBottom: 0 }}>
          {profile.name}
        </Typography.Title>
        <Typography.Title level={3} type="secondary" style={{ marginTop: 4 }}>
          {profile.title}
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          <EnvironmentOutlined /> <span>{profile.location}</span>
        </Typography.Paragraph>
        <Typography.Paragraph className="hero-intro">{profile.objective}</Typography.Paragraph>
        <SocialLinks />
        <Space wrap className="hero-actions">
          <Link to="/experience">
            <Button type="primary" size="large" shape="round">
              View experience
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="large" shape="round">
              Get in touch
            </Button>
          </Link>
        </Space>
      </div>
    </header>
  );
}
