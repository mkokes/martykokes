import { Typography } from "antd";
import { interests, interestsDisclaimer } from "../data/skills";

export default function Interests() {
  return (
    <section className="section" aria-labelledby="interests">
      <Typography.Title level={2} id="interests">
        Activities &amp; interests
      </Typography.Title>
      <ul className="pills">
        {interests.map((i) => (
          <li key={i} className="pill pill-neutral">
            {i}
          </li>
        ))}
      </ul>
      <Typography.Paragraph type="secondary" style={{ marginTop: 12 }}>
        {interestsDisclaimer}
      </Typography.Paragraph>
    </section>
  );
}
