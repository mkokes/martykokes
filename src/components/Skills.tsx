import { Tag, Typography } from "antd";
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section className="section" aria-labelledby="skills">
      <Typography.Title level={2} id="skills">
        Skills
      </Typography.Title>
      {Object.entries(skills).map(([group, items]) => (
        <div key={group} style={{ marginBottom: 12 }}>
          <Typography.Text strong>{group}</Typography.Text>
          <div style={{ marginTop: 4 }}>
            {items.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
