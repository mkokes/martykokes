import { Typography } from "antd";
import { education } from "../data/experience";

export default function Education() {
  return (
    <section className="section" aria-labelledby="education">
      <Typography.Title level={2} id="education">
        Education
      </Typography.Title>
      <div className="entry-list">
        {education.map((e) => (
          <div key={e.school} className="entry-card">
            <div className="entry-head">
              <Typography.Title level={4} style={{ margin: 0 }}>
                {e.school}
              </Typography.Title>
              <Typography.Text type="secondary" className="entry-dates">
                {e.years}
              </Typography.Text>
            </div>
            <Typography.Paragraph style={{ margin: "8px 0 0" }}>{e.detail}</Typography.Paragraph>
          </div>
        ))}
      </div>
    </section>
  );
}
