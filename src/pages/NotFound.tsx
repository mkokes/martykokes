import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="Page not found"
      subTitle="That page doesn't exist."
      extra={
        <Link to="/">
          <Button type="primary">Back home</Button>
        </Link>
      }
    />
  );
}
