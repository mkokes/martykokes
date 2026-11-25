import { Typography } from "antd";
import { interests, interestsDisclaimer } from "../data/skills";
import Section from "./Section";
import Pills from "./Pills";

export default function Interests() {
  return (
    <Section labelledBy="interests">
      <Typography.Title level={2} id="interests">
        Activities &amp; interests
      </Typography.Title>
      <Pills items={interests} tone="neutral" />
      <Typography.Paragraph type="secondary" style={{ marginTop: 12 }}>
        {interestsDisclaimer}
      </Typography.Paragraph>
    </Section>
  );
}
