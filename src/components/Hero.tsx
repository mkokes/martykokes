import { Avatar, Typography } from "antd";
import avatar from "../assets/avatar.jpg";
import { profile } from "../data/profile";
import SocialLinks from "./SocialLinks";

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
        <SocialLinks />
      </div>
    </header>
  );
}
