import { Card, Space, Typography } from "antd";
import {
  CheckCircleFilled,
  CloudServerOutlined,
  GithubOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { now } from "../data/projects";

export default function NowFeature() {
  return (
    <section className="section" aria-labelledby="now">
      <Typography.Title level={2} id="now">
        What I'm working on now
      </Typography.Title>
      <Card className="soft-card now-card">
        <div className="now-head">
          <span className="icon-badge">
            <CloudServerOutlined />
          </span>
          <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {now.name} <span className="pill now-status">In progress</span>
            </Typography.Title>
            <Typography.Text type="secondary">{now.tagline}</Typography.Text>
          </div>
        </div>
        {now.story.map((p) => (
          <Typography.Paragraph key={p}>{p}</Typography.Paragraph>
        ))}
        <ul className="pills" aria-label={`${now.name} tech`}>
          {now.tech.map((t) => (
            <li key={t} className="pill">
              {t}
            </li>
          ))}
        </ul>
        <div className="now-progress">
          <div>
            <Typography.Text className="skill-group-label">Done</Typography.Text>
            <ul className="now-list" aria-label="Done">
              {now.done.map((d) => (
                <li key={d}>
                  <CheckCircleFilled className="now-done" /> {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Typography.Text className="skill-group-label">Up next</Typography.Text>
            <ul className="now-list" aria-label="Up next">
              {now.next.map((n) => (
                <li key={n}>
                  <span className="now-todo" aria-hidden="true" /> {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Space size="large" wrap className="project-links">
          {now.repos.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">
              <GithubOutlined /> {r.label} repo
            </a>
          ))}
          <Link to="/projects">
            See all projects <RightOutlined />
          </Link>
        </Space>
      </Card>
    </section>
  );
}
