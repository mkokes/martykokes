import { Card, Typography } from "antd";
import { ApiOutlined, CodeOutlined, MobileOutlined, ToolOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import { aboutIntro, whatIDo, type WhatIDo } from "../data/about";
import Skills from "../components/Skills";
import Interests from "../components/Interests";
import Section from "../components/Section";
import CardGrid from "../components/CardGrid";
import InteractiveCard from "../components/InteractiveCard";

const icons: Record<WhatIDo["icon"], ReactNode> = {
  code: <CodeOutlined />,
  mobile: <MobileOutlined />,
  tool: <ToolOutlined />,
  api: <ApiOutlined />,
};

export default function About() {
  return (
    <>
      <Typography.Title level={1}>About me</Typography.Title>
      {aboutIntro.map((p) => (
        <Typography.Paragraph key={p} className="lead">
          {p}
        </Typography.Paragraph>
      ))}
      <Section labelledBy="what-i-do">
        <Typography.Title level={2} id="what-i-do">
          What I do
        </Typography.Title>
        <CardGrid
          items={whatIDo}
          getKey={(w) => w.title}
          sm={12}
          lg={12}
          render={(w) => (
            <InteractiveCard>
              <Card className="soft-card lift" style={{ height: "100%" }}>
                <Card.Meta
                  avatar={<span className="icon-badge">{icons[w.icon]}</span>}
                  title={w.title}
                  description={w.description}
                />
              </Card>
            </InteractiveCard>
          )}
        />
      </Section>
      <Skills />
      <Interests />
    </>
  );
}
