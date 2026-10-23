import { List, Typography } from "antd";
import { education } from "../data/experience";

export default function Education() {
  return (
    <section className="section" aria-labelledby="education">
      <Typography.Title level={2} id="education">
        Education
      </Typography.Title>
      <List
        dataSource={education}
        renderItem={(e) => (
          <List.Item>
            <List.Item.Meta title={`${e.school} (${e.years})`} description={e.detail} />
          </List.Item>
        )}
      />
    </section>
  );
}
