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
            <>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {job.title}, {job.company}
              </Typography.Title>
              <Typography.Text type="secondary">
                {job.start} – {job.end}
              </Typography.Text>
              <ul>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          ),
        }))}
      />
    </section>
  );
}
