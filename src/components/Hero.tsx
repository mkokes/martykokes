import { Button, Space, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { motion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { profile } from "../data/profile";
import { fadeUp, stagger } from "../motion";
import SocialLinks from "./SocialLinks";
import SplitText from "./SplitText";

const photo: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -12 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
};

const LETTER_GAP = 0.035;
// The rest of the hero waits until the name has spelled itself out.
const afterName = LETTER_GAP * profile.name.length + 0.2;

export default function Hero() {
  return (
    <motion.header className="hero" initial="hidden" animate="show" variants={stagger(0.08)}>
      <motion.div className="hero-photo" variants={photo}>
        <img src={avatar} alt={profile.name} width={200} height={200} />
      </motion.div>
      <motion.div className="hero-text" variants={stagger(0.1)}>
        <motion.p className="hero-greeting" variants={fadeUp}>
          Hi, I'm
        </motion.p>
        <motion.div variants={stagger(LETTER_GAP)}>
          <Typography.Title level={1} style={{ marginTop: 0, marginBottom: 0 }}>
            <SplitText text={profile.name} />
          </Typography.Title>
        </motion.div>
        <motion.div variants={stagger(0.1, afterName)}>
          <motion.div variants={fadeUp}>
            <Typography.Title level={3} type="secondary" style={{ marginTop: 4 }}>
              {profile.title}
            </Typography.Title>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Typography.Paragraph type="secondary">
              <EnvironmentOutlined /> <span>{profile.location}</span>
            </Typography.Paragraph>
            <Typography.Paragraph className="hero-intro">{profile.objective}</Typography.Paragraph>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SocialLinks />
          </motion.div>
          <motion.div variants={fadeUp}>
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
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
