import { Timeline, Typography } from "antd";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section className="section" aria-labelledby="experience">
      <Typography.Title level={2} id="experience">
        Work history
      </Typography.Title>
      <Timeline
        items={experience.map((job) => ({
          key: `${job.company}-${job.start}`,
          content: (
            <div className="entry-card">
              <div className="entry-head">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {job.title}, {job.company}
                </Typography.Title>
                <Typography.Text type="secondary" className="entry-dates">
                  {job.start} – {job.end}
                </Typography.Text>
              </div>
              <ul className="entry-highlights">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ),
        }))}
      />
    </section>
  );
}
