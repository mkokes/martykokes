import { Card, Col, Row, Typography } from "antd";
import { sites } from "../data/sites";

export default function Sites() {
  return (
    <section className="section" aria-labelledby="sites">
      <Typography.Title level={2} id="sites">
        My sites
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {sites.map((s) => (
          <Col key={s.url} xs={24} sm={12}>
            <Card title={<a href={s.url}>{s.name}</a>} size="small">
              {s.description}
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
