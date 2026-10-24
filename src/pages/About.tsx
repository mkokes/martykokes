import { Card, Col, Row, Typography } from "antd";
import { ApiOutlined, CodeOutlined, MobileOutlined, ToolOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import { aboutIntro, whatIDo, type WhatIDo } from "../data/about";
import Skills from "../components/Skills";
import Interests from "../components/Interests";

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
        <Typography.Paragraph key={p} style={{ fontSize: 16, maxWidth: 720 }}>
          {p}
        </Typography.Paragraph>
      ))}
      <section className="section" aria-labelledby="what-i-do">
        <Typography.Title level={2} id="what-i-do">
          What I do
        </Typography.Title>
        <Row gutter={[16, 16]}>
          {whatIDo.map((w) => (
            <Col key={w.title} xs={24} sm={12}>
              <Card size="small" style={{ height: "100%" }}>
                <Card.Meta
                  avatar={<span style={{ fontSize: 24 }}>{icons[w.icon]}</span>}
                  title={w.title}
                  description={w.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      <Skills />
      <Interests />
    </>
  );
}
