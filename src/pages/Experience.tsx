import { Typography } from "antd";
import Education from "../components/Education";
import Experience from "../components/Experience";

export default function ExperiencePage() {
  return (
    <>
      <Typography.Title level={1}>Experience</Typography.Title>
      <Experience />
      <Education />
    </>
  );
}
