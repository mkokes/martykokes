import { Typography } from "antd";
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section className="section" aria-labelledby="skills">
      <Typography.Title level={2} id="skills">
        Skills
      </Typography.Title>
      <div className="skill-groups">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="skill-group">
            <Typography.Text className="skill-group-label">{group}</Typography.Text>
            <ul className="pills">
              {items.map((s) => (
                <li key={s} className="pill">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
