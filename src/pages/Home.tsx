import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Space wrap className="section">
        <Link to="/experience">
          <Button type="primary" size="large">
            View experience
          </Button>
        </Link>
        <Link to="/contact">
          <Button size="large">Get in touch</Button>
        </Link>
      </Space>
    </>
  );
}
