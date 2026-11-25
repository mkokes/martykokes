import { Typography } from "antd";
import { skills } from "../data/skills";
import Section from "./Section";
import Pills from "./Pills";

export default function Skills() {
  return (
    <Section labelledBy="skills">
      <Typography.Title level={2} id="skills">
        Skills
      </Typography.Title>
      <div className="skill-groups">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="skill-group">
            <Typography.Text className="skill-group-label">{group}</Typography.Text>
            <Pills items={items} label={group} />
          </div>
        ))}
      </div>
    </Section>
  );
}
